export type UserRole = 
  'student' | 'teacher' | 'centre_admin' | 
  'school_admin' | 'platform_admin' | 'parent'

export type PlatformTier = 'free' | 'scholar' | 'pro'

export type CentreTier = 
  'free' | 'starter' | 'pro' | 'verified'

export type ExamType = 
  'WAEC' | 'JAMB' | 'NECO' | 'GCE' | 
  'internal' | 'mock' | 'practice'

export type QuestionType = 'MCQ' | 'MRQ' | 'FIB' | 'THE'

export type ContentStatus = 
  'draft' | 'pending_review' | 'approved' | 
  'rejected' | 'suspended'

export type IntegrityLevel = 
  'clean' | 'minor' | 'moderate' | 'significant'

export type RankLevel = 
  'Learner' | 'Scholar' | 'Achiever' | 
  'Honours' | 'Distinguished' | 'Elite'

export interface Profile {
  id: string
  username: string
  display_name: string
  role: UserRole
  tier: PlatformTier
  avatar_url?: string
  bio?: string
  current_class?: string
  department?: string
  target_exams?: ExamType[]
  subjects?: string[]
  state_of_origin?: string
  platform_id?: string
  edu_coins: number
  xp_total: number
  current_streak: number
  longest_streak: number
  last_active_date?: string
  rank_level: RankLevel
  followers_count: number
  following_count: number
  onboarded: boolean
  is_verified: boolean
  created_at: string
  updated_at: string
}

export interface Centre {
  id: string
  admin_id: string
  name: string
  slug: string
  description?: string
  logo_url?: string
  banner_url?: string
  tier: CentreTier
  state?: string
  city?: string
  teacher_invite_code?: string
  student_invite_code?: string
  teacher_count: number
  student_count: number
  avg_score_improvement?: number
  verified_badge: boolean
  is_public: boolean
  paid_enrollment: boolean
  enrollment_fee?: number
  created_at: string
}

export interface Question {
  id: string
  creator_id: string
  centre_id?: string
  type: QuestionType
  text: string
  options?: { text: string; isCorrect: boolean }[]
  correct_answer?: string
  explanation?: string
  marks: number
  image_url?: string
  image_position?: 'above' | 'below'
  subject: string
  topic?: string
  difficulty?: 'easy' | 'medium' | 'hard'
  exam_type?: ExamType
  year?: number
  status: ContentStatus
  is_past_question: boolean
  created_at: string
}

export interface Exam {
  id: string
  creator_id: string
  centre_id?: string
  title: string
  subject: string
  target_class?: string
  exam_type: ExamType
  instructions?: string
  duration_minutes: number
  total_marks: number
  question_ids: string[]
  shuffle_questions: boolean
  shuffle_options: boolean
  allow_back_nav: boolean
  scheduled_at?: string
  available_until?: string
  max_attempts: number
  status: ContentStatus
  created_at: string
}

export interface ExamSession {
  id: string
  exam_id: string
  student_id: string
  answers: Record<string, {
    answer: string | string[]
    timeSpent: number
    flagged: boolean
  }>
  tab_switches: number
  tab_switch_log: { time: string; elapsed: number }[]
  copy_attempts: number
  paste_attempts: number
  focus_time_ratio?: number
  integrity_level?: IntegrityLevel
  started_at: string
  submitted_at?: string
  time_used_seconds?: number
  confidence_rating?: number
  is_auto_submitted: boolean
  auto_score?: number
  final_score?: number
  percentage?: number
  grade?: string
  is_graded: boolean
  teacher_comments?: string
  question_results: Record<string, {
    score: number
    ai_feedback?: string
    teacher_mark?: number
  }>
}

export interface EduCoinTransaction {
  id: string
  user_id: string
  amount: number
  balance_after: number
  transaction_type: string
  reference_id?: string
  description?: string
  created_at: string
}

export interface Notification {
  id: string
  recipient_id: string
  type: string
  title: string
  body?: string
  action_url?: string
  reference_id?: string
  is_read: boolean
  created_at: string
}
