#!/usr/bin/env node
/**
 * Generator PDF soal Paket A (2 halaman A4).
 *
 * - Mengambil data langsung dari src/data/uhExerciseData.ts (paketAData).
 * - Matematika dirender dengan KaTeX (font di-embed sebagai data URI).
 * - Layout: setiap halaman dibagi 50% soal (kiri) dan 50% ruang pengerjaan (kanan).
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
const TMP_IMAGES = path.join(ROOT, 'audit-results', 'paket-a-pdf');
const SPLIT_AT = 6; // halaman 1: soal 1-6, halaman 2: soal 7-10

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

/** Render teks yang memuat $...$ (inline) dan $$...$$ (blok). */
const richText = (text) => {
  const segments = [];
  const pattern = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push(escapeHtml(text.slice(lastIndex, match.index)));
    }
    if (match[1] !== undefined) {
      segments.push(renderMath(match[1], true));
    } else if (match[2] !== undefined) {
      segments.push(renderMath(match[2], false));
    }
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
    formula: 'x^2 + (x + 7)^2 = 17^2 \\\\ t = x + 7',
    ask: 'Tentukan tinggi $t$ (dalam meter).',
    diagram: true,
  },
};

const ladderSvg = (item) => {
  const { panjangTangga, tinggiLabel, jarakLabel } = item.diagramConfig;
  const rungs = Array.from({ length: 7 }, (_, index) => {
    const t = (index + 1) / 8;
    const x = 62 + t * 143;
    const y = 15 + t * 110;
    return `<line x1="${(x - 4).toFixed(1)}" y1="${(y + 3).toFixed(1)}" x2="${(x + 4).toFixed(1)}" y2="${(y - 3).toFixed(1)}" stroke="#f59e0b" stroke-width="2.4" stroke-linecap="round"/>`;
  }).join('');

  return `<div class="diagram">
    <svg viewBox="0 0 240 140" width="64mm" height="37mm" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Skema tangga pada dinding">
      <line x1="62" y1="15" x2="62" y2="125" stroke="#334155" stroke-width="2.4"/>
      <line x1="62" y1="125" x2="230" y2="125" stroke="#334155" stroke-width="2.4"/>
      <line x1="62" y1="15" x2="205" y2="125" stroke="#d97706" stroke-width="4" stroke-linecap="round"/>
      ${rungs}
      <path d="M62 113 L74 113 L74 125" fill="none" stroke="#64748b" stroke-width="1.4"/>
      <text x="30" y="70" transform="rotate(-90 30 70)" text-anchor="middle" font-family="Arial, sans-serif" font-size="8.5" fill="#334155">${escapeHtml(tinggiLabel)}</text>
      <text x="132" y="137" text-anchor="middle" font-family="Arial, sans-serif" font-size="8.5" fill="#334155">${escapeHtml(jarakLabel)}</text>
      <rect x="139" y="47" width="46" height="14" rx="3" fill="#fffbeb" stroke="#f59e0b" stroke-width="1"/>
      <text x="162" y="57" text-anchor="middle" font-family="Arial, sans-serif" font-size="8.5" fill="#92400e">${escapeHtml(panjangTangga)}</text>
    </svg>
    <div class="diag-cap">Skema tidak berskala</div>
  </div>`;
};

const buildQuestion = (item) => {
  const custom = PDF_CUSTOM[item.number] || {};
  const tag = custom.tag || tagFor(item);
  const stem = custom.stim ? '' : item.question;
  const stim = custom.stim ? `<div class="stim">${richText(custom.stim)}</div>` : '';
  const formulaTex = custom.formula || item.mathPrompt;
  const formula = formulaTex
    ? `<div class="formula">${renderMath(formulaTex, true)}</div>`
    : '';
  const ask = custom.ask ? `<div class="ask">${richText(custom.ask)}</div>` : '';
  const diagram = custom.diagram ? ladderSvg(item) : '';
  const options =
    item.type === 'choice' && item.options
      ? `<div class="options">${item.options
          .map(
            (option) =>
              `<div class="opt"><b>${escapeHtml(option.key)}.</b>${renderMath(option.math || option.text, false)}</div>`
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
  h1 {
    margin: 1.2mm 0 0;
    font-size: 15pt;
    letter-spacing: -.01em;
    color: #0f172a;
    line-height: 1.1;
  }
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
  .split {
    flex: 1;
    min-height: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 3mm;
    border-top: .25mm solid #cbd5e1;
  }
  .left { padding: 3.4mm 5mm 0 0; min-width: 0; display: flex; flex-direction: column; }
  .right {
    position: relative;
    padding: 3.4mm 0 0 5mm;
    border-left: .25mm solid #cbd5e1;
  }
  .work-label {
    font-size: 6.6pt;
    font-weight: 700;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: #6366f1;
  }
  .work-hint { margin-top: .6mm; font-size: 6.3pt; color: #94a3b8; }
  .work-grid {
    position: absolute;
    top: 12.5mm;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent 7.9mm,
      #e2e8f0 8mm
    );
  }
  .q { break-inside: avoid; margin-bottom: 3.4mm; }
  .notes { margin-top: auto; padding-top: 2mm; border-top: .25mm solid #e2e8f0; font-size: 7.4pt; line-height: 1.4; color: #475569; }
  .q:last-child { margin-bottom: 0; }
  .q-head { display: flex; align-items: center; gap: 2mm; margin-bottom: 1mm; }
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
    font-size: 8.2pt;
    font-weight: 700;
  }
  .tag {
    font-size: 6.3pt;
    font-weight: 700;
    letter-spacing: .07em;
    text-transform: uppercase;
    color: #6366f1;
  }
  .q-text { font-size: 9.1pt; line-height: 1.34; color: #0f172a; }
  .page-first .q-text { font-size: 9.9pt; }
  .page-first .q { margin-bottom: 4.8mm; }
  .page-first .formula .katex { font-size: 1.1em; }
  .page-first .options { gap: 1.6mm 3mm; }
  .page-first .opt { font-size: 9.6pt; }
  .page-first .ask { font-size: 9.6pt; }
  .stim {
    margin: .6mm 0 1mm;
    padding: 1.8mm 2.4mm;
    border-left: .8mm solid #6366f1;
    background: #f8fafc;
    font-size: 8.3pt;
    line-height: 1.36;
    color: #334155;
  }
  .formula { margin: .9mm 0; text-align: center; }
  .formula .katex-display { margin: .5em 0; }
  .formula .katex { font-size: 1.04em; }
  .q-text .katex, .stim .katex, .opt .katex { font-size: 1.08em; }
  .ask { margin-top: .6mm; font-size: 9pt; font-weight: 600; color: #0f172a; }
  .options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1mm 3mm;
    margin-top: 1mm;
  }
  .opt { display: flex; align-items: baseline; gap: 1.4mm; font-size: 9pt; line-height: 1.3; }
  .opt b { flex: none; color: #4338ca; font-size: 8pt; }
  .diagram { margin: 1mm 0 1.2mm; text-align: center; }
  .diagram svg { display: block; margin: 0 auto; }
  .diag-cap { margin-top: .4mm; font-size: 6.1pt; font-style: italic; color: #94a3b8; }
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
  .katex-display { margin: .5em 0; }
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

  const pages = [ordered.slice(0, SPLIT_AT), ordered.slice(SPLIT_AT)];

  const pageHtml = (items, pageIndex) => `
    <div class="page ${pageIndex === 0 ? 'page-first' : 'page-second'}">
      ${
        pageIndex === 0
          ? `<div class="masthead">
              <div class="kicker">Latihan Ulangan Harian • Matematika SMA Kelas X</div>
              <h1>PAKET A — PERSAMAAN KUADRAT</h1>
              <div class="sub">10 soal • 2 halaman • Kerjakan pada kolom ruang pengerjaan di sebelah kanan</div>
              <div class="identity">
                <div class="id-field"><span>Nama Siswa</span><span class="fill"></span></div>
                <div class="id-field"><span>Kelas</span><span class="fill short"></span></div>
              </div>
            </div>`
          : `<div class="slim-head"><span>Paket A — Persamaan Kuadrat</span><span>Halaman 2 dari 2</span></div>`
      }
      <div class="split">
        <div class="left">${items.map(buildQuestion).join('')}${pageIndex === 0 ? `<div class="notes"><b>Petunjuk:</b> Kerjakan pada kolom ruang pengerjaan di sebelah kanan. Tulis nomor soal, langkah pengerjaan, dan jawaban akhir dengan jelas.</div>` : ''}</div>
        <div class="right">
          <div class="work-label">Ruang Pengerjaan</div>
          <div class="work-hint">Tulis nomor soal, langkah pengerjaan, dan jawaban akhir.</div>
          <div class="work-grid"></div>
        </div>
      </div>
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
    <body>
      ${pages.map(pageHtml).join('')}
    </body>
  </html>`;

  const htmlPath = path.join(ROOT, 'audit-results', 'paket-a-pdf', 'paket-a.html');
  fs.mkdirSync(path.dirname(htmlPath), { recursive: true });
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
      const split = pageEl.querySelector('.split');
      const left = pageEl.querySelector('.left');
      return {
        pageHeight: pageEl.clientHeight,
        scrollHeight: pageEl.scrollHeight,
        splitHeight: split?.clientHeight,
        leftHeight: left?.scrollHeight,
        overflow: left && split ? left.scrollHeight - split.clientHeight : null,
        contentOverflow:
          left && split && left.querySelector('.q:last-child')
            ? Math.round(
                left.querySelector('.q:last-child').getBoundingClientRect().bottom -
                  split.getBoundingClientRect().bottom
              )
            : null,
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

  fs.mkdirSync(TMP_IMAGES, { recursive: true });
  execFileSync('pdfinfo', [OUTPUT], { stdio: 'inherit' });
  execFileSync('pdftoppm', ['-png', '-r', '120', OUTPUT, path.join(TMP_IMAGES, 'page')], {
    stdio: 'inherit',
  });
  console.log(`PDF written: ${OUTPUT}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
