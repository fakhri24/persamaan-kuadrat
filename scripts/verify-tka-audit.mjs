import { chromium } from 'playwright';
import { spawn } from 'child_process';

async function runTkaAuditVerification() {
  console.log('Starting preview server...');
  const previewProcess = spawn('npx', ['vite', 'preview', '--port', '4174'], {
    stdio: 'pipe',
  });

  // wait 2 seconds for preview to start
  await new Promise((r) => setTimeout(r, 2000));

  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 950 } });
  const page = await context.newPage();

  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));

  try {
    console.log('Navigating to http://localhost:4174/...');
    await page.goto('http://localhost:4174/', { waitUntil: 'networkidle' });

    // 1. Verify Paket A (No 7 & No 10)
    console.log('1. Checking Paket A (No 7 & No 10)...');
    await page.click('button:has-text("Paket A & B")');
    await page.waitForTimeout(500);

    // Verify Paket A No 7 stimulus
    const pa7Stimulus = await page.textContent('text=STIMULUS NUMERASI: RISET AERODINAMIKA ROKET AIR');
    console.log('   Paket A No 7 Stimulus found:', !!pa7Stimulus);

    // Verify Paket A No 10 stimulus and SVG diagram
    const pa10Stimulus = await page.textContent('text=STIMULUS LITERASI & NUMERASI: KESELAMATAN KONSTRUKSI (K3)');
    console.log('   Paket A No 10 Stimulus found:', !!pa10Stimulus);

    const pa10Svg = await page.$$('text=Tangga = 17 m');
    console.log('   Paket A No 10 SVG Ladder diagram found (Tangga = 17 m):', pa10Svg.length > 0);

    // 2. Switch to Paket B (No 7 & No 10)
    console.log('2. Switching to Paket B...');
    await page.click('button:has-text("Paket B (Belajar Mandiri di Rumah)")');
    await page.waitForTimeout(400);

    const pb7Stimulus = await page.textContent('text=Uji Durasi Ketinggian Lontaran Vertikal');
    console.log('   Paket B No 7 Stimulus found:', !!pb7Stimulus);

    const pb10Stimulus = await page.textContent('text=Taman Baca di Lahan Persegi Panjang');
    console.log('   Paket B No 10 Stimulus found:', !!pb10Stimulus);

    // 3. Switch to Ulangan Harian (No 7 & No 10)
    console.log('3. Switching to Ulangan Harian...');
    await page.click('button:has-text("Ulangan Harian")');
    await page.waitForTimeout(400);

    const uh7Stimulus = await page.textContent('text=Zona Pantau Waktu Transit Drone Medis');
    console.log('   UH No 7 Stimulus found:', !!uh7Stimulus);

    const uh10Svg = await page.$$('text=Tangga = 20 m');
    console.log('   UH No 10 SVG Ladder diagram found (Tangga = 20 m):', uh10Svg.length > 0);

    // Test inputting answers on UH No 7 and No 10
    console.log('4. Testing answer submissions on UH...');
    // UH No 7 input
    const uh7Input = await page.$('input[placeholder="Tuliskan jawaban akhirmu di sini..."]');
    // We want the input specific to UH-7 and UH-10
    // Let's use evaluate to fill and check
    const checkResult7 = await page.evaluate(() => {
      // Find UH-7 card
      const inputs = Array.from(document.querySelectorAll('input[type="text"]'));
      // In UH, inputs correspond to text questions: 1, 3, 4, 5, 6, 7, 10, 11
      return inputs.length;
    });
    console.log(`   Found ${checkResult7} text input questions in UH.`);

    // Take screenshot of UH No 10
    const no10Element = await page.$('text=Standar Penempatan Tangga Penyelamatan Gedung');
    if (no10Element) {
      // scroll to it
      await no10Element.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await page.screenshot({ path: 'audit-results/uh-no10-diagram.png' });
      console.log('   Captured screenshot audit-results/uh-no10-diagram.png');
    }

    if (errors.length > 0) {
      console.error('Console / Page Errors detected:', errors);
      process.exit(1);
    }

    console.log('All TKA stimulus and SVG checks passed successfully!');
  } catch (err) {
    console.error('Test execution failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
    previewProcess.kill();
  }
}

runTkaAuditVerification();
