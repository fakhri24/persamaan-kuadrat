import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function runAudit() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => consoleErrors.push(err.message));

  console.log('Navigating to http://localhost:5173/...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  // Create audit screenshots directory
  const screenshotDir = path.resolve('audit-results');
  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

  await page.screenshot({ path: path.join(screenshotDir, 'desktop-full.png'), fullPage: true });

  // 1. Check KaTeX Errors in DOM
  const katexErrors = await page.$$eval('.katex-error', els => els.map(e => e.textContent));

  // 2. Scan text for unrendered LaTeX / math notation patterns
  const unrenderedMathMatches = await page.evaluate(() => {
    const textNodes = [];
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    let n;
    while ((n = walk.nextNode())) {
      // ignore script/style/katex rendered nodes
      if (n.parentElement.closest('.katex') || n.parentElement.tagName === 'SCRIPT' || n.parentElement.tagName === 'STYLE') {
        continue;
      }
      textNodes.push({ text: n.nodeValue, parent: n.parentElement.tagName, id: n.parentElement.id || n.parentElement.className });
    }

    const unrenderedPatterns = [
      /\$[^\$]+\$/, // raw dollar math
      /\\[a-zA-Z]+/, // backslash commands like \frac, \alpha, \dots
      /[a-zA-Z0-9]²|[a-zA-Z0-9]³/, // unicode superscripts in formula context
      /x₁|x₂/, // unicode subscripts
      /m²|m³/, // unit superscripts
    ];

    const findings = [];
    for (const node of textNodes) {
      for (const pat of unrenderedPatterns) {
        if (pat.test(node.text)) {
          findings.push({ match: node.text.trim().slice(0, 100), parent: node.parent });
          break;
        }
      }
    }
    return findings;
  });

  // 3. Check Exercises Completeness
  const exerciseCount = await page.$$eval('[class*="ExerciseItem"], input[placeholder*="Ketik jawaban"]', els => els.length);
  const evalCount = await page.$$eval('input[name*="eval-opt-"], [id="evaluasi-5"] input[placeholder*="Ketik jawaban"]', els => els.length);

  // 4. Test Mobile Viewport Overflow
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(500);
  const hasHorizontalScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  await page.screenshot({ path: path.join(screenshotDir, 'mobile-view.png') });

  // 5. Test Dark Mode Toggle
  const toggleBtn = await page.$('button[aria-label*="Toggle Mode"]');
  let darkModeWorks = false;
  if (toggleBtn) {
    await toggleBtn.click();
    await page.waitForTimeout(300);
    darkModeWorks = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  }

  // Close browser
  await browser.close();

  const report = {
    consoleErrors,
    katexErrorsCount: katexErrors.length,
    katexErrors,
    unrenderedMathCount: unrenderedMathMatches.length,
    unrenderedMathMatches: unrenderedMathMatches.slice(0, 15),
    interactiveInputsFound: exerciseCount,
    evaluationQuestionsFound: evalCount,
    mobileHasHorizontalScroll: hasHorizontalScroll,
    darkModeWorks,
  };

  console.log('AUDIT REPORT JSON:\n' + JSON.stringify(report, null, 2));
}

runAudit().catch(err => {
  console.error('Audit run error:', err);
  process.exit(1);
});
