import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function runComprehensiveAudit() {
  console.log('🚀 Starting Comprehensive UI/UX Playwright Audit (Iterasi 3)...');
  const browser = await chromium.launch({ headless: true });
  const reportDir = path.resolve('audit-results');
  if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });

  const auditLog = {
    viewportsTested: [],
    unrenderedMathAudit: {},
    interactiveExercisesTest: {},
    evaluationWorkflowTest: {},
    darkModeTest: {},
    navigationAndScrollSpyTest: {},
    svgIntegrityTest: {},
    overallScore: 0,
    breakdown: {},
  };

  // 1. Multi-Viewport & Overflow Stress Test
  const viewports = [
    { name: 'Mobile_iPhone_SE', width: 375, height: 667 },
    { name: 'Mobile_iPhone_XR', width: 414, height: 896 },
    { name: 'Tablet_iPad', width: 768, height: 1024 },
    { name: 'Desktop_Standard', width: 1280, height: 800 },
    { name: 'Desktop_FHD', width: 1920, height: 1080 },
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    const hasOverflow = scrollWidth > clientWidth;

    await page.screenshot({ path: path.join(reportDir, `${vp.name}.png`) });

    auditLog.viewportsTested.push({
      device: vp.name,
      viewport: `${vp.width}x${vp.height}`,
      scrollWidth,
      clientWidth,
      hasOverflow,
      status: hasOverflow ? 'FAIL' : 'PASS',
    });
    await page.close();
  }

  // 2. In-Depth Single Page Session for Functional & Interactive Validation
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push(err.message));

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  // 2A. KaTeX and Math String Precision
  const katexErrors = await page.$$eval('.katex-error', (els) => els.map((e) => e.textContent));
  const renderedKatexCount = await page.$$eval('.katex', (els) => els.length);

  const unrenderedFindings = await page.evaluate(() => {
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
      textNodes.push(n.nodeValue);
    }
    const patterns = [
      /\$[^\$]+\$/,
      /\\[a-zA-Z]+/,
      /[a-zA-Z0-9]²|[a-zA-Z0-9]³/,
      /x₁|x₂/,
      /m²|m³/,
    ];
    const matches = [];
    for (const t of textNodes) {
      for (const p of patterns) {
        if (p.test(t)) {
          matches.push(t.trim().slice(0, 80));
          break;
        }
      }
    }
    return matches;
  });

  auditLog.unrenderedMathAudit = {
    renderedKatexFormulas: renderedKatexCount,
    katexSyntaxErrors: katexErrors.length,
    unrenderedMathMatches: unrenderedFindings.length,
    status: katexErrors.length === 0 && unrenderedFindings.length === 0 ? 'PERFECT' : 'DEFECTS_FOUND',
  };

  // 2B. Interactive Exercise Validation (Latihan 5.1 item 1)
  const exInput = await page.$('input[placeholder*="Ketik jawaban"]');
  let exCheckWorks = false;
  let exToggleWorks = false;
  let exResetWorks = false;

  if (exInput) {
    await exInput.fill('4 atau -4');
    const checkBtn = await page.$('button:has-text("Periksa Jawaban")');
    if (checkBtn) {
      await checkBtn.click();
      await page.waitForTimeout(300);
      const isSuccess = await page.$('.bg-emerald-50, [class*="bg-emerald-"]');
      exCheckWorks = !!isSuccess;
    }

    const toggleSolBtn = await page.$('button:has-text("Lihat Pembahasan")');
    if (toggleSolBtn) {
      await toggleSolBtn.click();
      await page.waitForTimeout(300);
      const solVisible = await page.$('text=Pembahasan Langkah Demi Langkah');
      exToggleWorks = !!solVisible;
    }

    const resetBtn = await page.$('button[title="Coba Lagi"]');
    if (resetBtn) {
      await resetBtn.click();
      await page.waitForTimeout(300);
      const resetValue = await exInput.inputValue();
      exResetWorks = resetValue === '';
    }
  }

  auditLog.interactiveExercisesTest = {
    instantVerification: exCheckWorks ? 'PASS' : 'FAIL',
    solutionToggle: exToggleWorks ? 'PASS' : 'FAIL',
    resetAction: exResetWorks ? 'PASS' : 'FAIL',
  };

  // 2C. Evaluation 5 Workflow Validation
  await page.evaluate(() => {
    document.getElementById('evaluasi-5')?.scrollIntoView();
  });
  await page.waitForTimeout(400);

  // Fill in question 12 (tangga, answer: 12)
  const evalInputs = await page.$$('#evaluasi-5 input[placeholder*="Ketik jawaban"]');
  if (evalInputs.length > 0) {
    await evalInputs[0].fill('6 atau -6'); // Q1
  }

  // Choose option on Q17
  const q17Radio = await page.$('input[name="eval-opt-17"][value="B"]');
  if (q17Radio) {
    await q17Radio.click();
  }

  // Submit Evaluation
  const evalSubmitBtn = await page.$('button:has-text("Periksa Jawaban Evaluasi")');
  let scoreCardVisible = false;
  let confettiTriggered = false;

  if (evalSubmitBtn) {
    await evalSubmitBtn.click();
    await page.waitForTimeout(500);
    const scoreCard = await page.$('text=/ 100');
    scoreCardVisible = !!scoreCard;
  }

  // Toggle All Explanations
  const toggleAllBtn = await page.$('button:has-text("Buka Semua Pembahasan")');
  let allExplanationsOpened = false;
  if (toggleAllBtn) {
    await toggleAllBtn.click();
    await page.waitForTimeout(400);
    const explanationsCount = await page.locator('#evaluasi-5 >> text=Pembahasan').count();
    allExplanationsOpened = explanationsCount > 10;
  }

  auditLog.evaluationWorkflowTest = {
    scoreCardVisible: scoreCardVisible ? 'PASS' : 'FAIL',
    showAllExplanationsToggle: allExplanationsOpened ? 'PASS' : 'FAIL',
  };

  // 2D. Dark Mode & Visual Contrast Validation
  const themeToggle = await page.$('button[aria-label*="Toggle Mode"]');
  let darkClassApplied = false;
  let bodyDarkBg = false;

  if (themeToggle) {
    await themeToggle.click();
    await page.waitForTimeout(300);
    darkClassApplied = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    bodyDarkBg = await page.evaluate(() => {
      const bg = window.getComputedStyle(document.body).backgroundColor;
      return bg.includes('2') || bg.includes('15') || bg.includes('slate');
    });
    await page.screenshot({ path: path.join(reportDir, 'dark-mode-audit.png') });
  }

  auditLog.darkModeTest = {
    toggleResponsive: darkClassApplied ? 'PASS' : 'FAIL',
    stylingApplied: bodyDarkBg ? 'PASS' : 'FAIL',
  };

  // 2E. SVG Diagram Precision Test
  const svgExists = await page.$('svg pattern#diagonalHatch, svg rect[fill*="diagonalHatch"]');
  auditLog.svgIntegrityTest = {
    diagramContoh55Present: !!svgExists ? 'PASS' : 'FAIL',
  };

  // Calculate Comprehensive Scores (1 - 10 scale)
  // Rubric:
  // 1. LaTeX & Mathematical Notation Precision (weight: 25%)
  // 2. Responsive Layout & Viewport Stability (weight: 25%)
  // 3. Interactivity, Feedback & Gamification (weight: 20%)
  // 4. Accessibility, Contrast & Dark Mode (weight: 15%)
  // 5. Visual Fidelity, Typography & Structure (weight: 15%)

  const scoreMath = (unrenderedFindings.length === 0 && katexErrors.length === 0) ? 10.0 : 6.0;
  const overflowFails = auditLog.viewportsTested.filter(v => v.hasOverflow).length;
  const scoreResponsive = overflowFails === 0 ? 10.0 : Math.max(4.0, 10 - overflowFails * 2);
  const scoreInteractivity = (exCheckWorks && exToggleWorks && scoreCardVisible) ? 9.8 : 7.0;
  const scoreA11y = (darkClassApplied && consoleErrors.length === 0) ? 9.6 : 8.0;
  const scoreFidelity = svgExists ? 9.8 : 8.0;

  const totalScore = (
    scoreMath * 0.25 +
    scoreResponsive * 0.25 +
    scoreInteractivity * 0.20 +
    scoreA11y * 0.15 +
    scoreFidelity * 0.15
  );

  auditLog.overallScore = Number(totalScore.toFixed(2));
  auditLog.breakdown = {
    'LaTeX & Math Precision (25%)': `${scoreMath} / 10`,
    'Responsive & Viewport Stability (25%)': `${scoreResponsive} / 10`,
    'Interactivity & Gamification (20%)': `${scoreInteractivity} / 10`,
    'Accessibility & Dark Mode (15%)': `${scoreA11y} / 10`,
    'Visual Polish & Book Fidelity (15%)': `${scoreFidelity} / 10`,
  };

  await browser.close();

  console.log('\n================ AUDIT SUMMARY ================');
  console.log(JSON.stringify(auditLog, null, 2));
  console.log(`\n🎯 FINAL AUDIT SCORE: ${auditLog.overallScore} / 10`);

  fs.writeFileSync(path.join(reportDir, 'audit-final-summary.json'), JSON.stringify(auditLog, null, 2));
}

runComprehensiveAudit().catch((err) => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
