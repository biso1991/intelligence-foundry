import { test, expect } from '@playwright/test';

test.describe('Static SVG Rendering (Milestone 2)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/architecture-studio.html');
    await page.waitForLoadState('networkidle');
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/System Architecture Studio/);
  });

  test('renders 36 nodes in default Complete scenario', async ({ page }) => {
    const nodeCount = await page.locator('.node-group').count();
    expect(nodeCount).toBe(36);
  });

  test('renders 37 connections in default Complete scenario', async ({ page }) => {
    const connectionCount = await page.locator('.connection').count();
    expect(connectionCount).toBe(37);
  });

  test('renders all 8 layers with labels', async ({ page }) => {
    const layerLabels = await page.locator('.layer-label').allTextContents();
    expect(layerLabels).toHaveLength(8);
    expect(layerLabels).toContain('Data Sources');
    expect(layerLabels).toContain('Ingestion');
    expect(layerLabels).toContain('Storage');
    expect(layerLabels).toContain('Processing');
    expect(layerLabels).toContain('ML/AI');
    expect(layerLabels).toContain('API Layer');
    expect(layerLabels).toContain('Frontend');
    expect(layerLabels).toContain('Monitoring');
  });

  test('renders legend with 3 experience types', async ({ page }) => {
    const legendItems = await page.locator('.legend-item').count();
    expect(legendItems).toBe(3);
    
    const legendText = await page.locator('.legend').textContent();
    expect(legendText).toContain('Professional Experience');
    expect(legendText).toContain('Personal Projects');
    expect(legendText).toContain('Architecture Familiarity');
  });

  test('renders 5 scenario buttons', async ({ page }) => {
    const scenarioButtons = await page.locator('.scenario-controls button').count();
    expect(scenarioButtons).toBe(5);
    
    const buttonTexts = await page.locator('.scenario-controls button').allTextContents();
    expect(buttonTexts).toContain('Complete Architecture');
    expect(buttonTexts).toContain('Batch Processing');
    expect(buttonTexts).toContain('Real-time Streaming');
    expect(buttonTexts).toContain('ML Pipeline');
    expect(buttonTexts).toContain('RAG System');
  });

  test('scenario filtering - Batch Processing shows correct nodes', async ({ page }) => {
    await page.click('text=Batch Processing');
    await page.waitForTimeout(100); // Allow animation
    
    const visibleNodes = await page.locator('.node-group:not([style*="opacity: 0.1"])').count();
    expect(visibleNodes).toBe(10); // As per configuration
  });

  test('scenario filtering - Streaming shows correct nodes', async ({ page }) => {
    await page.click('text=Real-time Streaming');
    await page.waitForTimeout(100);
    
    const visibleNodes = await page.locator('.node-group:not([style*="opacity: 0.1"])').count();
    expect(visibleNodes).toBe(8);
  });

  test('scenario filtering - ML Pipeline shows correct nodes', async ({ page }) => {
    await page.click('text=ML Pipeline');
    await page.waitForTimeout(100);
    
    const visibleNodes = await page.locator('.node-group:not([style*="opacity: 0.1"])').count();
    expect(visibleNodes).toBe(10);
  });

  test('scenario filtering - RAG System shows correct nodes', async ({ page }) => {
    await page.click('text=RAG System');
    await page.waitForTimeout(100);
    
    const visibleNodes = await page.locator('.node-group:not([style*="opacity: 0.1"])').count();
    expect(visibleNodes).toBe(9);
  });

  test('scenario switching updates active button state', async ({ page }) => {
    // Default is Complete Architecture
    await expect(page.locator('text=Complete Architecture')).toHaveClass(/active/);
    
    // Switch to Batch Processing
    await page.click('text=Batch Processing');
    await expect(page.locator('text=Batch Processing')).toHaveClass(/active/);
    await expect(page.locator('text=Complete Architecture')).not.toHaveClass(/active/);
  });

  test('no JavaScript console errors on load', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    expect(errors).toHaveLength(0);
  });

  test('SVG viewBox and dimensions are correct', async ({ page }) => {
    const svg = page.locator('svg');
    const viewBox = await svg.getAttribute('viewBox');
    expect(viewBox).toBe('0 0 2000 700');
  });
});
