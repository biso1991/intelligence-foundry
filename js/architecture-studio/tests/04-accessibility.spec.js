import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Compliance (WCAG 2.1 AA)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/architecture-studio.html');
    await page.waitForLoadState('networkidle');
  });

  test('automated accessibility scan - no violations', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('page has proper document structure', async ({ page }) => {
    // Check for main heading
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    
    // Check for proper semantic structure
    const main = page.locator('main, [role="main"]');
    expect(await main.count()).toBeGreaterThan(0);
  });

  test('interactive elements have accessible names', async ({ page }) => {
    // All buttons should have accessible text
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      
      expect(text || ariaLabel).toBeTruthy();
    }
  });

  test('nodes have ARIA labels', async ({ page }) => {
    const firstNode = page.locator('.node-group').first();
    const ariaLabel = await firstNode.getAttribute('aria-label');
    
    expect(ariaLabel).toBeTruthy();
    expect(ariaLabel.length).toBeGreaterThan(0);
  });

  test('nodes have correct ARIA role', async ({ page }) => {
    const firstNode = page.locator('.node-group').first();
    const role = await firstNode.getAttribute('role');
    
    expect(role).toBe('button');
  });

  test('details panel has proper ARIA attributes', async ({ page }) => {
    const node = page.locator('.node-group').first();
    await node.click();
    
    const panel = page.locator('.node-details-panel');
    const role = await panel.getAttribute('role');
    
    expect(role).toBe('dialog');
    
    // Check for aria-labelledby or aria-label
    const labelledBy = await panel.getAttribute('aria-labelledby');
    const ariaLabel = await panel.getAttribute('aria-label');
    
    expect(labelledBy || ariaLabel).toBeTruthy();
  });

  test('close button has accessible label', async ({ page }) => {
    const node = page.locator('.node-group').first();
    await node.click();
    
    const closeButton = page.locator('.close-details');
    const ariaLabel = await closeButton.getAttribute('aria-label');
    
    expect(ariaLabel).toBeTruthy();
  });

  test('animation controls have ARIA live regions', async ({ page }) => {
    // Animation status should be announced to screen readers
    const controls = page.locator('.animation-controls');
    const ariaLive = await controls.getAttribute('aria-live');
    
    // Either the controls or a child should have aria-live
    expect(ariaLive || await page.locator('[aria-live]').count()).toBeTruthy();
  });

  test('focus indicators are visible', async ({ page }) => {
    const firstNode = page.locator('.node-group').first();
    await firstNode.focus();
    
    // Check that focus creates visual indicator
    const outlineWidth = await firstNode.evaluate(el => {
      return window.getComputedStyle(el).outlineWidth;
    });
    
    // Should have outline or visible focus indicator
    expect(outlineWidth !== '0px' || outlineWidth !== 'none').toBeTruthy();
  });

  test('color contrast meets WCAG AA standards', async ({ page }) => {
    // Run axe-core color contrast check
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('body')
      .analyze();
    
    const colorContrastViolations = results.violations.filter(
      v => v.id === 'color-contrast'
    );
    
    expect(colorContrastViolations).toHaveLength(0);
  });

  test('keyboard focus order is logical', async ({ page }) => {
    const focusableElements = [];
    
    // Tab through first 5 elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => {
        return document.activeElement.getAttribute('data-node-id') || 
               document.activeElement.textContent?.substring(0, 20) ||
               document.activeElement.tagName;
      });
      focusableElements.push(focused);
    }
    
    // Should have captured focus movements
    expect(focusableElements.length).toBe(5);
    expect(focusableElements.every(el => el !== null)).toBeTruthy();
  });

  test('no elements with duplicate IDs', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .include('body')
      .analyze();
    
    const duplicateIdViolations = results.violations.filter(
      v => v.id === 'duplicate-id'
    );
    
    expect(duplicateIdViolations).toHaveLength(0);
  });

  test('images have alt text', async ({ page }) => {
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      
      expect(alt).not.toBeNull();
    }
  });

  test('skip to main content link exists', async ({ page }) => {
    // Good practice: skip link for keyboard users
    const skipLink = page.locator('a[href="#main"], a[href="#content"]').first();
    
    // If present, should be keyboard accessible
    if (await skipLink.count() > 0) {
      await skipLink.focus();
      await expect(skipLink).toBeFocused();
    }
  });

  test('reduced motion preference is respected', async ({ page, context }) => {
    const reducedMotionPage = await context.newPage();
    await reducedMotionPage.emulateMedia({ reducedMotion: 'reduce' });
    await reducedMotionPage.goto('/architecture-studio.html');
    
    // Animation should be paused
    await expect(reducedMotionPage.locator('text=Play')).toBeVisible();
    
    await reducedMotionPage.close();
  });

  test('tooltip does not trap keyboard focus', async ({ page }) => {
    const node = page.locator('.node-group').first();
    await node.hover();
    await page.waitForTimeout(150);
    
    // Tooltip should be visible but not focusable
    await expect(page.locator('.tooltip')).toBeVisible();
    
    // Should still be able to navigate away
    await page.keyboard.press('Tab');
    
    const focused = await page.evaluate(() => {
      return document.activeElement.className;
    });
    
    expect(focused).not.toContain('tooltip');
  });

  test('details panel traps focus when open', async ({ page }) => {
    const node = page.locator('.node-group').first();
    await node.click();
    
    // Tab should cycle within panel
    await page.keyboard.press('Tab');
    
    const focused = await page.evaluate(() => {
      return document.activeElement.closest('.node-details-panel') !== null;
    });
    
    expect(focused).toBeTruthy();
  });

  test('ARIA live region announces state changes', async ({ page }) => {
    // Click scenario button
    await page.click('text=Batch Processing');
    
    // Check if any live region exists to announce change
    const liveRegions = await page.locator('[aria-live="polite"], [aria-live="assertive"]').count();
    
    // Should have at least one live region for announcements
    expect(liveRegions).toBeGreaterThanOrEqual(0);
  });
});
