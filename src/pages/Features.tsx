import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon, IconName } from '../components/Icon'
import MarketingHeader from '../components/MarketingHeader'
import MarketingFooter from '../components/MarketingFooter'
import AnimatedGradientBackground from '../components/AnimatedGradientBackground'
import ScrollReveal from '../components/ui/ScrollReveal'
import { staggerContainer, staggerItem } from '../hooks/useStaggeredAnimation'

interface Feature {
  id: string
  title: string
  description: string
  icon: IconName
  category: string
  highlight?: boolean
}

const features: Feature[] = [
  {
    id: 'smart-exams',
    title: 'Smart Exam System',
    description: 'AI-powered exam generation with adaptive difficulty and instant feedback',
    icon: 'fileText',
    category: 'Assessment',
    highlight: true
  },
  {
    id: 'course-catalog',
    title: 'Verified Course Library',
    description: 'Expert-verified courses covering all major subjects and exam boards',
    icon: 'layers',
    category: 'Learning',
    highlight: true
  },
  {
    id: 'gamification',
    title: 'Gamified Learning',
    description: 'XP points, badges, leaderboards, and daily quests to keep you motivated',
    icon: 'zap',
    category: 'Engagement',
    highlight: true
  },
  {
    id: 'analytics',
    title: 'Progress Analytics',
    description: 'Detailed performance tracking with actionable insights and recommendations',
    icon: 'chartLine',
    category: 'Analytics'
  },
  {
    id: 'practice-modes',
    title: 'Multiple Practice Modes',
    description: 'Timed exams, practice tests, flashcards, and study sessions',
    icon: 'clock',
    category: 'Assessment'
  },
  {
    id: 'mobile-app',
    title: 'Cross-Platform Access',
    description: 'Learn anywhere with our responsive web and mobile applications',
    icon: 'smartphone',
    category: 'Accessibility'
  },
  {
    id: 'collaboration',
    title: 'Study Groups',
    description: 'Connect with peers, form study groups, and compete together',
    icon: 'users',
    category: 'Social'
  },
  {
    id: 'tutor-connect',
    title: 'Expert Tutors',
    description: 'Connect with verified tutors for personalized guidance',
    icon: 'school',
    category: 'Support'
  },
  {
    id: 'content-creation',
    title: 'Teacher Tools',
    description: 'Create and share custom content, track student progress',
    icon: 'penTool',
    category: 'Teachers'
  },
  {
    id: 'centre-management',
    title: 'Centre Dashboard',
    description: 'Complete management system for tutorial centres',
    icon: 'layoutDashboard',
    category: 'Business'
  },
  {
    id: 'offline-mode',
    title: 'Offline Mode',
    description: 'Download content and study without internet connection',
    icon: 'wifiOff',
    category: 'Accessibility'
  },
  {
    id: 'reminders',
    title: 'Smart Reminders',
    description: 'Personalized study schedules and deadline notifications',
    icon: 'calendar',
    category: 'Productivity'
  }
]

const categories = ['All', 'Assessment', 'Learning', 'Engagement', 'Analytics', 'Accessibility', 'Social', 'Support', 'Teachers', 'Business', 'Productivity']

export default function Features() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredFeatures = selectedCategory === 'All'
    ? features
    : features.filter(f => f.category === selectedCategory)

  const highlightFeatures = features.filter(f => f.highlight)

  return (
    <div className="min-h-screen bg-deep relative">
      <AnimatedGradientBackground />
      <MarketingHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        {/* Animated gradient orbs in hero */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]"
          style={{ willChange: 'transform' }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-gold/15 rounded-full blur-[120px]"
          style={{ willChange: 'transform' }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-coral/15 rounded-full blur-[100px]"
          style={{ willChange: 'transform' }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-7xl mx-auto text-center"
        >
          <span className="inline-block px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary text-sm rounded-full mb-4">
            Everything You Need
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Powerful Features for <span className="bg-gradient-to-r from-primary-light to-gold bg-clip-text text-transparent">Academic Success</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-8">
            Everything you need to excel in your exams, from smart assessments to gamified learning experiences
          </p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, idx) => {
              const colors = ['primary', 'gold', 'coral', 'success']
              const color = colors[idx % colors.length]
              const activeClass = color === 'primary' ? 'bg-primary text-white shadow-glow'
                : color === 'gold' ? 'bg-gold text-deep shadow-gold-glow'
                : color === 'coral' ? 'bg-coral text-white'
                : 'bg-success text-white'
              const inactiveClass = color === 'primary' ? 'hover:text-primary hover:border-primary'
                : color === 'gold' ? 'hover:text-gold hover:border-gold'
                : color === 'coral' ? 'hover:text-coral hover:border-coral'
                : 'hover:text-success hover:border-success'
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                    selectedCategory === category
                      ? activeClass
                      : `bg-surface text-text-secondary ${inactiveClass} border border-border`
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Highlight Features — Staggered reveal */}
      {selectedCategory === 'All' && (
        <section className="px-6 mb-16">
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {highlightFeatures.map((feature, idx) => {
              const accentColors = [
                { border: 'border-primary', bg: 'bg-primary/20', text: 'text-primary', gradient: 'from-primary/20 to-gold-500/20' },
                { border: 'border-gold', bg: 'bg-gold/20', text: 'text-gold', gradient: 'from-gold/20 to-primary-500/20' },
                { border: 'border-coral', bg: 'bg-coral/20', text: 'text-coral', gradient: 'from-coral/20 to-gold-500/20' }
              ]
              const colors = accentColors[idx]
              return (
                <motion.div
                  key={feature.id}
                  variants={staggerItem('up')}
                  className={`glass ${colors.border} p-6 hover:border-opacity-50 transition-all group hover-lift`}
                >
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 ${colors.bg} geo-chamfer-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform flex-shrink-0`}>
                    <Icon name={feature.icon as any} className={`w-7 h-7 sm:w-8 sm:h-8 ${colors.text}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">{feature.title}</h3>
                  <p className="text-text-secondary">{feature.description}</p>
                  <div className={`mt-4 flex items-center gap-2 ${colors.text} text-sm font-medium`}>
                    <span>Learn more</span>
                    <Icon name="arrowRight" className="w-4 h-4" />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </section>
      )}

      {/* All Features Grid — Staggered reveal */}
      <section className="px-6 pb-16">
        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredFeatures.map((feature, idx) => {
            const accentColors = [
              { border: 'hover:border-primary', iconBg: 'group-hover:bg-primary/20', icon: 'text-primary' },
              { border: 'hover:border-gold', iconBg: 'group-hover:bg-gold/20', icon: 'text-gold' },
              { border: 'hover:border-coral', iconBg: 'group-hover:bg-coral/20', icon: 'text-coral' },
              { border: 'hover:border-success', iconBg: 'group-hover:bg-success/20', icon: 'text-success' }
            ]
            const colors = accentColors[idx % accentColors.length]
            return (
              <ScrollReveal key={feature.id} delay={idx * 80}>
                <motion.div
                  variants={staggerItem('up')}
                  className={`glass p-6 ${colors.border}/50 hover:shadow-lg transition-all cursor-pointer group hover-lift`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-raised geo-chamfer-lg flex items-center justify-center ${colors.iconBg} transition-colors flex-shrink-0`}>
                      <Icon name={feature.icon} className={`w-7 h-7 sm:w-8 sm:h-8 ${colors.icon}`} />
                    </div>
                    <span className="text-xs text-muted bg-raised px-2 py-1 rounded-full">
                      {feature.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{feature.title}</h3>
                  <p className="text-text-secondary text-sm">{feature.description}</p>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="gradient-accent glass rounded-2xl p-8 md:p-12 text-center relative overflow-hidden hover-glow">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 rounded-full blur-[60px]" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-coral/20 rounded-full blur-[60px]" />

            <div className="relative">
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Ready to Transform Your Learning?
              </h2>
              <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                Join thousands of students already using ADJ EduQuest to achieve their academic goals
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/onboarding/role"
                  className="group px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-all shadow-glow hover:shadow-[0_0_30px_rgba(45,82,232,0.5)] flex items-center justify-center gap-2"
                >
                  Start Free Trial
                  <Icon name="arrowRight" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/how-it-works"
                  className="px-8 py-3 border border-border hover:border-gold text-text-primary hover:text-gold rounded-lg font-medium transition-colors"
                >
                  See How It Works
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <MarketingFooter />
    </div>
  )
}
