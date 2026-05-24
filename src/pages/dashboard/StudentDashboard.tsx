import { Link } from 'react-router-dom'
import { Icon } from '../../components/Icon'
import { DashboardSkeleton } from '../../components/Skeleton'
import { useAuthStore } from '../../stores/authStore'

export default function StudentDashboard() {
  const { profile, isLoading } = useAuthStore()

  if (isLoading) {
    return <DashboardSkeleton />
  }

  const displayName = profile?.display_name || profile?.username || 'Student'
  const xpTotal = profile?.xp_total || 0
  const eduCoins = profile?.edu_coins || 0
  const currentStreak = profile?.current_streak || 0
  const rankLevel = profile?.rank_level || 'Learner'

  return (
    <div className="p-3">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-4">
          <h2 className="text-xl font-bold font-heading bg-gradient-to-r from-primary via-gold to-coral bg-clip-text text-transparent mb-1">
            Welcome back, {displayName}!
          </h2>
          <p className="text-text-secondary text-sm font-body">
            {rankLevel} &middot; {xpTotal} XP &middot; {eduCoins} EduCoins &middot; {currentStreak} day streak
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { label: 'XP', value: xpTotal.toLocaleString(), icon: 'zap', color: 'text-gold' },
            { label: 'EduCoins', value: eduCoins.toLocaleString(), icon: 'coins', color: 'text-coral' },
            { label: 'Streak', value: `${currentStreak}d`, icon: 'flame', color: 'text-coral' },
            { label: 'Rank', value: rankLevel, icon: 'trophy', color: 'text-primary-light' },
          ].map((stat) => (
            <div key={stat.label} className="bg-surface border border-border rounded-lg p-3 text-center">
              <Icon name={stat.icon as any} className={`w-4 h-4 ${stat.color} mx-auto mb-1`} />
              <p className="text-sm font-bold text-white font-display">{stat.value}</p>
              <p className="text-xs text-text-muted font-body">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          <Link
            to="/exam/chemistry-mock-1"
            className="bg-surface border border-coral/30 rounded-lg p-3 hover:border-coral/60 transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-gradient-to-br from-coral/30 to-coral/10 rounded-md flex items-center justify-center">
                <Icon name="target" className="w-3 h-3 text-coral" />
              </div>
              <div>
                <h3 className="font-semibold text-coral text-sm font-heading">Take Exam</h3>
                <p className="text-xs text-text-secondary font-body">Practice tests</p>
              </div>
            </div>
            <p className="text-xs text-text-secondary font-body">3 active exams</p>
          </Link>

          <Link
            to="/course/organic-chemistry"
            className="bg-surface border border-success/30 rounded-lg p-3 hover:border-success/60 transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-gradient-to-br from-success/30 to-success/10 rounded-md flex items-center justify-center">
                <Icon name="bookOpen" className="w-3 h-3 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-success text-sm font-heading">Continue Learning</h3>
                <p className="text-xs text-text-secondary font-body">Courses & modules</p>
              </div>
            </div>
            <p className="text-xs text-text-secondary font-body">52% progress</p>
          </Link>

          <div className="bg-surface border border-gold/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-gradient-to-br from-gold/30 to-gold/10 rounded-md flex items-center justify-center">
                <Icon name="trophy" className="w-3 h-3 text-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-gold text-sm font-heading">Achievements</h3>
                <p className="text-xs text-text-secondary font-body">Your progress</p>
              </div>
            </div>
            <p className="text-xs text-text-secondary font-body">{rankLevel} &middot; {xpTotal} XP</p>
          </div>
        </div>

        {/* Profile Info */}
        {profile && (
          <div className="bg-surface border border-border rounded-lg p-3 mb-4">
            <h3 className="font-semibold font-heading bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent mb-3 text-sm">
              Your Profile
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {profile.current_class && (
                <div>
                  <span className="text-text-muted font-body">Class:</span>
                  <span className="text-text-primary ml-2 font-body">{profile.current_class}</span>
                </div>
              )}
              {profile.department && (
                <div>
                  <span className="text-text-muted font-body">Department:</span>
                  <span className="text-text-primary ml-2 font-body">{profile.department}</span>
                </div>
              )}
              {profile.target_exams && profile.target_exams.length > 0 && (
                <div className="col-span-2">
                  <span className="text-text-muted font-body">Target Exams:</span>
                  <span className="text-text-primary ml-2 font-body">{profile.target_exams.join(', ')}</span>
                </div>
              )}
              {profile.subjects && profile.subjects.length > 0 && (
                <div className="col-span-2">
                  <span className="text-text-muted font-body">Subjects:</span>
                  <span className="text-text-primary ml-2 font-body">{profile.subjects.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="bg-surface border border-border rounded-lg p-3">
          <h3 className="font-semibold font-heading bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent mb-3 text-sm">
            Recent Activity
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-coral/10 to-purple/10 rounded-lg border border-coral/20">
              <div className="w-5 h-5 bg-gradient-to-br from-coral/30 to-coral/10 rounded-full flex items-center justify-center">
                <Icon name="checkCircle" className="w-2.5 h-2.5 text-coral" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-coral text-xs font-heading">Account Created</p>
                <p className="text-xs text-text-secondary font-body">Welcome to ADJ EduQuest!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
