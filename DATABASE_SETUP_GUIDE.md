# ADJ EduQuest Pro - Database Setup Guide

## 🚀 Quick Setup (Recommended)

### Step 1: Run the Complete Schema
1. **Open Supabase Dashboard** → Your Project → SQL Editor
2. **Copy the entire contents** of `schema.sql`
3. **Paste and run** it in the SQL Editor
4. **Wait for completion** (should take 30-60 seconds)

### Step 2: Verify Setup
Run this query to confirm all tables exist:
```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

You should see **35+ tables** including:
- Core: profiles, centres, questions, exams, exam_sessions
- Advanced: courses, edusons, quests, challenges, study_rooms
- Social: messages, feed_posts, follows
- System: payments, subscriptions, notifications

---

## 🔧 Manual Setup (Alternative)

If you prefer step-by-step setup or encounter issues:

### Phase 1: Core Tables (Run in Supabase SQL Editor)
1. **Copy from `schema.sql`** sections 1-3 (Extensions, Types, Core Tables)
2. **Run in SQL Editor**
3. **Verify** with table count query

### Phase 2: Advanced Features (Run Separately)
1. **Copy from `schema.sql`** sections 4-9 (Learning, Gamification, Social, etc.)
2. **Run in SQL Editor**
3. **Verify** with table count query

### Phase 3: Security & Performance (Run Last)
1. **Copy from `schema.sql`** sections 10-13 (Triggers, RLS, Policies, Indexes)
2. **Run in SQL Editor**
3. **Verify** all policies are active

---

## ⚙️ Configuration Steps

### 1. Authentication Settings (Supabase Dashboard)
Navigate to **Authentication** → **Settings**:

**Site URL:** `http://localhost:5173` (development)
**Redirect URLs:**
- `http://localhost:5173/auth/callback`
- `http://localhost:5173/auth/email-verification`

### 2. Email Templates (Supabase Dashboard)
Navigate to **Authentication** → **Email Templates**:

**Confirm Signup Template:**
```html
<h2>Welcome to ADJ EduQuest!</h2>
<p>Click the link below to verify your email and start learning:</p>
<p><a href="{{ .ConfirmationURL }}">Verify Email</a></p>
```

**Reset Password Template:**
```html
<h2>Reset Your Password</h2>
<p>Click the link below to reset your password:</p>
<p><a href="{{ .ConfirmationURL }}">Reset Password</a></p>
```

### 3. Storage Setup (Optional)
Navigate to **Storage** → **Create Bucket**:

**Bucket Name:** `avatars`
- **Public:** Yes
- **File Size Limit:** 2MB

**Bucket Name:** `questions`
- **Public:** Yes
- **File Size Limit:** 5MB

### 4. Environment Variables (Already Configured)
Your `.env.local` should have:
```bash
VITE_SUPABASE_URL=https://xsvilzigacqgqtnjjvtt.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_APP_URL=http://localhost:5173
VITE_APP_ENV=development
```

---

## 🧪 Testing Setup

### 1. Test Authentication
```bash
npm run dev
# Visit http://localhost:5173/auth/signup
# Try signing up and verifying email
```

### 2. Verify Database
Run in Supabase SQL Editor:
```sql
-- Check profiles table
SELECT COUNT(*) FROM profiles;

-- Check if RLS is working
SELECT COUNT(*) FROM questions WHERE status = 'approved';

-- Test profile creation trigger
SELECT * FROM profiles LIMIT 5;
```

---

## 📁 File Structure

After setup, your project structure:
```
ADJ-EduQuest-Pro/
├── schema.sql                 # ✅ Complete database schema
├── SUPABASE_SETUP.md          # 🗑️  To be deleted (old)
├── SUPABASE_MISSING_TABLES.sql # 🗑️ To be deleted (old)
├── src/
│   ├── lib/supabase.ts        # ✅ Supabase client configured
│   ├── stores/authStore.ts    # ✅ Authentication store
│   └── types/index.ts         # ✅ TypeScript types
└── .env.local                 # ✅ Environment variables
```

---

## 🚨 Troubleshooting

### Schema Won't Run
- **Error:** "Extension doesn't exist"
  - **Fix:** Remove the `CREATE EXTENSION` line (Supabase has it by default)

- **Error:** "Type already exists"
  - **Fix:** The `DO $$ ... EXCEPTION` blocks handle this automatically

### Authentication Not Working
- **Check:** Site URL and redirect URLs in Supabase Auth settings
- **Check:** Environment variables are loaded correctly
- **Test:** Try a simple signup flow

### Tables Missing
- **Run:** The verification query to see which tables exist
- **Fix:** Run the missing sections from `schema.sql`

---

## 🎯 What's Included

### Core Educational Platform
- ✅ User profiles with roles and gamification
- ✅ Tutorial centres and class management
- ✅ Question bank and exam system
- ✅ Real-time exam taking with integrity monitoring

### Advanced Learning
- ✅ Self-paced courses with modules
- ✅ Cohort-based programs (EduSons)
- ✅ Live sessions and recordings
- ✅ Course enrollment and progress tracking

### Gamification
- ✅ EduCoins and XP system
- ✅ Achievement tokens (NFT-like)
- ✅ Daily/weekly quests
- ✅ Peer challenges and competitions

### Social Features
- ✅ Study rooms for collaborative learning
- ✅ Real-time messaging with voting
- ✅ Social feed with posts and comments
- ✅ Follow system and networking

### Analytics & Business
- ✅ Student performance tracking
- ✅ Leaderboards and rankings
- ✅ Payment processing (Paystack integration)
- ✅ Subscription management

### Security & Performance
- ✅ Row Level Security on all tables
- ✅ Comprehensive access policies
- ✅ Database indexes for performance
- ✅ Automatic profile creation on signup

---

## 🏁 Ready to Launch!

Once setup is complete:
1. ✅ Database schema deployed
2. ✅ Authentication configured
3. ✅ Security policies active
4. ✅ Email templates set up

Your ADJ EduQuest Pro platform is now **production-ready**! 🚀

---

*Last updated: April 25, 2026*</content>
<parameter name="filePath">C:\Users\USER\CascadeProjects\ADJ-EduQuest-Pro\DATABASE_SETUP_GUIDE.md