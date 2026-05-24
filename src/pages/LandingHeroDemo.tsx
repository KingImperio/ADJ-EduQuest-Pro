import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from '../components/Icon'
import MarketingHeader from '../components/MarketingHeader'
import MarketingFooter from '../components/MarketingFooter'
import AnimatedGradientBackground from '../components/AnimatedGradientBackground'

export default function LandingHeroDemo() {
  return (
    <div className="min-h-screen bg-deep relative z-0">
      <AnimatedGradientBackground />
      <MarketingHeader />

      {/* Hero Section */}
      <section className="min-h-[calc(100vh-80px)] relative flex items-center pt-12 pb-24 lg:py-0 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 relative z-10 w-full">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary self-start">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              Nigeria's #1 Exam Platform
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight">
              Your Quest for <br />
              <span className="bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">Academic Excellence</span>
              <br />
              Starts Here
            </h1>
            <p className="text-lg text-text-secondary max-w-xl">
              AI-powered exams, verified courses, and gamified learning paths
              built specifically for ambitious Nigerian students aiming for top
              scores.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/onboarding/role"
                className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-lg font-medium transition-all shadow-glow text-center"
              >
                Start Learning Free
              </Link>
              <Link
                to="/centres"
                className="border border-border bg-surface text-text-primary px-8 py-4 rounded-lg font-medium hover:bg-raised transition-all text-center"
              >
                For Tutorial Centres
              </Link>
            </div>
            <div className="flex items-center gap-4 pt-6">
              <div className="flex -space-x-3">
                <img
                  alt="Student Avatar"
                  className="w-10 h-10 rounded-full border-2 border-deep"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSaTNz22EghGai-b5bkVYn6SlHjEYAMouYJRc5C8E23RZvnVOAU8ryKKuq-NBlr-9NSdwo6xEjiksflpBr8WPP78sTKTmVyfcA90MI6KSNi4f1LhxLoI-aSn5xyrsVOChRsPgs3sKVbv6GubbNBVqrQ8I0c1CrVoHQhsfFPt2M9GoUfAlWBOhGvPnaZet7nUfza44plbwUyqotrM5t-U8R8ZA60E-f6fC-J2uKdgzqhnqtRnRJAoLYNjpdi9tYkzVhfTwd-kX25PZe"
                />
                <img
                  alt="Student Avatar"
                  className="w-10 h-10 rounded-full border-2 border-deep"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9kJGVGrenYeDU_EVKA4pnYVDaaLpkTOw5D7L2RQzjt07C4Hb_eBGniaNFX2FKPmDtNabmtSvGeWt6Bd_u73YXmBlNM3Ydliue6szRYQ5HIEKZTg99a5CkNF8UMGidmaC9k3sWZfZ1j6cEtqRcE9EHkLkWKdp0nGvW7zR4-im1LdXBsRmjiIX7crSZ6Wjf75PQyZqU-e6qQzPn6Nj9HhgQLmYHtm4hEgcYtWphfCDXTbVPMsiK8AQevIhMSLpgZBQKUwHfhpt8CMPq"
                />
                <img
                  alt="Student Avatar"
                  className="w-10 h-10 rounded-full border-2 border-deep"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-jLnupk3_VUF7o5ECRQoRjksrf_6F0wq7RDkFIwMl-OKhFn0WoXo0-hbe1TFy_PxjxNPinnvDWs21aRbI-B3NRHBJx9v90nzOhDSWWMEHyg0FcOVnzmxPQuAOq3kHxCj9WabeDsZbriRk4GWR45ACM2VoIa3-yKH0xzVLKPdwLOMZuSTXEG84rBLW4t9XfZyyL2TLKr9PWlHz6HIQoDGVu6gz8sjhByVupiapfhklUXFhKNh9PBSHPelV4uLkBgiNziPevZw_kB-"
                />
                <div className="w-10 h-10 rounded-full border-2 border-deep bg-raised flex items-center justify-center text-xs font-bold text-text-primary">
                  +
                </div>
              </div>
              <span className="text-sm text-text-secondary">Join 12,000+ top students</span>
            </div>
          </div>

          {/* Right Content (Visuals) */}
          <div className="relative hidden lg:flex items-center justify-center">
            {/* Main Glass Card */}
            <motion.div
              initial={{ opacity: 0, rotate: 3 }}
              animate={{ opacity: 1, rotate: 3 }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-xl w-full max-w-md aspect-[4/5] p-6 shadow-glow relative z-10 flex flex-col space-y-4 border-t-2 border-t-primary/50"
              style={{
                background: 'rgba(20, 24, 39, 0.7)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(42, 51, 84, 0.5)',
              }}
            >
              {/* Card Header */}
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Icon name="user" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary">Student Dashboard</h3>
                    <p className="text-xs text-text-secondary">JAMB Prep 2024</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded bg-deepest flex items-center justify-center">
                  <Icon name="notifications" className="w-4 h-4 text-text-secondary" />
                </div>
              </div>

              {/* Main Content - Exam Card */}
              <div className="bg-deepest rounded-lg p-4 flex-grow border border-border flex flex-col justify-center items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full"></div>
                <div className="text-center relative z-10">
                  <Icon name="timer" className="w-12 h-12 text-primary mb-2" />
                  <h4 className="font-bold text-text-primary mb-1">JAMB Mock Exam</h4>
                  <p className="text-text-secondary text-sm mb-4">Physics & Chemistry</p>
                  <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-full font-medium text-sm transition-colors">
                    Start Now
                  </button>
                </div>
              </div>

              {/* Bottom Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-deepest p-3 rounded-lg border border-border">
                  <div className="text-xs text-text-secondary mb-1">Target Score</div>
                  <div className="font-bold text-text-primary text-lg">280/400</div>
                </div>
                <div className="bg-deepest p-3 rounded-lg border border-border">
                  <div className="text-xs text-text-secondary mb-1">EduCoins</div>
                  <div className="font-bold text-gold-500 text-lg flex items-center gap-1">
                    <Icon name="coins" className="w-4 h-4" />
                    1,250
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Popout 1 - Streak */}
            <motion.div
              initial={{ opacity: 0, x: -20, rotate: -6 }}
              animate={{ opacity: 1, x: 0, rotate: -6 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute -left-12 top-20 glass-card p-3 rounded-lg flex items-center gap-3 z-20 border border-gold/30"
              style={{
                background: 'rgba(20, 24, 39, 0.7)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)',
              }}
            >
              <div className="text-2xl">🔥</div>
              <div>
                <div className="font-bold text-text-primary text-sm">14-Day Streak!</div>
                <div className="text-xs text-text-secondary">Keep it up!</div>
              </div>
            </motion.div>

            {/* Floating Popout 2 - Result */}
            <motion.div
              initial={{ opacity: 0, x: 20, rotate: 2 }}
              animate={{ opacity: 1, x: 0, rotate: 2 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -right-8 top-1/2 glass-card p-3 rounded-lg flex items-center gap-3 z-20"
              style={{
                background: 'rgba(20, 24, 39, 0.7)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(42, 51, 84, 0.5)',
                boxShadow: '0 0 20px rgba(30, 63, 204, 0.3)',
              }}
            >
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center text-success">
                <Icon name="check" className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-text-primary text-sm">Chemistry: 87%</div>
                <div className="text-xs text-success">Result Released</div>
              </div>
            </motion.div>

            {/* Floating Popout 3 - Quest Complete */}
            <motion.div
              initial={{ opacity: 0, x: -20, rotate: -2 }}
              animate={{ opacity: 1, x: 0, rotate: -2 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute left-4 bottom-12 glass-card p-3 rounded-lg border border-gold/30 flex items-center gap-3 z-20"
              style={{
                background: 'rgba(20, 24, 39, 0.7)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold-500">
                <Icon name="bolt" className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-text-primary text-sm">Quest Complete!</div>
                <div className="text-xs text-gold-500">+250 coins</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
