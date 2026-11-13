# Quick Reference Guide - Intelligence Foundry

## 🌐 Live URLs

- **Main Portfolio:** https://biso1991.github.io/intelligence-foundry/
- **Case Study:** https://biso1991.github.io/intelligence-foundry/case-study-airflow.html
- **Architecture Lab:** https://biso1991.github.io/intelligence-foundry/architecture-lab.html

## 📂 File Structure

```
intelligence-foundry/
├── index.html                     # Main portfolio with Engineering Pillars
├── case-study-airflow.html        # Airflow case study (Phase C)
├── architecture-lab.html          # Architecture diagrams (Phase B)
├── css/
│   ├── design-tokens.css          # Design system variables
│   ├── animations.css             # Animation styles
│   ├── components.css             # Reusable components
│   ├── case-study.css             # Case study page styling
│   └── pillars.css                # Engineering Pillars styling
├── js/
│   ├── core/
│   │   ├── engine.js
│   │   └── particles.js
│   ├── worlds/
│   │   └── data-universe.js
│   └── main.js
├── images/
│   └── profile-photo.png
└── docs/
    ├── TRANSFORMATION_COMPLETE.md      # Full transformation summary
    ├── PHASE_COMPLETION_SUMMARY.md     # Detailed phase breakdown
    └── QUICK_REFERENCE.md              # This file
```

## 🎯 Main Sections

### 1. Hero Section
- **Name:** Bilel Nasri
- **Tagline:** "Engineering the Intelligence Behind Data-Driven Systems"
- **CTAs:**
  - Primary: "Explore My Engineering" → #engineering-pillars
  - Secondary: "Architecture Lab" → architecture-lab.html

### 2. Engineering Pillars Section (NEW)
- **Location:** index.html#engineering-pillars
- **Content:**
  - Three Pillars: Data Foundations, Intelligence Layer, Production Systems
  - 12 Capabilities with experience levels
  - 6 Engineering Principles
  - Links to case studies and architecture lab

### 3. Projects Section
- **Location:** index.html#projects
- **Projects:**
  - Airflow Data Scraping Pipeline → Links to case-study-airflow.html + GitHub
  - Advanced NLP with LSTM Networks → Links to GitHub
  - Agricultural Marketplace Platform → Links to GitHub

### 4. Contact Section
- **Email:** binasri1991@gmail.com
- **Phone:** +216 27 870 216
- **Location:** Ariana, Tunisia
- **Social:** GitHub, LinkedIn

## 🏗️ Three Engineering Pillars

### Pillar 1: Data Foundations
1. **Pipeline Orchestration** (Expert) - Airflow, Prefect, DAGs
2. **Distributed Processing** (Advanced) - Spark, PySpark, Dask
3. **Data Storage & Modeling** (Expert) - PostgreSQL, MongoDB, Redis, S3
4. **Stream Processing** (Proficient) - Kafka, Event Streaming

### Pillar 2: Intelligence Layer
1. **Deep Learning & NLP** (Expert) - PyTorch, TensorFlow, LSTM, Transformers
2. **Large Language Models** (Advanced) - LangChain, OpenAI, RAG, Vector DBs
3. **ML Operations** (Advanced) - MLflow, W&B, DVC
4. **Classical ML** (Expert) - scikit-learn, XGBoost, Feature Engineering

### Pillar 3: Production Systems
1. **API Development** (Expert) - FastAPI, Django, Flask, REST
2. **Containerization** (Expert) - Docker, Docker Compose, Kubernetes
3. **Testing & Reliability** (Advanced) - pytest, unittest, CI/CD
4. **Cloud & Infrastructure** (Proficient) - AWS, GCP, Terraform

## 🎨 Engineering Principles

1. 🛡️ **Reliability First** - Idempotent operations, error handling, retry mechanisms
2. 🔬 **Reproducibility** - Version control, containerization, declarative configs
3. 📊 **Observability** - Structured logging, metrics, monitoring dashboards
4. 🧪 **Test Everything** - Unit/integration/e2e tests for confidence
5. 📈 **Incremental Improvement** - Ship, measure, iterate, compound improvements
6. ⚖️ **Graceful Degradation** - Fallback mechanisms, circuit breakers

## 🏛️ Architecture Lab (4 Diagrams)

### 1. Data Engineering Pipeline
```
Raw Data → Kafka → Airflow → Spark → PostgreSQL → Redis → API
```
**Design Decisions:**
- Decoupled stages for independent scaling
- Idempotent operations for reliability
- Comprehensive monitoring at each stage

### 2. ML Pipeline Architecture
```
Data → Feature Engineering → Training → Model Registry → Serving → Monitoring
```
**Design Decisions:**
- Experiment tracking with MLflow
- Model versioning for rollback capability
- A/B testing for model evaluation

### 3. RAG System Architecture
```
User Query → Retrieval → Vector DB → Context → LLM → Response
```
**Design Decisions:**
- Semantic search with vector embeddings
- Context injection for accurate responses
- Intelligent caching for latency reduction

### 4. Production API Architecture
```
Load Balancer → API Servers → Cache → Services → Databases
```
**Design Decisions:**
- Horizontal scaling with Kubernetes
- Redis caching for read-heavy operations
- Comprehensive monitoring with Prometheus

## 📊 Case Study: Airflow Data Scraping Pipeline

**URL:** https://biso1991.github.io/intelligence-foundry/case-study-airflow.html

### Tech Stack
- **Python** - Core scripting language
- **Apache Airflow** - Workflow orchestration
- **PostgreSQL** - Data persistence
- **Docker** - Containerization
- **pytest** - Testing framework

### Architecture
```
DAG Definition → Task Operators → PostgreSQL Database → Docker Container
```

### Engineering Decisions
1. **Idempotent Operations** - Same input = same output, safe retries
2. **Error Handling & Retries** - Automatic retry on transient failures
3. **Containerization** - Reproducible development and deployment
4. **Comprehensive Testing** - Unit + integration + idempotent tests

### Testing Strategy
- **Unit Tests:** Individual task validation
- **Integration Tests:** DAG workflow verification
- **Idempotent Tests:** Multiple run consistency
- **Test Coverage:** 80%+ code coverage

### Results
- ✅ Automated scheduling with Airflow DAG
- ✅ Reliable data ingestion with error handling
- ✅ Data integrity through idempotent operations
- ✅ Reproducible environments with Docker

## 🎨 Design System

### Colors
- **Primary:** `#00d4ff` (Cyan)
- **Accent:** `#a855f7` (Purple)
- **Background:** `#0a0e1a` (Dark Blue)
- **Surface:** `#111827` (Dark Gray)
- **Text Primary:** `#f8fafc` (White)

### Typography
- **Body:** Inter (300-700 weights)
- **Code:** JetBrains Mono (400-600 weights)

### Spacing
- **xs:** 8px
- **sm:** 12px
- **md:** 16px
- **lg:** 24px
- **xl:** 32px
- **xxl:** 48px

## 🔧 Local Development

### Start Local Server
```bash
cd /home/bilel/Desktop/intelligence-foundry
python3 -m http.server 8080
# Visit: http://localhost:8080
```

### Git Commands
```bash
# Check status
git status

# Stage changes
git add -A

# Commit
git commit -m "Your message"

# Push to GitHub
git push origin main

# View commit history
git log --oneline --graph -10
```

### CSS Cache Busting
Update version numbers in index.html:
```html
<link rel="stylesheet" href="css/design-tokens.css?v=2.0.1">
<link rel="stylesheet" href="css/pillars.css?v=2.0.1">
```

## 📱 Responsive Breakpoints

- **Desktop:** 1024px and above
- **Tablet:** 768px - 1023px
- **Mobile:** 480px - 767px
- **Small Mobile:** Below 480px

## 🚀 Deployment

### Automatic Deployment
- **Trigger:** Push to `main` branch
- **Platform:** GitHub Pages
- **URL:** https://biso1991.github.io/intelligence-foundry/
- **CDN:** Fastly (10-minute cache)

### Manual Deployment Steps
1. Make changes to HTML/CSS/JS files
2. Test locally with `python3 -m http.server 8080`
3. Stage changes: `git add -A`
4. Commit: `git commit -m "Description"`
5. Push: `git push origin main`
6. Wait 10-15 minutes for CDN cache refresh
7. Verify at live URL

## 🐛 Troubleshooting

### Cache Issues
**Problem:** Changes not appearing on live site  
**Solution:**
1. Wait 10-15 minutes for CDN cache expiry
2. Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
3. Try incognito/private browsing mode
4. Add `?v=timestamp` to URL (e.g., `?v=20250119`)

### Mermaid Diagrams Not Rendering
**Problem:** Architecture diagrams not showing  
**Solution:**
1. Check browser console for errors
2. Verify Mermaid.js CDN is accessible: `https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js`
3. Confirm initialization script is in `<head>`:
```javascript
mermaid.initialize({ 
    startOnLoad: true,
    theme: 'dark'
});
```

### Responsive Design Issues
**Problem:** Layout broken on mobile  
**Solution:**
1. Check viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
2. Test media queries in browser DevTools
3. Verify CSS Grid fallbacks for older browsers

## 📈 Analytics & Monitoring

### GitHub Pages Stats
- View traffic: GitHub repo → Insights → Traffic
- Track visitors, views, clones, referrers

### Browser DevTools
- **Performance:** Chrome DevTools → Lighthouse
- **Responsiveness:** DevTools → Device Toolbar
- **Console:** Check for JavaScript errors

## 🔐 Security Best Practices

- ✅ No API keys or secrets in code
- ✅ Contact information public (professional email)
- ✅ GitHub repo is public (portfolio showcase)
- ✅ No sensitive data in commits

## 📚 Documentation

- **TRANSFORMATION_COMPLETE.md** - Full transformation summary
- **PHASE_COMPLETION_SUMMARY.md** - Detailed phase breakdown
- **UPGRADE_PLAN_V2.md** - Original implementation plan
- **QUICK_REFERENCE.md** - This quick reference guide

## 🤝 Contact Information

- **Email:** binasri1991@gmail.com
- **Phone:** +216 27 870 216
- **GitHub:** https://github.com/biso1991
- **LinkedIn:** https://www.linkedin.com/in/bilel-n-2b9ba8215/
- **Location:** Ariana, Tunisia

---

**Last Updated:** 2025-01-XX  
**Portfolio Version:** 2.0.0  
**Status:** ✅ Production Ready
