import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from '../../components/Icon'
import { DashboardSkeleton } from '../../components/Skeleton'
import { Badge } from '../../components/ui/Badge'
import { Progress } from '../../components/ui/Progress'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { useAuthStore } from '../../stores/authStore'
import AnimatedCounter from '../../components/ui/AnimatedCounter'
import { staggerContainer, staggerItem } from '../../hooks/useStaggeredAnimation'

/* ------------------------------------------------------------------ */
/*  Static data — would come from Supabase in production              */
/* ------------------------------------------------------------------ */

const SUBJECT_PROGRESS = [
  { subject: 'Chemistry', pct: 72, color: 'neon' as const, icon: 'flask' as const },
  { subject: 'Physics', pct: 58, color: 'coral' as const, icon: 'atom' as const },
  { subject: 'Mathematics', pct: 85, color: 'gold' as const, icon: 'calculator' as const },
  { subject: 'Biology', pct: 64, color: 'success' as const, icon: 'bookOpen' as const },
  { subject: 'English', pct: 90, color: 'primary' as const, icon: 'book' as const },
]

const RECENT_ACTIVITY = [
  {
    id: 1,
    type: 'exam',
    title: 'Chemistry Mock Exam completed',
    detail: 'Score: 78% — Organic Reactions',
    icon: 'checkCircle' as const,
    color: 'neon',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'study',
    title: 'Physics study session logged',
    detail: '45 min — Electromagnetic Induction',
    icon: 'clock' as const,
    color: 'gold',
    time: '5 hours ago',
  },
  {
    id: 3,
    type: 'achievement',
    title: 'Streak milestone reached',
    detail: '7-day study streak unlocked',
    icon: 'flame' as const,
    color: 'coral',
    time: 'Yesterday',
  },
  {
    id: 4,
    type: 'quiz',
    title: 'Mathematics quick quiz',
    detail: 'Score: 9/10 — Quadratic Equations',
    icon: 'target' as const,
    color: 'primary',
    time: '2 days ago',
  },
  {
    id: 5,
    type: 'course',
    title: 'Biology module advanced',
    detail: 'Cell Division — 100% complete',
    icon: 'bookOpen' as const,
    color: 'success',
    time: '3 days ago',
  },
]

/* ------------------------------------------------------------------ */
/*  Blinking cursor CSS (injected once)                               */
/* ------------------------------------------------------------------ */

const CURSOR_STYLE = `
@keyframes blink-cursor {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.blink-cursor {
  animation: blink-cursor 1s step-end infinite;
}
`

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function StudentDashboard() {
  const { profile, isLoading } = useAuthStore()

  if (isLoading) return <DashboardSkeleton />

  const displayName = profile?.display_name || profile?.username || 'Student'
  const xpTotal = profile?.xp_total || 0
  const eduCoins = profile?.edu_coins || 0
  const currentStreak = profile?.current_streak || 0
  const longestStreak = profile?.longest_streak || 0
  const rankLevel = profile?.rank_level || 'Learner'

  // XP progress toward next rank (illustrative thresholds)
  const RANK_THRESHOLDS: Record<string, number> = {
    Learner: 500,
    Scholar: 1500,
    Achiever: 3500,
    Honours: 7000,
    Distinguished: 12000,
    Elite: 20000,
  }
  const nextRankXP = RANK_THRESHOLDS[rankLevel] ?? 500
  const studyHoursToday = 2.5 // placeholder — would come from analytics
  const quizAvg = 76 // placeholder — would come from exam_sessions

  return (
    <div className="min-h-screen p-3 geo-grid-dots">
      <style>{CURSOR_STYLE}</style>
      <div className="max-w-6xl mx-auto space-y-4">

        {/* ============================================================ */}
        {/*  TERMINAL-STYLE WELCOME HEADER                               */}
        {/* ============================================================ */}
        <div className="bg-surface border border-border geo-chamfer p-4 md:p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="font-mono text-xs text-neon-green tracking-widest uppercase mb-1">
                &gt; system.user_loaded <span className="blink-cursor">_</span>
              </p>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-white tracking-wide">
                Welcome back, {displayName}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge variant="primary" shape="chamfer">{rankLevel}</Badge>
                <Badge variant="gold" shape="chamfer">{xpTotal.toLocaleString()} XP</Badge>
                <Badge variant="neon" shape="chamfer">{currentStreak}d streak</Badge>
                {profile?.is_verified && (
                  <Badge variant="success" shape="chamfer">Verified</Badge>
                )}
              </div>
            </div>

            {/* Rank progress ring */}
            <div className="flex-shrink-0">
              <Progress
                value={xpTotal}
                max={nextRankXP}
                variant="ring"
                size="lg"
                color="gold"
                label={rankLevel}
              />
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  STATS HUD — animated counters + progress rings              */}
        {/* ============================================================ */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {/* XP */}
          <motion.div variants={staggerItem('up')} className="bg-surface border border-border geo-chamfer p-3 flex flex-col items-center text-center">
            <div className="w-10 h-10 flex items-center justify-center mb-2">
              <Progress value={xpTotal} max={nextRankXP} variant="ring" size="sm" color="gold" showValue={false} />
            </div>
            <AnimatedCounter value={xpTotal} className="font-mono text-lg font-bold text-gold" duration={2000} />
            <p className="text-xs text-text-muted font-mono uppercase tracking-wider">XP Total</p>
          </motion.div>

          {/* EduCoins */}
          <motion.div variants={staggerItem('up')} className="bg-surface border border-border geo-chamfer p-3 flex flex-col items-center text-center">
            <div className="w-10 h-10 flex items-center justify-center mb-2">
              <Progress value={eduCoins} max={5000} variant="ring" size="sm" color="neon" showValue={false} />
            </div>
            <AnimatedCounter value={eduCoins} className="font-mono text-lg font-bold text-neon-green" duration={2000} />
            <p className="text-xs text-text-muted font-mono uppercase tracking-wider">EduCoins</p>
          </motion.div>

          {/* Study Hours Today */}
          <motion.div variants={staggerItem('up')} className="bg-surface border border-border geo-chamfer p-3 flex flex-col items-center text-center">
            <div className="w-10 h-10 flex items-center justify-center mb-2">
              <Progress value={studyHoursToday} max={6} variant="ring" size="sm" color="coral" showValue={false} />
            </div>
            <AnimatedCounter value={studyHoursToday} suffix="h" className="font-mono text-lg font-bold text-coral" duration={2000} />
            <p className="text-xs text-text-muted font-mono uppercase tracking-wider">Study Today</p>
          </motion.div>

          {/* Quiz Average */}
          <motion.div variants={staggerItem('up')} className="bg-surface border border-border geo-chamfer p-3 flex flex-col items-center text-center">
            <div className="w-10 h-10 flex items-center justify-center mb-2">
              <Progress value={quizAvg} max={100} variant="ring" size="sm" color="primary" showValue={false} />
            </div>
            <AnimatedCounter value={quizAvg} suffix="%" className="font-mono text-lg font-bold text-primary-light" duration={2000} />
            <p className="text-xs text-text-muted font-mono uppercase tracking-wider">Quiz Avg</p>
          </motion.div>
        </motion.div>

        {/* ============================================================ */}
        {/*  QUICK ACTIONS — angular buttons, sharp hover shadows         */}
        {/* ============================================================ */}
        <div>
          <h2 className="font-mono text-xs text-text-muted uppercase tracking-widest mb-2">
            // Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link to="/exam/chemistry-mock-1">
              <Button variant="neon" size="md" className="w-full" icon={<Icon name="target" size={16} />}>
                Take Exam
              </Button>
            </Link>
            <Link to="/course/organic-chemistry">
              <Button variant="gold" size="md" className="w-full" icon={<Icon name="bookOpen" size={16} />}>
                Continue Study
              </Button>
            </Link>
            <Link to="/exam/sample">
              <Button variant="secondary" size="md" className="w-full" icon={<Icon name="trophy" size={16} />}>
                Leaderboard
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="md" className="w-full" icon={<Icon name="award" size={16} />}>
                Achievements
              </Button>
            </Link>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  TWO-COLUMN: SUBJECT PROGRESS + ACTIVITY FEED                */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* ---------- SUBJECT PROGRESS (left, 2 cols) ---------- */}
          <div className="lg:col-span-2">
            <Card variant="accent" accent="neon" className="h-full">
              <h2 className="font-mono text-xs text-neon-green uppercase tracking-widest mb-4">
                // Subject Progress
              </h2>
              <div className="space-y-4">
                {SUBJECT_PROGRESS.map((s) => (
                  <div key={s.subject}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon name={s.icon} size={14} className="text-text-muted" />
                      <span className="font-body text-sm text-text-primary flex-1">{s.subject}</span>
                      <span className="font-mono text-xs font-bold text-text-primary">{s.pct}%</span>
                    </div>
                    <Progress value={s.pct} variant="angular" color={s.color} showValue={false} />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* ---------- ACTIVITY FEED with geometric timeline (right, 3 cols) ---------- */}
          <div className="lg:col-span-3">
            <Card variant="elevated" className="h-full">
              <h2 className="font-mono text-xs text-neon-green uppercase tracking-widest mb-4">
                // Activity Feed
              </h2>
              <div className="relative">
                {/* Vertical timeline line */}
                <div
                  className="absolute left-[15px] top-2 bottom-2 w-px bg-border"
                  aria-hidden="true"
                />
                <div className="space-y-3">
                  {RECENT_ACTIVITY.map((ev) => (
                    <div key={ev.id} className="relative flex gap-3">
                      {/* Timeline node */}
                      <div className="relative z-10 flex-shrink-0 w-[31px] h-[31px] flex items-center justify-center">
                        <div
                          className={`w-3 h-3 geo-chamfer-sm ${
                            ev.color === 'neon'
                              ? 'bg-neon-green shadow-[0_0_8px_rgba(0,255,136,0.4)]'
                              : ev.color === 'gold'
                                ? 'bg-gold shadow-[0_0_8px_rgba(245,158,11,0.4)]'
                                : ev.color === 'coral'
                                  ? 'bg-coral shadow-[0_0_8px_rgba(244,98,42,0.4)]'
                                  : ev.color === 'success'
                                    ? 'bg-success shadow-[0_0_8px_rgba(16,185,129,0.4)]'
                                    : 'bg-primary shadow-[0_0_8px_rgba(30,63,204,0.4)]'
                          }`}
                        />
                      </div>

                      {/* Event card */}
                      <div className="flex-1 bg-raised border border-border geo-chamfer-sm px-3 py-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-body text-sm text-text-primary font-medium truncate">
                              {ev.title}
                            </p>
                            <p className="font-body text-xs text-text-secondary mt-0.5">
                              {ev.detail}
                            </p>
                          </div>
                          <span className="font-mono text-[10px] text-text-muted whitespace-nowrap mt-0.5">
                            {ev.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  PROFILE + STREAK HUD                                        */}
        {/* ============================================================ */}
        {profile && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Profile info */}
            <div className="lg:col-span-2">
              <Card variant="default">
                <h2 className="font-mono text-xs text-neon-green uppercase tracking-widest mb-3">
                  // Profile Data
                </h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {profile.current_class && (
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-text-muted">CLASS</span>
                      <span className="font-body text-sm text-text-primary">{profile.current_class}</span>
                    </div>
                  )}
                  {profile.department && (
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-text-muted">DEPT</span>
                      <span className="font-body text-sm text-text-primary">{profile.department}</span>
                    </div>
                  )}
                  {profile.target_exams && profile.target_exams.length > 0 && (
                    <div className="col-span-2 flex items-start gap-2">
                      <span className="font-mono text-xs text-text-muted whitespace-nowrap">EXAMS</span>
                      <div className="flex flex-wrap gap-1">
                        {profile.target_exams.map((exam) => (
                          <Badge key={exam} variant="coral" shape="chamfer">{exam}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {profile.subjects && profile.subjects.length > 0 && (
                    <div className="col-span-2 flex items-start gap-2">
                      <span className="font-mono text-xs text-text-muted whitespace-nowrap">SUBJ</span>
                      <div className="flex flex-wrap gap-1">
                        {profile.subjects.map((sub) => (
                          <Badge key={sub} variant="default" shape="chamfer">{sub}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-text-muted">TIER</span>
                    <Badge variant="gold" shape="pill" className="capitalize">{profile.tier}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-text-muted">JOINED</span>
                    <span className="font-body text-sm text-text-primary">
                      {new Date(profile.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Streak + stats panel */}
            <div>
              <Card variant="accent" accent="coral" className="h-full flex flex-col items-center justify-center text-center">
                <Icon name="flame" size={40} className="text-coral mb-2" />
                <p className="font-mono text-4xl font-bold text-white">{currentStreak}</p>
                <p className="font-mono text-xs text-text-muted uppercase tracking-widest mt-1">Day Streak</p>
                <div className="w-full mt-4">
                  <Progress value={currentStreak} max={longestStreak || 30} variant="angular" color="coral" label="Best streak" showValue />
                </div>
                <p className="font-body text-xs text-text-secondary mt-2">
                  Longest: {longestStreak} days
                </p>
              </Card>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/*  FOOTER STATUS BAR                                           */}
        {/* ============================================================ */}
        <div className="bg-surface border border-border geo-chamfer px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            <span className="font-mono text-xs text-text-muted">SYSTEM ONLINE</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-xs text-text-muted">
            <span>RANK: {rankLevel}</span>
            <span className="text-border">|</span>
            <span>XP: {xpTotal.toLocaleString()}</span>
            <span className="text-border">|</span>
            <span>COINS: {eduCoins.toLocaleString()}</span>
          </div>
        </div>

      </div>
    </div>
  )
}
