# System Architecture Studio - Technical Architecture

## System Overview

The **System Architecture Studio** is an interactive, browser-based visualization system for displaying complex data engineering and AI system architectures. Built as a hybrid Canvas + SVG application, it combines the performance of Canvas-based particle animation with the accessibility and interactivity of SVG node rendering.

### Core Capabilities

- **36-node architecture visualization** with 37 typed connections
- **8-layer horizontal swim-lane layout** (Data Sources → Monitoring)
- **5 scenario filters** (Complete, Batch, Streaming, ML Pipeline, RAG)
- **4 case study highlighting** systems (SignalForge, UBIAI, E-commerce, Production APIs)
- **Canvas particle animation** following actual connection paths
- **Interactive tooltips and details panel** with keyboard navigation
- **WCAG 2.1 AA accessibility compliance**
- **Responsive design** (mobile, tablet, desktop)

---

## Architecture Layers

### 1. Data Layer

**File**: `js/architecture-studio/architectures/intelligence-platform.js`

**Purpose**: Single source of truth for all architecture data

**Structure**:
```javascript
const IntelligencePlatformArchitecture = {
  metadata: {
    name: "Intelligence Platform System Architecture",
    version: "1.0.0",
    description: "...",
    author: "Bilel Nasri"
  },
  
  layers: [ /* 8 layers: ingestion, storage, processing, ml, api, frontend, monitoring, sources */ ],
  
  experienceTypes: { /* professional, personal-project, architecture-familiarity */ },
  
  connectionTypes: { /* streaming, batch, lookup, telemetry, deployment */ },
  
  nodes: [ /* 36 nodes with id, label, layer, experience, project, technologies, role, description */ ],
  
  connections: [ /* 37 connections with from, to, type */ ],
  
  scenarios: { /* complete, batch, streaming, ml-pipeline, rag */ },
  
  caseStudies: { /* signalforge, ubiai, ecommerce, production-apis */ }
};
```

**Key Principles**:
- All node IDs unique and kebab-case
- All connections reference valid node IDs
- No hardcoded metrics (30%, 25%, 92%, 50-worker, 99.9%)
- UBIAI experience classified as "professional" (Internship/PFE)
- All data verifiable or excluded

**Validation**: `architectures/validate.mjs` programmatically validates data integrity

---

### 2. Rendering Layer

**Component**: SVG-based static architecture diagram

**Rendering Pipeline**:

```
Load Configuration
        ↓
Calculate Node Positions (layer-based, 8 columns)
        ↓
Render Layers (swim lanes with labels)
        ↓
Render Connections (Bezier curves, typed by color/style)
        ↓
Render Nodes (circles with icons and labels)
        ↓
Render Legend (experience type indicators)
        ↓
Attach Event Listeners (hover, click, keyboard)
```

**Node Positioning Algorithm**:
```javascript
function calculateNodePositions(nodes) {
  const layerGroups = groupBy(nodes, 'layer');
  const layerWidth = 240;
  const layerHeight = 700;
  const verticalSpacing = 80;
  
  for (const [layerIndex, layerNodes] of Object.entries(layerGroups)) {
    const x = layerIndex * layerWidth + layerWidth / 2;
    const startY = (layerHeight - (layerNodes.length - 1) * verticalSpacing) / 2;
    
    layerNodes.forEach((node, nodeIndex) => {
      node.x = x;
      node.y = startY + nodeIndex * verticalSpacing;
    });
  }
}
```

**Connection Rendering**:
- Bezier cubic curves with control points at 1/3 and 2/3 horizontal distance
- Color-coded by connection type (streaming=cyan, batch=purple, lookup=green, telemetry=amber, deployment=blue)
- Rendered before nodes (z-index layering)

**SVG Structure**:
```xml
<svg viewBox="0 0 2000 700">
  <defs><!-- Gradients, filters --></defs>
  <g class="connections">
    <path class="connection" data-type="streaming" d="M..." />
    <!-- 37 connections -->
  </g>
  <g class="layers">
    <text class="layer-label">Data Sources</text>
    <!-- 8 layer labels -->
  </g>
  <g class="nodes">
    <g class="node-group" data-node-id="kafka" data-experience="personal-project" role="button" tabindex="0">
      <circle cx="240" cy="350" r="20" />
      <text x="240" y="380">kafka</text>
    </g>
    <!-- 36 nodes -->
  </g>
</svg>
```

---

### 3. Animation Layer

**Component**: Canvas overlay with particle system

**Architecture**:

```
Canvas Element (pointer-events: none, z-index: 1)
        ↓
Particle System (37 connection-based particle streams)
        ↓
Animation Loop (requestAnimationFrame, delta time normalization)
        ↓
Render Pipeline (clear → draw particles → requestNextFrame)
```

**Particle Class**:
```javascript
class Particle {
  constructor(connection, config) {
    this.connection = connection; // { from, to, type, path }
    this.progress = Math.random(); // 0-1 position on path
    this.speed = config.speed; // px/second
    this.size = config.size; // radius in px
    this.color = config.color; // RGBA string
  }
  
  update(deltaTime) {
    this.progress += (this.speed / 1000) * deltaTime;
    if (this.progress > 1) this.progress = 0; // Loop
  }
  
  draw(ctx) {
    const pos = this.connection.path.getPointAtLength(this.progress * this.connection.path.getTotalLength());
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
```

**Connection Type Configurations**:
| Type | Speed (px/s) | Size (px) | Color | Count |
|------|-------------|----------|--------|-------|
| streaming | 100 | 3 | cyan | 6 connections |
| batch | 50 | 4 | purple | 7 connections |
| lookup | 150 | 2 | green | 8 connections |
| telemetry | 30 | 2.5 | amber | 10 connections |
| deployment | 40 | 3.5 | blue | 6 connections |

**Performance Optimizations**:
- Single `requestAnimationFrame` loop (no parallel loops)
- Delta time normalization (frame-rate independent)
- Device pixel ratio handling at setup (not per-frame)
- Resize debouncing (150ms delay)
- Page visibility API (pause when tab hidden)
- Prefers-reduced-motion support (auto-pause)

**Canvas Setup**:
```javascript
function setupCanvas() {
  const canvas = document.getElementById('particle-canvas');
  const container = document.querySelector('.architecture-container');
  const dpr = window.devicePixelRatio || 1;
  
  canvas.width = container.clientWidth * dpr;
  canvas.height = container.clientHeight * dpr;
  canvas.style.width = container.clientWidth + 'px';
  canvas.style.height = container.clientHeight + 'px';
  
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr); // Scale context, not individual draws
  
  return ctx;
}
```

---

### 4. Interaction Layer

**Components**: Tooltips, Node Details Panel, Keyboard Navigation

**Event Flow**:

```
User Action (hover/click/tap/keyboard)
        ↓
Event Handler (setupNodeInteraction)
        ↓
State Update (selectedNode, hoveredNode, activeCaseStudy)
        ↓
UI Update (show/hide tooltip, panel, highlights)
        ↓
Accessibility Announcements (ARIA live regions)
```

**Tooltip System**:

```javascript
function showTooltip(node, event) {
  clearTimeout(tooltipTimeout);
  
  tooltipTimeout = setTimeout(() => {
    const tooltip = document.getElementById('node-tooltip');
    tooltip.textContent = node.label || node.id;
    tooltip.style.display = 'block';
    
    // Boundary detection
    let x = event.clientX + 10;
    let y = event.clientY - 30;
    
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    if (x + tooltipRect.width > viewportWidth - 20) x = event.clientX - tooltipRect.width - 10;
    if (y < 20) y = event.clientY + 10;
    if (y + tooltipRect.height > viewportHeight - 20) y = viewportHeight - tooltipRect.height - 20;
    
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
  }, 100); // 100ms delay prevents flicker
}
```

**Details Panel System**:

```javascript
function showNodeDetails(node) {
  selectedNode = node;
  previousFocusedElement = document.activeElement; // For focus restoration
  
  const panel = document.querySelector('.node-details-panel');
  
  // Populate panel
  panel.querySelector('.node-name').textContent = node.label || node.id;
  panel.querySelector('.node-layer').textContent = node.layer;
  panel.querySelector('.node-description').textContent = node.description;
  // ... populate all sections
  
  // Show panel
  panel.classList.add('visible');
  panel.setAttribute('aria-hidden', 'false');
  
  // Focus close button (accessibility)
  panel.querySelector('.close-details').focus();
}
```

**Keyboard Navigation**:
- **Tab**: Cycle through nodes (tabindex="0" on all node-group elements)
- **Enter/Space**: Open details panel for focused node
- **Escape**: Close details panel, restore focus to original node
- **Tab within panel**: Cycles through panel content (focus trap)

**State Management**:
```javascript
let selectedNode = null; // Currently selected node (details panel open)
let hoveredNode = null; // Currently hovered node (tooltip visible)
let activeCaseStudy = null; // Currently active case study filter
let activeScenario = 'complete'; // Currently active scenario filter
let isAnimationPaused = false; // Animation state
```

**State Transitions**:
- Scenario change: Update activeScenario → filter nodes → reinitialize particles
- Case study change: Update activeCaseStudy → dim non-member nodes/connections
- Node click: Update selectedNode → show panel → manage focus
- Panel close: Clear selectedNode → hide panel → restore focus

---

### 5. Filtering Layer

**Components**: Scenario Filtering, Case Study Highlighting

**Scenario Filtering Algorithm**:

```javascript
function activateScenario(scenarioId) {
  activeScenario = scenarioId;
  const scenario = IntelligencePlatformArchitecture.scenarios[scenarioId];
  const activeNodeIds = scenario.nodes;
  
  // Update nodes
  document.querySelectorAll('.node-group').forEach(nodeGroup => {
    const nodeId = nodeGroup.getAttribute('data-node-id');
    if (activeNodeIds.includes(nodeId)) {
      nodeGroup.style.opacity = '1'; // Visible
    } else {
      nodeGroup.style.opacity = '0.1'; // Nearly invisible
    }
  });
  
  // Update connections
  document.querySelectorAll('.connection').forEach(connection => {
    const fromId = connection.getAttribute('data-from');
    const toId = connection.getAttribute('data-to');
    if (activeNodeIds.includes(fromId) && activeNodeIds.includes(toId)) {
      connection.style.opacity = '1';
    } else {
      connection.style.opacity = '0.1';
    }
  });
  
  // Reinitialize particles (only for active connections)
  initializeParticles();
}
```

**Case Study Highlighting Algorithm**:

```javascript
function activateCaseStudy(caseStudyId) {
  if (activeCaseStudy === caseStudyId) {
    // Toggle off
    activeCaseStudy = null;
    resetHighlighting();
    return;
  }
  
  activeCaseStudy = caseStudyId;
  const caseStudy = IntelligencePlatformArchitecture.caseStudies[caseStudyId];
  const highlightedNodeIds = caseStudy.nodes;
  
  // Dim all nodes/connections first
  document.querySelectorAll('.node-group').forEach(nodeGroup => {
    nodeGroup.style.opacity = '0.2';
  });
  document.querySelectorAll('.connection').forEach(connection => {
    connection.style.opacity = '0.1';
  });
  
  // Highlight case study members
  highlightedNodeIds.forEach(nodeId => {
    const nodeGroup = document.querySelector(`[data-node-id="${nodeId}"]`);
    if (nodeGroup) nodeGroup.style.opacity = '1';
  });
  
  // Highlight connections between case study nodes
  document.querySelectorAll('.connection').forEach(connection => {
    const fromId = connection.getAttribute('data-from');
    const toId = connection.getAttribute('data-to');
    if (highlightedNodeIds.includes(fromId) && highlightedNodeIds.includes(toId)) {
      connection.style.opacity = '1';
    }
  });
}
```

**Combined Filtering**:
- Scenario and case study filters can be active simultaneously
- Scenario filter determines which nodes are in the "active set"
- Case study highlighting applies opacity dimming on top of scenario visibility
- Result: Only highlighted nodes in the active scenario are fully visible

---

### 6. Accessibility Layer

**WCAG 2.1 AA Compliance**:

| Criterion | Implementation |
|-----------|----------------|
| **1.1.1 Non-text Content** | All nodes have `aria-label`, Close button has `aria-label` |
| **1.3.1 Info and Relationships** | Semantic HTML5, ARIA roles (`role="button"`, `role="dialog"`) |
| **1.4.3 Contrast (Minimum)** | 11-15:1 contrast ratio (white text on dark navy background) |
| **2.1.1 Keyboard** | All interactive elements keyboard accessible (Tab, Enter, Space, Escape) |
| **2.1.2 No Keyboard Trap** | Focus cycles within panel, Escape always exits |
| **2.4.3 Focus Order** | Logical tab order (nodes → controls → panel) |
| **2.4.7 Focus Visible** | Visible outline on all focused elements |
| **3.2.1 On Focus** | No unexpected context changes on focus |
| **3.3.2 Labels or Instructions** | All controls clearly labeled |
| **4.1.2 Name, Role, Value** | All custom components have proper ARIA attributes |
| **4.1.3 Status Messages** | ARIA live regions for scenario/case study changes (optional enhancement) |

**ARIA Implementation**:

```html
<!-- Node -->
<g class="node-group" 
   role="button" 
   tabindex="0" 
   aria-label="Kafka, message streaming broker, personal project"
   data-node-id="kafka">
  <!-- SVG content -->
</g>

<!-- Details Panel -->
<div class="node-details-panel" 
     role="dialog" 
     aria-labelledby="panel-title"
     aria-hidden="true">
  <h2 id="panel-title" class="node-name">Kafka</h2>
  <button class="close-details" aria-label="Close details panel">×</button>
  <!-- Panel content -->
</div>

<!-- Animation Controls (Optional Enhancement) -->
<div class="animation-controls" role="region" aria-label="Animation controls">
  <button id="play-btn" aria-label="Play animation">Play</button>
  <button id="pause-btn" aria-label="Pause animation">Pause</button>
  <button id="replay-btn" aria-label="Replay animation from start">Replay</button>
</div>
```

**Focus Management**:

```javascript
function closeDetailsPanel() {
  const panel = document.querySelector('.node-details-panel');
  panel.classList.remove('visible');
  panel.setAttribute('aria-hidden', 'true');
  
  selectedNode = null;
  
  // Restore focus to originally focused element (accessibility requirement)
  if (previousFocusedElement) {
    previousFocusedElement.focus();
    previousFocusedElement = null;
  }
}
```

**Reduced Motion Support**:

```javascript
function checkReducedMotion() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    pauseAnimation();
  }
}

// Check on load and when preference changes
checkReducedMotion();
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', checkReducedMotion);
```

---

### 7. Responsive Layer

**Breakpoint Strategy**:

| Viewport | Width | Layout | Details Panel | Scroll Behavior |
|----------|-------|--------|---------------|-----------------|
| **Mobile** | 320-767px | Horizontal scroll | Bottom sheet (70vh) | Required (diagram min-width 1200px) |
| **Tablet** | 768-1023px | Horizontal scroll | Narrower sidebar (300px) | Required |
| **Desktop** | 1024-1439px | Fit-to-screen | Right sidebar (400px) | Optional |
| **Large Desktop** | 1440px+ | Centered | Right sidebar (400px) | None |

**CSS Media Queries**:

```css
/* Mobile (default) */
.architecture-container {
  overflow-x: scroll;
  min-width: 1200px; /* Force horizontal scroll on small screens */
}

.node-details-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70vh;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.node-details-panel.visible {
  transform: translateY(0);
}

/* Tablet */
@media (min-width: 768px) {
  .node-details-panel {
    width: 300px;
    height: 100%;
    right: 0;
    left: auto;
    transform: translateX(100%);
  }
  
  .node-details-panel.visible {
    transform: translateX(0);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .architecture-container {
    overflow-x: auto; /* Allow natural scrolling */
    min-width: unset;
  }
  
  .node-details-panel {
    width: 400px;
  }
}
```

**Touch Target Sizing**:
- All buttons: minimum 44x44px (WCAG 2.1 Level AAA)
- Node circles: 20px radius = 40px diameter (meets 44x44 with stroke)
- Tap padding: Additional 10px invisible padding via pointer-events

---

## File Structure

```
intelligence-foundry/
├── architecture-studio.html          # Main HTML file (1,682 lines)
├── js/
│   └── architecture-studio/
│       ├── architectures/
│       │   ├── intelligence-platform.js   # Data configuration (1,215 lines)
│       │   └── validate.mjs               # Node.js validation script (70 lines)
│       ├── tests/
│       │   ├── 01-static-rendering.spec.js
│       │   ├── 02-canvas-animation.spec.js
│       │   ├── 03-interactions.spec.js
│       │   ├── 04-accessibility.spec.js
│       │   ├── 05-responsive.spec.js
│       │   └── 06-cross-browser.spec.js
│       ├── package.json
│       ├── playwright.config.js
│       ├── README.md                      # Test suite documentation
│       ├── TESTING-CHECKLIST.md           # Manual testing guide
│       └── ARCHITECTURE.md                # This file
└── css/
    ├── design-tokens.css                  # Design system variables
    └── animations.css                     # Reusable animations
```

---

## Technology Stack

### Core Technologies

- **HTML5**: Semantic structure, Canvas API, SVG DOM
- **CSS3**: Grid, Flexbox, Custom Properties, Media Queries, Transitions
- **Vanilla JavaScript (ES6+)**: No frameworks, modern JS features
  - Arrow functions
  - Template literals
  - Destructuring
  - Array methods (map, filter, forEach, find)
  - Object methods (Object.entries, Object.values)
  - Async/await (for future enhancements)

### Browser APIs

- **Canvas API**: 2D rendering context, particle animation
- **SVG DOM**: Dynamic SVG manipulation, event handling
- **requestAnimationFrame**: Frame-rate independent animation
- **Page Visibility API**: Pause animation when tab hidden
- **matchMedia**: Detect prefers-reduced-motion, responsive breakpoints
- **getBoundingClientRect**: Element positioning for tooltips
- **Element.focus()**: Keyboard navigation and focus management

### Development Tools

- **Playwright**: Cross-browser testing (Chrome, Firefox, Safari)
- **@axe-core/playwright**: Automated accessibility testing
- **Node.js**: Validation scripts and development tooling
- **npm**: Package management

### Design System

- **Design Tokens**: Centralized CSS custom properties
  - `--color-background`: #0a192f (dark navy)
  - `--color-text`: #e6f1ff (light blue-white)
  - `--color-primary`: #64ffda (teal accent)
  - `--color-professional`: #4a90e2 (blue)
  - `--color-personal`: #64ffda (teal)
  - `--color-familiarity`: #8892b0 (slate gray)

---

## Performance Characteristics

### Load Performance

- **Initial Page Load**: <500ms (networkidle)
- **SVG Rendering**: Immediate (no perceived delay)
- **Canvas Setup**: <50ms
- **First Particle Render**: <100ms

### Runtime Performance

- **Animation Frame Rate**: 55-60 FPS (desktop), 30-55 FPS (mobile)
- **Scenario Switch**: <20ms (instant visual update)
- **Case Study Activation**: <30ms
- **Tooltip Delay**: 100ms (intentional, prevents flicker)
- **Details Panel Open**: <50ms (CSS transition)

### Memory

- **Baseline**: ~5-10 MB (HTML + SVG DOM)
- **With Animation**: ~15-20 MB (Canvas context + particle array)
- **Peak**: ~25 MB (during scenario switches with full particle reinit)
- **Leak Test**: Stable over 5-minute animation run

### DOM Complexity

- **Total Elements**: ~200-250 DOM nodes
- **SVG Elements**: ~150 (36 node-group + 37 connection + layers + legend)
- **Interactive Elements**: 36 nodes + 10 buttons = 46 tab stops

---

## Security Considerations

### Content Security Policy (CSP)

Recommended CSP for production deployment:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data:;">
```

Note: `'unsafe-inline'` required for inline scripts/styles. Future enhancement: extract to separate files.

### XSS Prevention

- All user-provided data (node labels, descriptions) is sanitized via `textContent` (not `innerHTML`)
- No `eval()` or `Function()` constructors used
- No dynamic script injection

### Data Integrity

- Configuration validation enforces schema compliance
- No external data fetching (all data embedded in `intelligence-platform.js`)
- No cookies or localStorage (stateless)

---

## Deployment

### Static Hosting

Compatible with any static hosting service:
- **GitHub Pages**: Direct deployment from repository
- **Netlify**: Drag-and-drop deployment
- **Vercel**: Zero-config deployment
- **AWS S3 + CloudFront**: Enterprise hosting

### Build Requirements

**None** - Pure HTML/CSS/JS, no build step required.

### Browser Support

| Browser | Minimum Version | Support Level |
|---------|----------------|---------------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| Mobile Safari | iOS 14+ | ✅ Full |
| Mobile Chrome | Android 8+ | ✅ Full |

**Unsupported**: Internet Explorer (all versions)

---

## Future Enhancements

### Phase 2 Potential Features

1. **Advanced Filtering**:
   - Multi-select nodes for comparison
   - Connection type filtering
   - Technology stack filtering

2. **Data Visualization**:
   - Timeline view (project chronology)
   - Metrics dashboard (if verified data available)
   - Interactive technology radar chart

3. **Export Capabilities**:
   - Export diagram as PNG/SVG
   - Generate PDF report with node details
   - Share link with specific scenario/case study active

4. **Animation Enhancements**:
   - Bi-directional particle flow
   - Particle collision effects
   - Custom particle shapes per technology

5. **Data Management**:
   - Multiple architecture configurations
   - Architecture comparison view
   - Version history

6. **Accessibility Improvements**:
   - ARIA live regions for all state changes
   - More descriptive ARIA labels
   - Screen reader optimized descriptions

---

## Maintenance

### Adding New Nodes

1. Edit `js/architecture-studio/architectures/intelligence-platform.js`
2. Add node object to `nodes` array with all required fields
3. Add node ID to relevant `scenarios` and `caseStudies`
4. Run validation: `npm run validate`
5. Test in browser manually
6. Update test expectations in `01-static-rendering.spec.js` (node count)

### Adding New Connections

1. Edit `intelligence-platform.js`
2. Add connection object to `connections` array
3. Ensure `from` and `to` reference valid node IDs
4. Choose appropriate `type` (streaming, batch, lookup, telemetry, deployment)
5. Validate and test

### Modifying Scenarios

1. Edit scenario object in `scenarios` section
2. Update `nodes` array with node IDs to include
3. Validate logic in browser (correct nodes highlighted)

### Updating Experience Classifications

**IMPORTANT**: Only update experience type if verifiable evidence exists
- Professional: Paid employment or formal internship with employment contract
- Personal Project: Self-initiated, no employer relationship
- Architecture Familiarity: Used in projects but not primary implementer

### Data Integrity Review

Before each release:
1. Run `npm run validate` to check data structure
2. Review all metrics for verifiability
3. Confirm UBIAI experience remains "Internship/PFE" classification
4. Check for invented technologies or projects
5. Verify all external claims against evidence (repo READMEs, documentation)

---

## Contact & Contribution

**Author**: Bilel Nasri  
**Project**: Intelligence Foundry - System Architecture Studio  
**Phase**: Phase 1 Complete (Milestones 1-4)  
**Version**: 1.0.0  

For technical questions or contributions:
- Review this architecture document first
- Check `README.md` for test suite information
- Follow `TESTING-CHECKLIST.md` for manual testing
- Maintain data integrity principles (no unverified metrics)

---

**Document Version**: 1.0.0  
**Last Updated**: Milestone 5 (Testing & Documentation)
