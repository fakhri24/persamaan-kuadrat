import { chromium } from 'playwright';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

async function main() {
  const outDir = path.resolve('audit-results/ui-ux');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log('🚀 Starting Vite preview server on port 4178...');
  const preview = spawn('npx', ['vite', 'preview', '--port', '4178'], {
    stdio: 'pipe',
  });

  // wait 2.5 seconds for preview server
  await new Promise((r) => setTimeout(r, 2500));

  console.log('🌐 Launching Chromium browser...');
  const browser = await chromium.launch({ headless: true });

  const auditReport = {
    timestamp: new Date().toISOString(),
    viewports: {},
    interactiveTests: {},
    a11yTests: {},
    uxFrictionPoints: [],
    screenshots: [],
  };

  try {
    // 1. Desktop Standard (1280x850)
    console.log('📸 Auditing Desktop Standard (1280x850)...');
    const desktopContext = await browser.newContext({
      viewport: { width: 1280, height: 850 },
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto('http://localhost:4178/', { waitUntil: 'networkidle' });

    // 1A. Tab Materi - Light Mode
    await desktopPage.screenshot({ path: path.join(outDir, '01_desktop_materi_light.png') });
    auditReport.screenshots.push('01_desktop_materi_light.png');

    // Check Hero and Top Navigation
    const headerBox = await desktopPage.$eval('header', el => {
      const rect = el.getBoundingClientRect();
      return { width: rect.width, height: rect.height, top: rect.top };
    });

    // Check Sidebar ToC visibility
    const tocSidebarVisible = await desktopPage.$eval('aside', el => {
      const style = window.getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden';
    }).catch(() => false);

    // 1B. Tab Materi - Dark Mode
    const themeBtn = await desktopPage.$('button[aria-label*="Ganti Mode"], button[aria-label*="Toggle Mode"]');
    if (themeBtn) {
      await themeBtn.click();
      await desktopPage.waitForTimeout(400);
      await desktopPage.screenshot({ path: path.join(outDir, '02_desktop_materi_dark.png') });
      auditReport.screenshots.push('02_desktop_materi_dark.png');
      // Switch back to light
      await themeBtn.click();
      await desktopPage.waitForTimeout(300);
    }

    // 1C. Tab 2: Alur 8 Pertemuan (Roadmap)
    console.log('📸 Auditing Tab: Roadmap...');
    await desktopPage.click('button:has-text("Alur 8 Pertemuan")');
    await desktopPage.waitForTimeout(400);
    await desktopPage.screenshot({ path: path.join(outDir, '03_desktop_roadmap.png') });
    auditReport.screenshots.push('03_desktop_roadmap.png');

    // 1D. Tab 3: Paket A & B
    console.log('📸 Auditing Tab: Paket A & B...');
    await desktopPage.click('button:has-text("Paket A & B")');
    await desktopPage.waitForTimeout(400);
    await desktopPage.screenshot({ path: path.join(outDir, '04_desktop_paket_a.png') });
    auditReport.screenshots.push('04_desktop_paket_a.png');

    // Toggle to Paket B
    await desktopPage.click('button:has-text("Paket B")');
    await desktopPage.waitForTimeout(300);
    await desktopPage.screenshot({ path: path.join(outDir, '05_desktop_paket_b.png') });
    auditReport.screenshots.push('05_desktop_paket_b.png');

    // 1E. Tab 4: Ulangan Harian
    console.log('📸 Auditing Tab: Ulangan Harian...');
    await desktopPage.click('button:has-text("Ulangan Harian")');
    await desktopPage.waitForTimeout(400);
    await desktopPage.screenshot({ path: path.join(outDir, '06_desktop_uh.png') });
    auditReport.screenshots.push('06_desktop_uh.png');

    // Check Ladder SVG diagram in UH
    const uhLadderSvg = await desktopPage.$('svg[viewBox="0 0 460 270"]');
    if (uhLadderSvg) {
      await uhLadderSvg.scrollIntoViewIfNeeded();
      await desktopPage.waitForTimeout(300);
      await desktopPage.screenshot({ path: path.join(outDir, '07_desktop_uh_ladder_svg.png') });
      auditReport.screenshots.push('07_desktop_uh_ladder_svg.png');
    }

    await desktopContext.close();

    // 2. Mobile Viewport (iPhone 14/15 Pro: 393 x 852)
    console.log('📱 Auditing Mobile Viewport (393 x 852)...');
    const mobileContext = await browser.newContext({
      viewport: { width: 393, height: 852 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://localhost:4178/', { waitUntil: 'networkidle' });

    // Check horizontal scroll on mobile
    const mobileOverflow = await mobilePage.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    await mobilePage.screenshot({ path: path.join(outDir, '08_mobile_materi.png') });
    auditReport.screenshots.push('08_mobile_materi.png');

    // Open Mobile Table of Contents drawer
    const menuBtn = await mobilePage.$('button[aria-label*="Buka Daftar Isi"]');
    if (menuBtn) {
      await menuBtn.click();
      await mobilePage.waitForTimeout(300);
      await mobilePage.screenshot({ path: path.join(outDir, '09_mobile_toc_drawer.png') });
      auditReport.screenshots.push('09_mobile_toc_drawer.png');
      // Close drawer by clicking Tutup button
      const closeBtn = await mobilePage.$('button[aria-label*="Tutup Daftar Isi"]');
      if (closeBtn) await closeBtn.click();
      await mobilePage.waitForTimeout(300);
    }

    // Switch to Roadmap on Mobile
    await mobilePage.click('button:has-text("Alur 8 Pertemuan")');
    await mobilePage.waitForTimeout(400);
    await mobilePage.screenshot({ path: path.join(outDir, '10_mobile_roadmap.png') });
    auditReport.screenshots.push('10_mobile_roadmap.png');

    // Switch to Paket A & B on Mobile
    await mobilePage.click('button:has-text("Paket A & B")');
    await mobilePage.waitForTimeout(400);
    await mobilePage.screenshot({ path: path.join(outDir, '11_mobile_paket_ab.png') });
    auditReport.screenshots.push('11_mobile_paket_ab.png');

    // Switch to Ulangan Harian on Mobile
    await mobilePage.click('button:has-text("Ulangan Harian")');
    await mobilePage.waitForTimeout(400);
    await mobilePage.screenshot({ path: path.join(outDir, '12_mobile_uh.png') });
    auditReport.screenshots.push('12_mobile_uh.png');

    // Scroll to first interactive question on UH
    const firstUhInput = await mobilePage.$('input[placeholder="Tuliskan jawaban akhirmu di sini..."]');
    if (firstUhInput) {
      await firstUhInput.scrollIntoViewIfNeeded();
      await mobilePage.waitForTimeout(200);
      await mobilePage.screenshot({ path: path.join(outDir, '13_mobile_uh_question_card.png') });
      auditReport.screenshots.push('13_mobile_uh_question_card.png');
    }

    // Touch targets check on Mobile
    const smallTouchTargets = await mobilePage.evaluate(() => {
      const clickable = Array.from(document.querySelectorAll('button, a, input, select'));
      const small = [];
      for (const el of clickable) {
        const rect = el.getBoundingClientRect();
        // Skip hidden elements
        if (rect.width === 0 || rect.height === 0) continue;
        if (rect.width < 38 || rect.height < 38) {
          small.push({
            tag: el.tagName,
            text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          });
        }
      }
      return small.slice(0, 10);
    });

    auditReport.viewports.mobile = {
      width: 393,
      height: 852,
      hasOverflow: mobileOverflow,
      smallTouchTargetsCount: smallTouchTargets.length,
      sampleSmallTouchTargets: smallTouchTargets,
    };

    // 3. Accessibility & UX heuristic audit
    console.log('♿ Performing accessibility & contrast heuristics...');
    const a11ySummary = await mobilePage.evaluate(() => {
      // 1. Missing aria labels on icon buttons
      const buttons = Array.from(document.querySelectorAll('button'));
      const missingAria = buttons.filter(b => !b.textContent.trim() && !b.getAttribute('aria-label') && !b.getAttribute('title'));

      // 2. Headings hierarchy
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
        tag: h.tagName,
        text: h.textContent.trim().slice(0, 40)
      }));

      // 3. Input without labels or placeholder
      const inputs = Array.from(document.querySelectorAll('input'));
      const unlabeledInputs = inputs.filter(i => !i.getAttribute('aria-label') && !i.getAttribute('placeholder') && !document.querySelector(`label[for="${i.id}"]`));

      return {
        missingAriaButtons: missingAria.length,
        totalHeadings: headings.length,
        headingSample: headings.slice(0, 6),
        unlabeledInputsCount: unlabeledInputs.length,
      };
    });

    auditReport.a11yTests = a11ySummary;

    await mobileContext.close();
    console.log('✅ UI/UX Audit Playwright run completed successfully!');
  } catch (err) {
    console.error('❌ Error during Playwright audit:', err);
  } finally {
    await browser.close();
    preview.kill();
  }

  fs.writeFileSync(path.join(outDir, 'audit_report.json'), JSON.stringify(auditReport, null, 2));
  console.log(`Saved audit report to ${path.join(outDir, 'audit_report.json')}`);
}

main();
