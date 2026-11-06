import { chromium } from 'playwright';
import { spawn } from 'child_process';

const PORT = 4175;
const keys = {
  1: 'A',
  2: 'B',
  3: 'C',
  4: 'D',
  5: 'E',
  6: 'A',
  7: 'B',
  8: 'C',
  9: 'D',
  10: 'E',
};

async function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // server not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Server at ${url} did not become ready`);
}

async function run() {
  const preview = spawn('npx', ['vite', 'preview', '--port', String(PORT)], { stdio: 'pipe' });
  await waitForServer(`http://localhost:${PORT}/`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const consoleErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => consoleErrors.push(error.message));

  try {
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
    await page.click('button:has-text("Paket A & B")');
    await page.click('button:has-text("Paket B (Belajar Mandiri di Rumah)")');
    await page.waitForTimeout(400);

    const radioCount = await page.$$eval('input[type="radio"]', (inputs) => inputs.length);
    const cardRadioCounts = await page.$$eval('input[type="radio"]', (inputs) =>
      inputs.reduce((acc, input) => {
        const name = input.getAttribute('name') || '';
        acc[name] = (acc[name] || 0) + 1;
        return acc;
      }, {})
    );

    const cardsWithFive = Object.values(cardRadioCounts).filter((count) => count === 5).length;
    console.log(`Radio Paket B: ${radioCount}; kartu dengan 5 opsi: ${cardsWithFive}/10`);

    const b10Title = await page.textContent('text=Taman Baca di Lahan Persegi Panjang');
    const b10Ladder = await page.$$('text=Tangga = 10 m');
    console.log('B10 stimulus luas found:', Boolean(b10Title));
    console.log('B10 diagram tangga lama masih ada:', b10Ladder.length > 0);

    await page.screenshot({ path: 'audit-results/paket-b-new-top.png' });
    const b1Card = page
      .locator('input[name="opt-pb-1"]')
      .locator('xpath=ancestor::div[contains(@class,"p-5")][1]');
    await b1Card.screenshot({ path: 'audit-results/paket-b-new-b1.png' });

    for (const [number, key] of Object.entries(keys)) {
      await page.check(`input[name="opt-pb-${number}"][value="${key}"]`);
      const card = page
        .locator(`input[name="opt-pb-${number}"]`)
        .locator('xpath=ancestor::div[contains(@class,"p-5")][1]');
      await card.locator('button:has-text("Periksa Jawaban")').click();
      await page.waitForTimeout(120);
    }

    const scoreText = await page.locator('div[aria-live="polite"]').first().innerText();
    const katexErrors = await page.$$eval('.katex-error', (elements) => elements.length);
    const katexCount = await page.$$eval('.katex', (elements) => elements.length);

    console.log('Skor Paket B:', scoreText.replace(/\s+/g, ' ').trim());
    console.log('KaTeX elements:', katexCount, '| KaTeX errors:', katexErrors);
    console.log('Console errors:', consoleErrors.length);

    const correct =
      radioCount === 50 &&
      cardsWithFive === 10 &&
      Boolean(b10Title) &&
      b10Ladder.length === 0 &&
      /100\s*\/\s*100/.test(scoreText) &&
      /10\s*\/\s*10/.test(scoreText) &&
      katexErrors === 0 &&
      consoleErrors.length === 0;

    const b10Card = page
      .locator('input[name="opt-pb-10"]')
      .locator('xpath=ancestor::div[contains(@class,"p-5")][1]');
    await b10Card.scrollIntoViewIfNeeded();
    await b10Card.screenshot({ path: 'audit-results/paket-b-new-b10.png' });

    console.log(correct ? 'PAKET B VERIFICATION PASSED' : 'PAKET B VERIFICATION FAILED');
    if (!correct) process.exitCode = 1;

    const mobile = await browser.newPage({ viewport: { width: 375, height: 812 } });
    await mobile.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
    await mobile.click('button:has-text("Paket A & B")');
    await mobile.click('button:has-text("Paket B (Belajar Mandiri di Rumah)")');
    await mobile.waitForTimeout(400);
    const mobileB1 = mobile
      .locator('input[name="opt-pb-1"]')
      .locator('xpath=ancestor::div[contains(@class,"p-5")][1]');
    await mobileB1.screenshot({ path: 'audit-results/paket-b-new-b1-mobile.png' });
    const horizontalOverflow = await mobile.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    console.log('Mobile 375px horizontal overflow:', horizontalOverflow);
    if (horizontalOverflow > 1) process.exitCode = 1;
    await mobile.close();
  } finally {
    await browser.close();
    preview.kill();
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
