import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Icon } from './Icon'
import { useAuthStore } from '../stores/authStore'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'layoutDashboard' as const, path: '/dashboard', color: 'primary' },
  { id: 'exam', label: 'Exams', icon: 'target' as const, path: '/exam/sample', color: 'coral' },
  { id: 'course', label: 'Courses', icon: 'bookOpen' as const, path: '/course/sample', color: 'gold' },
  { id: 'profile', label: 'Profile', icon: 'user' as const, path: '/profile', color: 'purple' },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, signOut } = useAuthStore()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-deep flex">
      {/* Desktop Sidebar - Collapsible, 50% narrower */}
      <aside className={`hidden lg:flex ${isCollapsed ? 'w-16' : 'w-36'} flex-col bg-deep border-r border-border fixed h-full z-40 transition-all duration-300`}>
        {/* Logo & Collapse Toggle */}
        <div className="p-2 border-b border-border flex items-center justify-between">
          {!isCollapsed && (
            <Link to="/dashboard" className="flex items-center">
              <img 
                src="/img/ADJ-logo-v2-transparent.png" 
                alt="ADJ EduQuest" 
                loading="lazy"
                decoding="async"
                className="h-10 w-auto object-contain"
              />
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
          >
            <Icon name={isCollapsed ? 'menu' : 'x'} className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation with Color Diversity */}
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/')
            const colorClasses = {
              primary: { active: 'bg-primary/20 text-primary border-primary/30', hover: 'hover:bg-primary/10 hover:text-primary' },
              coral: { active: 'bg-coral/20 text-coral border-coral/30', hover: 'hover:bg-coral/10 hover:text-coral' },
              gold: { active: 'bg-gold/20 text-gold border-gold/30', hover: 'hover:bg-gold/10 hover:text-gold' },
              purple: { active: 'bg-purple-500/20 text-purple-400 border-purple-500/30', hover: 'hover:bg-purple-500/10 hover:text-purple-400' }
            }
            const colors = colorClasses[item.color as keyof typeof colorClasses] || colorClasses.primary
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2 px-3'} py-2.5 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? `${colors.active} border` 
                    : `text-text-secondary ${colors.hover}`
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon name={item.icon} className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span className="text-xs font-heading font-medium">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* User Section - Compact */}
        <div className="p-2 border-t border-border">
          {user ? (
            <div className="space-y-2">
              <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2'}`}>
                <div className="w-7 h-7 bg-gradient-to-br from-coral/30 to-coral/10 rounded-full flex items-center justify-center border border-coral/30">
                  <Icon name="user" className="w-3.5 h-3.5 text-coral" />
                </div>
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-heading font-medium text-text-primary truncate">
                      {user.email?.split('@')[0]}
                    </p>
                    <p className="text-xs text-text-secondary font-body">Student</p>
                  </div>
                )}
              </div>
              <button
                onClick={handleSignOut}
                className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2 px-2'} py-1.5 text-xs text-text-secondary hover:text-error hover:bg-error/10 rounded-lg transition-colors w-full`}
                title={isCollapsed ? 'Sign Out' : undefined}
              >
                <Icon name="logout" className="w-3.5 h-3.5" />
                {!isCollapsed && <span className="font-body">Sign Out</span>}
              </button>
            </div>
          ) : (
            <Link
              to="/auth/signin"
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2 px-2'} py-1.5 text-xs text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-colors`}
            >
              <Icon name="arrowRight" className="w-3.5 h-3.5" />
              {!isCollapsed && <span className="font-body">Sign In</span>}
            </Link>
          )}
        </div>
      </aside>

      {/* Main Content - Adjusts margin based on sidebar state */}
      <main className={`flex-1 ${isCollapsed ? 'lg:ml-16' : 'lg:ml-36'} pb-16 lg:pb-0 transition-all duration-300`}>
        {/* Mobile Header - 50% smaller */}
        <header className="lg:hidden bg-deep border-b border-border p-2 flex items-center justify-between sticky top-0 z-30">
          <Link to="/dashboard" className="flex items-center">
            <img 
              src="/img/ADJ-logo-v2-transparent.png" 
              alt="ADJ EduQuest" 
              loading="lazy"
              decoding="async"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-text-secondary hover:text-gold transition-colors">
              <Icon name="bell" className="w-4 h-4" />
            </button>
            <div className="w-7 h-7 bg-gradient-to-br from-coral/30 to-coral/10 rounded-full flex items-center justify-center border border-coral/30">
              <Icon name="user" className="w-3.5 h-3.5 text-coral" />
            </div>
          </div>
        </header>

        {/* Page Content - Reduced padding for compact view */}
        <div className="p-3 lg:p-5">
          {children}
        </div>
      </main>

        {/* Mobile Bottom Navigation - Compact with Color Diversity */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-deep border-t border-border z-50">
        <div className="flex items-center justify-around p-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/')
            const colorClasses = {
              primary: 'text-primary',
              coral: 'text-coral',
              gold: 'text-gold',
              purple: 'text-purple-400'
            }
            const activeColor = colorClasses[item.color as keyof typeof colorClasses] || 'text-primary'
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-colors ${
                  isActive 
                    ? activeColor 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={item.icon} className="w-4 h-4" />
                <span className="text-xs font-heading font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
