#!/bin/bash

echo "╔════════════════════════════════════════════════════════════════════════╗"
echo "║           Testing Intelligence Foundry Portfolio                       ║"
echo "╚════════════════════════════════════════════════════════════════════════╝"
echo ""

# Check all HTML files exist
echo "📄 Checking portfolio files..."
files=("index.html" "cv.html" "hire-me.html" "projects.html" "schedule-meeting.html" "architecture-lab.html")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $file exists"
    else
        echo "   ❌ $file MISSING!"
    fi
done
echo ""

# Check JavaScript file
echo "🔧 Checking JavaScript fix..."
if grep -q "if (href && href.startsWith('#'))" js/main.js; then
    echo "   ✅ Navigation fix applied in js/main.js"
else
    echo "   ❌ Navigation fix NOT found!"
fi
echo ""

# Check CSS files
echo "🎨 Checking CSS files..."
css_files=("css/design-tokens.css" "css/components.css" "css/animations.css")
for file in "${css_files[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $file exists"
    else
        echo "   ❌ $file MISSING!"
    fi
done
echo ""

# Check marketing materials
echo "📋 Checking marketing materials..."
docs=("LINKEDIN_PROFILE_TEMPLATE.md" "UPWORK_PROFILE_TEMPLATE.md" "EMAIL_TEMPLATES.md" "README.md")
for doc in "${docs[@]}"; do
    if [ -f "$doc" ]; then
        echo "   ✅ $doc exists"
    else
        echo "   ❌ $doc MISSING!"
    fi
done
echo ""

# Check git status
echo "📦 Checking git status..."
if git status &>/dev/null; then
    echo "   ✅ Git repository initialized"
    echo "   📍 Branch: $(git branch --show-current)"
    echo "   📝 Last commit: $(git log -1 --oneline)"
else
    echo "   ❌ Not a git repository!"
fi
echo ""

echo "╔════════════════════════════════════════════════════════════════════════╗"
echo "║                      ✅ PORTFOLIO VERIFICATION                          ║"
echo "╚════════════════════════════════════════════════════════════════════════╝"
echo ""
echo "🌐 Live Portfolio: https://biso1991.github.io/intelligence-foundry/"
echo ""
echo "⏰ If you just pushed changes, wait 2-3 minutes for GitHub Pages to update."
echo "   Then hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)"
echo ""
echo "🚀 Ready to launch!"
