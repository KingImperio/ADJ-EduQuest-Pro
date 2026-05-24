# ADJ EduQuest — Master Build Plan
> The complete technical sequential roadmap for building the ADJ EduQuest platform  
> Version 1.0 | DEVCOUNI | Confidential | 2026  
> Feed this document in phases to your AI coding assistant (Windsurf + Gemini)

---

## Table of Contents

1. [Platform Vision Summary](#1-platform-vision-summary)
2. [Design System & Colour Palette](#2-design-system--colour-palette)
3. [Full Tech Stack](#3-full-tech-stack)
4. [Architecture Overview](#4-architecture-overview)
5. [Database Schema — Complete](#5-database-schema--complete)
6. [Build Phases — Sequential](#6-build-phases--sequential)
   - Phase 0: Foundation & Tooling
   - Phase 1: Auth, Centres & Identity
   - Phase 2: Exam Engine
   - Phase 3: Content Ecosystem
   - Phase 4: Social & Communication Layer
   - Phase 5: Gamification & Economy
   - Phase 6: AI Integration — Atlas & Platform AI
   - Phase 7: TalentFlow Layer
   - Phase 8: Mobile App (React Native / Expo)
   - Phase 9: Payments & Wallet
   - Phase 10: Analytics & Insights
   - Phase 11: Polish, PWA & Performance
   - Phase 12: Beta, Launch & Scale
7. [File Export System (Legacy Compatibility)](#7-file-export-system-legacy-compatibility)
8. [AI Prompting Strategy for Windsurf](#8-ai-prompting-strategy-for-windsurf)
9. [Environment Variables Master List](#9-environment-variables-master-list)
10. [Folder Structure](#10-folder-structure)

---

## 1. Platform Vision Summary

ADJ EduQuest is the complete educational operating system for Nigeria and emerging markets.  
It is five interconnected layers operating as one platform:

| Layer | What it does |
|-------|-------------|
| **Assessment** | Exam creation, delivery, grading, integrity monitoring, results |
| **Content** | Courses, EduSons (educational seasons), past question bank |
| **Social** | Study Rooms, EduFeed, Centre Spaces, live sessions, direct messaging |
| **Gamification** | Quests, EduCoins, EduTokens, leaderboards, challenges, rankings |
| **Talent** | Skill graph, project teams, employer visibility, scholarship board |

**Core moat:** Assessment-verified learning. Every course completion, skill claim, and talent profile is backed by real exam performance data — not self-reported, not certificate-based. Verified.

---

## 2. Design System & Colour Palette

### Philosophy
Premium, ambitious, African in spirit. Dark-mode default (Nigerian students use phones at night). Not corporate ed-tech blue. Not generic purple gradients. Unique.

### Colour Tokens

```css
:root {
  /* === PRIMARY — Deep Electric Cobalt === */
  --color-primary-900: #0D1E6B;
  --color-primary-800: #1229A0;
  --color-primary-700: #1730B8;
  --color-primary-600: #1E3FCC;   /* Main brand blue */
  --color-primary-500: #2D52E8;   /* Interactive / hover */
  --color-primary-400: #4F6FEF;
  --color-primary-300: #7D96F5;
  --color-primary-200: #B0C0FA;
  --color-primary-100: #DDE4FD;
  --color-primary-50:  #F0F3FF;

  /* === ACHIEVEMENT — Amber Gold === */
  --color-gold-600: #D97706;
  --color-gold-500: #F59E0B;      /* EduCoin, rewards, badges */
  --color-gold-400: #FBBF24;      /* Hover state */
  --color-gold-300: #FCD34D;
  --color-gold-100: #FEF3C7;

  /* === ENERGY — Coral Vermillion === */
  --color-coral-700: #C4441A;
  --color-coral-600: #E05020;
  --color-coral-500: #F4622A;     /* Urgency, challenges, streaks */
  --color-coral-400: #FF6B3D;
  --color-coral-300: #FF9070;
  --color-coral-100: #FFE8DF;

  /* === BACKGROUNDS — Blue-Charcoal Dark === */
  --color-bg-deepest: #080B14;    /* Absolute base */
  --color-bg-deep:    #0F1117;    /* Primary dark background */
  --color-bg-surface: #141827;    /* Cards, panels */
  --color-bg-raised:  #1A2038;    /* Elevated surfaces */
  --color-bg-overlay: #212840;    /* Modals, dropdowns */
  --color-bg-border:  #2A3354;    /* Borders on dark */

  /* === LIGHT MODE BACKGROUNDS === */
  --color-bg-light-base:    #F8F7FF;   /* Very slightly violet-tinted white */
  --color-bg-light-surface: #FFFFFF;
  --color-bg-light-raised:  #F1F0FA;
  --color-bg-light-border:  #E2E0F0;

  /* === SEMANTIC === */
  --color-success:  #10B981;   /* Score improvement, correct answers */
  --color-warning:  #F59E0B;   /* Reuses gold — warnings, caution */
  --color-danger:   #F4622A;   /* Reuses coral — integrity flags, errors */
  --color-neutral:  #6B7280;   /* Secondary text, placeholders */

  /* === TEXT === */
  --color-text-primary:   #F0F2FF;   /* Dark mode primary text */
  --color-text-secondary: #9AA3C4;   /* Dark mode secondary */
  --color-text-muted:     #5A6490;   /* Dark mode muted */
  --color-text-on-light:  #1A1D2E;   /* Light mode primary text */
}
```

### Typography

```css
/* Import in index.html <head> */

/* Headings — Clash Display: geometric, modern, slightly unconventional */
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');

/* Body — Plus Jakarta Sans: warm, highly legible, not overused */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

/* Monospace — for code, formulas fallback, IDs */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --font-display: 'Clash Display', sans-serif;
  --font-body:    'Plus Jakarta Sans', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
}
```

### Design Tokens — Spacing, Radius, Shadow

```css
:root {
  /* Spacing scale (4px base) */
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;
  --space-4: 16px;  --space-5: 20px;  --space-6: 24px;
  --space-8: 32px;  --space-10: 40px; --space-12: 48px;
  --space-16: 64px; --space-20: 80px;

  /* Border radius */
  --radius-sm:   6px;
  --radius-md:   10px;
  --radius-lg:   16px;
  --radius-xl:   24px;
  --radius-full: 9999px;

  /* Shadows (blue-tinted, not grey) */
  --shadow-sm:  0 1px 3px rgba(30, 63, 204, 0.12);
  --shadow-md:  0 4px 16px rgba(30, 63, 204, 0.16);
  --shadow-lg:  0 8px 32px rgba(30, 63, 204, 0.22);
  --shadow-xl:  0 16px 48px rgba(30, 63, 204, 0.28);
  --shadow-glow: 0 0 24px rgba(45, 82, 232, 0.4);   /* For active/focused states */

  /* Gold glow for achievement moments */
  --shadow-gold: 0 0 20px rgba(245, 158, 11, 0.5);
}
```

### Component Visual Language
- Cards: `bg-surface` with `border border-bg-border`, `radius-lg`, subtle `shadow-md`
- Buttons primary: cobalt fill, white text, glow on hover
- Buttons achievement: gold fill, dark text
- Buttons danger/challenge: coral fill, white text
- Active exam timer: coral when under 5 min, gold at 10 min
- Quest cards: dark surface with gold left border accent
- EduCoin displays: gold text, coin icon, slight gold glow
- Rank badges: gradient from primary-600 to primary-400 with gold border for Elite

---

## 3. Full Tech Stack

### Web Frontend
| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI framework | 18+ |
| **Vite** | Build tool | 5+ |
| **TypeScript** | Type safety across entire codebase | 5+ |
| **Tailwind CSS** | Utility styling (extend with custom tokens above) | 3+ |
| **React Router v6** | Client-side routing | 6+ |
| **Zustand** | Global state management (auth, exam session, UI) | 4+ |
| **React Query (TanStack)** | Server state, caching, background sync | 5+ |
| **KaTeX** | Formula rendering | 0.16+ |
| **Framer Motion** | Animations — quest completions, transitions, achievement reveals | 10+ |
| **Lucide React** | Icon system | latest |
| **React Hook Form + Zod** | Forms and validation | latest |
| **Date-fns** | Date manipulation | latest |
| **Workbox** | Service Worker / PWA | latest |

### Backend & Infrastructure
| Technology | Purpose |
|-----------|---------|
| **Supabase** | Auth, PostgreSQL database, Storage, Realtime, Edge Functions |
| **Supabase Auth** | Email/password + Google OAuth |
| **Supabase Realtime** | Live exam sessions, chat, leaderboard updates |
| **Supabase Storage** | Profile images, course thumbnails, exam diagrams, video recordings |
| **Supabase Edge Functions** | Custom server logic (Deno runtime) — AI calls, payment webhooks, complex queries |

### AI
| Technology | Purpose |
|-----------|---------|
| **Google Gemini 1.5 Pro** | Course content verification, theory grading, complex analysis |
| **Google Gemini 1.5 Flash** | Atlas AI companion, question generation, real-time features |
| **Google Vertex AI** | Fine-tuned curriculum verification model (Phase 6) |
| **Google AI Studio** | Development and prompt testing |

### Mobile
| Technology | Purpose |
|-----------|---------|
| **React Native** | Mobile app base |
| **Expo** | Build toolchain, OTA updates, push notifications |
| **Expo Router** | File-based navigation |

### Payments
| Technology | Purpose |
|-----------|---------|
| **Paystack** | All NGN transactions — subscriptions, course purchases, EduSon enrollment |

### Analytics & Monitoring
| Technology | Purpose |
|-----------|---------|
| **PostHog** | Product analytics (open source, self-hostable) |
| **Sentry** | Error monitoring — web and mobile |
| **Supabase built-in analytics** | Database performance, edge function logs |

### Development Tools
| Technology | Purpose |
|-----------|---------|
| **Windsurf** | Primary AI-assisted IDE |
| **Gemini in Windsurf** | Code generation, debugging, refactoring |
| **ESLint + Prettier** | Code quality |
| **Husky** | Pre-commit hooks |
| **GitHub** | Version control |
| **GitHub Actions** | CI/CD — run tests, deploy to Vercel on merge |
| **Vercel** | Web app hosting (or Cloudflare Pages — both work with Vite) |

---

## 4. Architecture Overview

### Application Structure — One App, Role-Based Views

This is NOT four separate apps like v1. It is one unified React application. A user logs in with Supabase Auth. Their role (`student` | `teacher` | `centre_admin` | `school_admin` | `platform_admin`) determines their routing and UI.

```
adjquest.ng/                    → Marketing / landing page
adjquest.ng/auth                → Login / Register
adjquest.ng/dashboard           → Role-based dashboard (redirects based on role)
adjquest.ng/exam/[id]           → Exam taking interface
adjquest.ng/centre/[slug]       → Centre profile (public)
adjquest.ng/profile/[username]  → Student/tutor profile (public)
adjquest.ng/courses             → Course discovery
adjquest.ng/quests              → Quest board
adjquest.ng/leaderboard         → Platform rankings
adjquest.ng/past-questions      → Free past question bank (public)
adjquest.ng/talent              → TalentFlow layer
```

### Data Flow

```
[React Frontend]
      ↕ React Query (cached, background sync)
[Supabase Client SDK]
      ↕
[Supabase PostgreSQL] ←→ [Supabase Realtime] ←→ [Live features]
      ↕
[Supabase Edge Functions]
      ↕
[Google Gemini API] + [Paystack API]
```

### Role Hierarchy

```
platform_admin
  └── school_admin (manages a school/large institution)
        └── centre_admin (manages a tutorial centre)
              └── teacher (creates exams, courses, EduSons)
                    └── student (takes exams, courses, quests)
                          └── parent (read-only view of child's data)
```

---

## 5. Database Schema — Complete

> Feed this entire section to Supabase SQL editor. Run in order. Each section depends on the previous.

### 5.1 — Core Users and Profiles

```sql
-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";    -- For full-text search
CREATE EXTENSION IF NOT EXISTS "unaccent";   -- For accent-insensitive search

-- Enums
CREATE TYPE user_role AS ENUM (
  'student', 'teacher', 'centre_admin', 'school_admin', 'platform_admin', 'parent'
);

CREATE TYPE platform_tier AS ENUM ('free', 'scholar', 'pro');
CREATE TYPE centre_tier   AS ENUM ('free', 'starter', 'pro', 'verified');
CREATE TYPE exam_type     AS ENUM ('WAEC', 'JAMB', 'NECO', 'GCE', 'internal', 'mock', 'practice');
CREATE TYPE question_type AS ENUM ('MCQ', 'MRQ', 'FIB', 'THE');
CREATE TYPE quest_type    AS ENUM ('daily', 'weekly', 'subject', 'challenge', 'social', 'legacy', 'seasonal');
CREATE TYPE content_status AS ENUM ('draft', 'pending_review', 'approved', 'rejected', 'suspended');
CREATE TYPE integrity_level AS ENUM ('clean', 'minor', 'moderate', 'significant');

-- Profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id                UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username          TEXT UNIQUE NOT NULL,
  display_name      TEXT NOT NULL,
  role              user_role NOT NULL DEFAULT 'student',
  tier              platform_tier NOT NULL DEFAULT 'free',
  avatar_url        TEXT,
  bio               TEXT,
  
  -- Nigerian education context
  current_class     TEXT,         -- SS3, JSS2, etc.
  department        TEXT,         -- Science, Arts, Commercial
  target_exams      TEXT[],       -- ['WAEC', 'JAMB']
  subjects          TEXT[],       -- Registered subjects
  state_of_origin   TEXT,
  
  -- Platform identity (preserved from v1)
  platform_id       TEXT UNIQUE,  -- TQ-SCI-4821-26 or SQ-SS3-7734-26 format
  
  -- Gamification
  edu_coins         INTEGER NOT NULL DEFAULT 0,
  xp_total          INTEGER NOT NULL DEFAULT 0,
  current_streak    INTEGER NOT NULL DEFAULT 0,
  longest_streak    INTEGER NOT NULL DEFAULT 0,
  last_active_date  DATE,
  rank_level        TEXT NOT NULL DEFAULT 'Learner',
  
  -- Social
  followers_count   INTEGER NOT NULL DEFAULT 0,
  following_count   INTEGER NOT NULL DEFAULT 0,
  
  -- Metadata
  onboarded         BOOLEAN NOT NULL DEFAULT FALSE,
  is_verified       BOOLEAN NOT NULL DEFAULT FALSE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Parent-child relationships
CREATE TABLE parent_child (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  child_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  confirmed   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(parent_id, child_id)
);

-- Social follows
CREATE TABLE follows (
  follower_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (follower_id, following_id)
);
```

### 5.2 — Centres and Institutions

```sql
CREATE TABLE centres (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id        UUID NOT NULL REFERENCES profiles(id),
  name            TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,     -- URL-safe identifier
  description     TEXT,
  logo_url        TEXT,
  banner_url      TEXT,
  tier            centre_tier NOT NULL DEFAULT 'free',
  
  -- Location
  state           TEXT,
  city            TEXT,
  address         TEXT,
  
  -- Invite codes
  teacher_invite_code  TEXT UNIQUE,
  student_invite_code  TEXT UNIQUE,
  
  -- Stats (denormalised for performance)
  teacher_count   INTEGER NOT NULL DEFAULT 0,
  student_count   INTEGER NOT NULL DEFAULT 0,
  
  -- Reputation
  avg_score_improvement   DECIMAL(5,2),  -- Platform-calculated
  verified_badge          BOOLEAN NOT NULL DEFAULT FALSE,
  verification_score      DECIMAL(5,2),  -- Calculated from outcomes
  
  -- Settings
  is_public       BOOLEAN NOT NULL DEFAULT TRUE,
  allow_discovery BOOLEAN NOT NULL DEFAULT TRUE,
  paid_enrollment BOOLEAN NOT NULL DEFAULT FALSE,
  enrollment_fee  INTEGER,  -- In kobo (NGN × 100)
  
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Centre memberships
CREATE TABLE centre_members (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  centre_id   UUID NOT NULL REFERENCES centres(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role        user_role NOT NULL,   -- teacher or student within this centre
  class       TEXT,                  -- Student's class within this centre
  status      TEXT NOT NULL DEFAULT 'active',  -- active, suspended, pending
  joined_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(centre_id, user_id)
);

-- Class groups within centres
CREATE TABLE centre_classes (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  centre_id   UUID NOT NULL REFERENCES centres(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,    -- "SS3 Science", "JSS2 A"
  subject     TEXT,
  teacher_id  UUID REFERENCES profiles(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 5.3 — Question Bank and Exams

```sql
-- Master question bank (all questions ever created on platform)
CREATE TABLE questions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id      UUID NOT NULL REFERENCES profiles(id),
  centre_id       UUID REFERENCES centres(id),
  
  -- Content
  type            question_type NOT NULL,
  text            TEXT NOT NULL,          -- May contain $$LaTeX$$
  options         JSONB,                  -- [{text, isCorrect}] for MCQ/MRQ
  correct_answer  TEXT,                   -- For FIB
  explanation     TEXT,                   -- May contain $$LaTeX$$
  marks           INTEGER NOT NULL DEFAULT 1,
  
  -- Media
  image_url       TEXT,
  image_position  TEXT,   -- 'above' | 'below'
  
  -- Classification
  subject         TEXT NOT NULL,
  topic           TEXT,
  subtopic        TEXT,
  difficulty      TEXT,   -- 'easy' | 'medium' | 'hard'
  exam_type       exam_type,
  year            INTEGER,     -- For past questions (e.g., 2019)
  
  -- Platform-calculated difficulty (updated by AI as students answer)
  actual_difficulty_score  DECIMAL(4,3),  -- 0.000–1.000
  times_answered           INTEGER NOT NULL DEFAULT 0,
  times_correct            INTEGER NOT NULL DEFAULT 0,
  
  -- Curriculum alignment
  syllabus_objectives  TEXT[],   -- Official WAEC/JAMB objectives this covers
  
  -- Status
  status          content_status NOT NULL DEFAULT 'approved',
  is_past_question BOOLEAN NOT NULL DEFAULT FALSE,
  
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Full-text search index on questions
CREATE INDEX questions_search_idx ON questions 
  USING GIN (to_tsvector('english', text || ' ' || COALESCE(topic, '') || ' ' || subject));

-- Exams
CREATE TABLE exams (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id      UUID NOT NULL REFERENCES profiles(id),
  centre_id       UUID REFERENCES centres(id),
  
  -- Metadata
  title           TEXT NOT NULL,
  subject         TEXT NOT NULL,
  target_class    TEXT,
  exam_type       exam_type NOT NULL DEFAULT 'internal',
  instructions    TEXT,
  duration_minutes INTEGER NOT NULL,
  total_marks     INTEGER NOT NULL,
  
  -- Question set (ordered)
  question_ids    UUID[] NOT NULL,   -- Ordered array of question IDs
  
  -- Settings
  shuffle_questions    BOOLEAN NOT NULL DEFAULT FALSE,
  shuffle_options      BOOLEAN NOT NULL DEFAULT FALSE,
  show_timer           BOOLEAN NOT NULL DEFAULT TRUE,
  allow_back_nav       BOOLEAN NOT NULL DEFAULT TRUE,
  scheduled_at         TIMESTAMPTZ,
  available_until      TIMESTAMPTZ,
  max_attempts         INTEGER NOT NULL DEFAULT 1,
  
  -- Status
  status          content_status NOT NULL DEFAULT 'draft',
  
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Exam assignments (which students are assigned which exams)
CREATE TABLE exam_assignments (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exam_id     UUID NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
  student_id  UUID REFERENCES profiles(id) ON DELETE CASCADE,  -- null = entire class
  class_id    UUID REFERENCES centre_classes(id) ON DELETE CASCADE,
  assigned_by UUID NOT NULL REFERENCES profiles(id),
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Exam sessions (each student's attempt)
CREATE TABLE exam_sessions (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exam_id             UUID NOT NULL REFERENCES exams(id),
  student_id          UUID NOT NULL REFERENCES profiles(id),
  
  -- Answers: {questionId: {answer, timeSpent, flagged}}
  answers             JSONB NOT NULL DEFAULT '{}',
  
  -- Integrity monitoring
  tab_switches        INTEGER NOT NULL DEFAULT 0,
  tab_switch_log      JSONB NOT NULL DEFAULT '[]',
  copy_attempts       INTEGER NOT NULL DEFAULT 0,
  paste_attempts      INTEGER NOT NULL DEFAULT 0,
  focus_time_ratio    DECIMAL(4,3),
  integrity_level     integrity_level,
  
  -- State
  started_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  submitted_at        TIMESTAMPTZ,
  time_used_seconds   INTEGER,
  confidence_rating   INTEGER,    -- 1–5
  is_auto_submitted   BOOLEAN NOT NULL DEFAULT FALSE,
  
  -- Results (populated after grading)
  auto_score          DECIMAL(6,2),
  final_score         DECIMAL(6,2),
  percentage          DECIMAL(5,2),
  grade               TEXT,
  is_graded           BOOLEAN NOT NULL DEFAULT FALSE,
  graded_at           TIMESTAMPTZ,
  graded_by           UUID REFERENCES profiles(id),
  teacher_comments    TEXT,
  
  -- Per-question results: {questionId: {score, aiFeedback, teacherMark}}
  question_results    JSONB NOT NULL DEFAULT '{}'
);

-- Indexes for common exam session queries
CREATE INDEX exam_sessions_student_idx ON exam_sessions(student_id);
CREATE INDEX exam_sessions_exam_idx ON exam_sessions(exam_id);
CREATE INDEX exam_sessions_ungraded_idx ON exam_sessions(exam_id, is_graded) 
  WHERE is_graded = FALSE AND submitted_at IS NOT NULL;
```

### 5.4 — Courses and EduSons

```sql
-- Courses
CREATE TABLE courses (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id      UUID NOT NULL REFERENCES profiles(id),
  centre_id       UUID REFERENCES centres(id),
  
  title           TEXT NOT NULL,
  description     TEXT,
  thumbnail_url   TEXT,
  subject         TEXT NOT NULL,
  target_class    TEXT,
  exam_alignment  exam_type[],      -- Which exams this prepares for
  
  -- Pricing
  is_free         BOOLEAN NOT NULL DEFAULT FALSE,
  price           INTEGER,          -- In kobo
  
  -- Content (ordered module IDs)
  module_ids      UUID[] NOT NULL DEFAULT '{}',
  
  -- AI verification
  syllabus_coverage     DECIMAL(5,2),   -- % of relevant syllabus covered
  ai_verified           BOOLEAN NOT NULL DEFAULT FALSE,
  ai_verification_notes TEXT,
  human_reviewed        BOOLEAN NOT NULL DEFAULT FALSE,
  
  -- Stats
  enrollment_count  INTEGER NOT NULL DEFAULT 0,
  avg_rating        DECIMAL(3,2),
  avg_score_improvement  DECIMAL(5,2),  -- AI-calculated from exam data
  
  status          content_status NOT NULL DEFAULT 'draft',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Course modules
CREATE TABLE course_modules (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id     UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  description   TEXT,
  content_type  TEXT NOT NULL,  -- 'text' | 'video' | 'quiz' | 'exam_set'
  
  -- Content (flexible per type)
  text_content  TEXT,            -- Markdown with $$LaTeX$$ support
  video_url     TEXT,
  quiz_question_ids  UUID[],     -- For quiz modules
  exam_id       UUID REFERENCES exams(id),  -- For exam_set modules
  
  estimated_minutes  INTEGER,
  order_index        INTEGER NOT NULL DEFAULT 0,
  
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Course enrollments
CREATE TABLE course_enrollments (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id     UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  student_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  progress      JSONB NOT NULL DEFAULT '{}',  -- {moduleId: {completed, score, completedAt}}
  completed     BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at  TIMESTAMPTZ,
  final_score   DECIMAL(5,2),
  rating        INTEGER,
  review_text   TEXT,
  
  enrolled_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(course_id, student_id)
);

-- EduSons (Educational Seasons — cohort-based intensive programs)
CREATE TABLE edusons (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id      UUID NOT NULL REFERENCES profiles(id),
  centre_id       UUID REFERENCES centres(id),
  
  title           TEXT NOT NULL,
  description     TEXT,
  thumbnail_url   TEXT,
  subjects        TEXT[] NOT NULL,
  target_class    TEXT,
  exam_alignment  exam_type[],
  
  -- Timeline
  enrollment_opens_at   TIMESTAMPTZ NOT NULL,
  enrollment_closes_at  TIMESTAMPTZ NOT NULL,
  starts_at             TIMESTAMPTZ NOT NULL,
  ends_at               TIMESTAMPTZ NOT NULL,
  
  -- Capacity
  max_enrollment  INTEGER,
  current_enrollment  INTEGER NOT NULL DEFAULT 0,
  
  -- Pricing
  is_free         BOOLEAN NOT NULL DEFAULT FALSE,
  price           INTEGER,   -- In kobo
  
  -- Content
  course_ids      UUID[],    -- Bundled courses
  live_session_ids UUID[],   -- Scheduled live sessions
  mock_exam_ids   UUID[],    -- Mock exams during the season
  
  -- Status
  status          content_status NOT NULL DEFAULT 'draft',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- EduSon enrollments
CREATE TABLE edusson_enrollments (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  edusson_id    UUID NOT NULL REFERENCES edusons(id) ON DELETE CASCADE,
  student_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  payment_ref   TEXT,
  enrolled_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(edusson_id, student_id)
);

-- Live sessions (within EduSons or standalone)
CREATE TABLE live_sessions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  host_id         UUID NOT NULL REFERENCES profiles(id),
  centre_id       UUID REFERENCES centres(id),
  edusson_id      UUID REFERENCES edusons(id),
  
  title           TEXT NOT NULL,
  subject         TEXT,
  scheduled_at    TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER,
  recording_url   TEXT,
  
  -- Mid-session quizzes
  quiz_ids        UUID[],
  
  -- Attendance
  attendee_ids    UUID[],
  
  status          TEXT NOT NULL DEFAULT 'scheduled',  -- scheduled, live, ended
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 5.5 — Gamification Economy

```sql
-- EduCoin transaction ledger
CREATE TABLE educoin_transactions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount          INTEGER NOT NULL,   -- Positive = earned, Negative = spent
  balance_after   INTEGER NOT NULL,
  
  -- What caused this transaction
  transaction_type  TEXT NOT NULL,
  -- Types: 'exam_completion', 'quest_reward', 'course_completion', 'streak_bonus',
  --        'challenge_win', 'challenge_stake', 'challenge_refund', 'help_upvote',
  --        'past_question_approved', 'purchase', 'gift_sent', 'gift_received',
  --        'achievement_reward', 'admin_adjustment'
  
  reference_id    UUID,   -- ID of the exam, quest, challenge etc. that caused this
  description     TEXT,
  
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- EduTokens (permanent achievement tokens)
CREATE TABLE edu_tokens (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  token_type      TEXT NOT NULL,
  token_name      TEXT NOT NULL,   -- "WAEC Mock Champion Q1 2027"
  description     TEXT,
  icon_url        TEXT,
  rarity          TEXT NOT NULL DEFAULT 'common',  -- common, rare, legendary
  earned_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reference_id    UUID   -- What triggered this (exam session, quest, etc.)
);

-- Quests
CREATE TABLE quests (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           TEXT NOT NULL,
  description     TEXT NOT NULL,
  quest_type      quest_type NOT NULL,
  
  -- Requirements (flexible JSON — checked by edge function)
  requirements    JSONB NOT NULL,
  -- Example: {"type": "exam_score", "subject": "Chemistry", "min_score": 70, "count": 3}
  -- Example: {"type": "streak", "days": 7}
  -- Example: {"type": "help_learner", "upvotes_needed": 5}
  
  -- Rewards
  coin_reward     INTEGER NOT NULL DEFAULT 0,
  xp_reward       INTEGER NOT NULL DEFAULT 0,
  token_reward    TEXT,    -- token_type to award on completion
  badge_reward    TEXT,
  
  -- Availability
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  available_from  TIMESTAMPTZ,
  available_until TIMESTAMPTZ,
  
  -- For subject quests — the series sequence
  series_id       UUID,    -- Groups a sequence of quests
  series_order    INTEGER,
  
  -- Restrictions
  min_tier        platform_tier NOT NULL DEFAULT 'free',
  target_roles    user_role[],
  
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- User quest progress
CREATE TABLE user_quests (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  quest_id      UUID NOT NULL REFERENCES quests(id) ON DELETE CASCADE,
  
  progress      JSONB NOT NULL DEFAULT '{}',   -- Progress toward requirements
  progress_pct  DECIMAL(5,2) NOT NULL DEFAULT 0,
  
  started_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at  TIMESTAMPTZ,
  rewards_claimed BOOLEAN NOT NULL DEFAULT FALSE,
  
  UNIQUE(user_id, quest_id)
);

-- Challenges (head-to-head and group)
CREATE TABLE challenges (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  challenger_id   UUID NOT NULL REFERENCES profiles(id),
  
  challenge_type  TEXT NOT NULL,  -- 'head_to_head' | 'group' | 'centre_vs_centre'
  subject         TEXT,
  question_ids    UUID[] NOT NULL,
  time_limit_minutes INTEGER NOT NULL,
  
  -- Stakes
  coin_stake      INTEGER NOT NULL DEFAULT 0,
  
  status          TEXT NOT NULL DEFAULT 'pending',
  -- pending, accepted, in_progress, completed, cancelled
  
  -- For centre challenges
  challenger_centre_id  UUID REFERENCES centres(id),
  opponent_centre_id    UUID REFERENCES centres(id),
  
  expires_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Challenge participants
CREATE TABLE challenge_participants (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  challenge_id    UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES profiles(id),
  
  status          TEXT NOT NULL DEFAULT 'invited',  -- invited, accepted, completed, declined
  answers         JSONB,
  score           DECIMAL(6,2),
  time_used_ms    INTEGER,
  completed_at    TIMESTAMPTZ,
  
  UNIQUE(challenge_id, user_id)
);

-- Leaderboard snapshots (materialised periodically by edge function)
CREATE TABLE leaderboard_snapshots (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  snapshot_type TEXT NOT NULL,
  -- Types: 'global_weekly', 'global_monthly', 'subject_weekly', 
  --        'centre_weekly', 'improvement_monthly', 'state_monthly'
  
  subject       TEXT,
  centre_id     UUID REFERENCES centres(id),
  state         TEXT,
  period_start  DATE NOT NULL,
  period_end    DATE NOT NULL,
  
  -- Ranked entries
  entries       JSONB NOT NULL,
  -- [{rank, userId, displayName, avatarUrl, score, improvement, centreId}]
  
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 5.6 — Social and Communication

```sql
-- Study Rooms
CREATE TABLE study_rooms (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id    UUID NOT NULL REFERENCES profiles(id),
  centre_id     UUID REFERENCES centres(id),
  
  name          TEXT NOT NULL,
  subject       TEXT,
  description   TEXT,
  is_public     BOOLEAN NOT NULL DEFAULT TRUE,
  
  member_count  INTEGER NOT NULL DEFAULT 0,
  
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Study Room members
CREATE TABLE study_room_members (
  room_id       UUID NOT NULL REFERENCES study_rooms(id) ON DELETE CASCADE,
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY(room_id, user_id)
);

-- Messages (Study Rooms + Direct Messages)
CREATE TABLE messages (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id     UUID NOT NULL REFERENCES profiles(id),
  
  -- Either room_id OR conversation_id
  room_id       UUID REFERENCES study_rooms(id) ON DELETE CASCADE,
  conversation_id UUID,   -- For DMs (hash of two user IDs, sorted)
  
  content       TEXT NOT NULL,   -- May contain $$LaTeX$$
  
  -- Attachments
  image_url     TEXT,
  question_id   UUID REFERENCES questions(id),  -- Share a question
  
  -- Threading
  reply_to_id   UUID REFERENCES messages(id),
  
  -- Help a Learner Learn
  is_help_request   BOOLEAN NOT NULL DEFAULT FALSE,
  is_verified_explanation BOOLEAN NOT NULL DEFAULT FALSE,
  helpful_votes     INTEGER NOT NULL DEFAULT 0,
  
  edited_at     TIMESTAMPTZ,
  deleted_at    TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Message votes (for Help a Learner Learn)
CREATE TABLE message_votes (
  message_id  UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  vote        INTEGER NOT NULL,   -- 1 (helpful) or -1
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY(message_id, user_id)
);

-- EduFeed posts
CREATE TABLE feed_posts (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id       UUID NOT NULL REFERENCES profiles(id),
  
  content         TEXT NOT NULL,
  image_url       TEXT,
  question_id     UUID REFERENCES questions(id),
  
  -- Engagement
  likes_count     INTEGER NOT NULL DEFAULT 0,
  comments_count  INTEGER NOT NULL DEFAULT 0,
  
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Feed comments
CREATE TABLE feed_comments (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id     UUID NOT NULL REFERENCES feed_posts(id) ON DELETE CASCADE,
  author_id   UUID NOT NULL REFERENCES profiles(id),
  content     TEXT NOT NULL,
  likes_count INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipient_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  type            TEXT NOT NULL,
  -- Types: 'exam_assigned', 'result_ready', 'quest_completed', 'challenge_received',
  --        'challenge_result', 'coin_earned', 'token_earned', 'rank_up',
  --        'centre_invite', 'study_room_message', 'help_upvoted', 
  --        'edusson_starting', 'streak_reminder', 'mention'
  
  title           TEXT NOT NULL,
  body            TEXT,
  action_url      TEXT,
  
  reference_id    UUID,
  reference_type  TEXT,
  
  is_read         BOOLEAN NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX notifications_recipient_unread ON notifications(recipient_id, is_read)
  WHERE is_read = FALSE;
```

### 5.7 — Performance and Analytics

```sql
-- Student subject performance (updated after every exam session)
CREATE TABLE student_subject_stats (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id        UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  subject           TEXT NOT NULL,
  
  exams_taken       INTEGER NOT NULL DEFAULT 0,
  avg_score         DECIMAL(5,2),
  best_score        DECIMAL(5,2),
  latest_score      DECIMAL(5,2),
  score_trend       DECIMAL(5,2),   -- Positive = improving, negative = declining
  
  -- Topic-level breakdown: {topicName: {correct, total, score}}
  topic_breakdown   JSONB NOT NULL DEFAULT '{}',
  
  -- Platform percentile (updated by scheduled edge function)
  platform_percentile     DECIMAL(5,2),
  centre_percentile       DECIMAL(5,2),
  
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(student_id, subject)
);

-- Centre performance snapshots
CREATE TABLE centre_stats (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  centre_id       UUID NOT NULL REFERENCES centres(id) ON DELETE CASCADE,
  period          TEXT NOT NULL,   -- '2026-03' format
  
  exams_conducted   INTEGER NOT NULL DEFAULT 0,
  students_active   INTEGER NOT NULL DEFAULT 0,
  avg_score         DECIMAL(5,2),
  avg_improvement   DECIMAL(5,2),
  
  -- Per subject breakdown
  subject_breakdown JSONB NOT NULL DEFAULT '{}',
  
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(centre_id, period)
);
```

### 5.8 — TalentFlow Layer

```sql
-- Talent projects
CREATE TABLE talent_projects (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  posted_by       UUID NOT NULL REFERENCES profiles(id),
  centre_id       UUID REFERENCES centres(id),
  company_name    TEXT,
  
  title           TEXT NOT NULL,
  description     TEXT NOT NULL,
  required_roles  TEXT[] NOT NULL,  -- ['pm', 'frontend', 'ui_ux', 'backend', 'design']
  difficulty      TEXT NOT NULL,
  
  duration_weeks  INTEGER NOT NULL,
  team_size       INTEGER NOT NULL,
  
  starts_at       TIMESTAMPTZ,
  
  status          TEXT NOT NULL DEFAULT 'open',  -- open, in_progress, completed
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Project teams
CREATE TABLE project_teams (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id    UUID NOT NULL REFERENCES talent_projects(id),
  
  members       JSONB NOT NULL DEFAULT '[]',
  -- [{userId, role, joinedAt}]
  
  workspace_id  UUID,   -- Links to a centre_space/channel
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Project deliverables and ratings
CREATE TABLE project_deliverables (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id      UUID NOT NULL REFERENCES talent_projects(id),
  team_id         UUID NOT NULL REFERENCES project_teams(id),
  submitted_by    UUID NOT NULL REFERENCES profiles(id),
  
  title           TEXT NOT NULL,
  description     TEXT,
  file_url        TEXT,
  
  -- Peer and client ratings
  ratings         JSONB NOT NULL DEFAULT '[]',
  avg_rating      DECIMAL(3,2),
  
  submitted_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 5.9 — Payments

```sql
-- Subscriptions
CREATE TABLE subscriptions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID REFERENCES profiles(id),
  centre_id       UUID REFERENCES centres(id),
  
  plan            TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'active',  -- active, cancelled, expired
  
  paystack_subscription_code  TEXT,
  paystack_customer_code      TEXT,
  
  current_period_start  TIMESTAMPTZ,
  current_period_end    TIMESTAMPTZ,
  
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Payment transactions
CREATE TABLE payments (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES profiles(id),
  
  amount          INTEGER NOT NULL,    -- In kobo
  currency        TEXT NOT NULL DEFAULT 'NGN',
  
  payment_type    TEXT NOT NULL,
  -- Types: 'subscription', 'course', 'edusson', 'centre_enrollment', 'coin_bundle'
  
  reference_id    UUID,    -- Course/EduSon/Centre ID
  paystack_ref    TEXT UNIQUE,
  
  status          TEXT NOT NULL DEFAULT 'pending',  -- pending, success, failed
  
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 5.10 — Row Level Security Policies

```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE centres ENABLE ROW LEVEL SECURITY;
ALTER TABLE centre_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
-- (Enable on all tables)

-- Profiles: anyone can read public profiles, only owner can update
CREATE POLICY "Public profiles are viewable" ON profiles
  FOR SELECT USING (TRUE);
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Exam sessions: students see only their own
CREATE POLICY "Students see own sessions" ON exam_sessions
  FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Teachers see sessions for their exams" ON exam_sessions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM exams WHERE exams.id = exam_sessions.exam_id 
        AND exams.creator_id = auth.uid()
    )
  );

-- Questions: approved questions are public, drafts only visible to creator
CREATE POLICY "Approved questions are public" ON questions
  FOR SELECT USING (status = 'approved');
CREATE POLICY "Creators see own questions" ON questions
  FOR SELECT USING (auth.uid() = creator_id);

-- Notifications: users see only their own
CREATE POLICY "Users see own notifications" ON notifications
  FOR SELECT USING (auth.uid() = recipient_id);
CREATE POLICY "Users update own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = recipient_id);
```

---

## 6. Build Phases — Sequential

> Each phase is a self-contained unit. Complete one fully before starting the next.  
> Each phase prompt is designed to be fed to Windsurf + Gemini in sequence.

---

### PHASE 0 — Foundation & Tooling
**Duration:** 2–3 days  
**Goal:** Working repo, Supabase project connected, design system installed, routing skeleton

**Tasks:**
1. Create Vite + React + TypeScript project: `npm create vite@latest adj-eduquest -- --template react-ts`
2. Install all dependencies:
```bash
npm install @supabase/supabase-js @tanstack/react-query zustand react-router-dom
npm install tailwindcss @tailwindcss/typography postcss autoprefixer
npm install framer-motion lucide-react react-hook-form zod @hookform/resolvers
npm install katex date-fns
npm install -D @types/katex
npx tailwindcss init -p
```
3. Set up Tailwind config with all custom colour tokens from Section 2
4. Create Supabase project at supabase.com. Copy URL and anon key.
5. Create `/src/lib/supabase.ts` — initialise Supabase client
6. Create `.env.local` with all env variables (see Section 9)
7. Set up React Router with these initial routes: `/`, `/auth`, `/dashboard`, `/onboarding`
8. Create base layout components: `AppShell`, `Sidebar`, `TopNav`, `MobileNav`
9. Create global Zustand store: `useAuthStore` with `user`, `profile`, `isLoading`
10. Set up React Query provider in `main.tsx`
11. Import fonts in `index.html`
12. Apply colour CSS variables to `:root` in `index.css`
13. Run Supabase schema SQL from Section 5.1 (profiles, parent_child, follows tables only)
14. Deploy to Vercel. Connect GitHub repo. Auto-deploy on push to main.

**Deliverable:** Blank app, correct colours, fonts loading, Supabase connected, deployed URL working.

---

### PHASE 1 — Auth, Centres & Identity
**Duration:** 1 week  
**Goal:** Full user registration, login, onboarding, centre creation and joining

**1.1 — Auth System**
1. Build `/auth` page with two tabs: Sign In and Sign Up
2. Sign Up flow:
   - Step 1: Email, password, display name, role selection (student / teacher / admin)
   - Step 2: Role-specific details — student: class, department, subjects, target exams. Teacher: subjects, centre code (optional)
   - Step 3: Username selection (check uniqueness in real time against profiles table)
3. On registration: create Supabase auth user → create profile row → generate platform_id (TQ or SQ format)
4. Google OAuth sign in button (configure in Supabase Auth dashboard)
5. Login: email/password + Google
6. Password reset flow via Supabase Auth
7. Protected route wrapper — redirect to `/auth` if no session
8. Session persistence via Supabase Auth (automatic)

**1.2 — Onboarding Flow**
1. First login triggers `/onboarding` wizard (if `profile.onboarded = false`)
2. 4-step onboarding: Welcome → Profile details → Subjects & goals → Centre join or create
3. On complete: set `profile.onboarded = true`

**1.3 — Centre System**
1. Centre creation form: name, description, state, city, logo upload (Supabase Storage)
2. Auto-generate: slug (URL-safe from name), teacher_invite_code, student_invite_code (8-char random)
3. `/centre/[slug]` — public centre profile page: name, description, stats, join button
4. Join via invite code: student pastes code → validated → added to centre_members
5. Join via discovery: search centres by name/state → view profile → request to join
6. Centre admin dashboard: approve pending members, view member list, manage classes
7. Centre Space: a dedicated room auto-created per centre when it's registered

**1.4 — Profile Pages**
1. `/profile/[username]` — public profile: avatar, bio, platform_id, rank badge, subjects, EduTokens, recent activity
2. Own profile settings: edit name, avatar upload, bio, change subjects
3. EduCoin balance display (persistent in top nav)
4. Follow/unfollow other users

**Testing checkpoint:** Register as student. Register as teacher. Create a centre as admin. Join centre as student via invite code. View centre profile publicly.

---

### PHASE 2 — Exam Engine
**Duration:** 2 weeks  
**Goal:** Full exam lifecycle — creation, assignment, taking, grading, results

**2.1 — Question Parser Component**
1. Build `<QuestionParser />` React component (ported from v1 logic)
2. Input: large textarea for E-Quest `||` format text
3. Parse button → splits by newline → splits each by `||` → structured question objects
4. Output: preview cards with full rendering
5. Formula rendering: `<MathRenderer />` wrapper component:
```tsx
// src/components/MathRenderer.tsx
import katex from 'katex';
import 'katex/dist/katex.min.css';

export const MathRenderer = ({ content }: { content: string }) => {
  const rendered = content.replace(/\$\$(.*?)\$\$/gs, (_, formula) => {
    try {
      return katex.renderToString(formula, { throwOnError: false });
    } catch {
      return `$$${formula}$$`;
    }
  });
  return <span dangerouslySetInnerHTML={{ __html: rendered }} />;
};
```
6. Each parsed question card: type badge, text (with MathRenderer), options, marks, explanation toggle, edit button, delete button
7. Reorder cards via drag and drop (use `@dnd-kit/core`)

**2.2 — Exam Creation (Teacher)**
1. `/exam/create` — multi-step form
   - Step 1: Exam metadata (title, subject, class, type, duration, instructions)
   - Step 2: Questions — three tabs: Parser, Manual, AI (AI tab in Phase 6)
   - Step 3: Settings (shuffle, back nav, scheduling, max attempts)
   - Step 4: Review and save
2. Manual question entry: type selector, text with LaTeX preview, options builder, marks, explanation, image upload
3. Formula toolbar (Manual tab): buttons that insert common LaTeX at cursor — `x²`, `H₂O`, `a/b`, `√x`, `→`, `⇌`, `±`, `×`, `α β θ π λ Δ`
4. Image upload: compress via Canvas API before storing to Supabase Storage
5. Save as draft → save questions to `questions` table → save exam to `exams` table
6. Publish exam (status: approved)

**2.3 — Question Bank**
1. `/question-bank` (teacher view): all questions created by this teacher
2. Search by subject, topic, type, difficulty
3. Questions render formulas in list view
4. Add selected questions to current exam being built
5. Public past questions viewable by all users at `/past-questions`

**2.4 — Exam Assignment**
1. Teacher assigns exam to: specific students, a class, or "all centre students"
2. Creates `exam_assignments` rows
3. Student dashboard shows "Exams Assigned to You" section

**2.5 — Exam Taking (Student)**
1. Student clicks assigned exam → exam briefing screen
2. Briefing: title, subject, teacher, duration, instructions, question count, formula notice
3. Begin exam → create `exam_sessions` row with started_at
4. Exam interface:
   - Fixed top bar: timer (colour transitions amber 10min → coral 5min), question counter, submit button
   - Question display with full `<MathRenderer />` on text, options, and images
   - MCQ: tap to select (one answer)
   - MRQ: tap to toggle multiple
   - FIB: text input
   - THE: large textarea with live word count
   - Flag question button
   - Previous / Next navigation
   - Question grid overview (tap to jump)
5. Integrity monitoring (exact logic from v1 spec) — store to session state
6. Auto-save answers to Supabase every 30 seconds (resilience)
7. Auto-submit on timer expiry
8. Confidence rating (1–5 emoji scale) before manual submit
9. Submission: update exam_session, set submitted_at
10. Post-submit screen: "Your exam has been submitted. Your teacher will grade and release results."

**2.6 — Grading Interface (Teacher)**
1. Teacher dashboard shows "Submissions Awaiting Grading" list
2. Open submission: student info, integrity report (colour-coded), answers
3. Auto-grading runs on load for MCQ/MRQ/FIB
4. MCQ/MRQ/FIB: auto-graded, show correct/incorrect per question with formula rendering
5. THE questions: side-by-side, model answer vs student answer, both with formula rendering
6. AI assist button on theory (Phase 6)
7. Teacher enters final mark for theory, optional comments
8. Export `.adjr` file option (see Section 7)
9. Release results button → sets `is_graded = true`, creates notification for student

**2.7 — Results View (Student)**
1. Student notified when results released
2. `/results/[sessionId]` — full results breakdown:
   - Score badge: percentage, grade, visual gauge
   - Confidence vs performance comparison
   - Per-question breakdown with correct/incorrect indicators
   - Correct answers revealed with full explanations (formulas rendered)
   - Integrity summary (shown transparently)
   - Teacher comments
3. Update `student_subject_stats` after results released (edge function)

**Testing checkpoint:** Teacher creates exam with MCQ, FIB, and theory questions including LaTeX formulas. Assigns to student. Student takes exam. Teacher grades. Student views results with rendered formulas.

---

### PHASE 3 — Content Ecosystem
**Duration:** 2 weeks  
**Goal:** Courses, EduSons, past question bank, content discovery

**3.1 — Past Question Bank (Public)**
1. `/past-questions` — publicly accessible, no login required
2. Filter by: subject, exam type (WAEC/JAMB/NECO/GCE), year, topic, difficulty
3. Full-text search across question text
4. Questions render formulas
5. Logged-in students can: save questions to personal bank, add to a practice set, submit corrections
6. Submit a past question: form → goes to `pending_review` status → AI verifies → approved
7. EduCoin reward for approved submissions

**3.2 — Course Builder (Teacher/Centre)**
1. `/courses/create` — multi-step course builder
2. Step 1: Course metadata, thumbnail upload, subject, pricing, exam alignment
3. Step 2: Module builder — add modules in order:
   - Text module: rich markdown editor with LaTeX support and live preview
   - Video module: upload video to Supabase Storage or embed URL
   - Quiz module: select questions from question bank
   - Exam set module: link to an existing exam
4. Step 3: AI verification request → submit for review
5. AI verification edge function: checks syllabus coverage, content accuracy, reading level
6. Verified courses published to marketplace

**3.3 — Course Discovery & Enrollment**
1. `/courses` — course marketplace
2. Filter: subject, exam type, price (free/paid), centre, rating, difficulty
3. Course detail page: description, modules list, tutor profile, ratings, "Students who took this scored X% higher"
4. Enroll button (free: instant, paid: Paystack flow)
5. `/my-courses` — enrolled courses with progress
6. Module view: render text/video/quiz content
7. Quiz within module: uses exam engine, updates course progress on completion

**3.4 — EduSons**
1. Centre admin creates EduSon: title, subjects, timeline, pricing, capacity, linked courses + mock exams
2. EduSon detail page: full description, what's included, timeline, tutor, enrollment count vs capacity
3. Enrollment opens/closes on schedule
4. Countdown timer on EduSon detail page when not yet open
5. Enrolled students see EduSon workspace: schedule, live sessions, course modules, mock exam schedule
6. Urgency mechanic: "Only 12 spots left" when near capacity

**3.5 — Live Sessions**
1. Host schedules a live session from centre dashboard
2. Students get notification when session is starting
3. Session page: video embed (Whereby/Daily.co free tier or YouTube Live link), live chat, mid-session quiz push
4. Attendance auto-recorded for logged-in attendees
5. Recording uploaded after session ends
6. Recording attached to relevant course module automatically

**Testing checkpoint:** Browse past questions without logging in. Enroll in a free course. Complete a quiz module. Join an EduSon. View a live session recording.

---

### PHASE 4 — Social & Communication Layer
**Duration:** 1.5 weeks  
**Goal:** Study Rooms, EduFeed, direct messaging, Help a Learner Learn

**4.1 — Study Rooms**
1. `/study-rooms` — discovery: public rooms, rooms by subject, recommended based on enrolled subjects
2. Create room: name, subject, description, public/private
3. Room view: real-time message feed (Supabase Realtime), member list, subject context
4. Message features: text, LaTeX formulas render inline, share a question card, reply threading
5. Help a Learner Learn:
   - Post a "help request" (flagged message type)
   - Platform notifies users with demonstrated strength in that topic
   - Responses can be upvoted as "helpful"
   - AI verifies top-upvoted responses for factual accuracy
   - Verified responses get "Verified Explanation" badge
   - EduCoin reward for helpful upvotes; EduToken for verified contributor
6. Centre Space: private room auto-created per centre, visible only to members
7. Class channels: sub-spaces within Centre Space for each class group

**4.2 — Direct Messaging**
1. `/messages` — conversations list
2. Start DM from any user profile
3. Real-time messaging (Supabase Realtime)
4. Message features: text, LaTeX renders, share question, image
5. Read receipts
6. Message search within conversation

**4.3 — EduFeed**
1. `/feed` — personalised timeline
2. Posts from: people you follow, centres you're in, users in your study rooms
3. Create post: text (with LaTeX), image, share a question card, share an exam result (opt-in)
4. Like, comment, share
5. "Trending in [Subject]" sidebar — top-engaged posts by subject this week
6. Tutor can post course snippets or lesson tips — these get higher algorithmic visibility

**4.4 — Notifications Centre**
1. Bell icon in top nav with unread count badge
2. `/notifications` — full list, filterable by type
3. Push notifications (set up in Phase 8 for mobile; web push here)
4. In-app notification toasts for real-time events (Quest completed, challenge received, result ready)

**Testing checkpoint:** Create a study room. Post a help request. Respond to someone's help request and get upvoted. Post to EduFeed. Send a DM.

---

### PHASE 5 — Gamification & Economy
**Duration:** 2 weeks  
**Goal:** Full EduCoin economy, Quests, challenges, leaderboards, ranks

**5.1 — EduCoin System**
1. EduCoin balance always visible in top nav (gold coin icon + number)
2. Coin earned automatically on trigger events (edge function handles all logic):
   - Exam submitted above personal average: +10 coins
   - Exam perfect score: +25 coins bonus
   - Quest completed: per quest definition
   - Course module completed (with passing quiz): +5 coins
   - Streak milestone (7 days): +20 coins
   - Help upvote received: +3 coins per upvote
   - Past question approved: +15 coins
3. Coin animation: when coins are earned, floating gold coin particles animate from the trigger element upward toward the nav balance — use Framer Motion
4. Transaction history: `/wallet` — full ledger of all transactions, searchable
5. Spend flow: unlock past question set, apply discount to EduSon, purchase profile cosmetic

**5.2 — Quest System**
1. `/quests` — Quest board with sections: Daily, Weekly, Subject Quests, Challenge Quests, Legacy Quests, Active Seasonal Quest
2. Quest card design: dark surface, gold left border, title, description, progress bar, reward display (coins + XP)
3. Daily quests reset at midnight WAT (UTC+1)
4. Weekly quests reset Monday midnight WAT
5. Progress tracking: after each relevant action (exam, course, message), call quest progress update edge function
6. Quest completion: progress hits 100% → trigger reward distribution → animated completion modal (gold burst, coin animation, XP bar fill)
7. Subject Quest sequences: displayed as a journey map — unlocked quests glowing, completed with checkmark, locked dimmed
8. Legacy Quest progress: persistent progress bar, estimated time to completion
9. Seasonal Quests: auto-activate based on exam season calendar (JAMB deadline window, WAEC countdown, etc.)

**5.3 — Challenge System**
1. "Challenge" button on any user's profile
2. Challenge setup: subject, question count (10/20/30), time limit, coin stake (optional)
3. Challenged user gets notification + 24hr to accept
4. Accepted: both users get exam interface for challenge set, same questions, time limit starts independently
5. Results: side-by-side comparison, question-level breakdown, winner announcement
6. Coin transfer: winner gets pool, loser gets "targeted practice based on questions you lost on" suggestion
7. Centre vs Centre challenges: centre admin sends to another centre, 5-10 students per side, aggregate score
8. "Challenge a Friend" shortcut on exam result pages ("You scored 74% — challenge a friend on this topic?")

**5.4 — Blank Matching Mini-Game**
1. `/play/matching` — card flip / matching game
2. Modes: Formula-to-name, Date-to-event, Law-to-equation, Term-to-definition
3. Questions pulled from platform question bank for selected subject and topic
4. Timer, score, personal best system
5. Daily limit for free tier (5 games), unlimited for Scholar tier
6. Share result to EduFeed button
7. EduCoin reward for beating personal best

**5.5 — Question Marathon**
1. `/play/marathon` — sustained question answering mode
2. Student selects subject, question source (their weak areas / past questions / random)
3. Questions appear one by one, no time limit per question, but total marathon is timed
4. Running stats: questions answered, accuracy %, speed (avg seconds per question)
5. Personal best tracking: longest marathon, highest accuracy marathon
6. Weekly leaderboard: longest marathon in each subject
7. EduCoin rewards at milestones: 50 questions (+15), 100 questions (+30), 200 questions (+60)

**5.6 — Rankings & Leaderboards**
1. `/leaderboard` — full leaderboard hub
2. Tabs: Overall (by XP), Subject (by subject percentile), Improvement (biggest score jump), Centre (by centre), My State
3. Student always sees their own rank highlighted even if not in top 20
4. Contextual ranking: within your centre, within your class, within your state
5. Centre ranking table: ranked by average student improvement (not absolute score — this is the fairness decision)
6. "Most Improved This Month" spotlight section: top 5 improvers with their improvement % visible
7. Subject Olympiad: periodic platform-wide contest. Admin schedules it. It appears as a special banner. Leaderboard goes live for duration.
8. Leaderboard snapshots materialised by edge function weekly (not live-queried — prevents performance issues at scale)

**5.7 — Rank & Privilege System**
1. Rank calculated from: XP total, EduTokens earned, platform percentile scores
2. Ranks: Learner → Scholar → Achiever → Honours → Distinguished → Elite
3. Rank badge displayed on profile, in leaderboards, in study rooms (beside username)
4. Rank-up event: full-screen animated celebration modal with new badge reveal
5. Privileges unlock automatically with rank (see Section 2 analysis for full privilege list)
6. Elite students: visible in employer/scholarship board, free Pro feature access, ambassador eligibility

**Testing checkpoint:** Complete a daily quest. Challenge a friend. Play a Question Marathon. Check leaderboard rank. Rank up from Learner to Scholar.

---

### PHASE 6 — AI Integration (Atlas & Platform AI)
**Duration:** 2 weeks  
**Goal:** Full Atlas AI companion, AI exam tools, content verification AI, platform intelligence

**6.1 — Atlas AI — Student Companion**
1. Atlas lives as a persistent floating button on student dashboard and exam-related pages
2. Opens as a side panel (not a full page) — conversational interface
3. Atlas has access to: student's full profile, subject stats, recent exam results, enrolled courses, active quests
4. Atlas system prompt — include full academic context on every call:
```typescript
const atlasSystemPrompt = (profile: Profile, stats: SubjectStats[]) => `
You are Atlas, an AI academic companion for ${profile.display_name} on ADJ EduQuest.
You are calm, direct, and genuinely encouraging without hollow praise.
You speak to this specific student — never generically.

STUDENT PROFILE:
- Class: ${profile.current_class}
- Target exams: ${profile.target_exams?.join(', ')}
- Subjects: ${profile.subjects?.join(', ')}
- Current rank: ${profile.rank_level}
- Study streak: ${profile.current_streak} days

ACADEMIC PERFORMANCE:
${stats.map(s => `- ${s.subject}: avg ${s.avg_score}%, trend ${s.score_trend > 0 ? '+' : ''}${s.score_trend}%, platform percentile ${s.platform_percentile}%`).join('\n')}

WEAK AREAS (prioritise these in recommendations):
${stats.filter(s => s.avg_score < 60).map(s => `- ${s.subject}: ${s.avg_score}% avg`).join('\n')}

You can:
- Explain academic concepts (calibrated to their level — don't over-explain what they've mastered)
- Give post-exam debriefs when they share a session result
- Generate targeted practice questions in E-Quest format
- Create personalised study plans
- Provide pre-exam briefings based on their weak areas
- Recognise declining performance trends and respond with empathy before more drills

Format responses clearly. Use $$LaTeX$$ for all formulas.
Keep responses concise — this is mobile-first. No walls of text.
`;
```
5. Pre-exam briefing: auto-triggered before student starts an exam. Atlas reads subject from exam metadata, surfaces their weak areas in that subject.
6. Post-exam debrief: triggered when student views results. Atlas gives personalised analysis.
7. Adaptive practice: student can ask "give me 10 Chemistry questions on my weak areas" — Atlas generates in E-Quest format, rendered and takeable inline
8. Study planning: "Make me a 6-week JAMB study plan" — Atlas outputs week-by-week plan using their actual weak areas

**6.2 — AI Exam Tools (Teacher)**
1. AI Tab in exam builder (now active)
2. Document upload: PDF, DOCX → extract text → generate questions
3. Generation prompt: full E-Quest format prompt (from v1 spec) + LaTeX rules, sent to Gemini Flash
4. Generated questions in parser format → paste into Parser tab → renders normally
5. "Generate by topic": enter topic + difficulty + count → Gemini generates targeted questions
6. Explanation generator: "Generate Explanation" button on any question card → Gemini returns explanation with LaTeX
7. Question bank deduplication: before saving AI-generated questions, check semantic similarity against existing bank (edge function)

**6.3 — AI Theory Grading**
1. "AI Assist" button in teacher grading interface for THE questions
2. Sends to Gemini Pro: question text, model answer, student response, total marks
3. Returns JSON: `{ suggestedMark, pointsCovered, pointsMissed, feedback }`
4. Displayed in grading panel alongside question
5. Teacher enters final mark — AI suggestion shown but not binding

**6.4 — Content Verification AI**
1. When a course or past question is submitted for review, edge function triggers Gemini Pro review
2. Course check: factual accuracy, syllabus coverage (vs hardcoded Nigerian curriculum data), reading level, formula correctness
3. Question check: correct answer validation, explanation accuracy, appropriate difficulty tag
4. AI returns: `{ approved: boolean, issues: string[], syllabusScore: number, suggestedFixes: string[] }`
5. Auto-approve if no issues. Flag for human review if issues found. Auto-reject clearly wrong content.
6. Creator notified with specific feedback from AI check

**6.5 — Platform Intelligence (Background AI)**
1. Student weak area identification: edge function runs after each exam session, updates `student_subject_stats.topic_breakdown`
2. Dynamic question difficulty: weekly cron job recalculates `actual_difficulty_score` for all questions based on platform-wide performance data
3. Course effectiveness scoring: monthly cron calculates `avg_score_improvement` per course by comparing enrolled students' exam performance before and after course completion
4. Cohort anomaly detection: weekly analysis — if a subject's average drops significantly compared to previous cohort, flag to platform admin with specifics
5. Recommendation engine: when student visits `/courses` or `/quests`, edge function queries their weak areas and returns ranked recommendations

**6.6 — Atlas Emotional Intelligence**
1. Performance decline detection: if student's last 3 exams trend downward by >10%, Atlas proactively surfaces a different message when they open the app:
   - Not: "Here are 20 practice questions"
   - Instead: "I've noticed your scores have dipped a bit recently. That happens. Want to talk through what's feeling hard?"
2. Streak loss support: when a streak breaks, Atlas message on next login — acknowledges it, reframes positively, sets up a fresh start quest
3. Pre-exam anxiety detection: if student is taking an exam flagged as high-stakes (WAEC/JAMB type) for the first time, Atlas pre-exam briefing is warmer and includes a brief grounding note

---

### PHASE 7 — TalentFlow Layer
**Duration:** 1.5 weeks  
**Goal:** Skill graph, project teams, employer board, scholarship board

**7.1 — Skill Graph**
1. Computed from: all exam_sessions (subject, topic_breakdown), course completions, project deliverable ratings
2. Displayed on profile as: interactive radar/spider chart (subject axes, percentile score filled)
3. Granular topic-level breakdown available on click: "Chemistry → Organic: 89th percentile, Physical: 67th percentile, Electrochemistry: 41st percentile"
4. Updates after every exam session (edge function)
5. Public on profile — employers and institutions can see it

**7.2 — Project Board**
1. `/talent` — project board
2. Available to: Distinguished and Elite rank students + all teacher/admin accounts
3. Projects posted by: centres, companies (verified accounts), platform admin
4. Each project: title, description, required roles, difficulty, duration, team size, applications
5. Apply to a project: select which role you're applying for. Application shows your skill graph for relevant subjects.
6. Platform assembles teams based on applications and skill graph fit
7. Team workspace: private Study Room variant with project-specific channels, file sharing, deliverable submission

**7.3 — Employer & Institution Dashboard**
1. Verified employer/university accounts (platform_admin approves)
2. Post opportunity: internship, scholarship, admission preference
3. Set filter criteria: subject percentile minimums, rank level, EduTokens, state/region
4. Platform surfaces matching student profiles (students who have opted into visibility)
5. Student can opt in/out of employer visibility in profile settings
6. "Opportunity Board" visible to all Distinguished+ students

**7.4 — Scholarship Board**
1. `/scholarships` — accessible to all logged-in students
2. Scholarships posted by: NGOs, companies, universities, platform admin
3. Filter by: subject, location, eligibility, deadline
4. "Apply with EduQuest Profile" — one-click application using verified platform data instead of manual CV
5. Application includes: skill graph, relevant EduTokens, exam score history (anonymised for platform stats, fully visible to specific opportunity they apply to)

---

### PHASE 8 — Mobile App (React Native / Expo)
**Duration:** 2 weeks  
**Goal:** Fully functional iOS and Android app sharing logic with web

**Setup:**
```bash
npx create-expo-app adj-eduquest-mobile --template blank-typescript
npx expo install expo-router react-native-safe-area-context react-native-screens
npx expo install @supabase/supabase-js @tanstack/react-query zustand
npx expo install expo-notifications expo-secure-store expo-file-system
```

**Shared logic strategy:** Extract all business logic (API calls, Supabase queries, state management, quest logic) into a shared `/packages/core` folder. Web React and React Native both import from it. Only UI components differ.

**Key mobile-specific implementations:**
1. File system access: `expo-file-system` for exam state caching, `.adjr` export
2. Push notifications: `expo-notifications` + Supabase Edge Function as notification sender
3. Secure storage: `expo-secure-store` for auth token (instead of localStorage)
4. Offline exam resilience: save exam session answers to SecureStore every 30 seconds, sync to Supabase on reconnect
5. Biometric auth option: Face ID / fingerprint for quick login
6. Deep links: `adjquest://exam/[id]`, `adjquest://challenge/[id]`, `adjquest://centre/[slug]`
7. Share sheet integration: share result card as image to WhatsApp, Instagram stories
8. Haptic feedback: on quest completion, coin earned, correct answer flash

**Exam on mobile — critical details:**
- Timer always visible in sticky header
- One question per screen (swipe to navigate)
- Formula renders using react-native-katex or WebView wrapper for KaTeX
- Auto-lock screen prevention during active exam (`expo-keep-awake`)
- Warning modal if student tries to leave exam screen

---

### PHASE 9 — Payments & Wallet
**Duration:** 1 week  
**Goal:** Paystack integration, subscriptions, course purchases, EduSon enrollment

**9.1 — Paystack Setup**
1. Create Paystack account, get test and live keys
2. Payment initialisation via Supabase Edge Function (server-side) — never expose secret key to client
3. Webhook endpoint in Edge Function: verify signature, update payment record, unlock access

**9.2 — Scholar Tier Subscription**
1. Subscription plans page: Free vs Scholar comparison table
2. Paystack recurring subscription setup
3. On successful subscription: update `profile.tier` to 'scholar', create subscription record
4. Subscription management: cancel, view renewal date, switch plan

**9.3 — Centre Subscriptions**
1. Centre admin upgrades centre tier from centre dashboard
2. Centre tier unlocks features immediately on payment confirmation
3. Per-seat pricing for larger tiers (calculated on student count)

**9.4 — Course & EduSon Purchases**
1. "Enroll" button on paid course/EduSon triggers Paystack popup
2. On success: create enrollment record, grant access, send confirmation notification
3. EduCoin partial-payment: student can apply saved EduCoins for a percentage discount (up to 20%)

**9.5 — EduWallet**
1. `/wallet` — transaction history: EduCoin ledger, cash payment history
2. "Cash out" EduCoins → only applicable for tutors (convert accumulated coins from course revenue to NGN)
3. Centre paid enrollments: student pays to join verified centre, payment goes to centre admin minus platform cut

---

### PHASE 10 — Analytics & Insights
**Duration:** 1 week  
**Goal:** Student performance analytics, centre dashboards, platform admin view

**10.1 — Student Analytics Dashboard**
1. `/analytics` (student view)
2. Sections:
   - Overall performance trend (line chart — scores over time)
   - Subject breakdown (radar chart)
   - Topic heat map: grid of topics, colour-coded by performance (green = strong, red = weak)
   - Improvement comparison: "You 3 months ago vs You now"
   - Exam history: all sessions, filterable by subject and type
   - Atlas AI insights: automatically surfaced patterns ("You consistently struggle with questions asked after the 30-minute mark — check your focus patterns")
3. Charts: use Recharts (lightweight, React-native friendly)

**10.2 — Teacher Analytics**
1. Per-exam analytics: score distribution, average, most-failed questions (with formula rendering)
2. Class trends: how a class performs over multiple exams
3. Content effectiveness: "Students who completed your Organic Chemistry module scored X% higher on organic questions"
4. Question analytics: which questions have the highest failure rate — flag for review or replacement

**10.3 — Centre Admin Dashboard Analytics**
1. Student roster with performance snapshot per student
2. Class comparison: how different classes perform on the same subject
3. Teacher effectiveness: anonymised comparison of student outcomes per teacher
4. Monthly report generation: PDF export of centre performance stats (use jsPDF)
5. Verification score display: what score they need to maintain for Verified badge

**10.4 — Platform Admin (Internal)**
1. `/admin` — restricted to platform_admin role
2. Platform-wide stats: DAU/MAU, exam sessions per day, new registrations
3. Content moderation queue: flagged messages, pending course reviews, reported users
4. Centre verification management: approve/revoke Verified badges
5. Employer/institution account approvals
6. Cohort anomaly alerts (from Phase 6.5)
7. Subject Olympiad management: create, schedule, start, end

---

### PHASE 11 — Polish, PWA & Performance
**Duration:** 1 week  
**Goal:** PWA installation, offline resilience, performance optimisation, accessibility

**11.1 — PWA Setup**
1. Generate `manifest.json` with app icons, name, theme colours
2. Configure Workbox via Vite PWA plugin: `vite-plugin-pwa`
3. Cache strategy:
   - Network-first: exam sessions, real-time data
   - Cache-first: past questions (rarely change), course content, question bank
   - Stale-while-revalidate: leaderboards, profiles
4. Offline fallback page: shown when completely offline, with cached content still accessible
5. "Install App" prompt banner — shown after 3rd visit, dismissible

**11.2 — Performance**
1. Code splitting: lazy-load all route components
2. Image optimisation: all Supabase Storage images through CDN with size params
3. React Query caching: set appropriate stale times per query type
4. Virtualise long lists: question bank, leaderboard, notification list (react-virtual)
5. Bundle analysis: check with `vite-bundle-visualizer`, reduce largest chunks

**11.3 — Accessibility**
1. ARIA labels on all interactive elements
2. Keyboard navigation for exam interface
3. High-contrast mode option in settings
4. Font size preference setting (affects all rendered content including KaTeX)
5. Screen reader testing on critical paths: auth, exam taking, results

**11.4 — Mobile Web Polish**
1. Test on actual Android devices (Chrome, Samsung Internet)
2. Test on iPhone (Safari)
3. Fix any touch target sizing issues (minimum 44×44px)
4. Confirm KaTeX renders correctly on all mobile browsers
5. Fix any iOS Safari quirks (safe area insets, scroll behaviour)

---

### PHASE 12 — Beta, Launch & Scale
**Duration:** 2 weeks  
**Goal:** Controlled beta, bug fixing, first real users, launch

**12.1 — Beta Program**
1. Recruit: 2–3 tutorial centres (known contacts), 20–30 students, 5–8 teachers
2. Create a beta feedback channel (in-platform and WhatsApp group)
3. In-app feedback button: screenshot annotation + text (use Marker.io free tier)
4. Watch actual teachers create their first exam — note every confusion point
5. Watch actual students take their first exam on their phone — note every friction
6. Week 1 of beta: observe only. Week 2: fix critical issues.

**12.2 — Pre-Launch Checklist**
- [ ] All Supabase RLS policies verified (try to break them manually)
- [ ] Paystack switched to live keys in production env
- [ ] Custom domain configured (adjquest.ng)
- [ ] SSL verified
- [ ] Error monitoring (Sentry) active and receiving events
- [ ] Supabase database backups enabled
- [ ] Rate limiting on Edge Functions (prevent abuse)
- [ ] GDPR/NDPR-compliant privacy policy and terms published
- [ ] Google Analytics or PostHog active
- [ ] Social login (Google OAuth) tested in production domain

**12.3 — Launch Strategy**
1. Launch with free tier fully functional — no paywalls blocking the core value
2. First target: JAMB season (typically Jan-Feb). Align launch timing.
3. Content seeding: manually upload first 500 JAMB past questions before launch
4. Centre onboarding: personally onboard first 5 centres with white-glove support
5. The hook for students: "Free JAMB past questions + AI feedback on your performance" — this is the organic growth driver

---

## 7. File Export System (Legacy Compatibility)

The `.adjx`, `.adjs`, `.adjr`, `.adjb` file formats from v1 are preserved as **export/import features**. They are not the primary data transport — Supabase is. But they serve:
- Teacher wants a local backup of an exam
- School with very poor internet wants to export and reimport
- Migration path from v1 users (if any exist)

```typescript
// src/lib/fileExport.ts
import CryptoJS from 'crypto-js';

const APP_KEY = import.meta.env.VITE_FILE_ENCRYPTION_KEY;

export function exportExam(exam: Exam, questions: Question[]): void {
  const payload = { meta: exam, questions };
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(payload), APP_KEY).toString();
  downloadFile(`${exam.title}.adjx`, encrypted);
}

export function exportResult(session: ExamSession, exam: Exam): void {
  const payload = { session, exam, exportedAt: new Date().toISOString() };
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(payload), APP_KEY).toString();
  downloadFile(`Result_${session.student_id}_${exam.title}.adjr`, encrypted);
}

function downloadFile(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}
```

---

## 8. AI Prompting Strategy for Windsurf

When feeding phases to Windsurf + Gemini, use this structure for each prompt:

```
CONTEXT:
- Project: ADJ EduQuest — educational platform for Nigeria
- Stack: React 18 + TypeScript + Vite + Tailwind CSS + Supabase + Framer Motion
- Design tokens: [paste relevant colour variables]
- Current phase: Phase X — [Phase Name]

EXISTING CODE CONTEXT:
[Paste the relevant existing components/files this new code will interact with]

TASK:
Build [specific component/feature] with these requirements:
[Numbered list of specific requirements from the phase above]

CONSTRAINTS:
- Mobile-first — test CSS at 390px width first
- Dark mode default (bg: #0F1117, text: #F0F2FF)
- All user-facing text uses Plus Jakarta Sans
- All headings use Clash Display
- Animations via Framer Motion only (no CSS keyframes for complex animations)
- All database operations go through React Query hooks
- Supabase client imported from src/lib/supabase.ts
- Do not use localStorage for any user data — Supabase only
- Error states and loading states required for all async operations

OUTPUT FORMAT:
- Complete component file(s)
- Any new Supabase query hooks needed
- Any Edge Function code if required
- Brief notes on integration with existing code
```

**Batch size recommendation:** Feed one numbered sub-task (e.g., "2.1 — Question Parser Component") per Windsurf session. Do not dump an entire phase at once — the context gets confused and quality drops.

---

## 9. Environment Variables Master List

```bash
# .env.local (never commit this file)

# Supabase
VITE_SUPABASE_URL=https://[your-project].supabase.co
VITE_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[service-role-key]  # Edge functions only, never in client

# Google AI
GEMINI_API_KEY=[your-gemini-api-key]
VITE_GEMINI_API_KEY=[for client-side AI calls only]

# Paystack
VITE_PAYSTACK_PUBLIC_KEY=[pk_test_xxx or pk_live_xxx]
PAYSTACK_SECRET_KEY=[sk_test_xxx or sk_live_xxx]  # Edge functions only

# File encryption (for .adj* file exports)
VITE_FILE_ENCRYPTION_KEY=[random-32-char-string]

# App
VITE_APP_URL=https://adjquest.ng
VITE_APP_ENV=development  # development | production

# PostHog (analytics)
VITE_POSTHOG_KEY=[your-posthog-key]
VITE_POSTHOG_HOST=https://app.posthog.com

# Sentry (error monitoring)
VITE_SENTRY_DSN=[your-sentry-dsn]
```

---

## 10. Folder Structure

```
adj-eduquest/
├── public/
│   ├── manifest.json
│   └── icons/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/               ← Base UI: Button, Card, Input, Modal, Badge, Avatar
│   │   ├── layout/           ← AppShell, Sidebar, TopNav, MobileNav
│   │   ├── exam/             ← QuestionParser, QuestionCard, ExamInterface, Timer, GradingPanel
│   │   ├── gamification/     ← QuestCard, CoinDisplay, LeaderboardRow, RankBadge, ChallengeCard
│   │   ├── social/           ← MessageBubble, StudyRoomPanel, FeedPost, NotificationItem
│   │   ├── courses/          ← CourseCard, ModuleViewer, EduSonCard
│   │   ├── atlas/            ← AtlasPanel, AtlasMessage, AtlasTrigger
│   │   ├── charts/           ← PerformanceChart, SubjectRadar, TopicHeatmap
│   │   └── shared/           ← MathRenderer, CentreCard, ProfileCard, FileExport
│   ├── pages/
│   │   ├── Landing.tsx
│   │   ├── Auth.tsx
│   │   ├── Onboarding.tsx
│   │   ├── Dashboard.tsx
│   │   ├── exam/
│   │   │   ├── Create.tsx
│   │   │   ├── Take.tsx
│   │   │   ├── Grade.tsx
│   │   │   └── Results.tsx
│   │   ├── centre/
│   │   │   ├── Profile.tsx
│   │   │   └── Dashboard.tsx
│   │   ├── courses/
│   │   │   ├── Discover.tsx
│   │   │   ├── Detail.tsx
│   │   │   └── MyCourses.tsx
│   │   ├── social/
│   │   │   ├── Feed.tsx
│   │   │   ├── StudyRooms.tsx
│   │   │   └── Messages.tsx
│   │   ├── gamification/
│   │   │   ├── Quests.tsx
│   │   │   ├── Leaderboard.tsx
│   │   │   ├── Challenges.tsx
│   │   │   └── MiniGames.tsx
│   │   ├── talent/
│   │   │   ├── Projects.tsx
│   │   │   └── Opportunities.tsx
│   │   ├── analytics/
│   │   │   └── Performance.tsx
│   │   ├── wallet/
│   │   │   └── Wallet.tsx
│   │   └── admin/
│   │       └── PlatformAdmin.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useProfile.ts
│   │   ├── useCentre.ts
│   │   ├── useExam.ts
│   │   ├── useQuestions.ts
│   │   ├── useExamSession.ts
│   │   ├── useQuests.ts
│   │   ├── useEduCoins.ts
│   │   ├── useLeaderboard.ts
│   │   ├── useChallenges.ts
│   │   ├── useMessages.ts
│   │   ├── useCourses.ts
│   │   └── useAtlas.ts
│   ├── stores/
│   │   ├── authStore.ts        ← Zustand: user, profile, session
│   │   ├── examStore.ts        ← Zustand: active exam state, answers, timer
│   │   ├── uiStore.ts          ← Zustand: sidebar open, modals, toasts
│   │   └── atlasStore.ts       ← Zustand: Atlas panel open, conversation history
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── gemini.ts
│   │   ├── paystack.ts
│   │   ├── fileExport.ts
│   │   ├── questionParser.ts   ← The || delimiter parser logic
│   │   ├── mathRenderer.ts
│   │   ├── integrity.ts        ← Exam monitoring logic
│   │   └── questEngine.ts      ← Quest progress checking logic
│   ├── types/
│   │   ├── database.types.ts   ← Auto-generated from Supabase (npx supabase gen types)
│   │   └── app.types.ts        ← Custom app types
│   ├── constants/
│   │   ├── subjects.ts         ← Nigerian curriculum subject list
│   │   ├── syllabus.ts         ← WAEC/JAMB/NECO topic mappings
│   │   ├── ranks.ts            ← Rank thresholds and privileges
│   │   └── quests.ts           ← Hardcoded quest definitions
│   └── utils/
│       ├── formatting.ts
│       ├── grading.ts          ← Auto-grading logic (MCQ, MRQ, FIB)
│       └── platformId.ts       ← TQ/SQ ID generation
├── supabase/
│   ├── migrations/             ← SQL files, one per schema change
│   ├── functions/              ← Edge Functions (Deno)
│   │   ├── grade-session/
│   │   ├── update-quest-progress/
│   │   ├── process-payment-webhook/
│   │   ├── verify-course-content/
│   │   ├── generate-leaderboard-snapshot/
│   │   ├── update-subject-stats/
│   │   └── send-notification/
│   └── seed.sql                ← Initial data (subjects, past questions, starter quests)
├── .env.local
├── .env.example
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

*ADJ EduQuest — Master Build Plan v1.0*  
*DEVCOUNI | Confidential | 2026*  
*Built for Nigerian classrooms. Designed for the continent.*
```
