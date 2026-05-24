# ADJ EduQuest Pro - Debug Journey

## Documenting Our Path to a Working Landing Page

**Date:** April 22, 2026  
**Project:** ADJ EduQuest Pro  
**Issue:** Blank white screen on localhost after creating Landing page

---

## Initial Stack

| Technology | Version |
|------------|---------|
| React | 19.2.5 |
| Vite | 8.0.9 |
| Tailwind CSS | 4.2.4 (initially) |
| React Router DOM | 7.14.2 |
| Lucide React | 1.8.0 |
| Zustand | 5.0.12 |
| TanStack Query | 5.99.2 |

---

## Issue #1: Tailwind CSS v4 PostCSS Plugin Error

### Symptom
```
[plugin:vite:css] [postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin. 
The PostCSS plugin has moved to a separate package...
```

### Root Cause
Tailwind CSS v4 completely changed how it integrates with PostCSS. The v4 package no longer exports a PostCSS plugin directly.

### Attempted Fixes
1. **First attempt:** Install `@tailwindcss/postcss` and update config → Created more issues
2. **Second attempt:** Downgrade to Tailwind v3.4.1 → Better, but not complete solution

### Lessons
- Tailwind v4 is NOT backward compatible with v3 configuration
- The `@tailwindcss/postcss` package is required for v4, but breaks v3 setups
- **Decision:** Downgrade to Tailwind v3.4.1 for stability

---

## Issue #2: React Router v7 Breaking Changes

### Symptom
Blank white screen with no console errors (silent failure)

### Root Cause
React Router v7 introduced major breaking changes:
- New package structure (`react-router` vs `react-router-dom`)
- Different bundling approach
- Incompatible with some Vite setups

### Fix
Downgrade to React Router v6.28.0:
```bash
npm install react-router-dom@6.28.0 --legacy-peer-deps
```

### Lessons
- React Router v7 is a complete rewrite, not a drop-in upgrade
- v6 is battle-tested and works reliably with Vite
- **Decision:** Stick with v6 until v7 ecosystem matures

---

## Issue #3: Lucide React Icon Missing Exports

### Symptom
```
Uncaught SyntaxError: The requested module '/node_modules/.vite/deps/lucide-react.js' 
does not provide an export named 'Instagram'
```

### Root Cause
Lucide React v1.8.0 is an older version that doesn't include many newer icons:
- ❌ `Instagram` - Not available
- ❌ `Linkedin` - Not available  
- ❌ `Twitter` - Not available

### Attempted Icons
| Icon | Available in v1.8.0? |
|------|---------------------|
| Bell | ✅ |
| BookOpen | ✅ |
| Brain | ✅ |
| Building2 | ✅ |
| CheckCircle | ✅ |
| ChevronRight | ✅ |
| GraduationCap | ✅ |
| Layers | ✅ |
| LayoutDashboard | ✅ |
| Medal | ✅ |
| Menu | ✅ |
| Sparkles | ✅ |
| Trophy | ✅ |
| X | ✅ |
| Globe | ✅ |
| Mail | ✅ |
| Instagram | ❌ |
| Linkedin | ❌ |
| Twitter | ❌ |

### Fix
Replace social icons with available alternatives:
```typescript
// Before:
Instagram, Linkedin, Twitter

// After:
Globe, Mail, Share2
```

### Lessons
- Always check icon availability in your installed version
- Lucide React version 1.x is older; v2+ has more icons
- **Alternative:** Use SVG icons directly for brand logos

---

## Issue #4: CSS @import Order (The Silent Killer)

### Symptom
Blank white screen. Console shows CSS warnings but no clear error.

### Root Cause
PostCSS/Tailwind CSS v3 requires `@import` statements to come BEFORE `@tailwind` directives.

### Wrong Order (Causes Crash)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url("https://api.fontshare.com/...");  /* ❌ Wrong! */
```

### Correct Order
```css
@import url("https://api.fontshare.com/...");  /* ✅ Correct! */
@import url("https://fonts.googleapis.com/...");

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Error Message
```
[vite:css][postcss] @import must precede all other statements 
(besides @charset or empty @layer)
```

### Lessons
- CSS @import order matters significantly with PostCSS
- Vite/Tailwind will fail silently if CSS processing errors occur
- **Debugging tip:** Always check the Network tab for 500 errors on CSS

---

## Issue #5: Vite Cache Issues

### Symptom
Changes not reflecting after fixes applied

### Root Cause
Vite aggressively caches dependencies in `node_modules/.vite`

### Fix
Clear Vite cache and restart:
```bash
rm -rf node_modules/.vite
npm run dev
```

On Windows PowerShell:
```powershell
Remove-Item -Recurse -Force node_modules/.vite
npm run dev
```

### Lessons
- Always clear Vite cache after major dependency changes
- Vite HMR can fail when fundamental config changes

---

## Issue #6: PowerShell Syntax Differences

### Symptom
Commands fail with "The token '&&' is not a valid statement separator"

### Root Cause
Windows PowerShell doesn't support `&&` or `||` operators like bash

### Bash (macOS/Linux)
```bash
npm install package && npm run dev
```

### PowerShell (Windows)
```powershell
npm install package; npm run dev
```

### Lessons
- Use semicolon `;` instead of `&&` in PowerShell
- Or run commands separately

---

## Final Working Stack

| Technology | Version | Notes |
|------------|---------|-------|
| React | 19.2.5 | Works with v6 router |
| Vite | 8.0.9 | Latest stable |
| Tailwind CSS | 3.4.1 | Downgraded from v4 |
| React Router DOM | 6.28.0 | Downgraded from v7 |
| Lucide React | 1.8.0 | Use only v1 icons |
| Zustand | 5.0.12 | Latest |
| TanStack Query | 5.99.2 | Latest |
| Framer Motion | 12.38.0 | Latest |

---

## Debugging Checklist for Future

When facing blank screen:

1. **Check browser console (F12)**
   - Look for import/export errors
   - Check for missing icon errors
   - Verify CSS processing errors

2. **Check terminal output**
   - Vite will show CSS/PostCSS errors
   - Look for "hmr update" messages
   - Watch for silent failures

3. **Verify CSS @import order**
   - Must precede @tailwind directives
   - Check for semicolons at end of URLs

4. **Clear Vite cache**
   - `rm -rf node_modules/.vite`
   - Restart dev server

5. **Check dependency versions**
   - React Router: prefer v6 over v7
   - Tailwind: v3 more stable than v4
   - Lucide: verify icon availability

6. **Check environment variables**
   - Supabase URL and Anon Key present?
   - `.env.local` file exists?

---

## Key Configuration Files

### postcss.config.js
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### tailwind.config.cjs
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E3FCC',
        'primary-hover': '#2D52E8',
        gold: '#F59E0B',
        surface: '#141827',
        deep: '#0F1117',
        'text-primary': '#F0F2FF',
        'text-secondary': '#9AA3C4',
      },
      fontFamily: {
        display: ['Clash Display', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### src/index.css
```css
/* MUST be in this order! */
@import url("https://api.fontshare.com/...");
@import url("https://fonts.googleapis.com/...");

@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Timeline of Fixes Applied

| Time | Fix Applied |
|------|-------------|
| 2:09 PM | Created Landing.tsx with 7 sections |
| 2:20 PM | Attempted Tailwind v4 → v3 downgrade |
| 2:30 PM | Updated postcss.config.js |
| 3:00 PM | React Router v7 → v6 downgrade |
| 8:51 PM | Fixed Instagram icon → Twitter |
| 8:55 PM | Fixed Linkedin icon → Globe |
| 9:06 PM | Fixed CSS @import order (critical fix) |
| 9:29 PM | Page finally rendered successfully |

---

## Lessons Learned

1. **Newer is not always better** - Tailwind v4 and React Router v7 caused major issues
2. **CSS order matters** - A simple @import placement broke everything
3. **Icon libraries vary by version** - Always verify availability
4. **Cache is the enemy** - Vite cache hid our fixes multiple times
5. **PowerShell ≠ Bash** - Syntax differences caused command failures
6. **Silent failures are real** - Blank screen with no errors is usually CSS/config

---

## Next Steps for Project

1. ✅ Landing page renders correctly
2. ⏳ Implement actual auth pages (Login/Register)
3. ⏳ Connect Supabase for real data
4. ⏳ Build dashboard components
5. ⏳ Add responsive mobile menu functionality

---

**Document Version:** 1.0  
**Author:** Cascade AI Assistant  
**Status:** ✅ Landing Page Working
