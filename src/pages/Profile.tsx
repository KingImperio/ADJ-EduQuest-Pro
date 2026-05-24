import { Icon } from '../components/Icon'
import { useAuthStore } from '../stores/authStore'

export default function Profile() {
  const { user, profile, signOut } = useAuthStore()

  const displayName = profile?.display_name || profile?.username || user?.email?.split('@')[0] || 'Student'
  const xpTotal = profile?.xp_total || 0
  const eduCoins = profile?.edu_coins || 0
  const rankLevel = profile?.rank_level || 'Learner'

  return (
    <div className="p-3">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-xl font-bold font-heading bg-gradient-to-r from-primary via-gold to-coral bg-clip-text text-transparent mb-1">
            Profile
          </h2>
          <p className="text-text-secondary text-sm font-body">Manage your account settings</p>
        </div>

        {/* Profile Card */}
        <div className="bg-surface border border-border rounded-xl p-4 mb-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-coral/30 to-coral/10 rounded-full flex items-center justify-center border border-coral/30">
              <Icon name="user" className="w-8 h-8 text-coral" />
            </div>
            <div>
              <h3 className="font-semibold text-primary font-heading text-lg">{displayName}</h3>
              <p className="text-xs text-text-secondary font-body">{user?.email}</p>
              <div className="flex gap-2 mt-1">
                <span className="inline-block px-2 py-0.5 bg-gradient-to-r from-success/20 to-success/10 text-success text-[10px] rounded-full font-heading border border-success/30">
                  {profile?.role || 'Student'}
                </span>
                <span className="inline-block px-2 py-0.5 bg-gradient-to-r from-primary/20 to-primary/10 text-primary-light text-[10px] rounded-full font-heading border border-primary/30">
                  {rankLevel}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
              <div className="text-lg font-bold font-heading text-primary">{xpTotal}</div>
              <div className="text-[10px] text-text-secondary font-body">XP Points</div>
            </div>
            <div className="text-center p-2 bg-gradient-to-br from-gold/10 to-gold/5 rounded-lg border border-gold/20">
              <div className="text-lg font-bold font-heading text-gold">{eduCoins}</div>
              <div className="text-[10px] text-text-secondary font-body">EduCoins</div>
            </div>
            <div className="text-center p-2 bg-gradient-to-br from-coral/10 to-coral/5 rounded-lg border border-coral/20">
              <div className="text-lg font-bold font-heading text-coral">{profile?.current_streak || 0}</div>
              <div className="text-[10px] text-text-secondary font-body">Day Streak</div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        {profile && (
          <div className="bg-surface border border-border rounded-lg p-3 mb-3">
            <h3 className="font-semibold font-heading text-primary-light text-sm mb-3">Academic Info</h3>
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
              {profile.state_of_origin && (
                <div>
                  <span className="text-text-muted font-body">State:</span>
                  <span className="text-text-primary ml-2 font-body">{profile.state_of_origin}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings Sections */}
        <div className="space-y-3">
          {/* Account Settings */}
          <div className="bg-surface border border-border rounded-lg p-3">
            <h3 className="font-semibold font-heading text-gold text-sm mb-3">Account Settings</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-2 bg-gradient-to-r from-surface to-raised rounded-lg hover:from-raised hover:to-overlay transition-colors border border-border hover:border-gold/30">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-gold/20 to-gold/5 rounded-md flex items-center justify-center">
                    <Icon name="mail" className="w-3.5 h-3.5 text-gold" />
                  </div>
                  <span className="text-sm text-text-primary font-body">Change Email</span>
                </div>
                <Icon name="arrowRight" className="w-3.5 h-3.5 text-gold" />
              </button>
              <button className="w-full flex items-center justify-between p-2 bg-gradient-to-r from-surface to-raised rounded-lg hover:from-raised hover:to-overlay transition-colors border border-border hover:border-gold/30">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-gold/20 to-gold/5 rounded-md flex items-center justify-center">
                    <Icon name="lock" className="w-3.5 h-3.5 text-gold" />
                  </div>
                  <span className="text-sm text-text-primary font-body">Change Password</span>
                </div>
                <Icon name="arrowRight" className="w-3.5 h-3.5 text-gold" />
              </button>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-surface border border-border rounded-lg p-3">
            <h3 className="font-semibold font-heading text-coral text-sm mb-3">Preferences</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-2 bg-gradient-to-r from-surface to-raised rounded-lg hover:from-raised hover:to-overlay transition-colors border border-border hover:border-coral/30">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-coral/20 to-coral/5 rounded-md flex items-center justify-center">
                    <Icon name="bell" className="w-3.5 h-3.5 text-coral" />
                  </div>
                  <span className="text-sm text-text-primary font-body">Notifications</span>
                </div>
                <Icon name="arrowRight" className="w-3.5 h-3.5 text-coral" />
              </button>
              <button className="w-full flex items-center justify-between p-2 bg-gradient-to-r from-surface to-raised rounded-lg hover:from-raised hover:to-overlay transition-colors border border-border hover:border-coral/30">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-coral/20 to-coral/5 rounded-md flex items-center justify-center">
                    <Icon name="globe" className="w-3.5 h-3.5 text-coral" />
                  </div>
                  <span className="text-sm text-text-primary font-body">Language</span>
                </div>
                <Icon name="arrowRight" className="w-3.5 h-3.5 text-coral" />
              </button>
            </div>
          </div>

          {/* Support */}
          <div className="bg-surface border border-border rounded-lg p-3">
            <h3 className="font-semibold font-heading text-purple-400 text-sm mb-3">Support</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-2 bg-gradient-to-r from-surface to-raised rounded-lg hover:from-raised hover:to-overlay transition-colors border border-border hover:border-purple-500/30">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-md flex items-center justify-center">
                    <Icon name="messageCircle" className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <span className="text-sm text-text-primary font-body">Help Center</span>
                </div>
                <Icon name="arrowRight" className="w-3.5 h-3.5 text-purple-400" />
              </button>
              <button className="w-full flex items-center justify-between p-2 bg-gradient-to-r from-surface to-raised rounded-lg hover:from-raised hover:to-overlay transition-colors border border-border hover:border-purple-500/30">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-md flex items-center justify-center">
                    <Icon name="mail" className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <span className="text-sm text-text-primary font-body">Contact Support</span>
                </div>
                <Icon name="arrowRight" className="w-3.5 h-3.5 text-purple-400" />
              </button>
            </div>
          </div>

          {/* Sign Out */}
          <button
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 p-3 bg-surface border border-error/30 rounded-lg hover:border-error/60 transition-colors text-error"
          >
            <Icon name="logout" className="w-4 h-4" />
            <span className="text-sm font-medium font-body">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  )
}
