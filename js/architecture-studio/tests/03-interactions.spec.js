import { test, expect } from '@playwright/test';

test.describe('Interactive Tooltips & Node Details (Milestone 4)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/architecture-studio.html');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Desktop Hover Tooltips', () => {
    test('tooltip appears on node hover', async ({ page }) => {
      const firstNode = page.locator('.node-group').first();
      await firstNode.hover();
      
      // Wait for 100ms delay
      await page.waitForTimeout(150);
      
      const tooltip = page.locator('.tooltip');
      await expect(tooltip).toBeVisible();
    });

    test('tooltip displays node information', async ({ page }) => {
      const node = page.locator('.node-group[data-node-id="kafka"]').first();
      await node.hover();
      await page.waitForTimeout(150);
      
      const tooltipText = await page.locator('.tooltip').textContent();
      expect(tooltipText).toContain('kafka');
    });

    test('tooltip hides when mouse leaves node', async ({ page }) => {
      const firstNode = page.locator('.node-group').first();
      await firstNode.hover();
      await page.waitForTimeout(150);
      
      await expect(page.locator('.tooltip')).toBeVisible();
      
      // Move mouse away
      await page.mouse.move(0, 0);
      await page.waitForTimeout(50);
      
      await expect(page.locator('.tooltip')).not.toBeVisible();
    });

    test('tooltip respects viewport boundaries', async ({ page }) => {
      // Node near right edge
      const rightNode = page.locator('.node-group').last();
      await rightNode.hover();
      await page.waitForTimeout(150);
      
      const tooltip = page.locator('.tooltip');
      const tooltipBox = await tooltip.boundingBox();
      const viewportWidth = page.viewportSize().width;
      
      // Tooltip should not overflow viewport
      expect(tooltipBox.x + tooltipBox.width).toBeLessThanOrEqual(viewportWidth);
    });
  });

  test.describe('Node Details Panel', () => {
    test('details panel opens on node click', async ({ page }) => {
      const node = page.locator('.node-group').first();
      await node.click();
      
      const detailsPanel = page.locator('.node-details-panel');
      await expect(detailsPanel).toBeVisible();
    });

    test('details panel displays complete node information', async ({ page }) => {
      const node = page.locator('.node-group[data-node-id="kafka"]').first();
      await node.click();
      
      const panel = page.locator('.node-details-panel');
      await expect(panel).toBeVisible();
      
      const panelText = await panel.textContent();
      expect(panelText).toContain('kafka');
      expect(panelText).toContain('Layer:');
      expect(panelText).toContain('Experience:');
    });

    test('details panel close button works', async ({ page }) => {
      const node = page.locator('.node-group').first();
      await node.click();
      
      const closeButton = page.locator('.close-details');
      await closeButton.click();
      
      await expect(page.locator('.node-details-panel')).not.toBeVisible();
    });

    test('Escape key closes details panel', async ({ page }) => {
      const node = page.locator('.node-group').first();
      await node.click();
      
      await page.keyboard.press('Escape');
      
      await expect(page.locator('.node-details-panel')).not.toBeVisible();
    });

    test('clicking different node updates panel content', async ({ page }) => {
      const firstNode = page.locator('.node-group').first();
      await firstNode.click();
      
      const firstContent = await page.locator('.node-details-panel').textContent();
      
      const secondNode = page.locator('.node-group').nth(1);
      await secondNode.click();
      
      const secondContent = await page.locator('.node-details-panel').textContent();
      
      expect(firstContent).not.toBe(secondContent);
    });

    test('panel shows experience badge with correct styling', async ({ page }) => {
      const professionalNode = page.locator('.node-group[data-experience="professional"]').first();
      await professionalNode.click();
      
      const badge = page.locator('.experience-badge');
      await expect(badge).toBeVisible();
      
      const badgeClass = await badge.getAttribute('class');
      expect(badgeClass).toContain('professional');
    });
  });

  test.describe('Case Study Highlighting', () => {
    test('case study buttons are present', async ({ page }) => {
      const caseStudyButtons = await page.locator('.case-study-controls button').count();
      expect(caseStudyButtons).toBe(5); // 4 case studies + "All Projects"
    });

    test('SignalForge case study highlights correct nodes', async ({ page }) => {
      await page.click('text=SignalForge Pipeline');
      
      // Wait for transition
      await page.waitForTimeout(200);
      
      // Some nodes should be dimmed
      const dimmedNodes = await page.locator('.node-group[style*="opacity: 0.2"]').count();
      expect(dimmedNodes).toBeGreaterThan(0);
      
      // Some nodes should be highlighted (not dimmed)
      const highlightedNodes = await page.locator('.node-group:not([style*="opacity: 0.2"])').count();
      expect(highlightedNodes).toBeGreaterThan(0);
    });

    test('UBIAI Platform case study highlights correct nodes', async ({ page }) => {
      await page.click('text=UBIAI Platform');
      await page.waitForTimeout(200);
      
      const dimmedNodes = await page.locator('.node-group[style*="opacity: 0.2"]').count();
      expect(dimmedNodes).toBeGreaterThan(0);
    });

    test('All Projects button restores full visibility', async ({ page }) => {
      // Activate a case study
      await page.click('text=SignalForge Pipeline');
      await page.waitForTimeout(200);
      
      // Click All Projects
      await page.click('text=All Projects');
      await page.waitForTimeout(200);
      
      // No nodes should be dimmed
      const dimmedNodes = await page.locator('.node-group[style*="opacity: 0.2"]').count();
      expect(dimmedNodes).toBe(0);
    });

    test('case study button shows active state', async ({ page }) => {
      const signalForgeButton = page.locator('text=SignalForge Pipeline');
      await signalForgeButton.click();
      
      await expect(signalForgeButton).toHaveClass(/active/);
    });

    test('switching case studies updates highlighting', async ({ page }) => {
      // Activate first case study
      await page.click('text=SignalForge Pipeline');
      await page.waitForTimeout(200);
      
      const firstHighlightedCount = await page.locator('.node-group:not([style*="opacity: 0.2"])').count();
      
      // Switch to different case study
      await page.click('text=UBIAI Platform');
      await page.waitForTimeout(200);
      
      const secondHighlightedCount = await page.locator('.node-group:not([style*="opacity: 0.2"])').count();
      
      // Different nodes should be highlighted
      expect(firstHighlightedCount).not.toBe(secondHighlightedCount);
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('nodes are keyboard focusable', async ({ page }) => {
      const firstNode = page.locator('.node-group').first();
      const tabindex = await firstNode.getAttribute('tabindex');
      expect(tabindex).toBe('0');
    });

    test('Tab key navigates through nodes', async ({ page }) => {
      await page.keyboard.press('Tab');
      
      // First node should be focused
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toHaveClass(/node-group/);
    });

    test('Enter key opens details panel', async ({ page }) => {
      const firstNode = page.locator('.node-group').first();
      await firstNode.focus();
      await page.keyboard.press('Enter');
      
      await expect(page.locator('.node-details-panel')).toBeVisible();
    });

    test('Space key opens details panel', async ({ page }) => {
      const firstNode = page.locator('.node-group').first();
      await firstNode.focus();
      await page.keyboard.press('Space');
      
      await expect(page.locator('.node-details-panel')).toBeVisible();
    });

    test('focus returns to node after closing panel', async ({ page }) => {
      const firstNode = page.locator('.node-group').first();
      const nodeId = await firstNode.getAttribute('data-node-id');
      
      await firstNode.focus();
      await page.keyboard.press('Enter');
      await page.keyboard.press('Escape');
      
      // Focus should return to original node
      const focusedElement = page.locator(':focus');
      const focusedId = await focusedElement.getAttribute('data-node-id');
      expect(focusedId).toBe(nodeId);
    });
  });

  test.describe('State Management', () => {
    test('only one node can be selected at a time', async ({ page }) => {
      const firstNode = page.locator('.node-group').first();
      const secondNode = page.locator('.node-group').nth(1);
      
      await firstNode.click();
      await expect(page.locator('.node-details-panel')).toBeVisible();
      
      await secondNode.click();
      
      // Panel should still be visible with new content
      await expect(page.locator('.node-details-panel')).toBeVisible();
    });

    test('case study highlighting persists during node interactions', async ({ page }) => {
      await page.click('text=SignalForge Pipeline');
      await page.waitForTimeout(200);
      
      const dimmedCountBefore = await page.locator('.node-group[style*="opacity: 0.2"]').count();
      
      // Click a node
      const node = page.locator('.node-group').first();
      await node.click();
      
      // Case study highlighting should persist
      const dimmedCountAfter = await page.locator('.node-group[style*="opacity: 0.2"]').count();
      expect(dimmedCountAfter).toBe(dimmedCountBefore);
    });

    test('scenario filtering and case study highlighting work together', async ({ page }) => {
      // Activate scenario
      await page.click('text=Batch Processing');
      await page.waitForTimeout(200);
      
      // Activate case study
      await page.click('text=SignalForge Pipeline');
      await page.waitForTimeout(200);
      
      // Both filters should be applied
      const visibleNodes = await page.locator('.node-group').count();
      expect(visibleNodes).toBe(36); // All nodes present, some dimmed
    });
  });
});
