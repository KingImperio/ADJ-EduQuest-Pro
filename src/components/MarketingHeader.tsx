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

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-xl bg-deep/90 border-b border-white/10 shadow-[0_8px_32px_rgba(30,63,204,0.15)]' : 'backdrop-blur-md bg-deep/60 border-b border-white/5'}`}>
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
          <div className="hidden lg:flex items-center gap-8">
            {[
              { path: '/features', label: 'Features' },
              { path: '/how-it-works', label: 'How it Works' },
              { path: '/centres', label: 'Centres' },
              { path: '/pricing', label: 'Pricing' }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
                  isActive(item.path) 
                    ? 'text-primary font-medium bg-primary/10' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.span 
                    layoutId="navIndicator"
                    className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/auth/signin" className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors text-sm font-medium">
              Login
            </Link>
            <Link
              to="/onboarding/role"
              className="px-5 py-2 bg-gradient-to-r from-primary to-primary-400 hover:from-primary-400 hover:to-primary text-white rounded-lg text-sm font-medium transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-white/5"
              aria-label="Open menu"
            >
              <Icon name="menu" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Slide-in Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] lg:hidden"
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-full sm:w-80 bg-surface border-l border-border z-[70] lg:hidden flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border bg-surface shrink-0">
                <img
                  src="/img/ADJ-logo-v2-transparent.png"
                  alt="ADJ EduQuest"
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-white/5"
                  aria-label="Close menu"
                >
                  <Icon name="x" className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto p-4 bg-surface min-h-0">
                <div className="space-y-2 pb-4">
                    <Link
                      to="/"
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive('/') 
                          ? 'bg-primary/20 text-primary border border-primary/30' 
                          : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon name="layoutDashboard" className="w-5 h-5" />
                        Home
                      </div>
                    </Link>
                    <Link
                      to="/features"
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive('/features') 
                          ? 'bg-primary/20 text-primary border border-primary/30' 
                          : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon name="sparkles" className="w-5 h-5" />
                        Features
                      </div>
                    </Link>
                    <Link
                      to="/how-it-works"
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive('/how-it-works') 
                          ? 'bg-primary/20 text-primary border border-primary/30' 
                          : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon name="bookOpen" className="w-5 h-5" />
                        How it Works
                      </div>
                    </Link>
                    <Link
                      to="/centres"
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive('/centres') 
                          ? 'bg-primary/20 text-primary border border-primary/30' 
                          : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon name="building2" className="w-5 h-5" />
                        Tutorial Centres
                      </div>
                    </Link>
                    <Link
                      to="/pricing"
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive('/pricing') 
                          ? 'bg-primary/20 text-primary border border-primary/30' 
                          : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon name="coins" className="w-5 h-5" />
                        Pricing
                      </div>
                    </Link>
                    <Link
                      to="/about"
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive('/about') 
                          ? 'bg-primary/20 text-primary border border-primary/30' 
                          : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon name="users" className="w-5 h-5" />
                        About Us
                      </div>
                    </Link>
                    <Link
                      to="/contact"
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive('/contact') 
                          ? 'bg-primary/20 text-primary border border-primary/30' 
                          : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon name="mail" className="w-5 h-5" />
                        Contact
                      </div>
                    </Link>
                  </div>
                </nav>

                {/* Footer CTAs */}
                <div className="p-4 border-t border-border space-y-3 bg-surface shrink-0">
                  <Link
                    to="/onboarding/role"
                    className="block w-full py-3 px-4 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium text-center transition-all shadow-glow"
                  >
                    <div className="flex items-center justify-center gap-2">
                      Get Started
                      <Icon name="arrowRight" className="w-4 h-4" />
                    </div>
                  </Link>
                  <Link
                    to="/auth/signin"
                    className="block w-full py-3 px-4 border border-border hover:border-primary/50 text-text-primary hover:text-primary rounded-lg font-medium text-center transition-colors"
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
