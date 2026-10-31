#!/usr/bin/env node
/**
 * Generator PDF soal Paket A (2 halaman A4).
 *
 * - Mengambil data langsung dari src/data/uhExerciseData.ts (paketAData).
 * - Matematika dirender dengan KaTeX (font di-embed sebagai data URI).
 * - Setiap baris: satu kotak soal (kiri) + satu kotak ruang pengerjaan (kanan),
 *   tinggi mengikuti isi soal dan garis bawahnya sejajar.
 * - Identitas hanya Nama Siswa dan Kelas.
 *
 * Jalankan: npm run pdf:paket-a
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
const OUTPUT = path.join(ROOT, 'public', 'downloads', 'paket-a-soal.pdf');
const PREVIEW_DIR = path.join(ROOT, 'audit-results', 'paket-a-pdf');
const SPLIT_AT = 5; // halaman 1: soal 1-5, halaman 2: soal 6-10

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

const tagFor = (item) =>
  item.categoryTag
    .replace('Substitusi Solusi Akar', 'Substitusi Akar')
    .replace('Diskriminan Akar Kembar', 'Diskriminan')
    .replace('Menyusun PK Baru', 'Menyusun PK')
    .replace('Menyusun PK Berelasi', 'PK Berelasi');

const PDF_CUSTOM = {
  7: {
    tag: 'Stimulus Numerasi',
    stim: 'Roket air diluncurkan vertikal. Waktu tempuh $t$ (detik) saat roket melintasi ambang radar memenuhi persamaan berikut, dengan $p$ konstanta energi. Roket melintasi ambang pada dua waktu berbeda, $t_1$ dan $t_2$, dengan selisih $|t_1 - t_2| = 2$ detik.',
    formula: 't^2 - 8t + p = 0',
    ask: 'Tentukan nilai konstanta energi $p$.',
  },
  10: {
    tag: 'Stimulus Geometri & K3',
    stim: 'Tangga darurat sepanjang $17$ m disandarkan pada dinding vertikal. Ketinggian ujung atas tangga di dinding ($t$) lebih tinggi $7$ m daripada jarak kaki tangga ke dinding ($x$).',
    formula: null,
    ask: 'Tentukan tinggi $t$ (dalam meter).',
    diagram: true,
  },
};

const ladderSvg = (item) => {
  const { panjangTangga, jarakLabel } = item.diagramConfig;
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
    <svg viewBox="0 0 240 142" width="62mm" height="36mm" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Skema tangga pada dinding">
      <defs>
        <pattern id="brick" width="18" height="10" patternUnits="userSpaceOnUse">
          <rect width="18" height="10" fill="#f8fafc"/>
          <path d="M0 0H18M0 5H18M9 0V5M0 5V10M18 5V10" stroke="#cbd5e1" stroke-width="0.7" fill="none"/>
        </pattern>
      </defs>
      ${floorHatch}
      <rect x="56" y="12" width="16" height="112" fill="url(#brick)" stroke="#94a3b8" stroke-width="1.2"/>
      <line x1="56" y1="124" x2="232" y2="124" stroke="#334155" stroke-width="2.2"/>
      <line x1="64" y1="16" x2="205" y2="124" stroke="#d97706" stroke-width="3.6" stroke-linecap="round"/>
      ${rungs}
      <path d="M64 112 L76 112 L76 124" fill="none" stroke="#64748b" stroke-width="1.3"/>
      <text x="64" y="8" text-anchor="middle" font-family="Arial, sans-serif" font-size="6.4" font-weight="700" letter-spacing="0.6" fill="#64748b">TEMBOK</text>
      <line x1="44" y1="20" x2="44" y2="120" stroke="#64748b" stroke-width="1"/>
      <path d="M44 20 l-3 5 h6 z" fill="#64748b"/>
      <path d="M44 120 l-3 -5 h6 z" fill="#64748b"/>
      <rect x="31" y="64" width="16" height="10" rx="2" fill="#fff"/>
      <text x="39" y="71.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" font-weight="700" fill="#334155">t</text>
      <text x="132" y="137" text-anchor="middle" font-family="Arial, sans-serif" font-size="8.2" fill="#334155">${escapeHtml(jarakLabel)}</text>
      <rect x="139" y="46" width="46" height="14" rx="3" fill="#fffbeb" stroke="#f59e0b" stroke-width="1"/>
      <text x="162" y="56" text-anchor="middle" font-family="Arial, sans-serif" font-size="8.2" fill="#92400e">${escapeHtml(panjangTangga)}</text>
    </svg>
  </div>`;
};

const buildQuestion = (item) => {
  const custom = PDF_CUSTOM[item.number] || {};
  const tag = custom.tag || tagFor(item);
  const stem = custom.stim ? '' : item.question;
  const stim = custom.stim ? `<div class="stim">${richText(custom.stim)}</div>` : '';
  const formulaTex = custom.formula !== undefined ? custom.formula : item.mathPrompt;
  const formula = formulaTex ? `<div class="formula">${renderMath(formulaTex, true)}</div>` : '';
  const ask = custom.ask ? `<div class="ask">${richText(custom.ask)}</div>` : '';
  const diagram = custom.diagram ? ladderSvg(item) : '';
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
    <div class="q-head"><span class="num">${item.number}</span><span class="tag">${escapeHtml(tag)}</span></div>
    ${stem ? `<div class="q-text">${richText(stem)}</div>` : ''}
    ${stim}
    ${diagram}
    ${formula}
    ${ask}
    ${options}
  </div>`;
};

const buildRow = (item) => `<div class="row">
  <div class="q-box">${buildQuestion(item)}</div>
  <div class="work-box"></div>
</div>`;

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
  .masthead { border-top: 2.4mm solid #4338ca; padding-top: 3mm; }
  .kicker {
    font-size: 6.8pt;
    letter-spacing: .13em;
    text-transform: uppercase;
    color: #6366f1;
    font-weight: 700;
  }
  h1 { margin: 1.2mm 0 0; font-size: 15pt; letter-spacing: -.01em; line-height: 1.1; }
  .sub { margin-top: .8mm; font-size: 8pt; color: #64748b; }
  .identity { display: flex; align-items: flex-end; gap: 10mm; margin-top: 3.2mm; font-size: 8.6pt; }
  .id-field { display: flex; align-items: flex-end; gap: 2mm; }
  .fill { display: inline-block; width: 62mm; height: 4mm; border-bottom: .3mm solid #0f172a; }
  .fill.short { width: 26mm; }
  .slim-head {
    display: flex;
    justify-content: space-between;
    padding-bottom: 2mm;
    border-bottom: .25mm solid #cbd5e1;
    font-size: 7.2pt;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: #64748b;
    font-weight: 700;
  }
  .rows { flex: 1; display: flex; flex-direction: column; gap: 2.3mm; margin-top: 2.6mm; }
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.3mm;
    min-height: 33mm;
  }
  .page-first .row { min-height: 42mm; }
  .q-box, .work-box { border: .25mm solid #cbd5e1; border-radius: 1.2mm; }
  .q-box { border-left: .9mm solid #6366f1; padding: 2.1mm 2.5mm; }
  .work-box {
    padding: 2mm;
    background-image: repeating-linear-gradient(
      to bottom,
      #dbe3ee 0,
      #dbe3ee .22mm,
      transparent .22mm,
      transparent 7mm
    );
    background-origin: content-box;
    background-clip: content-box;
  }
  .q { break-inside: avoid; }
  .q-head { display: flex; align-items: center; gap: 2mm; margin-bottom: .8mm; }
  .num {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: none;
    width: 5mm;
    height: 5mm;
    border-radius: 50%;
    background: #4338ca;
    color: #fff;
    font-size: 8pt;
    font-weight: 700;
  }
  .tag {
    font-size: 6.2pt;
    font-weight: 700;
    letter-spacing: .07em;
    text-transform: uppercase;
    color: #6366f1;
  }
  .q-text { font-size: 8.55pt; line-height: 1.32; color: #0f172a; }
  .page-first .q-text { font-size: 8.75pt; }
  .stim {
    margin: .5mm 0 .8mm;
    padding: 1.5mm 2.1mm;
    border-left: .7mm solid #6366f1;
    background: #f8fafc;
    font-size: 8.1pt;
    line-height: 1.33;
    color: #334155;
  }
  .formula { margin: .6mm 0; text-align: center; }
  .formula .katex-display { margin: .35em 0; }
  .formula .katex { font-size: 1.02em; }
  .q-text .katex, .stim .katex, .opt .katex { font-size: 1.04em; }
  .ask { margin-top: .5mm; font-size: 8.55pt; font-weight: 600; color: #0f172a; }
  .options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: .8mm 2.4mm;
    margin-top: .8mm;
  }
  .opt { display: flex; align-items: baseline; gap: 1.2mm; font-size: 8.35pt; line-height: 1.28; }
  .opt b { flex: none; color: #4338ca; font-size: 7.7pt; }
  .page-second .row { min-height: 29mm; }
  .page-second .rows { gap: 2mm; }
  .page-second .q-text { font-size: 8.15pt; }
  .page-second .stim { font-size: 7.75pt; }
  .page-second .opt { font-size: 8pt; }
  .page-second .options { gap: .55mm 2.2mm; }
  .page-second .ask { font-size: 8.2pt; }
  .diagram { margin: .8mm 0 .9mm; text-align: center; }
  .diagram svg { display: block; margin: 0 auto; }
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
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'paket-a-data-'));
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
  const { paketAData } = await import(pathToFileURL(modulePath).href);
  fs.rmSync(tmpDir, { recursive: true, force: true });
  return paketAData;
};

const main = async () => {
  const paketA = await compileData();
  const ordered = [...paketA].sort((a, b) => a.number - b.number);
  if (ordered.length !== 10) {
    throw new Error(`Paket A harus berisi 10 soal, ditemukan ${ordered.length}.`);
  }
  if (ordered.some((item) => item.type !== 'choice' || !item.options || item.options.length !== 5)) {
    throw new Error('Semua soal Paket A harus bertipe pilihan ganda dengan tepat 5 opsi.');
  }

  const pages = [ordered.slice(0, SPLIT_AT), ordered.slice(SPLIT_AT)];

  const pageHtml = (items, pageIndex) => `
    <div class="page ${pageIndex === 0 ? 'page-first' : 'page-second'}">
      ${
        pageIndex === 0
          ? `<div class="masthead">
              <div class="kicker">Latihan Ulangan Harian • Matematika SMA Kelas X</div>
              <h1>PAKET A — PERSAMAAN KUADRAT</h1>
              <div class="sub">10 soal • 2 halaman • Pilih satu jawaban yang paling tepat</div>
              <div class="identity">
                <div class="id-field"><span>Nama Siswa</span><span class="fill"></span></div>
                <div class="id-field"><span>Kelas</span><span class="fill short"></span></div>
              </div>
            </div>`
          : `<div class="slim-head"><span>Paket A — Persamaan Kuadrat</span><span>Halaman 2 dari 2</span></div>`
      }
      <div class="rows">${items.map(buildRow).join('')}</div>
      <div class="footer">
        <span>Paket A • Persamaan Kuadrat</span>
        <span>Halaman ${pageIndex + 1} dari 2</span>
      </div>
    </div>`;

  const html = `<!doctype html>
  <html lang="id">
    <head>
      <meta charset="utf-8" />
      <title>Paket A — Soal Persamaan Kuadrat</title>
      <style>${katexCss()}</style>
      <style>${css}</style>
    </head>
    <body>${pages.map(pageHtml).join('')}</body>
  </html>`;

  const htmlPath = path.join(PREVIEW_DIR, 'paket-a.html');
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
    return pages.map((pageEl) => {
      const rows = [...pageEl.querySelectorAll('.row')];
      const footer = pageEl.querySelector('.footer')?.getBoundingClientRect();
      const lastRow = rows.at(-1)?.getBoundingClientRect();
      return {
        rows: rows.length,
        pageHeight: pageEl.clientHeight,
        scrollHeight: pageEl.scrollHeight,
        lastRowBottom: lastRow ? Math.round(lastRow.bottom) : null,
        footerTop: footer ? Math.round(footer.top) : null,
        rowOverflow: lastRow && footer ? Math.round(lastRow.bottom - footer.top) : null,
      };
    });
  });

  const katexErrors = (html.match(/katex-error/g) || []).length;
  console.log('Metrics:', JSON.stringify(metrics, null, 2));
  console.log('KaTeX errors in HTML:', katexErrors);

  await page.pdf({
    path: OUTPUT,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  await browser.close();

  fs.mkdirSync(PREVIEW_DIR, { recursive: true });
  execFileSync('pdfinfo', [OUTPUT], { stdio: 'inherit' });
  execFileSync('pdftoppm', ['-png', '-r', '120', OUTPUT, path.join(PREVIEW_DIR, 'page')], {
    stdio: 'inherit',
  });
  console.log(`PDF written: ${OUTPUT}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
