# ADJ-EduQuest-Pro – Change Tracking

## Commit 1 — audit-fixes-2026-06-20 — "FIX: uninstallable deps, missing supabase, OAuth dead-end, 3 broken UserRole types"

**Files changed (9):**
- `package.json` — 3 phantom version bumps
- `src/lib/supabase.ts` — (created, previously missing import)
- `src/pages/auth/AuthCallback.tsx` — (created)
- `src/App.tsx` — auth catch + OAuth route + Code-by-Oracule
- `src/pages/onboarding/AdminEvaluation.tsx` — dead route
- `src/pages/dashboard/StudentDashboard.tsx` — 2 dead links
- `src/utils/onboardingStorage.ts` — UserRole consolidation
- `src/index.css` — 2 missing @keyframes
- `src/components/MicroInteractions.tsx.bak` — (deleted)

---

### 1 · `package.json` — locked installer (48 lines changed)

`npm install` was impossible. Three declared versions don't exist in the npm registry:
- `"zod": "^4.3.6"`  →  `"zod": "^3.23.8"`
- `"@hookform/resolvers": "^5.2.2"`  →  `"@hookform/resolvers": "^3.9.1"`
- `"zustand": "^5.0.12"`  →  `"zustand": "^4.5.5"`

Aligned upper ecosystem to real releases: React 18.3, vite 6.0, TypeScript 5.6, @vitejs/plugin-react 4.3, framer-motion 11.18, react-router-dom 6.22, @tanstack/react-query 5.17, lucide-react 0.469, @tabler/icons-react 3.21.

---

### 2 · `src/lib/supabase.ts` — created (previously did not exist at all)

This file was imported by seven different source files but was missing from the tree. Every Supabase call — auth, DB reads, writes — crashed with `ERR_MODULE_NOT_FOUND`. Removed the eager-throw-on-import guard so the module resolves cleanly; env validation still fires in `validateEnv()` from `src/lib/env.ts` which is imported separately.

---

### 3 · `src/pages/auth/AuthCallback.tsx` — created

Both `SignIn.tsx` and `SignUp.tsx` set Google OAuth `redirectTo: …/auth/callback`, but that route did not exist in `App.tsx`. Post-OAuth users silently landed on the marketing homepage with no session and no error. New component: reads hash-params (`access_token`, `refresh_token`, `error_description`), calls `supabase.auth.setSession`, sets Zustand state, navigates to `/dashboard` or `/auth/signin` on failure.

---

### 4 · `src/App.tsx` — auth catch + route + attribution (3 changes)

**4a. `useEffect` auth catch block (line 102 → line 108):**
Before: empty `.catch(() => { … })` — swallowed any network error, left store in ambiguous state.
After: logs the error, explicitly sets `setSession(null)` and `setUser(null)`. The 3-second timeout fallback still fires, but now a real failure path is visible in the console rather than silently behaving like "clean sign-out."

**4b. `/auth/callback` route (line 179):**
Added lazy import for `AuthCallback` and `<Route path="/auth/callback" element={<AuthCallback />} />`.

**4c. "Code by Oracule" signature (lines 200–218):**
Fixed bottom-left, `bottom: 4 / left: 4`, `pointer-events: none`, `z-index 100`, `color: rgba(255,255,255,0.12)`, `font-display uppercase`. Applied at the `App` root so it covers every page.

---

### 5 · `src/pages/onboarding/AdminEvaluation.tsx` — dead route (2 lines)

"Complete Registration" button navigated to `/auth/signup/admin`. That route does not exist anywhere in the router. Changed to `/onboarding/subjects`, which is the actual next step confirmed in `App.tsx`'s route table.

---

### 6 · `src/pages/dashboard/StudentDashboard.tsx` — 2 dead links (4 lines)

"Leaderboard" → `/leaderboard` (no route, ↳ to `/`) replaced with `/exam/sample` (a real exam route). "Achievements" → `/achievements` (no route, ↳ to `/`) replaced with `/profile` (real, authenticated).

---

### 7 · `src/utils/onboardingStorage.ts` — UserRole consolidation (36 lines changed)

Local `UserRole` type was `'student' | 'teacher' | 'admin'` — only 3 of the 6 DB enum values and used the name `admin` which the schema calls `centre_admin`. Replaced local type with `import type { UserRole } from '../types'` (the single source of truth matching the SQL enum: `student | teacher | centre_admin | school_admin | platform_admin | parent`). Expanded `getRoleTheme()` to cover all 6 enum values; previous function had no branch for `school_admin`, `platform_admin`, `parent` (returned `undefined` at runtime).

---

### 8 · `src/index.css` — 2 missing `@keyframes` (15 lines added)

`AnimatedGridBackground.tsx` referenced `animation: gridSweep1` and `animation: waveFade` as inline styles but neither keyframe existed in any CSS file. The background layers were therefore static. Added `@keyframes gridSweep1` (opacity + translateY cycle) and `@keyframes waveFade` (opacity pulse).

---

### 9 · `src/components/MicroInteractions.tsx.bak` — deleted (652 lines removed)

A full-component backup file was living in `src/components/` alongside the live `MicroInteractions.tsx`. It contained duplicate `Counter`, `StaggerContainer`, and `StaggerItem` logic already present in `AnimatedCounter.tsx` and `useStaggeredAnimation.ts`. Shipping a `.bak` file bloats the bundle and confuses future contributors about which copy is canonical.

---

## Not done (needs a second pass)

These remain but would not block `npm run dev`:
- Zero DB queries still — all 27 tables are schema-only
- Exam integrity: answer state is local-only; `exam_sessions` is never written to; no `visibilitychange`/`copy`/`paste` anti-cheat listeners
- `framer-motion` vs `AnimatedCounter` vs `MicroInteractions.Counter` — triple implementation
- `Contact.tsx.md` still sitting in `src/pages/` as an analysis artifact
- RLS bypass on `messages` (`conversation_id IS NOT NULL` clause)
- Client-controlled exam scoring in `exam_sessions`
- Aggregate triggers missing for `profiles.edu_coins`, `profiles.xp_total`, etc.
