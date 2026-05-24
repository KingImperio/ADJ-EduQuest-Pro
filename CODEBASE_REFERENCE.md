# ADJ EduQuest Pro - Codebase Reference

Quick navigation guide to all important parts of the codebase.

---

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components (routes)
│   ├── auth/           # Authentication pages
│   ├── course/         # Course-related pages
│   ├── dashboard/      # Dashboard views
│   └── exam/           # Exam-related pages
├── stores/             # Zustand state management
├── lib/                # Utilities (Supabase client)
├── types/              # TypeScript type definitions
└── App.tsx             # Main app with routing
```

---

## Core Components

### Navigation & Layout

| Component       | Location                             | Description                                        |
| --------------- | ------------------------------------ | -------------------------------------------------- |
| MarketingHeader | `src/components/MarketingHeader.tsx` | Glassmorphism header for marketing pages           |
| MarketingFooter | `src/components/MarketingFooter.tsx` | Footer with links for marketing pages              |
| AppLayout       | `src/components/AppLayout.tsx`       | Layout for authenticated routes (sidebar + mobile) |
| Sidebar         | `src/components/Sidebar.tsx`         | Collapsible sidebar navigation                     |
| Icon            | `src/components/Icon.tsx`            | Unified icon component (Lucide + Tabler)           |

### UI Components

| Component                  | Location                                        | Description                                                  |
| -------------------------- | ----------------------------------------------- | ------------------------------------------------------------ |
| AnimatedGridBackground     | `src/components/AnimatedGridBackground.tsx`     | Dotted grid background animation                             |
| AnimatedGradientBackground | `src/components/AnimatedGradientBackground.tsx` | Continuous floating gradient orbs (blue, gold, coral, green) |

---

## Marketing Pages

| Page         | Route           | File Location                |
| ------------ | --------------- | ---------------------------- |
| Landing      | `/`             | `src/pages/Landing.tsx`      |
| Features     | `/features`     | `src/pages/Features.tsx`     |
| How It Works | `/how-it-works` | `src/pages/HowItWorks.tsx`   |
| Pricing      | `/pricing`      | `src/pages/Pricing.tsx`      |
| Testimonials | `/testimonials` | `src/pages/Testimonials.tsx` |
| FAQ          | `/faq`          | `src/pages/FAQ.tsx`          |
| Centres      | `/centres`      | `src/pages/Centres.tsx`      |
| About        | `/about`        | `src/pages/About.tsx`        |
| Contact      | `/contact`      | `src/pages/Contact.tsx`      |

---

## Authentication Pages

| Page               | Route                      | File Location                          |
| ------------------ | -------------------------- | -------------------------------------- |
| Sign In            | `/auth/signin`             | `src/pages/auth/SignIn.tsx`            |
| Sign Up            | `/auth/signup`             | `src/pages/auth/SignUp.tsx`            |
| Forgot Password    | `/auth/forgot-password`    | `src/pages/auth/ForgotPassword.tsx`    |
| Reset Password     | `/auth/reset-password`     | `src/pages/auth/ResetPassword.tsx`     |
| Email Verification | `/auth/email-verification` | `src/pages/auth/EmailVerification.tsx` |

---

## Authenticated App Pages

| Page              | Route               | File Location                              |
| ----------------- | ------------------- | ------------------------------------------ |
| Student Dashboard | `/dashboard`        | `src/pages/dashboard/StudentDashboard.tsx` |
| Exam Taking       | `/exam/:examId`     | `src/pages/exam/ExamTaking.tsx`            |
| Course Learning   | `/course/:courseId` | `src/pages/course/CourseLearning.tsx`      |

---

## State Management

| Store      | Location                  | Purpose                                     |
| ---------- | ------------------------- | ------------------------------------------- |
| Auth Store | `src/stores/authStore.ts` | User authentication state, session, profile |

---

## Configuration Files

| File            | Location              | Purpose                      |
| --------------- | --------------------- | ---------------------------- |
| Tailwind Config | `tailwind.config.cjs` | Theme colors, fonts, shadows |
| Supabase Client | `src/lib/supabase.ts` | Supabase initialization      |
| Types           | `src/types/index.ts`  | TypeScript interfaces        |
| Vite Config     | `vite.config.ts`      | Build configuration          |

---

## Assets

| Asset Type | Location                               |
| ---------- | -------------------------------------- |
| Logo       | `/public/img/ADJ-logo-transparent.png` |
| Favicon    | `/public/favicon.ico`                  |

---

## Common Edit Locations

### Logo Sizes (All Locations)

All logo instances use `h-XX w-auto object-contain` classes:

- **MarketingHeader**: `h-20 md:h-28`
- **MarketingHeader Mobile**: `h-24`
- **MarketingFooter**: `h-20 md:h-28`
- **Landing Header**: `h-24 md:h-32 lg:h-40`
- **Landing Mobile Menu**: `h-24`
- **Landing Footer**: `h-20 md:h-28`
- **Auth Pages**: `h-24`
- **AppLayout Sidebar**: `h-20`
- **AppLayout Mobile Header**: `h-20`
- **Sidebar Component**: `h-16`

### Navigation Links

- **MarketingHeader Desktop**: Lines 33-57
- **MarketingHeader Mobile**: Lines 124-143
- **MarketingFooter Platform**: Lines 36-41
- **MarketingFooter For Centres**: Lines 48-52
- **MarketingFooter Company**: Lines 59-64
- **Landing Desktop Nav**: Lines 37-42
- **Landing Mobile Nav**: Lines 81-86

### Color Scheme

Primary colors defined in `tailwind.config.cjs`:

- `primary`: #1E3FCC (Blue)
- `gold`: #F59E0B
- `coral`: #F97316
- `success`: #10B981

---

## Quick Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Last Updated

April 24, 2026
