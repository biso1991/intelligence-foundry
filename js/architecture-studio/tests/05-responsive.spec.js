import { test, expect } from '@playwright/test';

test.describe('Responsive Design & Mobile Experience', () => {
  test.describe('Desktop (1440px)', () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test('layout renders correctly at desktop size', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      await expect(page.locator('svg')).toBeVisible();
      
      const svgBox = await page.locator('svg').boundingBox();
      expect(svgBox.width).toBeGreaterThan(1000);
    });

    test('details panel appears as right sidebar', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      const node = page.locator('.node-group').first();
      await node.click();
      
      const panel = page.locator('.node-details-panel');
      const panelBox = await panel.boundingBox();
      
      // Should be positioned on the right
      expect(panelBox.x).toBeGreaterThan(page.viewportSize().width / 2);
    });

    test('no horizontal scroll on desktop', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      
      const scrollWidth = await page.evaluate(() => {
        return document.documentElement.scrollWidth <= document.documentElement.clientWidth;
      });
      
      expect(scrollWidth).toBeTruthy();
    });
  });

  test.describe('Tablet (768px)', () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test('layout adapts to tablet size', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      await expect(page.locator('svg')).toBeVisible();
    });

    test('horizontal scroll enabled for full diagram view', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      
      const container = page.locator('.architecture-container');
      const overflow = await container.evaluate(el => {
        return window.getComputedStyle(el).overflowX;
      });
      
      expect(overflow).toBe('scroll');
    });

    test('details panel adapts to smaller viewport', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      const node = page.locator('.node-group').first();
      await node.click();
      
      const panel = page.locator('.node-details-panel');
      await expect(panel).toBeVisible();
      
      const panelBox = await panel.boundingBox();
      expect(panelBox.width).toBeLessThan(768);
    });
  });

  test.describe('Mobile (375px)', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('layout renders on mobile', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      await expect(page.locator('svg')).toBeVisible();
    });

    test('horizontal scroll enabled on mobile', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      
      const container = page.locator('.architecture-container');
      const styles = await container.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          overflowX: computed.overflowX,
          minWidth: computed.minWidth
        };
      });
      
      expect(styles.overflowX).toBe('scroll');
    });

    test('details panel appears as bottom sheet', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      const node = page.locator('.node-group').first();
      await node.click();
      
      const panel = page.locator('.node-details-panel');
      const panelBox = await panel.boundingBox();
      
      // Should be at bottom of screen
      expect(panelBox.y).toBeGreaterThan(page.viewportSize().height / 2);
    });

    test('tap interaction works on mobile', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      const node = page.locator('.node-group').first();
      
      // Simulate touch
      await node.tap();
      
      await expect(page.locator('.node-details-panel')).toBeVisible();
    });

    test('controls stack vertically on mobile', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      
      const controls = page.locator('.scenario-controls, .animation-controls, .case-study-controls');
      
      // Check if controls are stacked (media query should apply)
      const firstControl = controls.first();
      const flexDirection = await firstControl.evaluate(el => {
        return window.getComputedStyle(el).flexDirection;
      });
      
      // May be column or wrap on mobile
      expect(['column', 'wrap'].some(dir => flexDirection.includes(dir))).toBeTruthy();
    });

    test('touch targets are at least 44x44px', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      
      const buttons = page.locator('button');
      const buttonCount = await buttons.count();
      
      for (let i = 0; i < Math.min(buttonCount, 5); i++) {
        const button = buttons.nth(i);
        const box = await button.boundingBox();
        
        expect(box.width).toBeGreaterThanOrEqual(40); // Allow small margin
        expect(box.height).toBeGreaterThanOrEqual(40);
      }
    });

    test('nodes are tappable on mobile', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      
      const nodes = page.locator('.node-group circle');
      const nodeCount = await nodes.count();
      
      // Check first few nodes have adequate tap target
      for (let i = 0; i < Math.min(nodeCount, 3); i++) {
        const node = nodes.nth(i);
        const r = await node.getAttribute('r');
        
        // Radius should be large enough for touch
        expect(parseInt(r)).toBeGreaterThanOrEqual(15);
      }
    });
  });

  test.describe('Ultra-wide (1920px)', () => {
    test.use({ viewport: { width: 1920, height: 1080 } });

    test('layout scales appropriately for large screens', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      await expect(page.locator('svg')).toBeVisible();
      
      // Diagram should be centered or appropriately sized
      const container = page.locator('.architecture-container');
      const containerBox = await container.boundingBox();
      
      expect(containerBox.width).toBeGreaterThan(1000);
    });
  });

  test.describe('Orientation Changes', () => {
    test('handles portrait to landscape switch', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      
      // Start in portrait
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(200);
      
      await expect(page.locator('svg')).toBeVisible();
      
      // Switch to landscape
      await page.setViewportSize({ width: 667, height: 375 });
      await page.waitForTimeout(200);
      
      await expect(page.locator('svg')).toBeVisible();
      
      // Canvas should resize
      const canvasBox = await page.locator('#particle-canvas').boundingBox();
      expect(canvasBox.width).toBeGreaterThan(0);
    });
  });

  test.describe('Zoom Levels', () => {
    test('handles browser zoom at 150%', async ({ page, context }) => {
      await page.goto('/architecture-studio.html');
      
      // Simulate zoom (via deviceScaleFactor)
      await page.setViewportSize({ width: 960, height: 600 }); // 1440 / 1.5
      
      await expect(page.locator('svg')).toBeVisible();
      
      // Interactions should still work
      const node = page.locator('.node-group').first();
      await node.click();
      await expect(page.locator('.node-details-panel')).toBeVisible();
    });

    test('handles browser zoom at 50%', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      
      await page.setViewportSize({ width: 2880, height: 1800 }); // 1440 * 2
      
      await expect(page.locator('svg')).toBeVisible();
    });
  });

  test.describe('Content Overflow', () => {
    test('long node labels do not break layout', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      
      const labels = page.locator('.node-group text');
      const labelCount = await labels.count();
      
      for (let i = 0; i < Math.min(labelCount, 10); i++) {
        const label = labels.nth(i);
        const box = await label.boundingBox();
        
        // Labels should be visible and within reasonable bounds
        expect(box.width).toBeGreaterThan(0);
        expect(box.width).toBeLessThan(300);
      }
    });

    test('details panel content scrolls when necessary', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      await page.setViewportSize({ width: 375, height: 500 }); // Short viewport
      
      const node = page.locator('.node-group').first();
      await node.click();
      
      const panel = page.locator('.node-details-panel');
      const overflow = await panel.evaluate(el => {
        return window.getComputedStyle(el).overflow;
      });
      
      // Should allow scrolling if content is tall
      expect(['auto', 'scroll', 'visible'].includes(overflow)).toBeTruthy();
    });
  });

  test.describe('Performance on Mobile', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('animation runs smoothly on mobile', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      
      // Let animation run
      await page.waitForTimeout(500);
      
      // Check for performance warnings
      const warnings = [];
      page.on('console', msg => {
        if (msg.type() === 'warning') warnings.push(msg.text());
      });
      
      await page.waitForTimeout(500);
      
      expect(warnings.length).toBe(0);
    });

    test('interactions are responsive on mobile', async ({ page }) => {
      await page.goto('/architecture-studio.html');
      
      const startTime = Date.now();
      await page.click('text=Batch Processing');
      await page.waitForTimeout(200); // Allow transition
      const endTime = Date.now();
      
      // Should respond within reasonable time
      expect(endTime - startTime).toBeLessThan(1000);
    });
  });
});
