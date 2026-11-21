# Manual Testing Checklist - System Architecture Studio

Use this checklist for manual verification when automated browser testing is not available (e.g., Ubuntu 20.04 environments).

## Prerequisites

- [ ] Start HTTP server: `python3 -m http.server 8888` (from `/home/bilel/intelligence-foundry`)
- [ ] Open browser: `http://localhost:8888/architecture-studio.html`
- [ ] Open browser DevTools Console (F12)

---

## ✅ Milestone 2: Static SVG Rendering

### Initial Page Load

- [ ] **Page Title**: "System Architecture Studio - Intelligence Platform" appears in browser tab
- [ ] **No Console Errors**: Check DevTools console - no red errors
- [ ] **SVG Visible**: Large architecture diagram renders in center of page

### Node Count Validation

- [ ] **36 Nodes Total**: Count all circular nodes in diagram
  - Method: Open DevTools Console, run: `document.querySelectorAll('.node-group').length`
  - Expected: `36`

### Connection Count Validation

- [ ] **37 Connections Total**: Count all curved lines between nodes
  - Method: Console: `document.querySelectorAll('.connection').length`
  - Expected: `37`

### Layer Structure

- [ ] **8 Layer Labels Visible**: Left side shows vertical labels
  - [ ] Data Sources
  - [ ] Ingestion
  - [ ] Storage
  - [ ] Processing
  - [ ] ML/AI
  - [ ] API Layer
  - [ ] Frontend
  - [ ] Monitoring

### Legend

- [ ] **3 Legend Items**: Bottom of page shows color-coded legend
  - [ ] Professional Experience (blue fill)
  - [ ] Personal Projects (blue outline only)
  - [ ] Architecture Familiarity (gray)

### Scenario Filtering

- [ ] **5 Scenario Buttons Visible**:
  - [ ] Complete Architecture (active by default)
  - [ ] Batch Processing
  - [ ] Real-time Streaming
  - [ ] ML Pipeline
  - [ ] RAG System

- [ ] **Batch Processing Scenario**: Click button
  - [ ] Button shows active state (different color/style)
  - [ ] ~10 nodes remain visible/bright
  - [ ] Other nodes become very faint (opacity 0.1)
  - [ ] Connections adjust accordingly

- [ ] **Streaming Scenario**: Click button
  - [ ] ~8 nodes remain visible
  - [ ] Kafka, Spark Streaming, Redis visible

- [ ] **ML Pipeline Scenario**: Click button
  - [ ] ~10 nodes remain visible
  - [ ] MLflow, Model Training, Model Serving visible

- [ ] **RAG System Scenario**: Click button
  - [ ] ~9 nodes remain visible
  - [ ] Vector DB, Embeddings, LLMs visible

- [ ] **Complete Architecture**: Click to restore
  - [ ] All 36 nodes bright again

---

## ✅ Milestone 3: Canvas Particle Animation

### Canvas Overlay

- [ ] **Canvas Present**: Right-click on diagram, if you see "Save image as..." you're on canvas
  - Method: Console: `document.getElementById('particle-canvas') !== null`
  - Expected: `true`

- [ ] **Canvas Covers SVG**: Particles should move over the diagram
  - [ ] Particles are colorful dots/circles
  - [ ] Particles follow the connection paths between nodes
  - [ ] Particles move smoothly without jank

### Animation Controls

- [ ] **3 Control Buttons Visible**:
  - [ ] Play (if animation is paused)
  - [ ] Pause (if animation is running)
  - [ ] Replay

- [ ] **Pause Button**: Click
  - [ ] Button changes to "Play"
  - [ ] Particles stop moving
  - [ ] SVG remains visible

- [ ] **Play Button**: Click
  - [ ] Button changes to "Pause"
  - [ ] Particles resume movement

- [ ] **Replay Button**: Click
  - [ ] Animation resets
  - [ ] Particles restart from beginning of paths
  - [ ] Animation is playing (Pause button visible)

### Particle Behavior

- [ ] **Particle Colors Match Connection Types**:
  - [ ] Cyan/bright particles on streaming connections (fast)
  - [ ] Purple particles on batch connections (medium speed)
  - [ ] Green particles on lookup connections (very fast)
  - [ ] Amber particles on telemetry connections (slow)
  - [ ] Blue particles on deployment connections (slow)

- [ ] **Particles Follow Actual Paths**: Particles move along the curved lines, not straight

### Scenario Interaction

- [ ] **Switch to Batch Processing**:
  - [ ] Particles immediately adjust to only show on active connections
  - [ ] Fewer particles visible (only for 7 batch connections)

- [ ] **Switch Back to Complete Architecture**:
  - [ ] All particles return (37 connections worth)

### Window Resize

- [ ] **Resize Browser Window**:
  - [ ] Canvas adjusts size smoothly
  - [ ] No white gaps or overflow
  - [ ] Particles continue animating correctly

### Tab Visibility

- [ ] **Switch to Different Browser Tab**:
  - Wait 5 seconds, return to Architecture Studio tab
  - [ ] Animation continues or resumes automatically
  - [ ] No frozen state

### Reduced Motion

- [ ] **Enable Reduced Motion** (if supported by browser):
  - Chrome/Firefox: Settings → Accessibility → Reduce motion
  - [ ] Animation automatically pauses
  - [ ] Play button is visible (not Pause)

---

## ✅ Milestone 4: Interactive Tooltips & Node Details

### Desktop Hover Tooltips (Viewport ≥ 768px)

- [ ] **Hover Over Any Node**:
  - [ ] Tooltip appears after ~100ms
  - [ ] Tooltip shows node ID (e.g., "kafka", "spark-batch")
  - [ ] Tooltip appears near cursor (not off-screen)

- [ ] **Hover Over Node Near Right Edge**:
  - [ ] Tooltip shifts to left of node (stays on screen)

- [ ] **Hover Over Node Near Bottom**:
  - [ ] Tooltip shifts above node (stays on screen)

- [ ] **Move Mouse Away from Node**:
  - [ ] Tooltip disappears

### Node Details Panel (Click Interaction)

- [ ] **Click Any Node**:
  - [ ] Details panel opens on right side (desktop) or bottom (mobile)
  - [ ] Panel shows:
    - [ ] Node name/ID (bold heading)
    - [ ] Layer (e.g., "Storage")
    - [ ] Experience badge (blue/outline/gray)
    - [ ] Project name (if professional experience)
    - [ ] Description
    - [ ] Role (if applicable)
    - [ ] Technologies list
    - [ ] Implementation details

- [ ] **Click Different Node**:
  - [ ] Panel updates with new content
  - [ ] Panel stays open (doesn't close)

- [ ] **Click Close Button (×)** in top-right of panel:
  - [ ] Panel closes
  - [ ] Returns to normal view

- [ ] **Press Escape Key** (while panel open):
  - [ ] Panel closes

### Case Study Highlighting

- [ ] **5 Case Study Buttons Visible**:
  - [ ] SignalForge Pipeline
  - [ ] UBIAI Platform
  - [ ] E-commerce Platform
  - [ ] Production APIs
  - [ ] All Projects

- [ ] **Click "SignalForge Pipeline"**:
  - [ ] Button shows active state
  - [ ] Nodes involved in SignalForge project remain bright
  - [ ] Other nodes dim to ~20% opacity (very faint)
  - [ ] Connections involved remain bright, others dim

- [ ] **Click "UBIAI Platform"**:
  - [ ] Different set of nodes highlighted
  - [ ] SignalForge button becomes inactive
  - [ ] UBIAI button becomes active

- [ ] **Click "E-commerce Platform"**:
  - [ ] E-commerce nodes highlighted
  - [ ] Personal project nodes should be prominent

- [ ] **Click "Production APIs"**:
  - [ ] API-related nodes highlighted

- [ ] **Click "All Projects"**:
  - [ ] All nodes return to full brightness
  - [ ] No dimming effect
  - [ ] "All Projects" button active

### Case Study + Scenario Interaction

- [ ] **Activate Batch Processing Scenario** + **SignalForge Case Study**:
  - [ ] Both filters apply simultaneously
  - [ ] Only SignalForge nodes in batch scenario are bright
  - [ ] Other nodes are faint or very faint (double dimming)

### Keyboard Navigation

- [ ] **Press Tab Key** (from page top):
  - [ ] Focus moves to first node (visible outline/ring)

- [ ] **Continue Pressing Tab**:
  - [ ] Focus cycles through nodes
  - [ ] Visible focus indicator on each

- [ ] **Press Enter or Space** (while node focused):
  - [ ] Details panel opens for that node

- [ ] **Press Escape** (while panel open):
  - [ ] Panel closes
  - [ ] Focus returns to original node

- [ ] **Tab into Case Study or Scenario Buttons**:
  - [ ] Buttons are keyboard accessible
  - [ ] Enter/Space activates them

### ARIA and Screen Reader (Optional)

If using screen reader (NVDA, JAWS, VoiceOver):

- [ ] **Navigate to Node**:
  - [ ] Screen reader announces: "button, [node name], [experience type]"

- [ ] **Open Details Panel**:
  - [ ] Screen reader announces: "dialog, Node Details" or similar

- [ ] **Navigate Panel Content**:
  - [ ] All sections are read correctly

---

## ✅ Responsive Design & Mobile

### Desktop (1440px)

- [ ] **Resize Browser to ~1440px width**:
  - [ ] Diagram fills most of screen
  - [ ] No horizontal scrollbar
  - [ ] Details panel appears as right sidebar (400px)
  - [ ] All controls visible in single row

### Tablet (768px)

- [ ] **Resize Browser to ~768px width**:
  - [ ] Diagram requires horizontal scroll (this is intended)
  - [ ] Scrollbar appears at bottom
  - [ ] Can scroll left-right to see full diagram
  - [ ] Details panel narrows or becomes bottom sheet

### Mobile (375px)

- [ ] **Resize Browser to ~375px width** (or use DevTools device emulation):
  - [ ] Diagram requires horizontal scroll
  - [ ] Minimum width maintained (~1200px scrollable)
  - [ ] Details panel appears as bottom sheet (slides up from bottom)
  - [ ] Controls stack vertically or wrap to multiple rows

- [ ] **Tap Node** (if using touch device/emulation):
  - [ ] Details panel opens
  - [ ] Panel covers bottom 70% of screen
  - [ ] Close button (×) clearly visible and tappable

- [ ] **Tap Outside Panel** (if implemented):
  - [ ] Panel may close (check behavior)

### Mobile Touch Targets

- [ ] **All Buttons**: Minimum 44x44px (check with DevTools)
  - [ ] Scenario buttons
  - [ ] Case study buttons
  - [ ] Animation controls
  - [ ] Close button in panel

---

## ✅ Accessibility Compliance

### Color Contrast

- [ ] **Node Colors**:
  - [ ] Professional (blue fill): High contrast against dark background
  - [ ] Personal (blue outline): Visible stroke
  - [ ] Familiarity (gray): Still readable

- [ ] **Text**:
  - [ ] All labels readable (white text on dark background)
  - [ ] Details panel text clear (dark text on light background)

### Focus Indicators

- [ ] **Tab Through Elements**:
  - [ ] Every focused element has visible outline or highlight
  - [ ] Never "lose" focus (always know where you are)

### ARIA Attributes (DevTools Inspection)

- [ ] **Inspect Any Node** (DevTools):
  - [ ] Has `role="button"`
  - [ ] Has `aria-label` with descriptive text
  - [ ] Has `tabindex="0"`

- [ ] **Inspect Details Panel**:
  - [ ] Has `role="dialog"`
  - [ ] Has `aria-labelledby` or `aria-label`

- [ ] **Inspect Close Button**:
  - [ ] Has `aria-label="Close details panel"` or similar

---

## ✅ Data Integrity

### UBIAI Experience Classification

- [ ] **Hover or Click Any UBIAI Node** (e.g., feature-engineering, rag-system):
  - [ ] Experience badge shows "Internship/PFE" or "Professional Experience"
  - [ ] Project name: "UBIAI - AI/ML Platform"
  - [ ] Role: "NLP Engineering Intern (Feb-Oct 2022)" or similar
  - [ ] Description does NOT claim: "30% workflow efficiency", "25% deployment time", "92% accuracy"

### SignalForge Metrics

- [ ] **Click spark-batch or kafka Node**:
  - [ ] Description does NOT mention "50 workers" or unverified scale claims

### Production APIs

- [ ] **Click rest-apis Node**:
  - [ ] Description does NOT claim "99.9% uptime" (unless verified logs provided)

### No Invented Data

- [ ] **Random Sample 5 Nodes**:
  - [ ] All technologies listed are real (no "FakeDB", "RandomTool")
  - [ ] All project names match known projects (SignalForge, UBIAI, E-commerce Platform)
  - [ ] Experience classifications accurate (Professional vs Personal)

---

## ✅ Performance

### Page Load

- [ ] **Refresh Page** (Ctrl+R):
  - [ ] Page appears within ~500ms
  - [ ] Diagram renders immediately (no long blank screen)

### Animation Frame Rate

- [ ] **Watch Particles Move**:
  - [ ] Smooth motion (not choppy)
  - [ ] Consistent speed (no sudden jumps)

### Scenario Switching

- [ ] **Rapidly Click Scenario Buttons** (Complete → Batch → Streaming → ML → RAG → Complete):
  - [ ] Each switch is instant (<20ms perceived delay)
  - [ ] No lag or freezing

### Memory Leaks

- [ ] **Leave Animation Running 5 Minutes**:
  - [ ] Page remains responsive
  - [ ] No slowdown over time
  - [ ] Browser memory usage stable (check DevTools Memory tab if available)

---

## ✅ Cross-Browser Compatibility

### Chrome/Chromium

- [ ] All features work
- [ ] Canvas rendering smooth
- [ ] No console errors

### Firefox

- [ ] All features work
- [ ] SVG paths render correctly
- [ ] Bezier curves smooth (not jagged)

### Safari (macOS/iOS)

- [ ] All features work
- [ ] WebKit rendering correct
- [ ] Touch events work on iOS

### Edge

- [ ] All features work (should match Chrome behavior)

---

## 📋 Summary Checklist

After completing all sections above:

- [ ] **Milestone 2**: Static SVG rendering verified
- [ ] **Milestone 3**: Canvas animation verified
- [ ] **Milestone 4**: Interactions verified
- [ ] **Accessibility**: WCAG 2.1 AA compliance verified
- [ ] **Responsive**: Desktop, Tablet, Mobile verified
- [ ] **Data Integrity**: No unverified metrics, correct classifications
- [ ] **Performance**: Smooth, fast, no memory leaks
- [ ] **Cross-Browser**: Tested in at least 2 browsers

---

## 🐛 Issues Found

Record any issues discovered during manual testing:

**Issue #1:**
- **Description**: 
- **Steps to Reproduce**: 
- **Expected Behavior**: 
- **Actual Behavior**: 
- **Severity**: Critical / High / Medium / Low

---

## ✅ Sign-Off

- **Tester Name**: ___________________________
- **Date**: ___________________________
- **Environment**: 
  - OS: ___________________________
  - Browser: ___________________________
  - Viewport: ___________________________
- **Result**: ☐ PASS  ☐ FAIL (see issues above)

---

**Manual Testing Checklist Version**: 1.0.0  
**Milestone**: Phase 1 Complete (Milestones 1-4)
