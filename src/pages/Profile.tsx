import { Icon } from '../components/Icon'
import { Badge } from '../components/ui/Badge'
import { Progress } from '../components/ui/Progress'
import { Button } from '../components/ui/Button'
import { useAuthStore } from '../stores/authStore'
import { textColors, bgColors, borderColors } from '../utils/colorClasses'

// Hexagonal avatar via clip-path
const hexClip = 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)'

function StatRing({
  value,
  max,
  color,
  label,
  icon,
}: {
  value: number
  max: number
  color: 'primary' | 'gold' | 'coral' | 'neon' | 'success'
  label: string
  icon: string
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <Progress
          value={value}
          max={max}
          variant="ring"
          size="lg"
          color={color}
          showValue={false}
        />
        {/* Centered icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon name={icon as any} size={18} className={textColors[color] || 'text-primary'} />
        </div>
      </div>
      <div className="text-center">
        <div className="font-mono font-bold text-sm text-text-primary">{value.toLocaleString()}</div>
        <div className="font-mono text-[10px] text-text-muted uppercase tracking-widest">{label}</div>
      </div>
    </div>
  )
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 px-3 border-b border-border/50 last:border-b-0">
      <span className="font-mono text-[11px] text-text-muted uppercase tracking-widest">{label}</span>
      <span className="font-body text-sm text-text-primary">{value}</span>
    </div>
  )
}

function SettingRow({
  icon,
  label,
  accent,
  onClick,
}: {
  icon: string
  label: string
  accent: 'gold' | 'coral' | 'neon' | 'primary'
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-3 bg-surface border border-border hover:border-border/80 transition-colors geo-chamfer-sm group"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 flex items-center justify-center ${bgColors[accent] || 'bg-primary/10'} border ${borderColors[accent] || 'border-primary/20'} geo-chamfer-sm`}
        >
          <Icon name={icon as any} size={14} className={textColors[accent] || 'text-primary'} />
        </div>
        <span className="text-sm text-text-primary font-body group-hover:text-white transition-colors">
          {label}
        </span>
      </div>
      <Icon name="chevronRight" size={14} className="text-text-muted group-hover:text-text-secondary transition-colors" />
    </button>
  )
}

export default function Profile() {
  const { user, profile, signOut } = useAuthStore()

  const displayName =
    profile?.display_name || profile?.username || user?.email?.split('@')[0] || 'Student'
  const xpTotal = profile?.xp_total || 0
  const eduCoins = profile?.edu_coins || 0
  const streak = profile?.current_streak || 0
  const rankLevel = profile?.rank_level || 'Learner'
  const role = profile?.role || 'Student'
  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '--'

  return (
    <div className="min-h-full p-4 geo-grid-dots">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* ── HEADER HUD ─────────────────────────────────────── */}
        <div className="relative bg-surface border border-border geo-chamfer overflow-hidden">
          {/* Top accent stripe */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-green via-neon-cyan to-neon-amber" />

          <div className="p-5 pt-6">
            {/* Name plate + avatar row */}
            <div className="flex items-start gap-4">
              {/* Hexagonal avatar */}
              <div
                className="w-20 h-20 flex-shrink-0 bg-gradient-to-br from-neon-green/20 to-neon-cyan/10 border-2 border-neon-green/30 flex items-center justify-center"
                style={{ clipPath: hexClip }}
              >
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Icon name="user" size={32} className="text-neon-green/60" />
                )}
              </div>

              {/* Name plate */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-display text-xl font-bold text-text-primary tracking-wide truncate">
                    {displayName}
                  </h1>
                  {profile?.is_verified && (
                    <Badge variant="neon" shape="chamfer">
                      verified
                    </Badge>
                  )}
                </div>
                <p className="font-mono text-xs text-text-muted mt-0.5 truncate">{user?.email}</p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <Badge variant="primary" shape="chamfer">
                    {role}
                  </Badge>
                  <Badge variant="gold" shape="chamfer">
                    {rankLevel}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Meta line */}
            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border/50">
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                member since {memberSince}
              </span>
              {profile?.longest_streak ? (
                <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                  best streak {profile.longest_streak}d
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {/* ── STAT RINGS ─────────────────────────────────────── */}
        <div className="bg-surface border border-border geo-chamfer p-5">
          <h2 className="font-display text-xs font-semibold text-text-muted uppercase tracking-[0.2em] mb-4">
            Player Stats
          </h2>
          <div className="flex items-center justify-around">
            <StatRing value={xpTotal} max={1000} color="neon" label="XP" icon="zap" />
            <StatRing value={eduCoins} max={500} color="gold" label="Coins" icon="coins" />
            <StatRing value={streak} max={30} color="coral" label="Streak" icon="flame" />
          </div>
        </div>

        {/* ── ACADEMIC INFO TABLE ────────────────────────────── */}
        {profile && (
          <div className="bg-surface border border-border geo-chamfer overflow-hidden">
            <div className="px-4 pt-4 pb-2">
              <h2 className="font-display text-xs font-semibold text-text-muted uppercase tracking-[0.2em]">
                Academic Data
              </h2>
            </div>
            <div className="divide-y divide-border/30">
              {profile.current_class && (
                <DataRow label="Class" value={profile.current_class} />
              )}
              {profile.department && (
                <DataRow label="Department" value={profile.department} />
              )}
              {profile.target_exams && profile.target_exams.length > 0 && (
                <DataRow label="Target Exams" value={profile.target_exams.join(', ')} />
              )}
              {profile.subjects && profile.subjects.length > 0 && (
                <DataRow label="Subjects" value={profile.subjects.join(', ')} />
              )}
              {profile.state_of_origin && (
                <DataRow label="State" value={profile.state_of_origin} />
              )}
              {profile.platform_id && (
                <DataRow label="Platform ID" value={profile.platform_id} />
              )}
              <DataRow
                label="Followers"
                value={`${profile.followers_count ?? 0} / ${profile.following_count ?? 0}`}
              />
            </div>
          </div>
        )}

        {/* ── ACCOUNT SETTINGS ───────────────────────────────── */}
        <div className="bg-surface border border-border geo-chamfer overflow-hidden">
          <div className="px-4 pt-4 pb-2">
            <h2 className="font-display text-xs font-semibold text-gold uppercase tracking-[0.2em]">
              Account
            </h2>
          </div>
          <div className="p-2 pt-0 space-y-1">
            <SettingRow icon="mail" label="Change Email" accent="gold" />
            <SettingRow icon="lock" label="Change Password" accent="gold" />
          </div>
        </div>

        {/* ── PREFERENCES ────────────────────────────────────── */}
        <div className="bg-surface border border-border geo-chamfer overflow-hidden">
          <div className="px-4 pt-4 pb-2">
            <h2 className="font-display text-xs font-semibold text-coral uppercase tracking-[0.2em]">
              Preferences
            </h2>
          </div>
          <div className="p-2 pt-0 space-y-1">
            <SettingRow icon="bell" label="Notifications" accent="coral" />
            <SettingRow icon="globe" label="Language" accent="coral" />
          </div>
        </div>

        {/* ── SUPPORT ────────────────────────────────────────── */}
        <div className="bg-surface border border-border geo-chamfer overflow-hidden">
          <div className="px-4 pt-4 pb-2">
            <h2 className="font-display text-xs font-semibold text-neon-cyan uppercase tracking-[0.2em]">
              Support
            </h2>
          </div>
          <div className="p-2 pt-0 space-y-1">
            <SettingRow icon="messageCircle" label="Help Center" accent="primary" />
            <SettingRow icon="mail" label="Contact Support" accent="primary" />
          </div>
        </div>

        {/* ── SIGN OUT ───────────────────────────────────────── */}
        <Button
          variant="neon"
          size="md"
          onClick={signOut}
          icon={<Icon name="logout" size={16} />}
          className="w-full"
        >
          Sign Out
        </Button>
      </div>
    </div>
  )
}
