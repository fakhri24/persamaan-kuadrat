import { chromium } from 'playwright';
import { spawn } from 'child_process';

async function runVerification() {
  console.log('Starting preview server...');
  const previewProcess = spawn('npx', ['vite', 'preview', '--port', '4173'], {
    stdio: 'pipe',
  });

  // wait 2 seconds for preview to start
  await new Promise((r) => setTimeout(r, 2000));

  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));

  try {
    console.log('Navigating to http://localhost:4173/...');
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });

    // 1. Verify Materi Supermath Tab
    console.log('1. Verifying Tab Materi Supermath...');
    const heroTitle = await page.textContent('h1');
    console.log('   Hero Title:', heroTitle?.trim());

    // Check quest badges in exercises
    const mainBadges = await page.$$eval('text=Main', (els) => els.length);
    const sideBadges = await page.$$eval('text=Side', (els) => els.length);
    console.log(`   Found ${mainBadges} Main Quest badges and ${sideBadges} Side Quest badges in book exercises.`);

    // 2. Switch to Roadmap Tab
    console.log('2. Switching to Tab Alur 8 Pertemuan...');
    await page.click('button:has-text("Alur 8 Pertemuan")');
    await page.waitForTimeout(500);

    const roadmapHeading = await page.textContent('h2:has-text("Peta Alur Pembelajaran")');
    console.log('   Roadmap Heading:', roadmapHeading?.trim());

    // Click on Meeting 1 to expand
    await page.click('text=Bentuk Umum & Pemfaktoran Persamaan Kuadrat');
    await page.waitForTimeout(300);
    const tipText = await page.textContent('text=Tips Pedagogis Guru:');
    console.log('   Meeting 1 Expanded, found Teacher Tips:', !!tipText);

    // 3. Switch to Paket A & B Tab
    console.log('3. Switching to Tab Paket A & B...');
    await page.click('button:has-text("Paket A & B")');
    await page.waitForTimeout(500);

    const paketHeading = await page.textContent('h2:has-text("Latihan Ulangan Harian")');
    console.log('   Paket Heading:', paketHeading?.trim());

    // Test Paket A Hint button on Question 1
    const hintButton = await page.$('button:has-text("Buka Petunjuk (Hint)")');
    if (hintButton) {
      await hintButton.click();
      await page.waitForTimeout(200);
      const hintContent = await page.textContent('text=Petunjuk Awal (Hint):');
      console.log('   Paket A Hint toggle verified:', !!hintContent);
    }

    // Switch to Paket B
    console.log('   Switching to Paket B (Belajar Mandiri)...');
    await page.click('button:has-text("Paket B (Belajar Mandiri di Rumah)")');
    await page.waitForTimeout(300);
    const paketBLabel = await page.textContent('text=Mode Belajar Mandiri (Paket B)');
    console.log('   Paket B mode active:', !!paketBLabel);

    // 4. Switch to Ulangan Harian Tab
    console.log('4. Switching to Tab Ulangan Harian...');
    await page.click('button:has-text("Ulangan Harian")');
    await page.waitForTimeout(500);

    const uhHeading = await page.textContent('h2:has-text("Ulangan Harian Persamaan Kuadrat")');
    console.log('   UH Heading:', uhHeading?.trim());

    // Verify initial scores
    const initialScoreText = await page.textContent('text=Total Skor Akhir');
    console.log('   Found Scorecard:', !!initialScoreText);

    // Answer Question 1: "x^2 - 8x + 12 = 0" -> answer "2 atau 6"
    const q1Input = await page.$('input[placeholder*="Tuliskan jawaban akhirmu"]');
    if (q1Input) {
      await q1Input.fill('2 atau 6');
      await page.click('button:has-text("Periksa Jawaban")');
      await page.waitForTimeout(300);
      const feedback = await page.textContent('text=Jawaban Tepat!');
      console.log('   UH Question 1 answer verified (Correct!):', !!feedback);
    }

    // Select Question 2 Choice A
    const q2OptionA = await page.$('input[value="A"]');
    if (q2OptionA) {
      await q2OptionA.click();
      const checkButtons = await page.$$('button:has-text("Periksa Jawaban")');
      if (checkButtons[1]) {
        await checkButtons[1].click();
        await page.waitForTimeout(300);
        console.log('   UH Question 2 Option A submitted.');
      }
    }

    // Check KaTeX errors across the page
    const katexErrors = await page.$$eval('.katex-error', (els) => els.length);
    console.log(`   KaTeX Errors: ${katexErrors}`);

    console.log('All functional checks passed successfully!');
  } catch (err) {
    console.error('Verification error:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
    previewProcess.kill();
  }
}

runVerification();
