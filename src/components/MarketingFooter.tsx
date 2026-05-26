import { Link } from 'react-router-dom'
import { Icon } from './Icon'
import { memo } from 'react'

const MarketingFooter = memo(function MarketingFooter() {
  return (
    <footer className="glass border-t border-border relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/img/ADJ-logo-v2-transparent.png"
                alt="ADJ EduQuest"
                loading="lazy"
                decoding="async"
                className="h-20 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
            <p className="text-text-secondary text-xs md:text-sm mb-4 max-w-xs">Built for Nigerian classrooms. Designed for the continent.</p>
            <div className="flex gap-3">
              <a href="https://twitter.com/adjeduquest" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-raised flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface transition-all">
                <Icon name="x" className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="mailto:support@eduquest.adj" className="w-9 h-9 rounded-lg bg-raised flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface transition-all">
                <Icon name="mail" className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="https://eduquest.adj" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-raised flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface transition-all">
                <Icon name="globe" className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="terminal-label text-text-primary font-semibold mb-3 md:mb-4 text-sm md:text-base">Platform</h4>
            <ul className="space-y-2 md:space-y-3">
              <li><Link to="/features" className="text-text-secondary hover:text-text-primary text-xs md:text-sm transition-colors">Features</Link></li>
              <li><Link to="/how-it-works" className="text-text-secondary hover:text-text-primary text-xs md:text-sm transition-colors">How It Works</Link></li>
              <li><Link to="/testimonials" className="text-text-secondary hover:text-text-primary text-xs md:text-sm transition-colors">Success Stories</Link></li>
              <li><Link to="/faq" className="text-text-secondary hover:text-text-primary text-xs md:text-sm transition-colors">FAQ</Link></li>
              <li><Link to="/pricing" className="text-text-secondary hover:text-text-primary text-xs md:text-sm transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* For Centres Links */}
          <div>
            <h4 className="terminal-label text-text-primary font-semibold mb-3 md:mb-4 text-sm md:text-base">For Centres</h4>
            <ul className="space-y-2 md:space-y-3">
              <li><Link to="/centres" className="text-text-secondary hover:text-text-primary text-xs md:text-sm transition-colors">Set Up Centre</Link></li>
              <li><Link to="/pricing" className="text-text-secondary hover:text-text-primary text-xs md:text-sm transition-colors">Pricing</Link></li>
              <li><Link to="/contact" className="text-text-secondary hover:text-text-primary text-xs md:text-sm transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="terminal-label text-text-primary font-semibold mb-3 md:mb-4 text-sm md:text-base">Company</h4>
            <ul className="space-y-2 md:space-y-3">
              <li><Link to="/about" className="text-text-secondary hover:text-text-primary text-xs md:text-sm transition-colors">About</Link></li>
              <li><Link to="/testimonials" className="text-text-secondary hover:text-text-primary text-xs md:text-sm transition-colors">Testimonials</Link></li>
              <li><Link to="/contact" className="text-text-secondary hover:text-text-primary text-xs md:text-sm transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="text-text-secondary hover:text-text-primary text-xs md:text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-text-secondary hover:text-text-primary text-xs md:text-sm transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs md:text-sm text-center md:text-left font-mono">© 2026 ADJ EduQuest · Built in Nigeria</p>
          <div className="flex items-center gap-4">
            <span className="text-text-muted text-xs">Built for African students</span>
          </div>
        </div>
      </div>
    </footer>
  )
})

export default MarketingFooter
