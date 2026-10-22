import { chromium } from 'playwright';
import { spawn } from 'child_process';
import katex from 'katex';
import fs from 'fs';
import path from 'path';

// 1. Direct Static Codebase KaTeX Syntax Verification
console.log('🔍 [Step 1] Scanning static data files for formula strings...');

// Let's import data files by importing them or parsing them
async function testStaticFormulas() {
  const findings = [];
  
  // Helper to test a formula
  function testFormula(source, id, str) {
    if (!str || typeof str !== 'string') return;
    try {
      const sanitized = str.replace(/\\+([a-zA-Z]+)/g, (_, cmd) => '\\' + cmd);
      katex.renderToString(sanitized, { displayMode: true, throwOnError: true });
    } catch (err) {
      findings.push({ source, id, formula: str, error: err.message });
    }
  }

  // Import exercisesData and uhExerciseData
  try {
    const { uhQuestionsData } = await import('../src/data/uhExerciseData.ts');
    for (const q of uhQuestionsData) {
      if (q.formula) testFormula('uhExerciseData', `UH-${q.id}-formula`, q.formula);
      if (q.explanationFormula) testFormula('uhExerciseData', `UH-${q.id}-expFormula`, q.explanationFormula);
      if (q.options) {
        for (const opt of q.options) {
          if (opt.startsWith('$') || opt.includes('\\') || opt.includes('^')) {
            testFormula('uhExerciseData', `UH-${q.id}-opt-${opt}`, opt);
          }
        }
      }
    }
    console.log(`   Checked ${uhQuestionsData.length} questions in UH data.`);
  } catch (e) {
    console.log('   Note on importing uhExerciseData:', e.message);
  }

  return findings;
}

// 2. Playwright Live DOM KaTeX & Visual Render Verification
async function testLiveDOMKaTeX() {
  console.log('🚀 [Step 2] Starting Vite preview server on port 4180...');
  const preview = spawn('npx', ['vite', 'preview', '--port', '4180'], {
    stdio: 'pipe',
  });

  await new Promise((r) => setTimeout(r, 2500));

  console.log('🌐 Launching Chromium for KaTeX Deep Inspection...');
  const browser = await chromium.launch({ headless: true });
  const outDir = path.resolve('audit-results/katex');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const report = {
    tabsScanned: {},
    totalKatexElements: 0,
    totalKatexErrors: 0,
    katexErrorDetails: [],
    unrenderedPatternsFound: [],
    mobileFormulaOverflowCases: [],
    screenshots: [],
  };

  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();
    await page.goto('http://localhost:4180/', { waitUntil: 'networkidle' });

    // Helper to scan DOM for KaTeX errors and unrendered LaTeX
    async function scanCurrentTab(tabName) {
      // 1. Expand all "Buka Pembahasan" / "Buka Rincian" buttons if available to expose all hidden formulas
      const toggleButtons = await page.$$('button:has-text("Pembahasan"), button:has-text("Buka Rincian"), button:has-text("Buka Kunci")');
      for (const btn of toggleButtons) {
        try {
          await btn.click({ timeout: 500 });
        } catch (_) {}
      }
      await page.waitForTimeout(400);

      const katexCount = await page.$$eval('.katex', els => els.length);
      const errors = await page.$$eval('.katex-error', els => els.map(e => ({
        text: e.textContent,
        title: e.getAttribute('title') || '',
        parent: e.parentElement?.textContent?.slice(0, 80)
      })));

      // Search text nodes for unrendered patterns
      const unrendered = await page.evaluate(() => {
        const textNodes = [];
        const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
        let n;
        while ((n = walk.nextNode())) {
          if (
            n.parentElement.closest('.katex') ||
            n.parentElement.tagName === 'SCRIPT' ||
            n.parentElement.tagName === 'STYLE'
          ) {
            continue;
          }
          textNodes.push({ text: n.nodeValue, parent: n.parentElement.tagName, className: n.parentElement.className });
        }

        const patterns = [
          /\$[^\$]{2,}\$/, // $math$
          /\\frac\{/,
          /\\sqrt\{/,
          /\\pm/,
          /\\cdot/,
          /\\alpha/,
          /\\beta/,
          /\\times/,
        ];

        const matches = [];
        for (const item of textNodes) {
          for (const p of patterns) {
            if (p.test(item.text)) {
              matches.push({
                snippet: item.text.trim().slice(0, 100),
                parent: item.parent,
                class: item.className
              });
              break;
            }
          }
        }
        return matches;
      });

      return {
        tabName,
        katexCount,
        errorsCount: errors.length,
        errors,
        unrenderedCount: unrendered.length,
        unrendered,
      };
    }

    // A. Tab 1: Materi Supermath
    console.log('   Scanning Tab 1: Materi Supermath...');
    const materiScan = await scanCurrentTab('materi');
    report.tabsScanned.materi = materiScan;
    report.totalKatexElements += materiScan.katexCount;
    report.totalKatexErrors += materiScan.errorsCount;
    if (materiScan.errorsCount > 0) report.katexErrorDetails.push(...materiScan.errors);
    if (materiScan.unrenderedCount > 0) report.unrenderedPatternsFound.push(...materiScan.unrendered);

    // Capture screenshot of a complex formula section in Materi
    const formulaSection = await page.$('#sub-5-1');
    if (formulaSection) {
      await formulaSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      await page.screenshot({ path: path.join(outDir, 'formula_sub51_desktop.png') });
      report.screenshots.push('formula_sub51_desktop.png');
    }

    // B. Tab 2: Roadmap
    console.log('   Scanning Tab 2: Roadmap...');
    await page.click('button:has-text("Alur 8 Pertemuan")');
    await page.waitForTimeout(400);
    const roadmapScan = await scanCurrentTab('roadmap');
    report.tabsScanned.roadmap = roadmapScan;
    report.totalKatexElements += roadmapScan.katexCount;
    report.totalKatexErrors += roadmapScan.errorsCount;

    // C. Tab 3: Paket A & B
    console.log('   Scanning Tab 3: Paket A & B...');
    await page.click('button:has-text("Paket A & B")');
    await page.waitForTimeout(400);
    const paketAScan = await scanCurrentTab('paket_a');
    report.tabsScanned.paket_a = paketAScan;
    report.totalKatexElements += paketAScan.katexCount;
    report.totalKatexErrors += paketAScan.errorsCount;

    // Switch to Paket B
    await page.click('button:has-text("Paket B")');
    await page.waitForTimeout(400);
    const paketBScan = await scanCurrentTab('paket_b');
    report.tabsScanned.paket_b = paketBScan;
    report.totalKatexElements += paketBScan.katexCount;
    report.totalKatexErrors += paketBScan.errorsCount;

    // D. Tab 4: Ulangan Harian
    console.log('   Scanning Tab 4: Ulangan Harian...');
    await page.click('button:has-text("Ulangan Harian")');
    await page.waitForTimeout(400);
    const uhScan = await scanCurrentTab('ulangan_harian');
    report.tabsScanned.ulangan_harian = uhScan;
    report.totalKatexElements += uhScan.katexCount;
    report.totalKatexErrors += uhScan.errorsCount;

    // Open first explanation in UH and take screenshot
    const expBtn = await page.$('button:has-text("Buka Pembahasan")');
    if (expBtn) {
      await expBtn.click();
      await page.waitForTimeout(300);
      const qCard = await page.$('.p-6.rounded-2xl.border');
      if (qCard) {
        await qCard.screenshot({ path: path.join(outDir, 'uh_q1_pembahasan_desktop.png') });
        report.screenshots.push('uh_q1_pembahasan_desktop.png');
      }
    }

    await context.close();

    // 3. Mobile Viewport Check (375px) for Math Overflow / KaTeX Cutoff
    console.log('📱 Checking KaTeX rendering & horizontal overflow on Mobile (375px)...');
    const mobileContext = await browser.newContext({ viewport: { width: 375, height: 667 } });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://localhost:4180/', { waitUntil: 'networkidle' });

    // Check all .katex elements to see if any element's scrollWidth > container clientWidth without overflow-x-auto
    const mathOverflowAudit = await mobilePage.evaluate(() => {
      const katexEls = Array.from(document.querySelectorAll('.katex-display, [class*="overflow-x-auto"]'));
      const details = [];
      for (const el of katexEls) {
        const rect = el.getBoundingClientRect();
        const hasHorizontalScroll = el.scrollWidth > el.clientWidth;
        const parentOverflow = window.getComputedStyle(el).overflowX;
        details.push({
          parentOverflow,
          width: Math.round(rect.width),
          scrollWidth: el.scrollWidth,
          clientWidth: el.clientWidth,
          hasScroll: hasHorizontalScroll,
          mathSnippet: el.textContent.slice(0, 40)
        });
      }
      return details;
    });

    report.mobileFormulaOverflowCases = mathOverflowAudit.filter(m => m.hasScroll && m.parentOverflow !== 'auto' && m.parentOverflow !== 'scroll');

    // Take mobile screenshot of formula
    await mobilePage.screenshot({ path: path.join(outDir, 'formula_mobile_375px.png') });
    report.screenshots.push('formula_mobile_375px.png');

    await mobileContext.close();

  } catch (err) {
    console.error('❌ Error during KaTeX audit:', err);
  } finally {
    await browser.close();
    preview.kill();
  }

  fs.writeFileSync(path.join(outDir, 'katex_audit_report.json'), JSON.stringify(report, null, 2));
  console.log(`Saved KaTeX audit report to ${path.join(outDir, 'katex_audit_report.json')}`);
  return report;
}

async function run() {
  await testStaticFormulas();
  await testLiveDOMKaTeX();
}

run();
