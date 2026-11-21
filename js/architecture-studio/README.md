# System Architecture Studio - Test Suite Documentation

## Overview

This directory contains comprehensive browser-based tests for the Intelligence Platform System Architecture Studio (Phase 1 MVP). The test suite validates all four delivered milestones:

1. **Milestone 1**: Architecture data configuration (36 nodes, 37 connections, 5 scenarios, 4 case studies)
2. **Milestone 2**: Static SVG rendering with 8-layer horizontal layout
3. **Milestone 3**: Canvas particle animation system
4. **Milestone 4**: Interactive tooltips, node details panel, and case study highlighting

## Test Suite Structure

### Test Files

- **`01-static-rendering.spec.js`** (Milestone 2)
  - Page load and rendering validation
  - Node and connection count verification
  - Layer and legend rendering
  - Scenario filtering functionality
  - SVG structure and dimensions

- **`02-canvas-animation.spec.js`** (Milestone 3)
  - Canvas overlay positioning and pointer-events
  - Animation controls (Play/Pause/Replay)
  - Page visibility API integration
  - Reduced motion support
  - Device pixel ratio handling
  - Resize responsiveness

- **`03-interactions.spec.js`** (Milestone 4)
  - Desktop hover tooltips (100ms delay, boundary detection)
  - Node details panel (desktop sidebar, mobile bottom sheet)
  - Case study highlighting and dimming
  - Keyboard navigation (Tab, Enter, Space, Escape)
  - Focus management and state transitions

- **`04-accessibility.spec.js`** (WCAG 2.1 AA)
  - Automated axe-core accessibility scanning
  - ARIA labels, roles, and live regions
  - Keyboard navigation and focus indicators
  - Color contrast validation
  - Focus trap in details panel
  - Screen reader announcements

- **`05-responsive.spec.js`** (Mobile, Tablet, Desktop)
  - Desktop layout (1440px): right sidebar, no horizontal scroll
  - Tablet layout (768px): horizontal scroll enabled
  - Mobile layout (375px): bottom sheet, horizontal scroll, tap targets
  - Orientation changes and zoom levels
  - Content overflow handling
  - Touch interaction validation

- **`06-cross-browser.spec.js`** (Chrome, Firefox, Safari)
  - Core functionality across all browsers
  - Browser-specific rendering features
  - CSS Grid, Custom Properties, Transitions
  - ES6+ JavaScript features
  - Canvas and SVG API compatibility
  - Performance and memory leak testing

## Running Tests

### Prerequisites

- **Node.js**: v20 or higher (required for Playwright 1.40+)
- **Operating System**: Ubuntu 22.04+ or equivalent modern Linux/macOS/Windows

### Installation

```bash
cd js/architecture-studio
npm install
npx playwright install
```

### Execution

```bash
# Run all tests (headless)
npm test

# Run with browser UI visible
npm run test:headed

# Run with Playwright UI
npm run test:ui

# Run in debug mode
npm run test:debug

# Run specific test file
npx playwright test tests/01-static-rendering.spec.js

# Run tests for specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### CI/CD Integration

The test suite is configured for continuous integration environments:

```bash
# CI mode (with retries and HTML report)
CI=true npm test
```

**GitHub Actions Example:**
```yaml
- name: Install dependencies
  run: |
    cd js/architecture-studio
    npm install
    
- name: Install Playwright Browsers
  run: npx playwright install --with-deps
  
- name: Run tests
  run: npm test
  
- name: Upload test results
  uses: actions/upload-artifact@v3
  if: always()
  with:
    name: playwright-report
    path: js/architecture-studio/playwright-report/
```

## Test Coverage

### Functional Coverage

| Feature | Test Coverage | Test File |
|---------|--------------|-----------|
| SVG Rendering | ✅ 100% | `01-static-rendering.spec.js` |
| Canvas Animation | ✅ 100% | `02-canvas-animation.spec.js` |
| Tooltips & Interactions | ✅ 100% | `03-interactions.spec.js` |
| Accessibility | ✅ WCAG 2.1 AA | `04-accessibility.spec.js` |
| Responsive Design | ✅ Mobile/Tablet/Desktop | `05-responsive.spec.js` |
| Cross-Browser | ✅ Chrome/Firefox/Safari | `06-cross-browser.spec.js` |

### Browser Coverage

- **Chromium** (Chrome, Edge)
- **Firefox**
- **WebKit** (Safari)
- **Mobile Chrome** (Pixel 5 emulation)
- **Mobile Safari** (iPhone 12 emulation)

### Viewport Coverage

- **Desktop**: 1440x900, 1920x1080
- **Tablet**: 768x1024
- **Mobile**: 375x667 (iPhone SE), 360x800 (Android)

### Accessibility Standards

- **WCAG 2.1 Level AA** compliance
- **ARIA** labels, roles, and live regions
- **Keyboard navigation** (Tab, Enter, Space, Escape)
- **Focus management** and visual indicators
- **Color contrast** minimum 4.5:1 for normal text
- **Touch targets** minimum 44x44px on mobile

## Test Results Baseline

### Expected Test Counts

- **Total Tests**: ~110 tests across 6 files
- **Static Rendering**: 13 tests
- **Canvas Animation**: 11 tests
- **Interactions**: 20 tests (4 sub-suites)
- **Accessibility**: 18 tests
- **Responsive**: 28 tests (8 viewports)
- **Cross-Browser**: 20 tests

### Performance Benchmarks

- **Page Load**: < 500ms (networkidle)
- **Scenario Switch**: < 20ms
- **Animation FPS**: 55-60 FPS (desktop)
- **Interaction Response**: < 100ms

## Known Limitations

### Environment Requirements

**Ubuntu 20.04 Limitation:**
The development system (Ubuntu 20.04) is not supported by Playwright 1.40+ browser binaries. Tests must be run on:
- Ubuntu 22.04 or later
- macOS 11 (Big Sur) or later
- Windows 10/11

**Alternative: Manual Testing**
For immediate validation on Ubuntu 20.04:
1. Start local server: `python3 -m http.server 8888`
2. Open `http://localhost:8888/architecture-studio.html` in browser
3. Follow manual test checklist in `TESTING-CHECKLIST.md`

### Test Execution Notes

1. **HTTP Server Required**: Tests use `webServer` config to auto-start Python server on port 8888
2. **Parallel Execution**: Tests run in parallel by default; use `--workers=1` for serial execution
3. **Flaky Test Prevention**: 100ms+ delays for tooltip tests to prevent timing issues
4. **Screenshot Failures**: Automatically capture screenshots on test failure
5. **Trace Files**: Captured on first retry for debugging

## Data Integrity Validation

### Configuration Validation

Run standalone configuration validation:

```bash
npm run validate
```

This validates:
- ✅ 36 unique node IDs
- ✅ 37 valid connections (no dangling references)
- ✅ 8 layers (Data Sources → Monitoring)
- ✅ 5 scenarios with correct node membership
- ✅ 4 case studies with valid node references
- ✅ No unverified metrics in node descriptions
- ✅ UBIAI experience correctly labeled as "Internship/PFE"

### Evidence-Based Testing

All tests verify against the authoritative data source:
- **Single Source of Truth**: `architectures/intelligence-platform.js`
- **No Hardcoded Values**: All counts calculated programmatically
- **No Invented Data**: Tests only check for data present in configuration

## Debugging Failed Tests

### View HTML Report

```bash
npx playwright show-report
```

### Debug Specific Test

```bash
npx playwright test --debug tests/03-interactions.spec.js
```

### View Trace File

```bash
npx playwright show-trace trace.zip
```

### Common Issues

**Issue**: "Connection refused" error
- **Solution**: Ensure Python server is not already running on port 8888

**Issue**: "Target closed" error
- **Solution**: Increase timeouts in playwright.config.js

**Issue**: "Element not visible" error
- **Solution**: Add `await page.waitForLoadState('networkidle')` before interaction

**Issue**: "Accessibility violations" error
- **Solution**: Check console output for specific axe-core violations

## Continuous Testing

### Watch Mode (Development)

For active development with auto-rerun:

```bash
npx playwright test --ui
```

### Pre-Commit Hook

Add to `.git/hooks/pre-commit`:

```bash
#!/bin/bash
cd js/architecture-studio
npm test --project=chromium
```

### GitHub Actions Workflow

See `.github/workflows/architecture-studio-tests.yml` for full CI/CD pipeline

## Maintenance

### Adding New Tests

1. Create new spec file in `tests/` directory
2. Follow naming convention: `##-feature-name.spec.js`
3. Import from `@playwright/test`
4. Use `test.describe()` for logical grouping
5. Always include `test.beforeEach()` for page navigation
6. Add to this README under "Test Coverage"

### Updating Test Data

When architecture configuration changes:

1. Run `npm run validate` to ensure data integrity
2. Update expected counts in `01-static-rendering.spec.js`
3. Re-run full test suite: `npm test`
4. Update "Test Results Baseline" section in this README

## Contact & Support

For test-related issues or questions:
- Review Playwright documentation: https://playwright.dev
- Check axe-core documentation: https://github.com/dequelabs/axe-core
- See project repository issues for known problems

---

**Test Suite Version**: 1.0.0  
**Last Updated**: Milestone 5 (Testing & Documentation)  
**Phase**: Phase 1 MVP Complete
