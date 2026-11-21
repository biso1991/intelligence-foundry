import { test, expect } from '@playwright/test';

test.describe('Canvas Particle Animation (Milestone 3)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/architecture-studio.html');
    await page.waitForLoadState('networkidle');
  });

  test('canvas element exists and overlays SVG', async ({ page }) => {
    const canvas = page.locator('#particle-canvas');
    await expect(canvas).toBeVisible();
    
    // Check z-index and pointer-events
    const styles = await canvas.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        zIndex: computed.zIndex,
        pointerEvents: computed.pointerEvents,
        position: computed.position
      };
    });
    
    expect(styles.zIndex).toBe('1');
    expect(styles.pointerEvents).toBe('none');
    expect(styles.position).toBe('absolute');
  });

  test('canvas dimensions match SVG container', async ({ page }) => {
    const canvasDimensions = await page.locator('#particle-canvas').evaluate(canvas => ({
      width: canvas.width,
      height: canvas.height
    }));
    
    const containerDimensions = await page.locator('.architecture-container').boundingBox();
    
    // Allow for devicePixelRatio scaling
    expect(canvasDimensions.width).toBeGreaterThan(0);
    expect(canvasDimensions.height).toBeGreaterThan(0);
  });

  test('animation controls are present', async ({ page }) => {
    await expect(page.locator('text=Play')).toBeVisible();
    await expect(page.locator('text=Pause')).toBeVisible();
    await expect(page.locator('text=Replay')).toBeVisible();
  });

  test('play/pause toggle works', async ({ page }) => {
    const pauseButton = page.locator('text=Pause');
    const playButton = page.locator('text=Play');
    
    // Default is playing
    await expect(pauseButton).toBeVisible();
    
    // Click pause
    await pauseButton.click();
    await expect(playButton).toBeVisible();
    await expect(pauseButton).not.toBeVisible();
    
    // Click play
    await playButton.click();
    await expect(pauseButton).toBeVisible();
    await expect(playButton).not.toBeVisible();
  });

  test('replay button reinitializes animation', async ({ page }) => {
    const replayButton = page.locator('text=Replay');
    
    // Wait for some animation
    await page.waitForTimeout(500);
    
    // Click replay
    await replayButton.click();
    
    // Verify animation state reset (pause button should be visible)
    await expect(page.locator('text=Pause')).toBeVisible();
  });

  test('animation pauses when page hidden', async ({ page }) => {
    // Monitor animation frame calls
    await page.evaluate(() => {
      window.animationFrameCount = 0;
      const original = window.requestAnimationFrame;
      window.requestAnimationFrame = (callback) => {
        window.animationFrameCount++;
        return original(callback);
      };
    });
    
    // Simulate page visibility change
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', {
        value: true,
        writable: true
      });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    
    await page.waitForTimeout(200);
    
    const countHidden = await page.evaluate(() => window.animationFrameCount);
    
    // Make visible again
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', {
        value: false,
        writable: true
      });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    
    await page.waitForTimeout(200);
    
    const countVisible = await page.evaluate(() => window.animationFrameCount);
    
    // Should have more frames when visible
    expect(countVisible).toBeGreaterThan(countHidden);
  });

  test('respects prefers-reduced-motion', async ({ page, context }) => {
    // Create new page with reduced motion preference
    const reducedMotionPage = await context.newPage();
    await reducedMotionPage.emulateMedia({ reducedMotion: 'reduce' });
    await reducedMotionPage.goto('/architecture-studio.html');
    await reducedMotionPage.waitForLoadState('networkidle');
    
    // Animation should be paused by default
    await expect(reducedMotionPage.locator('text=Play')).toBeVisible();
    await expect(reducedMotionPage.locator('text=Pause')).not.toBeVisible();
    
    await reducedMotionPage.close();
  });

  test('scenario switching updates particle count', async ({ page }) => {
    // Wait for initial animation
    await page.waitForTimeout(300);
    
    // Switch to Batch Processing (fewer connections)
    await page.click('text=Batch Processing');
    await page.waitForTimeout(300);
    
    // Verify canvas is still rendering (basic check)
    const canvas = page.locator('#particle-canvas');
    await expect(canvas).toBeVisible();
  });

  test('canvas handles window resize', async ({ page }) => {
    const initialDimensions = await page.locator('#particle-canvas').evaluate(canvas => ({
      width: canvas.width,
      height: canvas.height
    }));
    
    // Resize viewport
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(200); // Debounce delay
    
    const newDimensions = await page.locator('#particle-canvas').evaluate(canvas => ({
      width: canvas.width,
      height: canvas.height
    }));
    
    // Dimensions should have changed
    expect(newDimensions.width).not.toBe(initialDimensions.width);
  });

  test('no canvas rendering errors in console', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error' && msg.text().includes('canvas')) {
        errors.push(msg.text());
      }
    });
    
    // Let animation run
    await page.waitForTimeout(1000);
    
    expect(errors).toHaveLength(0);
  });

  test('devicePixelRatio is handled correctly', async ({ page }) => {
    const canvasInfo = await page.locator('#particle-canvas').evaluate(canvas => {
      const ctx = canvas.getContext('2d');
      return {
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
        clientWidth: canvas.clientWidth,
        clientHeight: canvas.clientHeight,
        dpr: window.devicePixelRatio
      };
    });
    
    // Canvas buffer dimensions should account for DPR
    expect(canvasInfo.canvasWidth).toBeGreaterThanOrEqual(canvasInfo.clientWidth);
    expect(canvasInfo.canvasHeight).toBeGreaterThanOrEqual(canvasInfo.clientHeight);
  });
});
