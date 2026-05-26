import { useState, useEffect, memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from './Icon'

const MarketingHeader = memo(function MarketingHeader() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-strong border-b border-border shadow-sharp' : 'backdrop-blur-md bg-deep/60 border-b border-white/5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/img/ADJ-logo-v2-transparent.png"
              alt="ADJ EduQuest"
              loading="lazy"
              decoding="async"
              className="h-20 md:h-32 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {[
              { path: '/features', label: 'Features' },
              { path: '/how-it-works', label: 'How it Works' },
              { path: '/centres', label: 'Centres' },
              { path: '/pricing', label: 'Pricing' }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-1.5 text-sm font-mono uppercase tracking-wider transition-all duration-300 geo-chamfer-sm ${
                  isActive(item.path)
                    ? 'text-primary font-medium bg-primary/10 border border-primary/30'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5 border border-transparent'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/auth/signin" className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors text-sm font-mono uppercase tracking-wider">
              Login
            </Link>
            <Link
              to="/onboarding/role"
              className="px-5 py-2 bg-gradient-to-r from-primary to-primary-400 text-white geo-chamfer-sm text-sm font-mono uppercase tracking-wider transition-all shadow-sharp-primary hover:shadow-lg hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors geo-chamfer-sm hover:bg-white/5"
              aria-label="Open menu"
            >
              <Icon name="menu" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] lg:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-full sm:w-80 glass-strong border-l border-border z-[70] lg:hidden flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border glass shrink-0">
                <img
                  src="/img/ADJ-logo-v2-transparent.png"
                  alt="ADJ EduQuest"
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-text-secondary hover:text-text-primary transition-colors geo-chamfer-sm hover:bg-white/5"
                  aria-label="Close menu"
                >
                  <Icon name="x" className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto p-4 min-h-0">
                <div className="space-y-1">
                  {[
                    { path: '/', label: 'Home', icon: 'layoutDashboard' },
                    { path: '/features', label: 'Features', icon: 'sparkles' },
                    { path: '/how-it-works', label: 'How it Works', icon: 'bookOpen' },
                    { path: '/centres', label: 'Tutorial Centres', icon: 'building2' },
                    { path: '/pricing', label: 'Pricing', icon: 'coins' },
                    { path: '/about', label: 'About Us', icon: 'users' },
                    { path: '/contact', label: 'Contact', icon: 'mail' },
                  ].map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block px-4 py-3 geo-chamfer-sm text-sm font-medium transition-colors ${
                        isActive(item.path)
                          ? 'bg-primary/20 text-primary border border-primary/30'
                          : 'text-text-secondary hover:text-text-primary hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon name={item.icon as any} className="w-5 h-5" />
                        <span className="font-mono uppercase tracking-wider">{item.label}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Footer CTAs */}
              <div className="p-4 border-t border-border space-y-2 glass shrink-0">
                <Link
                  to="/onboarding/role"
                  className="block w-full py-3 px-4 bg-primary hover:bg-primary-hover text-white geo-chamfer-sm font-mono uppercase tracking-wider text-center transition-all shadow-glow"
                >
                  <div className="flex items-center justify-center gap-2">
                    Get Started
                    <Icon name="arrowRight" className="w-4 h-4" />
                  </div>
                </Link>
                <Link
                  to="/auth/signin"
                  className="block w-full py-3 px-4 border border-border hover:border-primary/50 text-text-primary hover:text-primary geo-chamfer-sm font-mono uppercase tracking-wider text-center transition-colors"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Icon name="user" className="w-4 h-4" />
                    Login
                  </div>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
})

export default MarketingHeader
