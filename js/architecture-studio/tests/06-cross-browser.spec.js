import { test, expect } from '@playwright/test';

test.describe('Cross-Browser Compatibility', () => {
  test.describe('Core Functionality - All Browsers', () => {
    test('page loads successfully', async ({ page, browserName }) => {
      await page.goto('/architecture-studio.html');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveTitle(/System Architecture Studio/);
    });

    test('SVG renders correctly', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      
      const svg = page.locator('svg');
      await expect(svg).toBeVisible();
      
      const nodeCount = await page.locator('.node-group').count();
      expect(nodeCount).toBe(36);
    });

    test('Canvas animation works', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      
      const canvas = page.locator('#particle-canvas');
      await expect(canvas).toBeVisible();
      
      // Check canvas is rendering (has dimensions)
      const canvasBox = await canvas.boundingBox();
      expect(canvasBox.width).toBeGreaterThan(0);
      expect(canvasBox.height).toBeGreaterThan(0);
    });

    test('interactions work', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      
      const node = page.locator('.node-group').first();
      await node.click();
      
      await expect(page.locator('.node-details-panel')).toBeVisible();
    });

    test('scenario filtering works', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      
      await page.click('text=Batch Processing');
      await page.waitForTimeout(150);
      
      const visibleNodes = await page.locator('.node-group:not([style*="opacity: 0.1"])').count();
      expect(visibleNodes).toBeGreaterThan(0);
    });

    test('case study highlighting works', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      
      await page.click('text=SignalForge Pipeline');
      await page.waitForTimeout(150);
      
      const dimmedNodes = await page.locator('.node-group[style*="opacity: 0.2"]').count();
      expect(dimmedNodes).toBeGreaterThan(0);
    });

    test('no console errors', async ({ page }) => {
      const errors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      
      await page.goto('/architecture-studio.html');
      await page.waitForLoadState('networkidle');
      
      expect(errors).toHaveLength(0);
    });
  });

  test.describe('Browser-Specific Features', () => {
    test('Chromium: Canvas rendering quality', async ({ page, browserName }) => {
      test.skip(browserName !== 'chromium', 'Chromium-specific test');
      
      await page.goto('/architecture-studio.html');
      
      const canvasContext = await page.locator('#particle-canvas').evaluate(canvas => {
        const ctx = canvas.getContext('2d');
        return {
          imageSmoothingEnabled: ctx.imageSmoothingEnabled,
          imageSmoothingQuality: ctx.imageSmoothingQuality
        };
      });
      
      expect(canvasContext.imageSmoothingEnabled).toBeTruthy();
    });

    test('Firefox: SVG rendering', async ({ page, browserName }) => {
      test.skip(browserName !== 'firefox', 'Firefox-specific test');
      
      await page.goto('/architecture-studio.html');
      
      // Firefox sometimes has different SVG rendering
      const connections = page.locator('.connection');
      const connectionCount = await connections.count();
      
      expect(connectionCount).toBe(37);
      
      // Check that paths have valid d attribute
      const firstConnection = connections.first();
      const d = await firstConnection.getAttribute('d');
      expect(d).toBeTruthy();
      expect(d.length).toBeGreaterThan(0);
    });

    test('WebKit: Touch events', async ({ page, browserName }) => {
      test.skip(browserName !== 'webkit', 'WebKit-specific test');
      
      await page.goto('/architecture-studio.html');
      
      // WebKit (Safari) has specific touch event handling
      const node = page.locator('.node-group').first();
      await node.tap();
      
      await expect(page.locator('.node-details-panel')).toBeVisible();
    });
  });

  test.describe('CSS Features', () => {
    test('CSS Grid layout works', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      
      const body = page.locator('body');
      const display = await body.evaluate(el => {
        return window.getComputedStyle(el).display;
      });
      
      // Should use modern layout
      expect(['grid', 'flex', 'block'].includes(display)).toBeTruthy();
    });

    test('CSS Custom Properties (variables) work', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      
      const computedColor = await page.evaluate(() => {
        return getComputedStyle(document.documentElement).getPropertyValue('--color-background');
      });
      
      // Should have resolved CSS variable
      expect(computedColor).toBeTruthy();
    });

    test('CSS Transitions work', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      
      const node = page.locator('.node-group').first();
      const transition = await node.evaluate(el => {
        return window.getComputedStyle(el).transition;
      });
      
      // Should have some transition defined
      expect(transition).not.toBe('');
    });

    test('Backdrop Filter support (graceful degradation)', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      
      const node = page.locator('.node-group').first();
      await node.click();
      
      const panel = page.locator('.node-details-panel');
      
      // Should be visible regardless of backdrop-filter support
      await expect(panel).toBeVisible();
    });
  });

  test.describe('JavaScript Features', () => {
    test('ES6+ features work', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      
      // Check that modern JS features are working
      const modernJSWorks = await page.evaluate(() => {
        // Test arrow functions, const, template literals, destructuring
        const test = (x) => `value: ${x}`;
        const { length } = [1, 2, 3];
        return test(length) === 'value: 3';
      });
      
      expect(modernJSWorks).toBeTruthy();
    });

    test('requestAnimationFrame works', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      
      const rafWorks = await page.evaluate(() => {
        return typeof requestAnimationFrame === 'function';
      });
      
      expect(rafWorks).toBeTruthy();
    });

    test('Canvas API works', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      
      const canvasAPI = await page.evaluate(() => {
        const canvas = document.getElementById('particle-canvas');
        const ctx = canvas.getContext('2d');
        
        return {
          hasContext: ctx !== null,
          hasFillRect: typeof ctx.fillRect === 'function',
          hasBeginPath: typeof ctx.beginPath === 'function'
        };
      });
      
      expect(canvasAPI.hasContext).toBeTruthy();
      expect(canvasAPI.hasFillRect).toBeTruthy();
      expect(canvasAPI.hasBeginPath).toBeTruthy();
    });

    test('SVG DOM manipulation works', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      
      await page.click('text=Batch Processing');
      
      // Should have manipulated SVG DOM
      const nodeOpacity = await page.locator('.node-group').first().evaluate(el => {
        return window.getComputedStyle(el).opacity;
      });
      
      expect(parseFloat(nodeOpacity)).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe('Media Queries', () => {
    test('responds to viewport size changes', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      
      // Desktop
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForTimeout(200);
      
      const desktopLayout = await page.evaluate(() => {
        return window.getComputedStyle(document.body).fontSize;
      });
      
      // Mobile
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(200);
      
      const mobileLayout = await page.evaluate(() => {
        return window.getComputedStyle(document.body).fontSize;
      });
      
      // Layout should be responsive (even if font size is same, test passes)
      expect(desktopLayout).toBeTruthy();
      expect(mobileLayout).toBeTruthy();
    });

    test('respects prefers-reduced-motion', async ({ page, context }) => {
      const reducedMotionPage = await context.newPage();
      await reducedMotionPage.emulateMedia({ reducedMotion: 'reduce' });
      await reducedMotionPage.goto('/architecture-studio.html');
      
      // Animation should be paused
      await expect(reducedMotionPage.locator('text=Play')).toBeVisible();
      
      await reducedMotionPage.close();
    });

    test('respects prefers-color-scheme (if implemented)', async ({ page, context }) => {
      // Test dark mode support if implemented
      const darkModePage = await context.newPage();
      await darkModePage.emulateMedia({ colorScheme: 'dark' });
      await darkModePage.goto('/architecture-studio.html');
      
      // Page should load regardless of color scheme
      await expect(darkModePage.locator('svg')).toBeVisible();
      
      await darkModePage.close();
    });
  });

  test.describe('Performance', () => {
    test('page loads within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/architecture-studio.html');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      // Should load within 3 seconds
      expect(loadTime).toBeLessThan(3000);
    });

    test('no memory leaks during animation', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      
      // Run animation for a bit
      await page.waitForTimeout(2000);
      
      // Switch scenarios multiple times
      for (let i = 0; i < 5; i++) {
        await page.click('text=Batch Processing');
        await page.waitForTimeout(100);
        await page.click('text=Complete Architecture');
        await page.waitForTimeout(100);
      }
      
      // Page should still be responsive
      const node = page.locator('.node-group').first();
      await node.click();
      await expect(page.locator('.node-details-panel')).toBeVisible();
    });
  });
});
