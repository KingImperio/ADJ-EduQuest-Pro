import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon, ICONS } from './Icon'

interface NavItem {
  id: string
  label: string
  icon: keyof typeof ICONS
  path: string
  badge?: string | number
  children?: NavItem[]
}

const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: 'layoutDashboard',
    path: '/'
  },
  {
    id: 'features',
    label: 'Features',
    icon: 'sparkles',
    path: '/features'
  },
  {
    id: 'how-it-works',
    label: 'How It Works',
    icon: 'layers',
    path: '/how-it-works'
  },
  {
    id: 'pricing',
    label: 'Pricing',
    icon: 'coins',
    path: '/pricing'
  },
  {
    id: 'centres',
    label: 'Tutorial Centres',
    icon: 'building2',
    path: '/centres'
  },
  {
    id: 'about',
    label: 'About Us',
    icon: 'globe',
    path: '/about'
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: 'mail',
    path: '/contact'
  },
  {
    id: 'faq',
    label: 'FAQ',
    icon: 'settings',
    path: '/faq'
  }
]

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const location = useLocation()

  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-surface border-r border-border z-50 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/img/ADJ-logo-v2-transparent.png" 
              alt="ADJ EduQuest" 
              loading="lazy"
              decoding="async"
              className="h-16 w-auto object-contain"
            />
          </Link>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 text-text-secondary hover:text-primary transition-colors rounded-lg hover:bg-raised"
        >
          <Icon name={isCollapsed ? 'menu' : 'x'} className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-120px)]">
        {navItems.map((item) => (
          <div key={item.id}>
            {item.children ? (
              <>
                <button
                  onClick={() => toggleExpand(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-secondary hover:text-primary hover:bg-raised'
                  }`}
                >
                  <Icon name={item.icon} className="w-5 h-5 shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-sm font-medium">{item.label}</span>
                      <Icon 
                        name={expandedItems.has(item.id) ? 'chevronRight' : 'chevronRight'} 
                        className={`w-4 h-4 transition-transform ${expandedItems.has(item.id) ? 'rotate-90' : ''}`}
                      />
                    </>
                  )}
                </button>
                {expandedItems.has(item.id) && !isCollapsed && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.id}
                        to={child.path}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          location.pathname === child.path
                            ? 'bg-primary/10 text-primary'
                            : 'text-text-secondary hover:text-primary hover:bg-raised'
                        }`}
                      >
                        <Icon name={child.icon} className="w-4 h-4 shrink-0" />
                        <span className="text-sm">{child.label}</span>
                        {child.badge && (
                          <span className="ml-auto text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                            {child.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-secondary hover:text-primary hover:bg-raised'
                }`}
              >
                <Icon name={item.icon} className="w-5 h-5 shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-sm font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Auth Section */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="space-y-2">
            <Link
              to="/auth/signin"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:text-primary hover:bg-raised transition-colors"
            >
              <Icon name="user" className="w-5 h-5" />
              <span className="text-sm font-medium">Sign In</span>
            </Link>
            <Link
              to="/onboarding/role"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary hover:bg-primary-600 text-white transition-colors"
            >
              <Icon name="arrowRight" className="w-5 h-5" />
              <span className="text-sm font-medium">Get Started</span>
            </Link>
          </div>
        </div>
      )}
    </aside>
  )
}
