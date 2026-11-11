#!/usr/bin/env node
/**
 * Generator PDF Soal Ulangan Harian (3 halaman A4, 12 soal: 10 Wajib + 2 Bonus Side-Quest).
 *
 * - Mengambil data langsung dari src/data/uhExerciseData.ts (uhQuestionsData).
 * - Semua soal Pilihan Ganda 5 opsi (A, B, C, D, E).
 * - TANPA tag topik/materi agar tidak membocorkan metode pengerjaan ("no clue").
 * - Komposisi halaman mengikuti panjang langkah jawaban (5 - 4 - 3):
 *     Halaman 1: Soal 1 s.d. 5
 *     Halaman 2: Soal 6 s.d. 9 (No. 7 & No. 9 mendapat ruang coretan panjang)
 *     Halaman 3: Soal 10, 11, 12 (Soal aplikasi & Side-Quest HOTS dengan SVG HD)
 * - Setiap baris: 50% kiri kotak soal + 50% kanan kotak ruang pengerjaan putih polos,
 *   dengan min-height per nomor disesuaikan menurut jumlah baris langkah sejajar "=".
 *
 * Jalankan: npm run pdf:uh
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import katex from 'katex';
import { chromium } from 'playwright';

const ROOT = process.cwd();
const KATEX_DIST = path.join(ROOT, 'node_modules', 'katex', 'dist');
const OUTPUT = path.join(ROOT, 'public', 'downloads', 'uh-soal.pdf');
const SIDEQUEST_MIRROR = path.join(ROOT, 'public', 'downloads', 'sidequest-soal-11-12.pdf');
const PREVIEW_DIR = path.join(ROOT, 'audit-results', 'uh-pdf');

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const renderMath = (tex, displayMode = false) =>
  katex.renderToString(tex, {
    displayMode,
    throwOnError: false,
    strict: 'ignore',
  });

const richText = (text) => {
  const segments = [];
  const pattern = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) segments.push(escapeHtml(text.slice(lastIndex, match.index)));
    if (match[1] !== undefined) segments.push(renderMath(match[1], true));
    else if (match[2] !== undefined) segments.push(renderMath(match[2], false));
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) segments.push(escapeHtml(text.slice(lastIndex)));
  return segments.join('');
};

/**
 * Kustomisasi ringkas teks soal cerita pada PDF agar proporsional di kolom kiri
 * tanpa membocorkan persamaan model matematika maupun metode penyelesaian.
 */
const PDF_CUSTOM = {
  7: {
    stim: 'Drone medis otonom melintasi zona pantau. Waktu tempuh $t$ (detik) saat drone melintasi batas ketinggian memenuhi persamaan berikut, dengan $m$ parameter daya dorong ($m > 0$). Drone memasuki dan meninggalkan zona pada waktu $t_1 = p$ dan $t_2 = q$ dengan selisih $p - q = 6$ detik.',
    formula: 't^2 - mt + 16 = 0',
    ask: 'Tentukan nilai parameter daya dorong $m$ ($m > 0$) yang memenuhi persamaan tersebut!',
  },
  10: {
    stim: 'Teknisi menyandarkan tangga darurat sepanjang $20$ m pada dinding vertikal. Ketinggian ujung atas tangga di dinding ($t$) disyaratkan $4$ m lebih tinggi daripada jarak horizontal kaki tangga ke dasar dinding ($x$).',
    formula: null,
    ask: 'Berdasarkan spesifikasi dan skema di atas, hitunglah tinggi tembok ($t$) yang dicapai ujung tangga!',
    diagram: 'tangga',
  },
  11: {
    stem: 'Diketahui salah satu akar dari persamaan kuadrat berikut adalah $x_1 = 2$. Jika $x_2$ adalah akar lainnya, tentukan nilai dari $m^2 + x_2^2$!',
  },
  12: {
    stim: 'Sebuah kolam renang berbentuk persegi panjang memiliki luas permukaan air $140\\text{ m}^2$. Panjang kolam tersebut $4$ m lebih dari lebarnya. Di sekeliling tepi luar kolam dibangun jalan setapak dengan lebar seragam $2$ m pada keempat sisinya seperti tampak pada skema.',
    formula: null,
    ask: 'Berdasarkan informasi dan skema di atas, hitunglah luas jalan setapak yang mengelilingi kolam renang tersebut!',
    diagram: 'kolam-jalan',
  },
};

/**
 * Tinggi minimum kotak per nomor (mm), dihitung berdasarkan jumlah baris
 * pengerjaan sistematis sejajar "=" (1 operasi per baris, tidak menumpuk).
 */
const ROW_MIN_HEIGHT_MM = {
  // Halaman 1 (No. 1 - 5)
  1: 40, // Pemfaktoran a=1 (4 baris)
  2: 54, // Rumus ABC / Melengkapkan kuadrat sempurna (6 baris)
  3: 44, // Substitusi akar negatif x=-2 (5 baris)
  4: 54, // Diskriminan D=0 trinomial p (6 baris)
  5: 45, // Teorema Vieta kombinasi linear (5 baris)
  // Halaman 2 (No. 6 - 9)
  6: 50, // Jumlah kuadrat akar a^2 + b^2 (5 baris)
  7: 72, // Stimulus selisih akar (p-q)^2 = (p+q)^2 - 4pq (7 baris)
  8: 48, // Menyusun PK baru dasar (5 baris)
  9: 88, // Menyusun PK baru berelasi (x1+3) & (x2+3) (9 baris)
  // Halaman 3 (No. 10 - 12)
  10: 84, // Stimulus Pythagoras tangga + SVG (8 baris)
  11: 78, // Side-Quest Parameter m + substitusi akar + m^2 + x2^2 (9 baris)
  12: 90, // Side-Quest Kolam & Jalan Setapak + SVG HD (9 baris)
};

/**
 * SVG Tangga HD (tanpa bocoran rumus t = x + 4).
 */
const ladderSvg = (item) => {
  const { panjangTangga = '20 m', tinggiLabel = 't', jarakLabel = 'x' } = item.diagramConfig || {};
  const rungs = Array.from({ length: 7 }, (_, index) => {
    const t = (index + 1) / 8;
    const x = 64 + t * 141;
    const y = 16 + t * 108;
    return `<line x1="${(x - 4).toFixed(1)}" y1="${(y + 3).toFixed(1)}" x2="${(x + 4).toFixed(1)}" y2="${(y - 3).toFixed(1)}" stroke="#f59e0b" stroke-width="2.2" stroke-linecap="round"/>`;
  }).join('');

  const floorHatch = Array.from({ length: 12 }, (_, index) => {
    const x = 58 + index * 15;
    return `<line x1="${x}" y1="124" x2="${x - 9}" y2="133" stroke="#cbd5e1" stroke-width="1"/>`;
  }).join('');

  return `<div class="diagram">
    <svg viewBox="0 0 240 142" width="64mm" height="37mm" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Skema tangga pada dinding">
      <defs>
        <pattern id="brick-uh" width="18" height="10" patternUnits="userSpaceOnUse">
          <rect width="18" height="10" fill="#f8fafc"/>
          <path d="M0 0H18M0 5H18M9 0V5M0 5V10M18 5V10" stroke="#cbd5e1" stroke-width="0.7" fill="none"/>
        </pattern>
      </defs>
      ${floorHatch}
      <rect x="56" y="12" width="16" height="112" fill="url(#brick-uh)" stroke="#94a3b8" stroke-width="1.2"/>
      <line x1="56" y1="124" x2="232" y2="124" stroke="#334155" stroke-width="2.2"/>
      <line x1="64" y1="16" x2="205" y2="124" stroke="#d97706" stroke-width="3.6" stroke-linecap="round"/>
      ${rungs}
      <path d="M64 112 L76 112 L76 124" fill="none" stroke="#64748b" stroke-width="1.3"/>
      <text x="64" y="8" text-anchor="middle" font-family="Arial, sans-serif" font-size="6.4" font-weight="700" letter-spacing="0.6" fill="#64748b">TEMBOK</text>
      <line x1="44" y1="20" x2="44" y2="120" stroke="#64748b" stroke-width="1"/>
      <path d="M44 20 l-3 5 h6 z" fill="#64748b"/>
      <path d="M44 120 l-3 -5 h6 z" fill="#64748b"/>
      <rect x="31" y="64" width="16" height="11" rx="2" fill="#fff"/>
      <text x="39" y="72" text-anchor="middle" font-family="Arial, sans-serif" font-size="8.8" font-weight="700" fill="#334155">${escapeHtml(tinggiLabel)}</text>
      <text x="132" y="137" text-anchor="middle" font-family="Arial, sans-serif" font-size="8.4" font-weight="700" fill="#334155">Jarak = ${escapeHtml(jarakLabel)}</text>
      <rect x="136" y="46" width="52" height="14" rx="3" fill="#fffbeb" stroke="#f59e0b" stroke-width="1"/>
      <text x="162" y="55.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="8.2" font-weight="700" fill="#92400e">${escapeHtml(panjangTangga)}</text>
    </svg>
  </div>`;
};

/**
 * SVG HD Kolam Renang & Jalan Setapak 4 Sisi (100% bebas bocoran rumus/variabel).
 */
const poolPathSvg = (item) => {
  const { luasKolamLabel = '140 m²', lebarJalanLabel = '2 m' } = item.kolamJalanConfig || {};
  const luas = escapeHtml(luasKolamLabel);
  const lebarJalan = escapeHtml(lebarJalanLabel);

  return `<div class="diagram">
    <svg viewBox="0 0 360 196" width="76mm" height="41.5mm" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Skema kolam renang dikelilingi jalan setapak">
      <defs>
        <pattern id="paving-pdf" width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="12" height="12" fill="#fffbeb"/>
          <path d="M0 6H12M6 0V6M0 0V12M12 6V12" stroke="#fcd34d" stroke-width="0.6" fill="none"/>
        </pattern>
        <pattern id="ripple-pdf" width="24" height="12" patternUnits="userSpaceOnUse">
          <path d="M 3 6 Q 7.5 3, 12 6 T 21 6" fill="none" stroke="#38bdf8" stroke-width="0.8" stroke-opacity="0.45" stroke-linecap="round"/>
        </pattern>
      </defs>

      <!-- Bingkai Luar (Jalan Setapak) -->
      <rect x="36" y="12" width="288" height="172" rx="7" fill="url(#paving-pdf)" stroke="#475569" stroke-width="1.8"/>

      <!-- Area Dalam (Kolam Renang): inset 32px tiap sisi -> x=68, y=44, width=224, height=108 -->
      <rect x="68" y="44" width="224" height="108" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.8"/>
      <rect x="68" y="44" width="224" height="108" rx="4" fill="url(#ripple-pdf)"/>

      <!-- Garis bantu sudut jalan -->
      <line x1="36" y1="44" x2="68" y2="44" stroke="#94a3b8" stroke-width="0.7" stroke-dasharray="2.5 2.5"/>
      <line x1="292" y1="44" x2="324" y2="44" stroke="#94a3b8" stroke-width="0.7" stroke-dasharray="2.5 2.5"/>
      <line x1="36" y1="152" x2="68" y2="152" stroke="#94a3b8" stroke-width="0.7" stroke-dasharray="2.5 2.5"/>
      <line x1="292" y1="152" x2="324" y2="152" stroke="#94a3b8" stroke-width="0.7" stroke-dasharray="2.5 2.5"/>

      <!-- Badge Tengah Kolam -->
      <rect x="122" y="75" width="116" height="46" rx="7" fill="#ffffff" stroke="#0284c7" stroke-width="1.1"/>
      <text x="180" y="93" text-anchor="middle" font-family="Arial, sans-serif" font-size="9.2" font-weight="800" letter-spacing="1.2" fill="#0369a1">KOLAM RENANG</text>
      <text x="180" y="111" text-anchor="middle" font-family="Arial, sans-serif" font-size="12.5" font-weight="800" fill="#0f172a">Luas = ${luas}</text>

      <!-- Label panjang & lebar di sisi dalam kolam -->
      <rect x="155" y="49" width="50" height="13" rx="3" fill="#f0f9ff"/>
      <text x="180" y="58.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="8.6" font-weight="700" fill="#0369a1">panjang</text>

      <rect x="73" y="80" width="13" height="36" rx="3" fill="#f0f9ff"/>
      <text x="82" y="98" text-anchor="middle" font-family="Arial, sans-serif" font-size="8.6" font-weight="700" fill="#0369a1" transform="rotate(-90 82 98)">lebar</text>

      <!-- Label JALAN SETAPAK di sisi atas -->
      <rect x="136" y="19" width="88" height="16" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="0.9"/>
      <text x="180" y="30" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" font-weight="800" letter-spacing="0.8" fill="#92400e">JALAN SETAPAK</text>

      <!-- Panah Lebar Jalan Atas -->
      <line x1="252" y1="14" x2="252" y2="42" stroke="#4338ca" stroke-width="1.3"/>
      <path d="M252 13 L249.2 18.5 L254.8 18.5 Z" fill="#4338ca"/>
      <path d="M252 43 L249.2 37.5 L254.8 37.5 Z" fill="#4338ca"/>
      <rect x="257" y="20" width="26" height="15" rx="3" fill="#ffffff" stroke="#6366f1" stroke-width="0.9"/>
      <text x="270" y="30.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="8.5" font-weight="800" fill="#4338ca">${lebarJalan}</text>

      <!-- Panah Lebar Jalan Bawah -->
      <line x1="180" y1="154" x2="180" y2="182" stroke="#4338ca" stroke-width="1.3"/>
      <path d="M180 153 L177.2 158.5 L182.8 158.5 Z" fill="#4338ca"/>
      <path d="M180 183 L177.2 177.5 L182.8 177.5 Z" fill="#4338ca"/>
      <rect x="185" y="160.5" width="26" height="15" rx="3" fill="#ffffff" stroke="#6366f1" stroke-width="0.9"/>
      <text x="198" y="171" text-anchor="middle" font-family="Arial, sans-serif" font-size="8.5" font-weight="800" fill="#4338ca">${lebarJalan}</text>

      <!-- Panah Lebar Jalan Kiri -->
      <line x1="38" y1="98" x2="66" y2="98" stroke="#4338ca" stroke-width="1.3"/>
      <path d="M37 98 L42.5 95.2 L42.5 100.8 Z" fill="#4338ca"/>
      <path d="M67 98 L61.5 95.2 L61.5 100.8 Z" fill="#4338ca"/>
      <rect x="39" y="77" width="26" height="15" rx="3" fill="#ffffff" stroke="#6366f1" stroke-width="0.9"/>
      <text x="52" y="87.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="8.5" font-weight="800" fill="#4338ca">${lebarJalan}</text>

      <!-- Panah Lebar Jalan Kanan -->
      <line x1="294" y1="98" x2="322" y2="98" stroke="#4338ca" stroke-width="1.3"/>
      <path d="M293 98 L298.5 95.2 L298.5 100.8 Z" fill="#4338ca"/>
      <path d="M323 98 L317.5 95.2 L317.5 100.8 Z" fill="#4338ca"/>
      <rect x="295" y="77" width="26" height="15" rx="3" fill="#ffffff" stroke="#6366f1" stroke-width="0.9"/>
      <text x="308" y="87.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="8.5" font-weight="800" fill="#4338ca">${lebarJalan}</text>
    </svg>
  </div>`;
};

const buildQuestion = (item) => {
  const custom = PDF_CUSTOM[item.number] || {};
  const rawStem = custom.stem || (custom.stim ? '' : item.question);
  const cleanStem = rawStem.replace(/^\[OPSIONAL\/BONUS \+5\]\s*/i, '');
  const stim = custom.stim ? `<div class="stim">${richText(custom.stim)}</div>` : '';
  const formulaTex = custom.formula !== undefined ? custom.formula : item.mathPrompt;
  const formula = formulaTex ? `<div class="formula">${renderMath(formulaTex, true)}</div>` : '';
  const ask = custom.ask ? `<div class="ask">${richText(custom.ask)}</div>` : '';

  let diagram = '';
  if (custom.diagram === 'tangga') diagram = ladderSvg(item);
  else if (custom.diagram === 'kolam-jalan') diagram = poolPathSvg(item);

  const badgeHtml = item.isOptional
    ? `<span class="badge-opt">OPSIONAL • BONUS +${item.points} POIN</span>`
    : `<span class="badge-wajib">${item.points} POIN</span>`;

  const options =
    item.type === 'choice' && item.options
      ? `<div class="options">${item.options
          .map(
            (option) =>
              `<div class="opt"><b>${escapeHtml(option.key)}.</b>${
                option.math ? renderMath(option.math, false) : richText(option.text)
              }</div>`
          )
          .join('')}</div>`
      : '';

  return `<div class="q">
    <div class="q-head">
      <span class="num ${item.isOptional ? 'num-opt' : ''}">${item.number}</span>
      ${badgeHtml}
    </div>
    ${cleanStem ? `<div class="q-text">${richText(cleanStem)}</div>` : ''}
    ${stim}
    ${diagram}
    ${formula}
    ${ask}
    ${options}
  </div>`;
};

const buildRow = (item) => {
  const minHeight = ROW_MIN_HEIGHT_MM[item.number] || 40;
  return `<div class="row ${item.isOptional ? 'row-opt' : ''}" style="min-height: ${minHeight}mm;">
    <div class="q-box">${buildQuestion(item)}</div>
    <div class="work-box"></div>
  </div>`;
};

const katexCss = () => {
  let css = fs.readFileSync(path.join(KATEX_DIST, 'katex.min.css'), 'utf8');
  css = css.replace(/url\((?:"|')?fonts\/([^"')]+)(?:"|')?\)/g, (_, file) => {
    const extension = path.extname(file).slice(1);
    const mime =
      extension === 'woff2' ? 'font/woff2' : extension === 'woff' ? 'font/woff' : 'font/ttf';
    const base64 = fs.readFileSync(path.join(KATEX_DIST, 'fonts', file)).toString('base64');
    return `url(data:${mime};base64,${base64})`;
  });
  return css;
};

const css = `
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: #fff; color: #0f172a; }
  body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page {
    width: 210mm;
    height: 297mm;
    padding: 9mm 9mm 8mm;
    display: flex;
    flex-direction: column;
    position: relative;
    page-break-after: always;
    overflow: hidden;
  }
  .page:last-child { page-break-after: auto; }
  .masthead {
    border-top: 2.4mm solid #4338ca;
    padding-top: 2.8mm;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    gap: 5mm;
  }
  .masthead-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .score-box {
    width: 25mm;
    border: .35mm solid #4338ca;
    border-radius: 1.6mm;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #fff;
    flex-shrink: 0;
  }
  .score-head {
    background: #4338ca;
    color: #fff;
    font-size: 6.2pt;
    font-weight: 800;
    letter-spacing: .1em;
    text-transform: uppercase;
    text-align: center;
    padding: 1.1mm 1mm;
  }
  .score-body {
    flex: 1;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 1mm 1.8mm;
    font-size: 6.8pt;
    font-weight: 700;
    color: #94a3b8;
  }
  .kicker {
    font-size: 6.8pt;
    letter-spacing: .13em;
    text-transform: uppercase;
    color: #4338ca;
    font-weight: 700;
  }
  h1 { margin: 1mm 0 0; font-size: 14.8pt; letter-spacing: -.01em; line-height: 1.1; }
  .sub { margin-top: .8mm; font-size: 7.9pt; color: #64748b; }
  .identity { display: flex; align-items: flex-end; gap: 10mm; margin-top: 2.8mm; font-size: 8.5pt; }
  .id-field { display: flex; align-items: flex-end; gap: 2mm; }
  .fill { display: inline-block; width: 62mm; height: 3.8mm; border-bottom: .3mm solid #0f172a; }
  .fill.short { width: 26mm; }
  .slim-head {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1.8mm;
    border-bottom: .25mm solid #cbd5e1;
    font-size: 7.2pt;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: #64748b;
    font-weight: 700;
  }
  .rows { flex: 1; display: flex; flex-direction: column; gap: 2.2mm; margin-top: 2.4mm; }
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.3mm;
  }
  .q-box, .work-box { border: .25mm solid #cbd5e1; border-radius: 1.2mm; }
  .q-box { border-left: .9mm solid #4338ca; padding: 2mm 2.5mm; }
  .row-opt .q-box { border-left: .9mm solid #d97706; background: #fffdf7; }
  .work-box { background: #fff; }
  .q { break-inside: avoid; }
  .q-head { display: flex; align-items: center; justify-content: space-between; gap: 2mm; margin-bottom: .9mm; }
  .num {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: none;
    width: 5.2mm;
    height: 5.2mm;
    border-radius: 50%;
    background: #4338ca;
    color: #fff;
    font-size: 8pt;
    font-weight: 700;
  }
  .num.num-opt { background: #d97706; }
  .badge-wajib {
    font-size: 6.2pt;
    font-weight: 700;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: #64748b;
  }
  .badge-opt {
    font-size: 6.2pt;
    font-weight: 800;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: #b45309;
    background: #fef3c7;
    padding: .4mm 1.5mm;
    border-radius: .8mm;
    border: .2mm solid #fde68a;
  }
  .q-text { font-size: 8.5pt; line-height: 1.32; color: #0f172a; }
  .stim {
    margin: .5mm 0 .8mm;
    padding: 1.5mm 2.1mm;
    border-left: .7mm solid #6366f1;
    background: #f8fafc;
    font-size: 8pt;
    line-height: 1.32;
    color: #334155;
  }
  .row-opt .stim { border-left-color: #d97706; background: #fffbeb; }
  .formula { margin: .6mm 0; text-align: center; }
  .formula .katex-display { margin: .35em 0; }
  .formula .katex { font-size: 1.02em; }
  .diagram { margin: .8mm 0 .9mm; text-align: center; }
  .diagram svg { display: block; margin: 0 auto; }
  .q-text .katex, .stim .katex, .opt .katex { font-size: 1.03em; }
  .ask { margin-top: .5mm; font-size: 8.4pt; font-weight: 600; color: #0f172a; }
  .options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: .75mm 2.4mm;
    margin-top: .8mm;
  }
  .opt { display: flex; align-items: baseline; gap: 1.2mm; font-size: 8.2pt; line-height: 1.28; }
  .opt b { flex: none; color: #4338ca; font-size: 7.7pt; }
  .row-opt .opt b { color: #b45309; }
  .footer {
    position: absolute;
    left: 9mm;
    right: 9mm;
    bottom: 4mm;
    display: flex;
    justify-content: space-between;
    padding-top: 1mm;
    border-top: .2mm solid #e2e8f0;
    font-size: 6.2pt;
    color: #94a3b8;
  }
  .katex-display { margin: .35em 0; }
`;

const compileData = async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uh-data-'));
  const tscBin = path.join(ROOT, 'node_modules', '.bin', 'tsc');
  execFileSync(
    tscBin,
    [
      'src/data/uhExerciseData.ts',
      '--outDir',
      tmpDir,
      '--module',
      'esnext',
      '--target',
      'es2020',
      '--skipLibCheck',
      '--moduleResolution',
      'node',
    ],
    { cwd: ROOT, stdio: 'inherit' }
  );
  const modulePath = path.join(tmpDir, 'uhExerciseData.js');
  const { uhQuestionsData } = await import(pathToFileURL(modulePath).href);
  fs.rmSync(tmpDir, { recursive: true, force: true });
  return uhQuestionsData;
};

const main = async () => {
  const uhData = await compileData();
  const ordered = [...uhData].sort((a, b) => a.number - b.number);
  if (ordered.length !== 12) {
    throw new Error(`UH harus berisi 12 soal (10 wajib + 2 opsional), ditemukan ${ordered.length}.`);
  }
  if (ordered.some((item) => item.type !== 'choice' || !item.options || item.options.length !== 5)) {
    throw new Error('Semua soal UH harus bertipe pilihan ganda dengan tepat 5 opsi (A-E).');
  }

  // Komposisi 3 halaman berdasarkan panjang langkah pengerjaan:
  // Hal 1: No 1-5 (5 soal), Hal 2: No 6-9 (4 soal), Hal 3: No 10-12 (3 soal)
  const pages = [
    ordered.slice(0, 5),
    ordered.slice(5, 9),
    ordered.slice(9, 12),
  ];

  const totalPages = pages.length;

  const pageHtml = (items, pageIndex) => `
    <div class="page page-${pageIndex + 1}">
      ${
        pageIndex === 0
          ? `<div class="masthead">
              <div class="masthead-left">
                <div>
                  <div class="kicker">Evaluasi Resmi Bab 5 • Matematika SMA Kelas X</div>
                  <h1>ULANGAN HARIAN — PERSAMAAN KUADRAT</h1>
                  <div class="sub">10 Soal Wajib (100 Poin) + 2 Soal Opsional Bonus (+10 Poin) • Pilih satu jawaban yang paling tepat</div>
                </div>
                <div class="identity">
                  <div class="id-field"><span>Nama Siswa</span><span class="fill"></span></div>
                  <div class="id-field"><span>Kelas</span><span class="fill short"></span></div>
                </div>
              </div>
              <div class="score-box">
                <div class="score-head">Nilai Akhir</div>
                <div class="score-body">/ 100</div>
              </div>
            </div>`
          : `<div class="slim-head">
              <span>Ulangan Harian — Persamaan Kuadrat</span>
              <span>Halaman ${pageIndex + 1} dari ${totalPages}</span>
            </div>`
      }
      <div class="rows">${items.map(buildRow).join('')}</div>
      <div class="footer">
        <span>Ulangan Harian • Persamaan Kuadrat (Kolom kanan untuk langkah pengerjaan sistematis)</span>
        <span>Halaman ${pageIndex + 1} dari ${totalPages}</span>
      </div>
    </div>`;

  const html = `<!doctype html>
  <html lang="id">
    <head>
      <meta charset="utf-8" />
      <title>Ulangan Harian — Soal Persamaan Kuadrat</title>
      <style>${katexCss()}</style>
      <style>${css}</style>
    </head>
    <body>${pages.map(pageHtml).join('')}</body>
  </html>`;

  const htmlPath = path.join(PREVIEW_DIR, 'uh.html');
  fs.mkdirSync(PREVIEW_DIR, { recursive: true });
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(htmlPath, html);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: 'print' });

  const metrics = await page.evaluate(() => {
    const pages = [...document.querySelectorAll('.page')];
    return pages.map((pageEl, idx) => {
      const rows = [...pageEl.querySelectorAll('.row')];
      const footer = pageEl.querySelector('.footer')?.getBoundingClientRect();
      const lastRow = rows.at(-1)?.getBoundingClientRect();
      return {
        page: idx + 1,
        rows: rows.length,
        rowHeightsPx: rows.map((r) => Math.round(r.getBoundingClientRect().height)),
        pageHeight: pageEl.clientHeight,
        scrollHeight: pageEl.scrollHeight,
        lastRowBottom: lastRow ? Math.round(lastRow.bottom) : null,
        footerTop: footer ? Math.round(footer.top) : null,
        rowOverflow: lastRow && footer ? Math.round(lastRow.bottom - footer.top) : null,
      };
    });
  });

  const katexErrors = (html.match(/katex-error/g) || []).length;
  console.log('Metrics UH PDF:', JSON.stringify(metrics, null, 2));
  console.log('KaTeX errors in HTML:', katexErrors);

  if (metrics.some((m) => m.rowOverflow > 0)) {
    console.warn('WARNING: Ada halaman yang mengalami overflow melewati footer!');
  }

  await page.pdf({
    path: OUTPUT,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  await browser.close();

  // Salin juga ke sidequest-soal-11-12.pdf agar tetap sinkron 1 file
  fs.copyFileSync(OUTPUT, SIDEQUEST_MIRROR);

  execFileSync('pdfinfo', [OUTPUT], { stdio: 'inherit' });
  execFileSync('pdftoppm', ['-png', '-r', '140', OUTPUT, path.join(PREVIEW_DIR, 'page')], {
    stdio: 'inherit',
  });
  console.log(`✅ PDF UH written: ${OUTPUT}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
