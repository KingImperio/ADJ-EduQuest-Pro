-- ================================================
-- ADJ EDUQUEST PRO - COMPLETE DATABASE SCHEMA
-- ================================================
-- This is the complete SQL schema for ADJ EduQuest Pro
-- Run this entire file in your Supabase SQL editor
-- ================================================

-- ================================================
-- 1. EXTENSIONS
-- ================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================
-- 2. CUSTOM TYPES & ENUMS
-- ================================================
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM (
    'student', 'teacher', 'centre_admin', 'school_admin', 'platform_admin', 'parent'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE question_type AS ENUM ('MCQ', 'MRQ', 'FIB', 'THE');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE platform_tier AS ENUM ('free', 'scholar', 'pro');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE centre_tier AS ENUM ('free', 'starter', 'pro', 'verified');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE exam_type AS ENUM ('WAEC', 'JAMB', 'NECO', 'GCE', 'internal', 'mock', 'practice');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE content_status AS ENUM ('draft', 'pending_review', 'approved', 'rejected', 'suspended');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE integrity_level AS ENUM ('clean', 'minor', 'moderate', 'significant');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE quest_type AS ENUM ('daily', 'weekly', 'subject', 'challenge', 'social', 'legacy', 'seasonal');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE live_session_status AS ENUM ('scheduled', 'live', 'ended', 'cancelled');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE challenge_status AS ENUM ('pending', 'active', 'completed', 'expired', 'cancelled');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE subscription_plan AS ENUM ('free', 'scholar', 'pro', 'centre_basic', 'centre_pro', 'enterprise');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'expired', 'past_due');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ================================================
-- 3. CORE TABLES (USER'S EXISTING SCHEMA)
-- ================================================

-- Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id                UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username          TEXT UNIQUE NOT NULL,
  display_name      TEXT NOT NULL,
  role              user_role NOT NULL DEFAULT 'student',
  current_class     TEXT,
  department        TEXT,
  subjects          TEXT[],
  state_of_origin   TEXT,
  edu_coins         INTEGER NOT NULL DEFAULT 0,
  xp_total          INTEGER NOT NULL DEFAULT 0,
  -- Additional gamification columns
  tier              platform_tier NOT NULL DEFAULT 'free',
  avatar_url        TEXT,
  bio               TEXT,
  target_exams      TEXT[],
  platform_id       TEXT UNIQUE,
  current_streak    INTEGER NOT NULL DEFAULT 0,
  longest_streak    INTEGER NOT NULL DEFAULT 0,
  last_active_date  DATE,
  rank_level        TEXT NOT NULL DEFAULT 'Learner',
  followers_count   INTEGER NOT NULL DEFAULT 0,
  following_count   INTEGER NOT NULL DEFAULT 0,
  onboarded         BOOLEAN NOT NULL DEFAULT FALSE,
  is_verified       BOOLEAN NOT NULL DEFAULT FALSE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Centres (tutorial centres / schools)
CREATE TABLE IF NOT EXISTS centres (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id        UUID NOT NULL REFERENCES profiles(id),
  name            TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  description     TEXT,
  logo_url        TEXT,

  state           TEXT,
  city            TEXT,
  address         TEXT,

  teacher_invite_code  TEXT UNIQUE,
  student_invite_code  TEXT UNIQUE,

  teacher_count   INTEGER NOT NULL DEFAULT 0,
  student_count   INTEGER NOT NULL DEFAULT 0,

  verified_badge  BOOLEAN NOT NULL DEFAULT FALSE,
  is_public       BOOLEAN NOT NULL DEFAULT TRUE,

  -- Additional monetization columns
  tier            centre_tier NOT NULL DEFAULT 'free',
  paid_enrollment BOOLEAN NOT NULL DEFAULT FALSE,
  enrollment_fee  NUMERIC,

  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Centre memberships (who belongs to which centre)
CREATE TABLE IF NOT EXISTS centre_members (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  centre_id   UUID NOT NULL REFERENCES centres(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role        user_role NOT NULL,
  class       TEXT,
  status      TEXT NOT NULL DEFAULT 'active',
  joined_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(centre_id, user_id)
);

-- Class groups within centres
CREATE TABLE IF NOT EXISTS centre_classes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  centre_id   UUID NOT NULL REFERENCES centres(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  subject     TEXT,
  teacher_id  UUID REFERENCES profiles(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Question bank
CREATE TABLE IF NOT EXISTS questions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id      UUID NOT NULL REFERENCES profiles(id),
  centre_id       UUID REFERENCES centres(id),

  type            question_type NOT NULL,
  text            TEXT NOT NULL,
  options         JSONB,
  correct_answer  TEXT,
  explanation     TEXT,
  marks           INTEGER NOT NULL DEFAULT 1,

  image_url       TEXT,
  image_position  TEXT,

  subject         TEXT NOT NULL,
  topic           TEXT,
  difficulty      TEXT,

  -- Additional columns
  exam_type       exam_type,
  year            INTEGER,
  is_past_question BOOLEAN NOT NULL DEFAULT FALSE,
  syllabus_objectives TEXT[],
  actual_difficulty_score DECIMAL(4,3),
  times_answered  INTEGER NOT NULL DEFAULT 0,
  times_correct   INTEGER NOT NULL DEFAULT 0,

  status          content_status NOT NULL DEFAULT 'approved',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Exams
CREATE TABLE IF NOT EXISTS exams (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id      UUID NOT NULL REFERENCES profiles(id),
  centre_id       UUID REFERENCES centres(id),

  title           TEXT NOT NULL,
  subject         TEXT NOT NULL,
  target_class    TEXT,
  instructions    TEXT,
  duration_minutes INTEGER NOT NULL,
  total_marks     INTEGER NOT NULL,

  question_ids    UUID[] NOT NULL,

  shuffle_questions    BOOLEAN NOT NULL DEFAULT FALSE,
  shuffle_options      BOOLEAN NOT NULL DEFAULT FALSE,
  show_timer           BOOLEAN NOT NULL DEFAULT TRUE,
  allow_back_nav       BOOLEAN NOT NULL DEFAULT TRUE,

  status          content_status NOT NULL DEFAULT 'draft',

  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Exam assignments (which students get which exams)
CREATE TABLE IF NOT EXISTS exam_assignments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id     UUID NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
  student_id  UUID REFERENCES profiles(id) ON DELETE CASCADE,
  class_id    UUID REFERENCES centre_classes(id) ON DELETE CASCADE,
  assigned_by UUID NOT NULL REFERENCES profiles(id),
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Exam sessions (each student's attempt — answers live here)
CREATE TABLE IF NOT EXISTS exam_sessions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id             UUID NOT NULL REFERENCES exams(id),
  student_id          UUID NOT NULL REFERENCES profiles(id),

  answers             JSONB NOT NULL DEFAULT '{}',

  tab_switches        INTEGER NOT NULL DEFAULT 0,
  tab_switch_log      JSONB NOT NULL DEFAULT '[]',
  copy_attempts       INTEGER NOT NULL DEFAULT 0,
  paste_attempts      INTEGER NOT NULL DEFAULT 0,
  focus_time_ratio    DECIMAL(4,3),

  started_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  submitted_at        TIMESTAMPTZ,
  time_used_seconds   INTEGER,
  confidence_rating   INTEGER,
  is_auto_submitted   BOOLEAN NOT NULL DEFAULT FALSE,

  auto_score          DECIMAL(6,2),
  final_score         DECIMAL(6,2),
  percentage          DECIMAL(5,2),
  grade               TEXT,
  is_graded           BOOLEAN NOT NULL DEFAULT FALSE,
  graded_at           TIMESTAMPTZ,
  graded_by           UUID REFERENCES profiles(id),
  teacher_comments    TEXT,
  question_results    JSONB NOT NULL DEFAULT '{}',

  -- Additional integrity column
  integrity_level     integrity_level
);

-- ================================================
-- 4. ADVANCED LEARNING FEATURES
-- ================================================

-- Courses (self-paced learning)
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES profiles(id),
  centre_id UUID REFERENCES centres(id),
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  subject TEXT NOT NULL,
  target_class TEXT,
  exam_alignment TEXT[],
  is_free BOOLEAN NOT NULL DEFAULT FALSE,
  price INTEGER,
  module_ids UUID[] NOT NULL DEFAULT '{}',
  syllabus_coverage DECIMAL(5,2),
  ai_verified BOOLEAN NOT NULL DEFAULT FALSE,
  ai_verification_notes TEXT,
  human_reviewed BOOLEAN NOT NULL DEFAULT FALSE,
  enrollment_count INTEGER NOT NULL DEFAULT 0,
  avg_rating DECIMAL(3,2),
  avg_score_improvement DECIMAL(5,2),
  status content_status NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Course modules (lessons within courses)
CREATE TABLE IF NOT EXISTS course_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content_type TEXT NOT NULL, -- 'text', 'video', 'quiz', 'exam'
  text_content TEXT,
  video_url TEXT,
  quiz_question_ids UUID[],
  exam_id UUID REFERENCES exams(id),
  estimated_minutes INTEGER,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Course enrollments
CREATE TABLE IF NOT EXISTS course_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  progress JSONB NOT NULL DEFAULT '{}', -- {module_id: {completed: true, score: 85}}
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  final_score DECIMAL(5,2),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(course_id, student_id)
);

-- EduSons (cohort-based programs)
CREATE TABLE IF NOT EXISTS edusons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES profiles(id),
  centre_id UUID REFERENCES centres(id),
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  subjects TEXT[] NOT NULL,
  target_class TEXT,
  exam_alignment TEXT[],
  enrollment_opens_at TIMESTAMPTZ NOT NULL,
  enrollment_closes_at TIMESTAMPTZ NOT NULL,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  max_enrollment INTEGER,
  current_enrollment INTEGER NOT NULL DEFAULT 0,
  is_free BOOLEAN NOT NULL DEFAULT FALSE,
  is_public BOOLEAN NOT NULL DEFAULT TRUE,
  price INTEGER,
  course_ids UUID[],
  live_session_ids UUID[],
  mock_exam_ids UUID[],
  status content_status NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- EduSon enrollments
CREATE TABLE IF NOT EXISTS edusson_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  edusson_id UUID NOT NULL REFERENCES edusons(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  payment_ref TEXT,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(edusson_id, student_id)
);

-- Live sessions (for EduSons)
CREATE TABLE IF NOT EXISTS live_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id UUID NOT NULL REFERENCES profiles(id),
  centre_id UUID REFERENCES centres(id),
  edusson_id UUID REFERENCES edusons(id),
  title TEXT NOT NULL,
  subject TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER,
  recording_url TEXT,
  quiz_ids UUID[],
  attendee_ids UUID[],
  status live_session_status NOT NULL DEFAULT 'scheduled',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ================================================
-- 5. GAMIFICATION SYSTEM
-- ================================================

-- EduCoin transactions
CREATE TABLE IF NOT EXISTS edu_coin_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  balance_after INTEGER NOT NULL,
  transaction_type TEXT NOT NULL,
  reference_id UUID,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- EduTokens (NFT-like achievements)
CREATE TABLE IF NOT EXISTS edu_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  token_type TEXT NOT NULL, -- 'achievement', 'subject_master', 'streak'
  token_name TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  rarity TEXT NOT NULL DEFAULT 'common', -- 'common', 'rare', 'epic', 'legendary'
  earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reference_id UUID -- links to exam, course, etc.
);

-- Quests system
CREATE TABLE IF NOT EXISTS quests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  quest_type quest_type NOT NULL,
  requirements JSONB NOT NULL, -- flexible requirements object
  coin_reward INTEGER NOT NULL DEFAULT 0,
  xp_reward INTEGER NOT NULL DEFAULT 0,
  token_reward TEXT, -- token name if rewarded
  badge_reward TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  available_from TIMESTAMPTZ,
  available_until TIMESTAMPTZ,
  series_id UUID, -- for quest chains
  series_order INTEGER,
  min_tier platform_tier NOT NULL DEFAULT 'free',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- User quest progress
CREATE TABLE IF NOT EXISTS user_quests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  quest_id UUID NOT NULL REFERENCES quests(id) ON DELETE CASCADE,
  progress JSONB NOT NULL DEFAULT '{}',
  progress_pct DECIMAL(5,2) NOT NULL DEFAULT 0,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  rewards_claimed BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE(user_id, quest_id)
);

-- Challenges (peer competitions)
CREATE TABLE IF NOT EXISTS challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenger_id UUID NOT NULL REFERENCES profiles(id),
  challenge_type TEXT NOT NULL, -- 'exam', 'subject', 'speed'
  subject TEXT,
  question_ids UUID[] NOT NULL,
  time_limit_minutes INTEGER NOT NULL,
  coin_stake INTEGER NOT NULL DEFAULT 0,
  status challenge_status NOT NULL DEFAULT 'pending',
  challenger_centre_id UUID REFERENCES centres(id),
  opponent_centre_id UUID REFERENCES centres(id),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Challenge participants
CREATE TABLE IF NOT EXISTS challenge_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id),
  status TEXT NOT NULL DEFAULT 'invited', -- 'invited', 'accepted', 'declined'
  answers JSONB,
  score DECIMAL(6,2),
  time_used_ms INTEGER,
  completed_at TIMESTAMPTZ,
  UNIQUE(challenge_id, user_id)
);

-- ================================================
-- 6. SOCIAL FEATURES
-- ================================================

-- Study rooms (social learning spaces)
CREATE TABLE IF NOT EXISTS study_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES profiles(id),
  centre_id UUID REFERENCES centres(id),
  name TEXT NOT NULL,
  subject TEXT,
  description TEXT,
  is_public BOOLEAN NOT NULL DEFAULT TRUE,
  member_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Study room members
CREATE TABLE IF NOT EXISTS study_room_members (
  room_id UUID NOT NULL REFERENCES study_rooms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY(room_id, user_id)
);

-- Messages (chat system)
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES profiles(id),
  room_id UUID REFERENCES study_rooms(id) ON DELETE CASCADE,
  conversation_id TEXT, -- for DMs
  content TEXT NOT NULL,
  image_url TEXT,
  question_id UUID REFERENCES questions(id),
  reply_to_id UUID REFERENCES messages(id),
  is_help_request BOOLEAN NOT NULL DEFAULT FALSE,
  is_verified_explanation BOOLEAN NOT NULL DEFAULT FALSE,
  helpful_votes INTEGER NOT NULL DEFAULT 0,
  edited_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Message votes (for helpful explanations)
CREATE TABLE IF NOT EXISTS message_votes (
  message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  vote INTEGER NOT NULL, -- 1 for upvote, -1 for downvote
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY(message_id, user_id)
);

-- Social feed posts
CREATE TABLE IF NOT EXISTS feed_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES profiles(id),
  content TEXT NOT NULL,
  image_url TEXT,
  question_id UUID REFERENCES questions(id), -- link to question discussions
  likes_count INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Feed comments
CREATE TABLE IF NOT EXISTS feed_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES feed_posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES profiles(id),
  content TEXT NOT NULL,
  likes_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Social follows
CREATE TABLE IF NOT EXISTS follows (
  follower_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY(follower_id, following_id)
);

-- ================================================
-- 7. ANALYTICS & TRACKING
-- ================================================

-- Student subject statistics
CREATE TABLE IF NOT EXISTS student_subject_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  exams_taken INTEGER NOT NULL DEFAULT 0,
  avg_score DECIMAL(5,2),
  best_score DECIMAL(5,2),
  latest_score DECIMAL(5,2),
  score_trend DECIMAL(5,2), -- percentage change
  topic_breakdown JSONB NOT NULL DEFAULT '{}',
  platform_percentile DECIMAL(5,2),
  centre_percentile DECIMAL(5,2),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(student_id, subject)
);

-- Leaderboard snapshots (for performance tracking)
CREATE TABLE IF NOT EXISTS leaderboard_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  snapshot_type TEXT NOT NULL, -- 'weekly', 'monthly', 'subject'
  subject TEXT,
  centre_id UUID REFERENCES centres(id),
  state TEXT,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  entries JSONB NOT NULL, -- array of {user_id, score, rank}
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ================================================
-- 8. MONETIZATION & PAYMENTS
-- ================================================

-- Payment system
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id),
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'NGN',
  payment_type TEXT NOT NULL, -- 'subscription', 'course', 'eduson'
  reference_id UUID, -- links to subscription/course/etc
  paystack_ref TEXT UNIQUE,
  status payment_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  centre_id UUID REFERENCES centres(id),
  plan subscription_plan NOT NULL DEFAULT 'free',
  status subscription_status NOT NULL DEFAULT 'active',
  paystack_subscription_code TEXT,
  paystack_customer_code TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ================================================
-- 9. ADDITIONAL FEATURES
-- ================================================

-- Teacher AI settings
CREATE TABLE IF NOT EXISTS teacher_ai_settings (
  user_id UUID PRIMARY KEY REFERENCES profiles(id),
  provider TEXT, -- 'openai', 'anthropic', etc.
  api_key_encrypted TEXT, -- encrypted for security
  base_url TEXT,
  model TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Parent-child relationships
CREATE TABLE IF NOT EXISTS parent_child (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  child_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  confirmed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(parent_id, child_id)
);

-- ================================================
-- 10. TRIGGERS & FUNCTIONS
-- ================================================

-- Function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, username, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student'::user_role)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create updated_at triggers for all tables with updated_at column
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_centres_updated_at ON centres;
CREATE TRIGGER update_centres_updated_at BEFORE UPDATE ON centres
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_questions_updated_at ON questions;
CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON questions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_exams_updated_at ON exams;
CREATE TRIGGER update_exams_updated_at BEFORE UPDATE ON exams
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_courses_updated_at ON courses;
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_edusons_updated_at ON edusons;
CREATE TRIGGER update_edusons_updated_at BEFORE UPDATE ON edusons
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_teacher_ai_settings_updated_at ON teacher_ai_settings;
CREATE TRIGGER update_teacher_ai_settings_updated_at BEFORE UPDATE ON teacher_ai_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_student_subject_stats_updated_at ON student_subject_stats;
CREATE TRIGGER update_student_subject_stats_updated_at BEFORE UPDATE ON student_subject_stats
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ================================================
-- 11. ENABLE RLS ON ALL TABLES
-- ================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE centres ENABLE ROW LEVEL SECURITY;
ALTER TABLE centre_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE centre_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE edusons ENABLE ROW LEVEL SECURITY;
ALTER TABLE edusson_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE edu_coin_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE edu_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_room_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE feed_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE feed_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_subject_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_ai_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_child ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_snapshots ENABLE ROW LEVEL SECURITY;

-- ================================================
-- 12. ROW LEVEL SECURITY POLICIES
-- ================================================

-- Profiles: public read, owner write
DROP POLICY IF EXISTS "Profiles are publicly viewable" ON profiles;
CREATE POLICY "Profiles are publicly viewable"
  ON profiles FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Exam sessions: student sees own, teacher sees their exam sessions
DROP POLICY IF EXISTS "Students see own sessions" ON exam_sessions;
CREATE POLICY "Students see own sessions"
  ON exam_sessions FOR SELECT
  USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Students can insert own sessions" ON exam_sessions;
CREATE POLICY "Students can insert own sessions"
  ON exam_sessions FOR INSERT
  WITH CHECK (auth.uid() = student_id);

DROP POLICY IF EXISTS "Students can update own sessions" ON exam_sessions;
CREATE POLICY "Students can update own sessions"
  ON exam_sessions FOR UPDATE
  USING (auth.uid() = student_id);

-- Questions: approved questions public, creator sees own
DROP POLICY IF EXISTS "Approved questions are public" ON questions;
CREATE POLICY "Approved questions are public"
  ON questions FOR SELECT
  USING (status = 'approved');

DROP POLICY IF EXISTS "Creators see own questions" ON questions;
CREATE POLICY "Creators see own questions"
  ON questions FOR SELECT
  USING (auth.uid() = creator_id);

DROP POLICY IF EXISTS "Creators can insert questions" ON questions;
CREATE POLICY "Creators can insert questions"
  ON questions FOR INSERT
  WITH CHECK (auth.uid() = creator_id);

-- Courses: public read, creator write
DROP POLICY IF EXISTS "Courses are publicly viewable" ON courses;
CREATE POLICY "Courses are publicly viewable"
  ON courses FOR SELECT USING (status = 'approved' OR auth.uid() = creator_id);

DROP POLICY IF EXISTS "Creators can manage courses" ON courses;
CREATE POLICY "Creators can manage courses"
  ON courses FOR ALL USING (auth.uid() = creator_id);

-- Course enrollments: student sees own
DROP POLICY IF EXISTS "Students see own enrollments" ON course_enrollments;
CREATE POLICY "Students see own enrollments"
  ON course_enrollments FOR SELECT
  USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Students can enroll" ON course_enrollments;
CREATE POLICY "Students can enroll"
  ON course_enrollments FOR INSERT
  WITH CHECK (auth.uid() = student_id);

-- EduTokens: users see own
DROP POLICY IF EXISTS "Users see own tokens" ON edu_tokens;
CREATE POLICY "Users see own tokens"
  ON edu_tokens FOR SELECT
  USING (auth.uid() = user_id);

-- Quests: public read, admin write
DROP POLICY IF EXISTS "Quests are public" ON quests;
CREATE POLICY "Quests are public"
  ON quests FOR SELECT USING (is_active = TRUE);

-- User quests: owner only
DROP POLICY IF EXISTS "Users manage own quests" ON user_quests;
CREATE POLICY "Users manage own quests"
  ON user_quests FOR ALL
  USING (auth.uid() = user_id);

-- Study rooms: public rooms viewable
DROP POLICY IF EXISTS "Public study rooms viewable" ON study_rooms;
CREATE POLICY "Public study rooms viewable"
  ON study_rooms FOR SELECT
  USING (is_public = TRUE);

DROP POLICY IF EXISTS "Creators manage study rooms" ON study_rooms;
CREATE POLICY "Creators manage study rooms"
  ON study_rooms FOR ALL
  USING (auth.uid() = creator_id);

-- Messages: users can read messages in rooms they're members of
DROP POLICY IF EXISTS "Users can read messages in their rooms" ON messages;
CREATE POLICY "Users can read messages in their rooms"
  ON messages FOR SELECT
  USING (
    auth.uid() IS NOT NULL AND (
      room_id IN (SELECT room_id FROM study_room_members WHERE user_id = auth.uid()) OR
      conversation_id IS NOT NULL
    )
  );

DROP POLICY IF EXISTS "Users can send messages" ON messages;
CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

-- Feed posts: public
DROP POLICY IF EXISTS "Feed posts are public" ON feed_posts;
CREATE POLICY "Feed posts are public"
  ON feed_posts FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Users can create feed posts" ON feed_posts;
CREATE POLICY "Users can create feed posts"
  ON feed_posts FOR INSERT
  WITH CHECK (auth.uid() = author_id);

-- Follows: users manage own follows
DROP POLICY IF EXISTS "Users manage follows" ON follows;
CREATE POLICY "Users manage follows"
  ON follows FOR ALL
  USING (auth.uid() = follower_id);

-- Payments: users see own
DROP POLICY IF EXISTS "Users see own payments" ON payments;
CREATE POLICY "Users see own payments"
  ON payments FOR SELECT
  USING (auth.uid() = user_id);

-- Teacher AI settings: owner only
DROP POLICY IF EXISTS "Owner only AI settings" ON teacher_ai_settings;
CREATE POLICY "Owner only AI settings"
  ON teacher_ai_settings FOR ALL
  USING (auth.uid() = user_id);

-- EduCoin transactions: users see own
DROP POLICY IF EXISTS "Users see own transactions" ON edu_coin_transactions;
CREATE POLICY "Users see own transactions"
  ON edu_coin_transactions FOR SELECT
  USING (auth.uid() = user_id);

-- Centres: public read, admin write
DROP POLICY IF EXISTS "Centres are publicly viewable" ON centres;
CREATE POLICY "Centres are publicly viewable"
  ON centres FOR SELECT USING (is_public = TRUE);

DROP POLICY IF EXISTS "Admins can manage centres" ON centres;
CREATE POLICY "Admins can manage centres"
  ON centres FOR ALL USING (auth.uid() = admin_id);

-- Centre members: users see own centre memberships
DROP POLICY IF EXISTS "Users see own centre memberships" ON centre_members;
CREATE POLICY "Users see own centre memberships"
  ON centre_members FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert centre memberships" ON centre_members;
CREATE POLICY "Users can insert centre memberships"
  ON centre_members FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Centre classes: centre members can view
DROP POLICY IF EXISTS "Centre members can view classes" ON centre_classes;
CREATE POLICY "Centre members can view classes"
  ON centre_classes FOR SELECT
  USING (
    centre_id IN (SELECT centre_id FROM centre_members WHERE user_id = auth.uid()) OR
    auth.uid() = teacher_id
  );

-- Exams: approved exams public, creator sees own
DROP POLICY IF EXISTS "Approved exams are public" ON exams;
CREATE POLICY "Approved exams are public"
  ON exams FOR SELECT USING (status = 'approved');

DROP POLICY IF EXISTS "Creators see own exams" ON exams;
CREATE POLICY "Creators see own exams"
  ON exams FOR SELECT USING (auth.uid() = creator_id);

DROP POLICY IF EXISTS "Creators can manage exams" ON exams;
CREATE POLICY "Creators can manage exams"
  ON exams FOR ALL USING (auth.uid() = creator_id);

-- Exam assignments: teachers and students see relevant
DROP POLICY IF EXISTS "Students see assigned exams" ON exam_assignments;
CREATE POLICY "Students see assigned exams"
  ON exam_assignments FOR SELECT USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Teachers can manage assignments" ON exam_assignments;
CREATE POLICY "Teachers can manage assignments"
  ON exam_assignments FOR ALL USING (auth.uid() = assigned_by);

-- Course modules: enrolled students can view
DROP POLICY IF EXISTS "Enrolled students can view modules" ON course_modules;
CREATE POLICY "Enrolled students can view modules"
  ON course_modules FOR SELECT
  USING (
    course_id IN (SELECT course_id FROM course_enrollments WHERE student_id = auth.uid()) OR
    auth.uid() IN (SELECT creator_id FROM courses WHERE id = course_id)
  );

-- EduSons: approved programs public, creator sees own
DROP POLICY IF EXISTS "Approved edusons are public" ON edusons;
CREATE POLICY "Approved edusons are public"
  ON edusons FOR SELECT USING (status = 'approved' AND is_public = TRUE);

DROP POLICY IF EXISTS "Creators manage edusons" ON edusons;
CREATE POLICY "Creators manage edusons"
  ON edusons FOR ALL USING (auth.uid() = creator_id);

-- EduSon enrollments: users see own
DROP POLICY IF EXISTS "Users see own eduson enrollments" ON edusson_enrollments;
CREATE POLICY "Users see own eduson enrollments"
  ON edusson_enrollments FOR SELECT USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Users can enroll in edusons" ON edusson_enrollments;
CREATE POLICY "Users can enroll in edusons"
  ON edusson_enrollments FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Live sessions: enrolled users can view
DROP POLICY IF EXISTS "Enrolled users can view live sessions" ON live_sessions;
CREATE POLICY "Enrolled users can view live sessions"
  ON live_sessions FOR SELECT
  USING (
    edusson_id IN (SELECT edusson_id FROM edusson_enrollments WHERE student_id = auth.uid()) OR
    auth.uid() = host_id
  );

-- Challenges: participants can view
DROP POLICY IF EXISTS "Participants can view challenges" ON challenges;
CREATE POLICY "Participants can view challenges"
  ON challenges FOR SELECT
  USING (
    auth.uid() = challenger_id OR
    id IN (SELECT challenge_id FROM challenge_participants WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Challengers manage challenges" ON challenges;
CREATE POLICY "Challengers manage challenges"
  ON challenges FOR ALL USING (auth.uid() = challenger_id);

-- Challenge participants: users see own
DROP POLICY IF EXISTS "Users see own challenge participation" ON challenge_participants;
CREATE POLICY "Users see own challenge participation"
  ON challenge_participants FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can accept challenges" ON challenge_participants;
CREATE POLICY "Users can accept challenges"
  ON challenge_participants FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Study room members: users see own memberships
DROP POLICY IF EXISTS "Users see own room memberships" ON study_room_members;
CREATE POLICY "Users see own room memberships"
  ON study_room_members FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can join rooms" ON study_room_members;
CREATE POLICY "Users can join rooms"
  ON study_room_members FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Message votes: users see own
DROP POLICY IF EXISTS "Users see own message votes" ON message_votes;
CREATE POLICY "Users see own message votes"
  ON message_votes FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can vote on messages" ON message_votes;
CREATE POLICY "Users can vote on messages"
  ON message_votes FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Feed comments: public
DROP POLICY IF EXISTS "Feed comments are public" ON feed_comments;
CREATE POLICY "Feed comments are public"
  ON feed_comments FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Users can create feed comments" ON feed_comments;
CREATE POLICY "Users can create feed comments"
  ON feed_comments FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Student subject stats: users see own
DROP POLICY IF EXISTS "Users see own subject stats" ON student_subject_stats;
CREATE POLICY "Users see own subject stats"
  ON student_subject_stats FOR SELECT USING (auth.uid() = student_id);

-- Parent-child: users see own relationships
DROP POLICY IF EXISTS "Users see own parent-child relationships" ON parent_child;
CREATE POLICY "Users see own parent-child relationships"
  ON parent_child FOR SELECT
  USING (auth.uid() = parent_id OR auth.uid() = child_id);

DROP POLICY IF EXISTS "Users can create parent-child relationships" ON parent_child;
CREATE POLICY "Users can create parent-child relationships"
  ON parent_child FOR INSERT WITH CHECK (auth.uid() = parent_id);

-- Subscriptions: users see own
DROP POLICY IF EXISTS "Users see own subscriptions" ON subscriptions;
CREATE POLICY "Users see own subscriptions"
  ON subscriptions FOR SELECT USING (auth.uid() = user_id);

-- Leaderboard snapshots: public
DROP POLICY IF EXISTS "Leaderboard snapshots are public" ON leaderboard_snapshots;
CREATE POLICY "Leaderboard snapshots are public"
  ON leaderboard_snapshots FOR SELECT USING (TRUE);

-- ================================================
-- 13. INDEXES FOR PERFORMANCE
-- ================================================
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_tier ON profiles(tier);
CREATE INDEX IF NOT EXISTS idx_exam_sessions_student_idx ON exam_sessions(student_id);
CREATE INDEX IF NOT EXISTS idx_exam_sessions_exam_idx ON exam_sessions(exam_id);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_student ON course_enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_course ON course_enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_edu_tokens_user ON edu_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_user_quests_user ON user_quests(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_room ON messages(room_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_feed_posts_author ON feed_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_follows_follower ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following ON follows(following_id);
CREATE INDEX IF NOT EXISTS idx_student_subject_stats_student ON student_subject_stats(student_id);
CREATE INDEX IF NOT EXISTS idx_centres_slug ON centres(slug);
CREATE INDEX IF NOT EXISTS idx_centres_admin ON centres(admin_id);
CREATE INDEX IF NOT EXISTS idx_questions_subject ON questions(subject);
CREATE INDEX IF NOT EXISTS idx_questions_creator ON questions(creator_id);
CREATE INDEX IF NOT EXISTS idx_questions_status ON questions(status);
CREATE INDEX IF NOT EXISTS idx_exams_creator ON exams(creator_id);
CREATE INDEX IF NOT EXISTS idx_exams_status ON exams(status);
CREATE INDEX IF NOT EXISTS idx_courses_creator ON courses(creator_id);
CREATE INDEX IF NOT EXISTS idx_courses_status ON courses(status);
CREATE INDEX IF NOT EXISTS idx_centre_members_centre ON centre_members(centre_id);
CREATE INDEX IF NOT EXISTS idx_centre_members_user ON centre_members(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_feed_posts_created ON feed_posts(created_at DESC);

-- ================================================
-- SCHEMA COMPLETE
-- ================================================
-- All tables, types, policies, and indexes have been created.
-- Your ADJ EduQuest Pro database is now fully set up!