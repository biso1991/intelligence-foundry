# How to Add "Schedule Meeting" to Your Portfolio

## ✅ Meeting Page Created!

**URL**: https://biso1991.github.io/intelligence-foundry/schedule-meeting.html

---

## 📋 Where to Add the Link

### Option 1: Add to Navigation (Recommended)

In `index.html`, find the nav section (around line 70-80) and add:

```html
<div class="nav-links" id="nav-links">
    <a href="#hero" class="nav-link">Home</a>
    <a href="#engineering-pillars" class="nav-link">Engineering</a>
    <a href="architecture-lab.html" class="nav-link">Architecture Lab</a>
    <a href="#projects" class="nav-link">Projects</a>
    <a href="schedule-meeting.html" class="nav-link">📅 Schedule Meeting</a> <!-- ADD THIS -->
    <a href="#contact" class="nav-link">Contact</a>
</div>
```

### Option 2: Add to Hero CTAs

In the hero section (around line 135), add a meeting button:

```html
<div class="hero-actions slide-in-up stagger-5">
    <a href="#engineering-pillars" class="btn btn-primary">
        <span>Explore My Engineering</span>
        <svg>...</svg>
    </a>
    <a href="schedule-meeting.html" class="btn btn-primary"> <!-- ADD THIS -->
        <span>📅 Schedule Meeting</span>
    </a>
    <a href="architecture-lab.html" class="btn btn-secondary">
        <span>Architecture Lab</span>
    </a>
</div>
```

### Option 3: Add to Contact Section

Find your contact section (search for "contact" in index.html) and add:

```html
<div class="contact-links">
    <a href="schedule-meeting.html" class="btn btn-primary" style="display: inline-block; margin-right: 1rem;">
        📅 Schedule a Meeting
    </a>
    <a href="mailto:bilelnasrinasri91@gmail.com" class="contact-link">
        <!-- existing email link -->
    </a>
</div>
```

---

## 🎨 Meeting Page Features

### 3 Meeting Types Available:

1. **Quick Consultation** (15 min)
   - Project scope discussion
   - Technical feasibility
   - Quick Q&A

2. **Technical Deep Dive** (30 min)
   - Architecture review
   - Tech stack recommendations
   - System design discussion
   - Live demo

3. **Project Discovery** (60 min)
   - Full requirements gathering
   - Roadmap creation
   - Timeline planning
   - Cost estimation

---

## 📧 Current Setup

**Currently configured for email booking**:
- Clicking any meeting type opens a modal
- User can email you directly
- Pre-filled email templates available

---

## 🔧 Optional: Add Calendly Integration

If you want automated scheduling with Calendly:

### 1. Sign up at Calendly.com (Free)

### 2. Create 3 event types:
- 15-minute consultation
- 30-minute deep dive
- 60-minute discovery

### 3. Update `schedule-meeting.html`

Find this section (around line 400):

```javascript
const meetingTypes = {
    'quick-consultation': {
        title: 'Schedule Quick Consultation (15 min)',
        calendlyUrl: 'https://calendly.com/YOUR_USERNAME/15min' // UPDATE THIS
    },
    'technical-deep-dive': {
        title: 'Schedule Technical Deep Dive (30 min)',
        calendlyUrl: 'https://calendly.com/YOUR_USERNAME/30min' // UPDATE THIS
    },
    'project-discovery': {
        title: 'Schedule Project Discovery (60 min)',
        calendlyUrl: 'https://calendly.com/YOUR_USERNAME/60min' // UPDATE THIS
    }
};
```

### 4. Uncomment Calendly widget (around line 370):

```html
<!-- Remove the comment tags around this -->
<div class="calendly-inline-widget" 
     data-url="https://calendly.com/YOUR_USERNAME/15min"
     style="min-width:320px;height:700px;">
</div>
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

---

## 🚀 Deploy Steps

```bash
cd /home/bilel/intelligence-foundry

# Add your changes to index.html (after adding the link)
git add index.html

# Commit
git commit -m "Add Schedule Meeting link to portfolio"

# Push
git push origin main

# GitHub Pages will deploy automatically in 1-2 minutes
```

---

## 🎯 What Recruiters/Clients Will See

1. **Professional scheduling page** with 3 clear options
2. **Your profile photo** and credentials
3. **Meeting descriptions** with bullet points
4. **Easy booking** via email or Calendly
5. **Contact alternatives** (email, GitHub, projects)
6. **Modern design** matching your portfolio

---

## 📊 Page Analytics (Optional)

To track meeting bookings, add Google Analytics:

```html
<!-- Add before </head> in schedule-meeting.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID');
</script>
```

---

## ✅ Testing Checklist

After deploying, test:

- [ ] Page loads correctly
- [ ] All 3 meeting cards display
- [ ] Clicking card opens modal
- [ ] Email links work
- [ ] Contact buttons work
- [ ] Page is responsive on mobile
- [ ] Back to Portfolio link works
- [ ] Profile image loads

---

## 💡 Pro Tips

### 1. Update Email Templates

The "Email Me Directly" button has a pre-filled subject and body. Customize it:

```html
<a href="mailto:bilelnasrinasri91@gmail.com?subject=Meeting Request&body=YOUR_CUSTOM_TEXT">
```

### 2. Add Availability Info

Add your typical availability to the contact section:

```html
<p style="color: var(--text-secondary);">
    Available: Monday-Friday, 9 AM - 6 PM (Your Timezone)
</p>
```

### 3. Add Calendar Preview

If using Google Calendar, embed availability:

```html
<iframe src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR"
        style="border:0" width="800" height="600">
</iframe>
```

---

## 🎨 Customization Options

### Change Meeting Durations

Edit the HTML to add/remove meetings:

```html
<div class="meeting-card" onclick="openScheduler('custom-meeting')">
    <div class="meeting-icon">💼</div>
    <h3 class="meeting-title">Custom Meeting</h3>
    <div class="meeting-duration">
        <span>45 minutes</span>
    </div>
    <!-- Add your content -->
</div>
```

### Change Colors

Matches your portfolio automatically, but you can adjust:

```css
:root {
    --primary-color: #00d4ff;     /* Your color */
    --secondary-color: #00ff88;   /* Your color */
}
```

---

## 📞 Support

If you need help:
1. Check browser console (F12) for errors
2. Test on https://biso1991.github.io/intelligence-foundry/schedule-meeting.html
3. Verify email link formats
4. Test on mobile devices

---

**Your meeting scheduler is ready! Add the link to your portfolio and start booking consultations!** 🚀
