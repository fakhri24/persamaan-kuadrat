#!/usr/bin/env node
/**
 * Generator PDF soal Paket B (2 halaman A4).
 *
 * - Mengambil data langsung dari src/data/uhExerciseData.ts (paketBData).
 * - Matematika dirender dengan KaTeX (font di-embed sebagai data URI).
 * - Setiap baris: satu kotak soal (kiri) + satu kotak ruang pengerjaan (kanan),
 *   tinggi mengikuti isi soal dan garis bawahnya sejajar.
 * - Identitas hanya Nama Siswa dan Kelas.
 *
 * Jalankan: npm run pdf:paket-b
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
const OUTPUT = path.join(ROOT, 'public', 'downloads', 'paket-b-soal.pdf');
const PREVIEW_DIR = path.join(ROOT, 'audit-results', 'paket-b-pdf');
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
    stim: 'Wahana uji bergerak vertikal. Waktu tempuh $t$ (detik) memenuhi persamaan berikut, dengan $k$ parameter hambatan udara. Wahana melintasi garis observasi pada dua waktu berbeda, $t_1$ dan $t_2$, dengan selisih $|t_1 - t_2| = 3$ detik.',
    formula: 't^2 - 7t + k = 0',
    ask: 'Tentukan nilai parameter hambatan $k$.',
  },
  10: {
    tag: 'Stimulus Numerasi',
    stim: 'Panitia OSIS merencanakan taman baca di lahan berbentuk persegi panjang. Panjang lahan $4$ m lebih dari lebarnya, sedangkan luas lahan $96$ m².',
    formula: null,
    ask: 'Tentukan panjang lahan taman baca tersebut (dalam meter).',
    diagram: true,
  },
};

const gardenSvg = (item) => {
  const { selisihLabel = '4 m', luasLabel = '96 m²' } = item.persegiPanjangConfig || {};
  const selisih = escapeHtml(selisihLabel);
  const luas = escapeHtml(luasLabel);

  return `<div class="diagram">
    <svg viewBox="0 0 460 250" width="80mm" height="43.5mm" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Skema lahan taman baca persegi panjang. Panjang ${selisih} lebih dari lebar. Luas ${luas}.">
      <rect x="120" y="78" width="260" height="140" rx="8" fill="#eef2ff" stroke="#4f46e5" stroke-width="2.2"/>
      <text x="250" y="132" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="2" fill="#4338ca">TAMAN BACA</text>
      <text x="250" y="166" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#0f172a">Luas ${luas}</text>

      <line x1="120" y1="54" x2="380" y2="54" stroke="#4f46e5" stroke-width="1.4"/>
      <line x1="120" y1="72" x2="120" y2="48" stroke="#94a3b8" stroke-width="1"/>
      <line x1="380" y1="72" x2="380" y2="48" stroke="#94a3b8" stroke-width="1"/>
      <path d="M120 54 L129 49.5 L129 58.5 Z" fill="#4f46e5"/>
      <path d="M380 54 L371 49.5 L371 58.5 Z" fill="#4f46e5"/>
      <rect x="208" y="35" width="84" height="22" rx="6" fill="#ffffff"/>
      <text x="250" y="51" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#4338ca">panjang</text>

      <line x1="90" y1="78" x2="90" y2="218" stroke="#4f46e5" stroke-width="1.4"/>
      <line x1="114" y1="78" x2="84" y2="78" stroke="#94a3b8" stroke-width="1"/>
      <line x1="114" y1="218" x2="84" y2="218" stroke="#94a3b8" stroke-width="1"/>
      <path d="M90 78 L85.5 87 L94.5 87 Z" fill="#4f46e5"/>
      <path d="M90 218 L85.5 209 L94.5 209 Z" fill="#4f46e5"/>
      <rect x="78" y="122" width="24" height="52" rx="6" fill="#ffffff"/>
      <text x="90" y="148" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#4338ca" transform="rotate(90 90 148)">lebar</text>

      <rect x="268" y="6" width="184" height="28" rx="8" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.3"/>
      <text x="360" y="25" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#92400e">${selisih} lebih dari lebar</text>
      <path d="M360 34 L380 54" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
      <circle cx="380" cy="54" r="2.2" fill="#f59e0b"/>
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
  const diagram = custom.diagram ? gardenSvg(item) : '';
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
    background: #fff;
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
  .diagram { margin: .8mm 0 .9mm; text-align: center; }
  .diagram svg { display: block; margin: 0 auto; }
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
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'paket-b-data-'));
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
  const { paketBData } = await import(pathToFileURL(modulePath).href);
  fs.rmSync(tmpDir, { recursive: true, force: true });
  return paketBData;
};

const main = async () => {
  const paketB = await compileData();
  const ordered = [...paketB].sort((a, b) => a.number - b.number);
  if (ordered.length !== 10) {
    throw new Error(`Paket B harus berisi 10 soal, ditemukan ${ordered.length}.`);
  }
  if (ordered.some((item) => item.type !== 'choice' || !item.options || item.options.length !== 5)) {
    throw new Error('Semua soal Paket B harus bertipe pilihan ganda dengan tepat 5 opsi.');
  }

  const pages = [ordered.slice(0, SPLIT_AT), ordered.slice(SPLIT_AT)];

  const pageHtml = (items, pageIndex) => `
    <div class="page ${pageIndex === 0 ? 'page-first' : 'page-second'}">
      ${
        pageIndex === 0
          ? `<div class="masthead">
              <div class="kicker">Latihan Mandiri • Matematika SMA Kelas X</div>
              <h1>PAKET B — PERSAMAAN KUADRAT</h1>
              <div class="sub">10 soal • 2 halaman • Pilih satu jawaban yang paling tepat</div>
              <div class="identity">
                <div class="id-field"><span>Nama Siswa</span><span class="fill"></span></div>
                <div class="id-field"><span>Kelas</span><span class="fill short"></span></div>
              </div>
            </div>`
          : `<div class="slim-head"><span>Paket B — Persamaan Kuadrat</span><span>Halaman 2 dari 2</span></div>`
      }
      <div class="rows">${items.map(buildRow).join('')}</div>
      <div class="footer">
        <span>Paket B • Persamaan Kuadrat</span>
        <span>Halaman ${pageIndex + 1} dari 2</span>
      </div>
    </div>`;

  const html = `<!doctype html>
  <html lang="id">
    <head>
      <meta charset="utf-8" />
      <title>Paket B — Soal Persamaan Kuadrat</title>
      <style>${katexCss()}</style>
      <style>${css}</style>
    </head>
    <body>${pages.map(pageHtml).join('')}</body>
  </html>`;

  const htmlPath = path.join(PREVIEW_DIR, 'paket-b.html');
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
