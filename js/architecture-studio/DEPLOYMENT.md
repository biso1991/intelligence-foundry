# Deployment Guide - System Architecture Studio

## Overview

This guide covers deploying the System Architecture Studio to various hosting platforms. The application is a static website with no backend requirements, build steps, or external dependencies.

---

## Prerequisites

### Files Required

All files must be deployed together to maintain relative path references:

```
intelligence-foundry/
├── architecture-studio.html                    # Main HTML file
├── js/
│   └── architecture-studio/
│       └── architectures/
│           └── intelligence-platform.js        # Data configuration
└── css/
    ├── design-tokens.css                       # Design system
    └── animations.css                          # Animation library
```

### Verification Before Deployment

1. **Run Validation**:
   ```bash
   cd js/architecture-studio
   npm run validate
   ```
   Expected output: `✅ VALIDATION PASSED`

2. **Test Locally**:
   ```bash
   python3 -m http.server 8888
   # Open http://localhost:8888/architecture-studio.html
   ```

3. **Manual Testing Checklist**:
   - [ ] All 36 nodes render
   - [ ] Animation runs smoothly
   - [ ] Tooltips appear on hover
   - [ ] Details panel opens on click
   - [ ] Scenario filtering works
   - [ ] Case study highlighting works
   - [ ] No console errors
   - [ ] Mobile horizontal scroll works

---

## Deployment Options

### Option 1: GitHub Pages (Recommended for Portfolio)

**Pros**:
- Free hosting for public repositories
- Custom domain support
- Automatic HTTPS
- GitHub integration

**Steps**:

1. **Commit All Files** (if not already):
   ```bash
   git add architecture-studio.html
   git add js/architecture-studio/
   git add css/
   git commit -m "feat: add System Architecture Studio"
   ```

2. **Push to GitHub**:
   ```bash
   git push origin feature/architecture-studio
   ```

3. **Merge to Main** (when ready):
   ```bash
   git checkout main
   git merge feature/architecture-studio
   git push origin main
   ```

4. **Enable GitHub Pages**:
   - Go to repository **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: **main** / **root**
   - Click **Save**

5. **Access Your Site**:
   - URL: `https://[username].github.io/[repo-name]/architecture-studio.html`
   - Example: `https://bilel-nasri.github.io/intelligence-foundry/architecture-studio.html`

6. **Custom Domain** (Optional):
   - Add CNAME file to repository root: `echo "yourdomain.com" > CNAME`
   - Configure DNS:
     - Type: `CNAME`
     - Name: `www` (or `@` for apex domain)
     - Value: `[username].github.io`
   - Enable **Enforce HTTPS** in GitHub Pages settings

**Expected Deploy Time**: 1-2 minutes

---

### Option 2: Netlify

**Pros**:
- Instant preview URLs
- Automatic HTTPS
- Form handling (for future contact forms)
- Serverless functions (for future backend)

**Steps**:

1. **Create Netlify Account**: https://app.netlify.com/signup

2. **Deploy via Git** (Recommended):
   - Click **Add new site** → **Import an existing project**
   - Connect to GitHub
   - Select repository
   - Build settings:
     - **Build command**: (leave empty)
     - **Publish directory**: `/` (root)
   - Click **Deploy site**

3. **Deploy via Drag-and-Drop** (Quick Test):
   - Zip entire `intelligence-foundry` directory
   - Drag ZIP to Netlify dashboard
   - Instant deployment

4. **Access Your Site**:
   - URL: `https://[random-name].netlify.app/architecture-studio.html`
   - Custom domain available in **Domain settings**

**Expected Deploy Time**: 30 seconds

---

### Option 3: Vercel

**Pros**:
- Zero-config deployment
- Automatic HTTPS
- Edge network (fast global delivery)
- Preview deployments for PRs

**Steps**:

1. **Create Vercel Account**: https://vercel.com/signup

2. **Deploy via Git**:
   - Click **Add New Project**
   - Import Git repository
   - Framework Preset: **Other** (no framework)
   - Root Directory: `/` (leave as project root)
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Click **Deploy**

3. **Access Your Site**:
   - URL: `https://[project-name].vercel.app/architecture-studio.html`

**Expected Deploy Time**: 30-60 seconds

---

### Option 4: AWS S3 + CloudFront (Enterprise)

**Pros**:
- Highly scalable
- Fine-grained access control
- CDN integration
- Low cost (<$1/month for typical traffic)

**Steps**:

1. **Create S3 Bucket**:
   ```bash
   aws s3 mb s3://architecture-studio-yourname
   ```

2. **Configure Bucket for Static Hosting**:
   ```bash
   aws s3 website s3://architecture-studio-yourname \
     --index-document architecture-studio.html
   ```

3. **Set Bucket Policy** (public read):
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [{
       "Sid": "PublicReadGetObject",
       "Effect": "Allow",
       "Principal": "*",
       "Action": "s3:GetObject",
       "Resource": "arn:aws:s3:::architecture-studio-yourname/*"
     }]
   }
   ```

4. **Upload Files**:
   ```bash
   cd /path/to/intelligence-foundry
   aws s3 sync . s3://architecture-studio-yourname \
     --exclude ".git/*" \
     --exclude "node_modules/*"
   ```

5. **Create CloudFront Distribution** (Optional, for HTTPS + CDN):
   - Origin Domain: `architecture-studio-yourname.s3-website-[region].amazonaws.com`
   - Default Root Object: `architecture-studio.html`
   - Viewer Protocol Policy: **Redirect HTTP to HTTPS**
   - Enable **Compress Objects Automatically**

6. **Access Your Site**:
   - S3: `http://architecture-studio-yourname.s3-website-[region].amazonaws.com/architecture-studio.html`
   - CloudFront: `https://[distribution-id].cloudfront.net/architecture-studio.html`

**Expected Deploy Time**: 5-10 minutes (S3), 15-30 minutes (CloudFront propagation)

---

### Option 5: Self-Hosted (VPS/Dedicated Server)

**Pros**:
- Full control
- No third-party dependencies
- Can integrate with existing infrastructure

**Steps**:

1. **Install Web Server** (Nginx example):
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. **Copy Files to Server**:
   ```bash
   scp -r /path/to/intelligence-foundry user@your-server:/var/www/html/
   ```

3. **Configure Nginx**:
   ```nginx
   server {
     listen 80;
     server_name yourdomain.com;
     root /var/www/html/intelligence-foundry;
     index architecture-studio.html;
     
     location / {
       try_files $uri $uri/ =404;
     }
     
     # Enable gzip compression
     gzip on;
     gzip_types text/html text/css application/javascript image/svg+xml;
   }
   ```

4. **Enable HTTPS** (Let's Encrypt):
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

5. **Restart Nginx**:
   ```bash
   sudo systemctl restart nginx
   ```

6. **Access Your Site**:
   - URL: `https://yourdomain.com/architecture-studio.html`

**Expected Deploy Time**: 30-60 minutes (initial setup)

---

## Post-Deployment Verification

### Automated Tests (CI/CD)

If deploying to GitHub Pages with Actions:

```yaml
# .github/workflows/test-and-deploy.yml
name: Test and Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '22'
      
      - name: Install dependencies
        working-directory: js/architecture-studio
        run: npm install
      
      - name: Install Playwright
        working-directory: js/architecture-studio
        run: npx playwright install --with-deps
      
      - name: Run tests
        working-directory: js/architecture-studio
        run: npm test
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: js/architecture-studio/playwright-report/
  
  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

### Manual Verification

After deployment, verify each feature:

**Basic Rendering**:
- [ ] Open deployed URL in browser
- [ ] Page title correct
- [ ] SVG diagram visible
- [ ] All 36 nodes render
- [ ] All 37 connections render
- [ ] No broken styles (check DevTools Console)

**Animation**:
- [ ] Particles visible and moving
- [ ] Pause/Play controls work
- [ ] Animation respects reduced motion preference

**Interactions**:
- [ ] Hover tooltips appear (desktop)
- [ ] Click opens details panel
- [ ] Scenario filtering works
- [ ] Case study highlighting works
- [ ] Keyboard navigation works (Tab, Enter, Escape)

**Mobile**:
- [ ] Open on mobile device or DevTools device emulation
- [ ] Horizontal scroll enabled
- [ ] Tap opens details panel
- [ ] Bottom sheet appears (not sidebar)
- [ ] Touch targets adequate (44x44px minimum)

**Cross-Browser** (if possible):
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari

**Performance**:
- [ ] Page loads in <2 seconds
- [ ] Animation runs at 30+ FPS
- [ ] No console errors or warnings

---

## Performance Optimization

### Enable Compression

**Nginx**:
```nginx
gzip on;
gzip_types text/html text/css application/javascript image/svg+xml;
gzip_min_length 1000;
```

**Apache**:
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml
</IfModule>
```

### Set Cache Headers

**Nginx**:
```nginx
location ~* \.(js|css|svg)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```

**CloudFront**:
- Cache Policy: **CachingOptimized**
- TTL: Min=0, Max=31536000, Default=86400

### CDN Integration

- **Cloudflare**: Free plan includes CDN + DDoS protection
- **AWS CloudFront**: Enterprise-grade CDN
- **Netlify/Vercel**: Built-in CDN included

---

## Custom Domain Setup

### DNS Configuration

For `architecture.yourdomain.com`:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | architecture | [hosting-provider-url] | 3600 |

Examples:
- **GitHub Pages**: `[username].github.io`
- **Netlify**: `[site-name].netlify.app`
- **Vercel**: `[project-name].vercel.app`

### SSL/TLS Certificate

All recommended hosting providers offer free automatic HTTPS:
- **GitHub Pages**: Automatic (Let's Encrypt)
- **Netlify**: Automatic (Let's Encrypt)
- **Vercel**: Automatic (Let's Encrypt)
- **CloudFront**: Free AWS Certificate Manager cert

---

## Monitoring & Analytics

### Google Analytics

Add to `<head>` in `architecture-studio.html`:

```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Plausible Analytics (Privacy-Friendly Alternative)

```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

### Uptime Monitoring

- **UptimeRobot**: Free monitoring (50 monitors, 5-minute checks)
- **Pingdom**: Free tier available
- **StatusCake**: Free plan with 10 tests

---

## Troubleshooting

### Issue: Page Shows 404 Not Found

**Cause**: Incorrect file path or missing files

**Solution**:
- Verify `architecture-studio.html` is in repository root
- Check all CSS/JS paths are relative: `./css/design-tokens.css`, `./js/architecture-studio/architectures/intelligence-platform.js`
- Confirm GitHub Pages is pointing to correct branch and directory

### Issue: Animation Not Working

**Cause**: Canvas API not supported or JavaScript error

**Solution**:
- Open DevTools Console, check for errors
- Verify browser supports Canvas (all modern browsers do)
- Check `intelligence-platform.js` loaded correctly (Network tab)

### Issue: Nodes Not Clickable on Mobile

**Cause**: Touch events not properly handled or viewport too small

**Solution**:
- Verify `pointer-events: none` only on canvas, not on SVG
- Check viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- Increase node radius if too small: `<circle r="20" />` → `<circle r="25" />`

### Issue: Styles Not Loading

**Cause**: CSP (Content Security Policy) blocking or incorrect paths

**Solution**:
- Check browser DevTools Console for CSP errors
- Update CSP meta tag to allow inline styles: `style-src 'self' 'unsafe-inline'`
- Verify CSS files are served correctly (Network tab)

### Issue: High Bounce Rate or Low Engagement

**Cause**: Unclear purpose or poor mobile experience

**Solution**:
- Add introductory text above diagram
- Ensure mobile horizontal scroll is smooth
- Add loading indicator if page is slow
- Test on actual mobile devices, not just emulation

---

## Rollback Procedure

### GitHub Pages

1. **Revert to Previous Commit**:
   ```bash
   git revert HEAD
   git push origin main
   ```

2. **Or Switch to Specific Commit**:
   ```bash
   git checkout [commit-hash]
   git push origin main --force
   ```

### Netlify/Vercel

- Go to **Deployments** → Select previous successful deployment → **Publish deploy**

### AWS S3

- Enable **Versioning** on bucket
- Restore previous version of files via S3 console

---

## Maintenance Schedule

### Regular Updates (Every 3 Months)

- [ ] Review architecture configuration for accuracy
- [ ] Remove outdated projects or technologies
- [ ] Add new projects if applicable
- [ ] Run full test suite
- [ ] Check for broken links or images
- [ ] Review analytics for user behavior insights

### Dependency Updates (Every 6 Months)

- [ ] Update Playwright: `npm update @playwright/test`
- [ ] Update axe-core: `npm update @axe-core/playwright`
- [ ] Re-run test suite after updates
- [ ] Check for browser compatibility changes

### Security Audits (Annually)

- [ ] Review CSP headers
- [ ] Check for XSS vulnerabilities in configuration data
- [ ] Verify HTTPS enforcement
- [ ] Review access logs for suspicious activity

---

## Support & Contact

For deployment issues:

1. **Check Documentation**: Review this guide and `README.md`
2. **Verify Locally**: Test on `localhost` before debugging deployment
3. **Browser DevTools**: Console, Network, and Elements tabs reveal most issues
4. **Hosting Provider Docs**:
   - GitHub Pages: https://docs.github.com/pages
   - Netlify: https://docs.netlify.com
   - Vercel: https://vercel.com/docs
   - AWS: https://docs.aws.amazon.com/s3/

---

**Deployment Guide Version**: 1.0.0  
**Last Updated**: Milestone 5 (Testing & Documentation)  
**Recommended Hosting**: GitHub Pages (for portfolio) or Netlify (for advanced features)
