import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Icon } from '../components/Icon'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import ScrollReveal from '../components/ui/ScrollReveal'
import MarketingHeader from '../components/MarketingHeader'
import MarketingFooter from '../components/MarketingFooter'
import AnimatedGradientBackground from '../components/AnimatedGradientBackground'
import { textColors, bgColors, borderColors, gradientFrom, gradientTo } from '../utils/colorClasses'

// Hero text configurations - 3 major writeups with 3 sub-variations each
const heroWriteups = [
  {
    id: 'quest',
    // Sub-variation 1
    lines1: ['Your Quest for', 'Academic Excellence', 'Starts Here'],
    // Sub-variation 2
    lines2: ['Your Journey to', 'Top Exam Scores', 'Begins Today'],
    // Sub-variation 3
    lines3: ['Your Path to', 'Scholarship Success', 'Opens Now'],
  },
  {
    id: 'master',
    // Sub-variation 1
    lines1: ['Master Every', 'Exam with', 'Confidence'],
    // Sub-variation 2
    lines2: ['Conquer WAEC,', 'JAMB & NECO', 'with Ease'],
    // Sub-variation 3
    lines3: ['Ace Your Tests', 'Like Never', 'Before'],
  },
  {
    id: 'join',
    // Sub-variation 1
    lines1: ['Join 12,000+', 'Students', 'Crushing Goals'],
    // Sub-variation 2
    lines2: ['Study with', 'Nigeria\'s Best', 'Minds Today'],
    // Sub-variation 3
    lines3: ['Learn From', 'Top Scorers', 'Nationwide'],
  }
]

export default function LandingHeroDemo() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  const [currentCardVariant, setCurrentCardVariant] = useState(0)
  const [isAutoPlaying, _setIsAutoPlaying] = useState(true)
  
  // Hero text rotation state
  const [currentWriteup, setCurrentWriteup] = useState(0)
  const [currentSubVariation, setCurrentSubVariation] = useState(0)
  const [_isTextAnimating, setIsTextAnimating] = useState(false)

  // Rotate hero text - sub-variations within each writeup, then switch writeup
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTextAnimating(true)
      
      setTimeout(() => {
        setCurrentSubVariation((prev) => {
          if (prev === 2) {
            // After 3 sub-variations, switch to next major writeup
            setCurrentWriteup((w) => (w + 1) % heroWriteups.length)
            return 0
          }
          return prev + 1
        })
        setIsTextAnimating(false)
      }, 400) // Quick fade out duration
    }, 4000) // Change every 4 seconds
    
    return () => clearInterval(interval)
  }, [])

  const cardVariants = [
    {
      id: 'floating-bars',
      layoutType: 'floating-bars',
      shape: 'hexagon',
      style: 'neon',
      title: 'Performance Hub',
      subtitle: 'Real-time Metrics',
      mainContent: {
        type: 'floating-bars',
        centerMetric: { label: 'Overall Score', value: '85%', icon: 'target' },
        floatingBars: [
          { label: 'Accuracy', value: 92, color: 'success' },
          { label: 'Speed', value: 78, color: 'primary' },
          { label: 'Streak', value: 14, color: 'gold' },
          { label: 'Focus', value: 85, color: 'primary' },
          { label: 'Growth', value: 67, color: 'success' },
          { label: 'Consistency', value: 90, color: 'gold' }
        ]
      },
      stats: [],
      floatingCards: [],
      decorativeElements: [],
      animationType: 'fade'
    },
    {
      id: 'subjects',
      layoutType: 'grid',
      shape: 'angled',
      style: 'dark-solid',
      title: 'Subject Tracker',
      subtitle: 'WAEC Prep 2024',
      mainContent: {
        type: 'subjects',
        subjects: [
          { name: 'Mathematics', progress: 85, color: 'primary', icon: 'calculator' },
          { name: 'English', progress: 72, color: 'gold', icon: 'book' },
          { name: 'Physics', progress: 90, color: 'success', icon: 'atom' },
          { name: 'Chemistry', progress: 78, color: 'primary', icon: 'flask' },
          { name: 'Biology', progress: 65, color: 'gold', icon: 'leaf' },
          { name: 'Economics', progress: 88, color: 'success', icon: 'trendingUp' }
        ]
      },
      stats: [
        { icon: 'book', value: '9', label: 'Subjects', color: 'primary' },
        { icon: 'clock', value: '45d', label: 'Time Left', color: 'gold' }
      ],
      floatingCards: [
        { icon: 'checkCircle', title: 'Quiz Passed', subtitle: 'English Grammar', color: 'success', position: 'left-bottom-small', xOffset: '-10%', yOffset: '85%' }
      ],
      animationType: 'slide'
    },
    {
      id: 'timeline',
      layoutType: 'timeline',
      shape: 'tall',
      style: 'light',
      title: 'Course Journey',
      subtitle: 'Advanced Physics',
      mainContent: {
        type: 'timeline',
        lessons: [
          { title: 'Introduction', status: 'completed', icon: 'check' },
          { title: 'Mechanics', status: 'completed', icon: 'check' },
          { title: 'Thermodynamics', status: 'current', icon: 'play' },
          { title: 'Waves & Optics', status: 'upcoming', icon: 'lock' },
          { title: 'Electricity', status: 'upcoming', icon: 'lock' }
        ]
      },
      stats: [
        { icon: 'playCircle', value: '12/18', label: 'Lessons', color: 'primary' },
        { icon: 'award', value: '67%', label: 'Progress', color: 'gold' }
      ],
      floatingCards: [
        { icon: 'video', title: 'New Video', subtitle: 'Chapter 3 Added', color: 'primary', position: 'top', xOffset: '70%',  
          yOffset: '75%'  },
        { icon: 'checkCircle', title: 'Assignment', subtitle: 'Scored 95%', color: 'success', position: 'left-top', xOffset: '-10%',  
          yOffset: '55%' },
        { icon: 'flame', title: '7-Day Streak', subtitle: 'Keep going!', color: 'gold', position: 'right-top', }
      ],
      animationType: 'cascade'
    },
    {
      id: 'charts',
      layoutType: 'charts',
      shape: 'diamond',
      style: 'neon',
      title: 'Performance Hub',
      subtitle: 'Weekly Analytics',
      mainContent: {
        type: 'charts',
        barData: [
          { label: 'Mon', value: 75 },
          { label: 'Tue', value: 82 },
          { label: 'Wed', value: 68 },
          { label: 'Thu', value: 90 },
          { label: 'Fri', value: 85 }
        ],
        pieData: [
          { label: 'Correct', value: 78, color: 'success' },
          { label: 'Review', value: 15, color: 'gold' },
          { label: 'Incorrect', value: 7, color: 'danger' }
        ]
      },
      stats: [
        { icon: 'barChart', value: '156', label: 'Questions', color: 'primary',  },
        { icon: 'target', value: '89%', label: 'Accuracy', color: 'success' }
      ],
      floatingCards: [
        { icon: 'chartBar', title: '156', subtitle: 'Questions', color: 'primary', position: 'left-top',xOffset: '5%', yOffset: '65%'},
        { icon: 'target', title: '89%', subtitle: 'Accuracy', color: 'success', position: 'right-top', xOffset: '70%',  
          yOffset: '20%'}
      ],
      decorativeElements: [],
      animationType: 'bounce'
    },
    {
      id: 'achievement',
      layoutType: 'circular',
      shape: 'circle',
      style: 'gold-gradient',
      title: 'Achievement Center',
      subtitle: 'Your Badges',
      mainContent: {
        type: 'achievement',
        mainBadge: { icon: 'trophy', name: 'Physics Master', level: 'Gold' },
        orbitingBadges: [
          { icon: 'star', name: 'Quick Learner' },
          { icon: 'flame', name: '7-Day Streak' },
          { icon: 'zap', name: 'Speed Demon' },
          { icon: 'target', name: 'Sharp Shooter' }
        ]
      },
      stats: [
        { icon: 'award', value: '12', label: 'Badges', color: 'gold' },
        { icon: 'trophy', value: 'Gold', label: 'Top Tier', color: 'gold' }
      ],
      floatingCards: [],
      decorativeElements: [
        { type: 'particle', count: 8 }
      ],
      animationType: 'rotate'
    },
  ]

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentCardVariant((prev) => (prev + 1) % cardVariants.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  return (
    <div className="min-h-screen bg-deep relative z-0">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-gold origin-left z-50"
        style={{ scaleX }}
      />
      <AnimatedGradientBackground />
      <MarketingHeader />

      {/* Hero Section */}
      <section className="min-h-[calc(100vh-80px)] relative flex items-center pt-12 pb-24 lg:py-0 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gold/5 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 pt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 relative z-10 w-full">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-gold/20 border border-primary/30 text-primary self-start"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-success"
              />
              Nigeria's #1 Exam Platform
            </motion.div>

            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-text-primary tracking-tight leading-tight"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentWriteup}-${currentSubVariation}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                >
                  {/* Line 1 */}
                  <span className="block overflow-hidden">
                    {(() => {
                      const lines = currentSubVariation === 0 
                        ? heroWriteups[currentWriteup].lines1 
                        : currentSubVariation === 1 
                          ? heroWriteups[currentWriteup].lines2 
                          : heroWriteups[currentWriteup].lines3
                      
                      return lines[0].split(' ').map((word, i) => (
                        <motion.span
                          key={`${currentWriteup}-${currentSubVariation}-l1-${i}`}
                          initial={{ y: 40, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
                          className="inline-block mr-[0.25em]"
                        >
                          {word}
                        </motion.span>
                      ))
                    })()}
                  </span>
                  
                  {/* Line 2 - Gradient shimmer */}
                  <span className="block overflow-hidden">
                    <motion.span
                      className="bg-gradient-to-r from-primary via-gold to-coral bg-clip-text text-transparent bg-[length:300%_auto] inline-block"
                      animate={{ backgroundPosition: ['0% center', '100% center', '0% center'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      {(() => {
                        const lines = currentSubVariation === 0 
                          ? heroWriteups[currentWriteup].lines1 
                          : currentSubVariation === 1 
                            ? heroWriteups[currentWriteup].lines2 
                            : heroWriteups[currentWriteup].lines3
                        
                        return lines[1].split('').map((char, i) => (
                          <motion.span
                            key={`${currentWriteup}-${currentSubVariation}-l2-${i}`}
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.2 + i * 0.03, ease: [0.33, 1, 0.68, 1] }}
                            className="inline-block"
                            style={{ marginRight: char === ' ' ? '0.25em' : '0' }}
                          >
                            {char === ' ' ? '\u00A0' : char}
                          </motion.span>
                        ))
                      })()}
                    </motion.span>
                  </span>
                  
                  {/* Line 3 - Typewriter with cursor */}
                  <span className="block overflow-hidden">
                    {(() => {
                      const lines = currentSubVariation === 0 
                        ? heroWriteups[currentWriteup].lines1 
                        : currentSubVariation === 1 
                          ? heroWriteups[currentWriteup].lines2 
                          : heroWriteups[currentWriteup].lines3
                      
                      return (
                        <>
                          {lines[2].split('').map((char, i) => (
                            <motion.span
                              key={`${currentWriteup}-${currentSubVariation}-l3-${i}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.08, delay: 0.5 + i * 0.06 }}
                              className="inline-block"
                              style={{ marginRight: char === ' ' ? '0.25em' : '0' }}
                            >
                              {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                          ))}
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity, times: [0, 0.3, 0.7, 1], delay: 0.5 + lines[2].length * 0.06 + 0.3 }}
                            className="inline-block w-[3px] h-[0.8em] bg-primary ml-1 rounded-sm"
                          />
                        </>
                      )
                    })()}
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-text-secondary max-w-xl leading-relaxed"
            >
              Verified exams, expert courses, and gamified learning paths
              built specifically for ambitious Nigerian students aiming for top
              scores.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/onboarding/role"
                  className="bg-gradient-to-r from-primary to-primary-400 hover:from-primary-400 hover:to-primary text-white px-8 py-4 geo-chamfer-lg font-medium transition-all shadow-lg shadow-primary/25 text-center flex items-center justify-center gap-2"
                >
                  Start Learning Free
                  <Icon name="arrowRight" className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/centres"
                  className="border-2 border-border/50 bg-surface/50 backdrop-blur text-text-primary px-8 py-4 geo-chamfer-lg font-medium hover:bg-surface hover:border-primary/50 transition-all text-center flex items-center justify-center gap-2 h-[58px]"
                >
                  For Tutorial Centres
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-6 pt-6"
            >
              <div className="flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    className="w-12 h-12 rounded-full border-3 border-deep relative cursor-pointer"
                  >
                    <img
                      alt={`Student Avatar ${i}`}
                      className="w-full h-full rounded-full object-cover"
                      src={i === 1 ? "https://i.pravatar.cc/150?img=1" : i === 2 ? "https://i.pravatar.cc/150?img=5" : "https://i.pravatar.cc/150?img=8"}
                    />
                  </motion.div>
                ))}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 rounded-full border-3 border-deep bg-gradient-to-br from-primary to-gold flex items-center justify-center text-sm font-bold text-white cursor-pointer shadow-lg shadow-primary/25"
                >
                  +
                </motion.div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-text-primary">12,000+</span>
                <span className="text-sm text-text-secondary">top students learning</span>
              </div>
            </motion.div>
          </div>

          {/* Right Content (Visuals) */}
          <div className="relative hidden lg:flex items-center justify-center flex-col">
            <AnimatePresence mode="wait">
              {/* Variant 1: Floating Mini Bar Charts - Hexagonal */}
              {cardVariants[currentCardVariant]!.layoutType === 'floating-bars' && (
                <motion.div
                  key={cardVariants[currentCardVariant].id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  className="w-full max-w-lg relative z-10"
                >
                  <div className="relative w-80 h-80 mx-auto flex items-center justify-center">
                    {/* Hexagonal main card */}
                    <div className="absolute w-64 h-64 glass-strong border-2 border-primary/50 shadow-2xl shadow-primary/20 flex items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-400 flex items-center justify-center mb-3 shadow-lg shadow-primary/30">
                          <Icon name="target" className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-text-primary">{cardVariants[currentCardVariant]!.mainContent.centerMetric?.value || '85%'}</div>
                        <div className="text-sm text-text-secondary">{cardVariants[currentCardVariant]!.mainContent.centerMetric?.label || 'Score'}</div>
                      </div>
                    </div>
                    {/* Floating Mini Bar Charts */}
              {cardVariants[currentCardVariant]!.mainContent?.floatingBars?.map((bar, idx) => {
                      const angle = (idx * 60) * (Math.PI / 180) - (Math.PI / 6)
                      const distance = 170
                      const x = Math.cos(angle) * distance - 40
                      const y = Math.sin(angle) * distance - 50
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                          className="absolute"
                          style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: 'translate(-50%, -50%)' }}
                        >
                          <div className={`bg-deepest border-2 ${borderColors[bar.color] || 'border-border'} geo-chamfer p-3 shadow-lg w-28`}>
                            <div className="text-xs text-text-secondary mb-1">{bar.label}</div>
                            <div className={`terminal-value text-lg ${textColors[bar.color] || 'text-text-primary'}`}>{bar.value}</div>
                            <div className="h-1 bg-surface rounded-full mt-1 overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${bar.value}%` }} transition={{ duration: 0.5, delay: idx * 0.1 + 0.2 }} className={`h-full ${bgColors[bar.color] || 'bg-primary'}`} />
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {/* Variant 2: Progress Dashboard - Glass Morphism */}
              {cardVariants[currentCardVariant].layoutType === 'stack' && (
                <motion.div
                  key={cardVariants[currentCardVariant].id}
                  initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
                  animate={{ opacity: 1, scale: 1, rotate: -3 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: -3 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ rotate: 0, scale: 1.02 }}
                  className="w-full max-w-lg relative z-10"
                >
                  <div className="bg-gradient-to-br from-surface/90 to-surface/70 backdrop-blur-xl rounded-3xl p-8 border border-border/50 shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 geo-chamfer-lg bg-gradient-to-br from-primary to-gold flex items-center justify-center shadow-lg shadow-primary/25 overflow-hidden">
                          <img src="/img/adj-app-icon-v2-transparent.png" alt="ADJ Logo" className="w-12 h-12 object-contain" />
                        </div>
                        <div>
                          <h3 className="font-bold text-text-primary text-lg">{cardVariants[currentCardVariant].title}</h3>
                          <p className="text-sm text-text-secondary">{cardVariants[currentCardVariant].subtitle}</p>
                        </div>
                      </div>
                      <motion.div whileHover={{ scale: 1.1, rotate: 15 }} className="w-10 h-10 geo-chamfer-lg glass-light flex items-center justify-center cursor-pointer">
                        <Icon name="bell" className="w-5 h-5 text-text-secondary" />
                      </motion.div>
                    </div>
                    <div className="glass-light geo-chamfer p-6 mb-6 relative overflow-hidden">
                      <motion.div animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-gradient-to-r from-primary/10 via-gold/10 to-primary/10 bg-[length:200%_200%]" />
                      <div className="relative z-10 flex items-center gap-6">
                        <div className="relative">
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="w-24 h-24 rounded-full border-4 border-primary/20" />
                          <motion.div animate={{ rotate: -360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-primary border-r-gold" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="terminal-value text-2xl">{(cardVariants[currentCardVariant]!.mainContent as any)?.percentage || '0%'}</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-text-primary mb-1">{(cardVariants[currentCardVariant]!.mainContent as any)?.label || 'Label'}</h4>
                          <p className="text-sm text-text-secondary mb-2">{(cardVariants[currentCardVariant]!.mainContent as any)?.description || 'Description'}</p>
                          <div className="flex items-center gap-2 text-success text-sm">
                            <Icon name={(cardVariants[currentCardVariant]!.mainContent as any)?.icon || 'trendingUp'} className="w-4 h-4" />
                            <span>{(cardVariants[currentCardVariant]!.mainContent as any)?.trend || '+0%'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {cardVariants[currentCardVariant].stats.map((stat, idx) => (
                        <motion.div key={idx} whileHover={{ y: -4 }} className="glass-light geo-chamfer p-4">
                          <div className={`w-10 h-10 geo-chamfer ${bgColors[stat.color] || 'bg-primary/10'} flex items-center justify-center ${textColors[stat.color] || 'text-primary'} mb-3`}>
                            <Icon name={stat.icon as any} className="w-5 h-5" />
                          </div>
                          <div className="text-2xl font-bold text-text-primary mb-1">{stat.value}</div>
                          <div className="text-xs text-text-secondary">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Variant 2: Subject Grid - Angled Corners */}
              {cardVariants[currentCardVariant]?.layoutType === 'grid' && (
                <motion.div
                  key={cardVariants[currentCardVariant].id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  className="w-full max-w-lg relative z-10"
                >
                  <div className="glass-strong p-6 border-2 border-border/30 shadow-2xl" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)' }}>
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="font-bold text-text-primary text-lg">{cardVariants[currentCardVariant]!.title}</h3>
                        <p className="text-sm text-text-secondary">{cardVariants[currentCardVariant]!.subtitle}</p>
                      </div>
                      <div className="w-10 h-10 geo-chamfer-lg bg-primary/20 flex items-center justify-center">
                        <Icon name="book" className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {(cardVariants[currentCardVariant]?.mainContent?.subjects || []).map((subject, idx) => (
                        <motion.div key={idx} whileHover={{ scale: 1.05 }} className={`${bgColors[subject.color] || 'bg-primary/10'} border ${borderColors[subject.color] || 'border-border'} geo-chamfer p-3`}>
                          <div className="flex items-center gap-2 mb-1">
                            <Icon name={(subject.icon || 'book') as any} className={`w-4 h-4 ${textColors[subject.color] || 'text-primary'}`} />
                            <div className="text-xs text-text-secondary">{subject.name}</div>
                          </div>
                          <div className="text-lg font-bold text-text-primary">{subject.progress}%</div>
                          <div className="h-1 bg-deepest rounded-full mt-2 overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${subject.progress}%` }} transition={{ duration: 0.5 }} className={`h-full ${bgColors[subject.color] || 'bg-primary'}`} />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {cardVariants[currentCardVariant].stats.map((stat, idx) => (
                        <div key={idx} className="flex-1 bg-surface/50 geo-chamfer p-3 text-center">
                          <div className={`terminal-value text-xl ${textColors[stat.color] || 'text-text-primary'}`}>{stat.value}</div>
                          <div className="text-xs text-text-secondary">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Variant 3: Timeline - Vertical */}
              {cardVariants[currentCardVariant].layoutType === 'timeline' && (
                <motion.div
                  key={cardVariants[currentCardVariant].id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  className="w-full max-w-sm relative z-10"
                >
                  <div className="bg-surface p-6 geo-chamfer-lg border border-border/50 shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="font-bold text-text-primary text-lg">{cardVariants[currentCardVariant].title}</h3>
                        <p className="text-sm text-text-secondary">{cardVariants[currentCardVariant].subtitle}</p>
                      </div>
                    </div>
                    <div className="space-y-4 mb-6">
                      {(cardVariants[currentCardVariant]!.mainContent?.lessons || []).map((lesson, idx) => (
                        <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${lesson.status === 'completed' ? 'bg-success' : lesson.status === 'current' ? 'bg-primary' : 'bg-surface border-2 border-border'}`}>
                            <Icon name={lesson.icon as any} className={`w-4 h-4 ${lesson.status === 'upcoming' ? 'text-text-secondary' : 'text-white'}`} />
                          </div>
                          <div className="flex-1">
                            <div className={`text-sm font-medium ${lesson.status === 'current' ? 'text-primary' : 'text-text-primary'}`}>{lesson.title}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex gap-4 pt-4 border-t border-border/30">
                      {cardVariants[currentCardVariant].stats.map((stat, idx) => (
                        <div key={idx} className="flex-1 text-center">
                          <div className={`terminal-value text-lg ${textColors[stat.color] || 'text-text-primary'}`}>{stat.value}</div>
                          <div className="text-xs text-text-secondary">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Variant 4: Charts - Diamond/Square */}
              {cardVariants[currentCardVariant].layoutType === 'charts' && (
                <motion.div
                  key={cardVariants[currentCardVariant].id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  whileHover={{ scale: 1.05 }}
                  className="w-full max-w-md relative z-10"
                >
                  <div className="glass-strong p-6 border-2 border-primary/50 shadow-2xl shadow-primary/20 geo-chamfer">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="font-bold text-text-primary text-lg">{cardVariants[currentCardVariant].title}</h3>
                        <p className="text-sm text-text-secondary">{cardVariants[currentCardVariant].subtitle}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 mb-4">
                      <div className="flex-1">
                        <div className="text-xs text-text-secondary mb-2">Daily Performance</div>
                        <div className="flex items-end gap-1 h-16">
                          {(cardVariants[currentCardVariant]!.mainContent?.barData || []).map((bar, idx) => (
                            <motion.div key={idx} initial={{ height: 0 }} animate={{ height: `${bar.value}%` }} transition={{ delay: idx * 0.1 }} className="flex-1 bg-gradient-to-t from-primary to-primary-400 rounded-t" />
                          ))}
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-text-secondary">
                          {(cardVariants[currentCardVariant]!.mainContent?.barData || []).map((bar, idx) => (
                            <span key={idx}>{bar.label}</span>
                          ))}
                        </div>
                      </div>
                      <div className="w-24">
                        <div className="text-xs text-text-secondary mb-2">Accuracy</div>
                        <div className="relative w-20 h-20 mx-auto">
                          <svg viewBox="0 0 36 36" className="w-full h-full">
                            {(cardVariants[currentCardVariant]!.mainContent?.pieData || []).map((slice, idx) => {
                              const pieData = cardVariants[currentCardVariant]!.mainContent?.pieData || []
                              const offset = idx === 0 ? 0 : idx === 1 ? (pieData[0]?.value || 0) * 3.6 : ((pieData[0]?.value || 0) + (pieData[1]?.value || 0)) * 3.6
                              return (
                                <motion.circle key={idx} initial={{ strokeDasharray: `0 100` }} animate={{ strokeDasharray: `${slice.value * 3.6} 100` }} transition={{ delay: idx * 0.1 }} cx="18" cy="18" r="15.9" fill="none" stroke={slice.color === 'success' ? '#22c55e' : slice.color === 'gold' ? '#eab308' : '#ef4444'} strokeWidth="3" strokeDashoffset={-offset} />
                              )
                            })}
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 pt-4 border-t border-border/30">
                      {cardVariants[currentCardVariant].stats.map((stat, idx) => (
                        <div key={idx} className="flex-1 text-center">
                          <div className={`terminal-value text-lg ${textColors[stat.color] || 'text-text-primary'}`}>{stat.value}</div>
                          <div className="text-xs text-text-secondary">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Variant 5: Achievement - Circular */}
              {cardVariants[currentCardVariant].layoutType === 'circular' && (
                <motion.div
                  key={cardVariants[currentCardVariant].id}
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 180 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ rotate: 10 }}
                  className="w-full max-w-sm relative z-10"
                >
                  <div className="relative w-72 h-72 mx-auto">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold to-gold-300 shadow-2xl shadow-gold/30" />
                    <div className="absolute inset-4 rounded-full bg-deepest flex flex-col items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-gold-400 flex items-center justify-center mb-2 shadow-lg">
                        <Icon name="trophy" className="w-10 h-10 text-white" />
                      </div>
                      <div className="text-text-primary font-bold text-lg">{cardVariants[currentCardVariant].mainContent.mainBadge?.name || 'Achievement'}</div>
                      <div className="text-gold-500 text-sm">{cardVariants[currentCardVariant].mainContent.mainBadge?.level || 'Bronze'}</div>
                    </div>
                    {cardVariants[currentCardVariant].mainContent.orbitingBadges?.map((badge, idx) => (
                      <motion.div
                        key={idx}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: idx * -2.5 }}
                        className="absolute inset-0"
                        style={{ transformOrigin: 'center' }}
                      >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface border-2 border-gold/50 flex items-center justify-center shadow-lg">
                          <Icon name={badge.icon as any} className="w-5 h-5 text-gold-500" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-8 mt-4">
                    {cardVariants[currentCardVariant].stats.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div className={`terminal-value text-xl ${textColors[stat.color] || 'text-text-primary'}`}>{stat.value}</div>
                        <div className="text-xs text-text-secondary">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Variant 6: Challenges & Community - Horizontal Split */}
              {cardVariants[currentCardVariant].layoutType === 'triangular' && (
                <motion.div
                  key={cardVariants[currentCardVariant].id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  className="w-full max-w-lg relative z-10"
                >
                  <div className="flex gap-4 w-full max-w-md mx-auto">
                    {/* Left Card - Challenge */}
                    <div className="flex-1 bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/50 geo-chamfer-lg p-5 shadow-xl shadow-primary/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon name="zap" className="w-5 h-5 text-primary" />
                        <span className="text-sm font-bold text-primary">Daily Challenge</span>
                      </div>
                      <div className="text-text-primary font-bold text-lg mb-2">{(cardVariants[currentCardVariant].mainContent as any)?.topTriangle?.challengeName || 'Challenge'}</div>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon name="clock" className="w-4 h-4 text-gold-500" />
                        <span className="text-sm text-gold-500 font-mono">{(cardVariants[currentCardVariant].mainContent as any)?.topTriangle?.timeLeft || '0:00'}</span>
                      </div>
                      <div className="h-2 bg-deepest rounded-full overflow-hidden mb-2">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${(cardVariants[currentCardVariant].mainContent as any)?.topTriangle?.progress || 0}%` }} transition={{ duration: 0.5 }} className="h-full bg-gradient-to-r from-primary to-primary-400" />
                      </div>
                      <div className="text-xs text-text-secondary">{(cardVariants[currentCardVariant].mainContent as any)?.topTriangle?.participants || 0} participating</div>
                    </div>
                    {/* Right Card - Leaderboard */}
                    <div className="flex-1 bg-gradient-to-br from-gold/20 to-gold/10 border-2 border-gold/50 geo-chamfer-lg p-4 shadow-xl shadow-gold/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon name="trophy" className="w-5 h-5 text-gold-500" />
                        <span className="text-sm font-bold text-gold-500">Leaderboard</span>
                      </div>
                      <div className="space-y-2">
                        {(cardVariants[currentCardVariant].mainContent as any)?.bottomTriangle?.leaderboard?.slice(0, 6).map((entry: any, idx: number) => (
                          <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, x: 20 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            transition={{ delay: idx * 0.08 }}
                            className={`flex items-center gap-3 p-1.5 geo-chamfer ${entry.isYou ? 'bg-gold/20 border border-gold/30' : 'hover:bg-gold/5'}`}
                          >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${idx === 0 ? 'bg-gold text-deepest' : idx === 1 ? 'bg-surface text-text-primary border border-gold/50' : idx === 2 ? 'bg-primary/20 text-primary' : entry.isYou ? 'bg-gold text-deepest' : 'text-text-secondary'}`}>
                              {entry.rank}
                            </div>
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${entry.isYou ? 'bg-gold text-deepest' : idx < 3 ? 'bg-gradient-to-br from-gold/30 to-gold/10 border border-gold/50 text-gold' : 'bg-surface border border-border text-text-secondary'}`}>
                              {entry.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={`text-sm truncate ${entry.isYou ? 'text-gold font-bold' : 'text-text-primary'}`}>
                                {entry.name} {entry.isYou && '(YOU)'}
                              </div>
                            </div>
                            {entry.trend === 'up' && <span className="text-success text-xs">↑</span>}
                            {entry.trend === 'down' && <span className="text-error text-xs">↓</span>}
                            {entry.trend === 'same' && <span className="text-text-secondary text-xs">→</span>}
                            <div className="text-sm font-bold text-text-secondary flex-shrink-0">{entry.score}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-8 mt-4">
                    {cardVariants[currentCardVariant].stats.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div className={`terminal-value text-xl ${textColors[stat.color] || 'text-text-primary'}`}>{stat.value}</div>
                        <div className="text-xs text-text-secondary">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating Cards - Dynamic Positions */}
            <AnimatePresence mode="wait">
              {cardVariants[currentCardVariant].floatingCards.map((card, idx) => {
                const positionClasses: Record<string, string> = {
                  'left-top': 'absolute -left-12 top-32 z-20',
                  'right-middle': 'absolute -right-8 top-1/2 z-20',
                  'left-bottom': 'absolute left-4 bottom-32 z-20',
                  'right-top': 'absolute -right-4 top-24 z-20',
                  'right-top-large': 'absolute -right-20 top-16 z-20',
                  'left-bottom-small': 'absolute left-12 bottom-16 z-20',
                  'top': 'absolute left-1/2 -translate-x-1/2 -top-8 z-20',
                  'bottom-left': 'absolute -left-8 bottom-8 z-20',
                  'bottom-right': 'absolute -right-8 bottom-8 z-20',
                  'top-left': 'absolute -left-8 -top-4 z-20',
                  'top-right': 'absolute -right-8 -top-4 z-20',
                  'bottom-left-corner': 'absolute -left-4 bottom-4 z-20',
                  'bottom-right-corner': 'absolute -right-4 bottom-4 z-20',
                  'left': 'absolute -left-16 top-1/2 -translate-y-1/2 z-20',
                  'right': 'absolute -right-16 top-1/2 -translate-y-1/2 z-20'
                }
                const sizeClasses = (card as any).size === 'large' ? 'p-6' : (card as any).size === 'small' ? 'p-3' : 'p-4'
                const iconSize = (card as any).size === 'large' ? 'w-8 h-8' : (card as any).size === 'small' ? 'w-5 h-5' : 'w-6 h-6'
                
                return (
                  <motion.div
                    key={`${cardVariants[currentCardVariant].id}-${idx}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className={positionClasses[card.position || ''] || 'absolute -left-12 top-24 z-20'}
                    style={(card as any).xOffset || (card as any).yOffset ? {
                      left: (card as any).xOffset,
                      top: (card as any).yOffset,
                      transform: 'translate(-50%, -50%)'
                    } : undefined}
                  >
                    <div className={`glass-light geo-chamfer-lg ${sizeClasses} border ${borderColors[card.color] || 'border-border'} shadow-xl`}>
                      <div className="flex items-center gap-3">
                        <motion.div animate={card.position?.includes('orbit') ? { rotate: 360 } : {}} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className={`w-12 h-12 geo-chamfer-lg bg-gradient-to-br ${gradientFrom[card.color] || 'from-primary'} ${gradientTo[card.color] || 'to-primary-light'} flex items-center justify-center text-white shadow-lg`}>
                          <Icon name={card.icon as any} className={iconSize} />
                        </motion.div>
                        <div>
                          <div className="font-bold text-text-primary text-sm">{card.title}</div>
                          <div className={`text-xs ${textColors[card.color] || 'text-primary'}`}>{card.subtitle}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {/* Decorative Elements for variants without floating cards */}
            <AnimatePresence mode="sync">
              {cardVariants[currentCardVariant]?.decorativeElements && cardVariants[currentCardVariant].decorativeElements.length > 0 && (cardVariants[currentCardVariant].decorativeElements || []).map((element, idx) => {
                if (element.type === 'sparkle' && 'position' in element) {
                  const positionClasses: Record<string, string> = {
                    'top-left': 'absolute -left-4 -top-4 z-20',
                    'top-right': 'absolute -right-4 -top-4 z-20',
                    'bottom-left': 'absolute -left-4 -bottom-4 z-20',
                    'bottom-right': 'absolute -right-4 -bottom-4 z-20'
                  }
                  const position = element.position as string
                  return (
                    <motion.div
                      key={`sparkle-${idx}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className={positionClasses[position] || 'absolute -left-4 -top-4 z-20'}
                    >
                      <motion.div
                        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center shadow-lg shadow-primary/30"
                      >
                        <Icon name="sparkles" className="w-4 h-4 text-white" />
                      </motion.div>
                    </motion.div>
                  )
                }
                if (element.type === 'particle') {
                  return (
                    <div key={`particles-${idx}`} className="absolute inset-0 pointer-events-none">
                      {Array.from({ length: element.count }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                          className="absolute w-2 h-2 rounded-full bg-gold-400"
                          style={{
                            top: `${20 + (i * 10)}%`,
                            left: `${20 + ((i % 4) * 20)}%`
                          }}
                        />
                      ))}
                    </div>
                  )
                }
                return null
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Why ADJ? Section */}
      <section className="py-24 relative overflow-hidden">
        {/* African Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="african-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#african-pattern)" className="text-primary"/>
          </svg>
        </div>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Why Students Choose ADJ
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Built differently for Nigerian students who want real results
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left - Big Card, Small Card */}
            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className="glass p-10 relative overflow-hidden group"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)' }}
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"/>
                <div className="relative z-10">
                  <div className="w-16 h-16 geo-chamfer-lg bg-gradient-to-br from-primary to-primary-400 flex items-center justify-center text-white mb-5 shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform">
                    <Icon name="checkCircle" className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-semibold text-text-primary mb-3">Assessment-Verified</h3>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    Every skill backed by real exam performance data, not self-reported certificates
                  </p>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className="glass-light p-5 relative overflow-hidden group"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)' }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-coral/10 rounded-full blur-3xl group-hover:bg-coral/20 transition-colors"/>
                <div className="relative z-10">
                  <div className="w-10 h-10 geo-chamfer bg-coral/20 flex items-center justify-center text-coral-500 mb-3 group-hover:bg-coral group-hover:text-white transition-colors">
                    <Icon name="globe" className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-text-primary mb-2">Built for Nigeria</h3>
                  <p className="text-sm text-text-secondary">
                    WAEC, JAMB, NECO content—not generic Western curriculum
                  </p>
                </div>
              </motion.div>
            </div>
            {/* Right - Small Card, Big Card (pushed down) */}
            <div className="space-y-6 lg:mt-16">
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className="glass-light p-5 relative overflow-hidden group"
                style={{ clipPath: 'polygon(5% 0, 100% 0, 100% 100%, 0 100%, 0 15%)' }}
              >
                <div className="absolute top-0 left-0 w-24 h-24 bg-success/10 rounded-full blur-3xl group-hover:bg-success/20 transition-colors"/>
                <div className="relative z-10">
                  <div className="w-10 h-10 geo-chamfer bg-success/20 flex items-center justify-center text-success mb-3 group-hover:bg-success group-hover:text-white transition-colors">
                    <Icon name="trophy" className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-text-primary mb-2">Gamified Progress</h3>
                  <p className="text-sm text-text-secondary">
                    Complete challenges, track streaks, actually improve
                  </p>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className="glass p-10 relative overflow-hidden group"
                style={{ clipPath: 'polygon(5% 0, 100% 0, 100% 100%, 0 100%, 0 15%)' }}
              >
                <div className="absolute top-0 left-0 w-40 h-40 bg-gold/10 rounded-full blur-3xl group-hover:bg-gold/20 transition-colors"/>
                <div className="relative z-10">
                  <div className="w-16 h-16 geo-chamfer-lg bg-gradient-to-br from-gold to-gold-300 flex items-center justify-center text-white mb-5 shadow-lg shadow-gold/25 group-hover:scale-110 transition-transform">
                    <Icon name="sparkles" className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-semibold text-text-primary mb-3">Personalized Learning</h3>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    Adaptive paths that focus on your weak spots in real-time
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Curved Divider */}
      <svg className="w-full h-24 text-surface/50" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="currentColor" d="M0,50 C360,100 720,0 1080,50 C1260,75 1380,100 1440,100 L1440,100 L0,100 Z"/>
      </svg>

      {/* Real Results Section */}
      <section className="py-24 bg-surface/50 relative overflow-hidden">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" className="text-primary"/>
          </svg>
        </div>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Real Results, Real Impact
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Numbers that show what's possible
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-transparent mb-2">
                <AnimatedCounter value={45} prefix="+" className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-transparent" />
              </div>
              <div className="text-sm text-text-secondary">Avg. JAMB score improvement</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gold-500 to-gold-300 bg-clip-text text-transparent mb-2">
                <AnimatedCounter value={78} suffix="%" className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gold-500 to-gold-300 bg-clip-text text-transparent" />
              </div>
              <div className="text-sm text-text-secondary">Hit target score</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-coral-500 to-coral-300 bg-clip-text text-transparent mb-2">
                <AnimatedCounter value={150} suffix="+" className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-coral-500 to-coral-300 bg-clip-text text-transparent" />
              </div>
              <div className="text-sm text-text-secondary">Active tutorial centres</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-success to-success/70 bg-clip-text text-transparent mb-2">
                <AnimatedCounter value={2500000} suffix="+" className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-success to-success/70 bg-clip-text text-transparent" />
              </div>
              <div className="text-sm text-text-secondary">Questions answered</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curved Divider */}
      <svg className="w-full h-24 text-deep" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="currentColor" d="M0,0 C360,50 720,100 1080,50 C1260,25 1380,0 1440,0 L1440,0 L0,0 Z"/>
      </svg>

      {/* What You Can Do Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-3">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="1" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots-pattern)" className="text-primary"/>
          </svg>
        </div>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              What You Can Do
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Everything you need to excel, in one place
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 - Large, primary accent */}
            <ScrollReveal delay={0} direction="up">
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass geo-chamfer p-8 hover:border-primary/40 transition-all relative overflow-hidden group hover-lift"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"/>
              <div className="relative z-10">
                <div className="w-14 h-14 geo-chamfer-lg bg-gradient-to-br from-primary to-primary-400 flex items-center justify-center text-white mb-5 shadow-lg shadow-primary/25">
                  <Icon name="fileText" className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">Practice Exams</h3>
                <p className="text-sm text-text-secondary mb-4">
                  Unlimited practice with instant grading and detailed feedback
                </p>
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                  <span>Start Practicing</span>
                  <Icon name="arrowRight" className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
            </ScrollReveal>
            {/* Card 2 - Medium, gold accent */}
            <ScrollReveal delay={80} direction="up">
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-light geo-chamfer p-6 hover:border-gold/40 transition-all relative overflow-hidden group mt-8 hover-lift"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full blur-3xl group-hover:bg-gold/20 transition-colors"/>
              <div className="relative z-10">
                <div className="w-12 h-12 geo-chamfer-lg bg-gradient-to-br from-gold-500 to-gold-300 flex items-center justify-center text-white mb-4 shadow-lg shadow-gold/25">
                  <Icon name="bookOpen" className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Expert Courses</h3>
                <p className="text-sm text-text-secondary mb-4">
                  Verified courses from top Nigerian educators
                </p>
                <div className="flex items-center gap-2 text-gold-500 text-sm font-medium">
                  <span>Browse Courses</span>
                  <Icon name="arrowRight" className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
            </ScrollReveal>
            {/* Card 3 - Medium, coral accent */}
            <ScrollReveal delay={160} direction="up">
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass geo-chamfer p-6 hover:border-coral/40 transition-all relative overflow-hidden group hover-lift"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-coral/10 rounded-full blur-3xl group-hover:bg-coral/20 transition-colors"/>
              <div className="relative z-10">
                <div className="w-12 h-12 geo-chamfer-lg bg-gradient-to-br from-coral-500 to-coral-300 flex items-center justify-center text-white mb-4 shadow-lg shadow-coral/25">
                  <Icon name="users" className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Compete & Learn</h3>
                <p className="text-sm text-text-secondary mb-4">
                  Head-to-head challenges and group study sessions
                </p>
                <div className="flex items-center gap-2 text-coral-500 text-sm font-medium">
                  <span>Join Challenges</span>
                  <Icon name="arrowRight" className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
            </ScrollReveal>
            {/* Card 4 - Medium, success accent */}
            <ScrollReveal delay={240} direction="up">
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-light geo-chamfer p-6 hover:border-success/40 transition-all relative overflow-hidden group hover-lift"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-success/10 rounded-full blur-3xl group-hover:bg-success/20 transition-colors"/>
              <div className="relative z-10">
                <div className="w-12 h-12 geo-chamfer-lg bg-gradient-to-br from-success to-success/70 flex items-center justify-center text-white mb-4 shadow-lg shadow-success/25">
                  <Icon name="flame" className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Track Progress</h3>
                <p className="text-sm text-text-secondary mb-4">
                  Monitor streaks, goals, and improvement over time
                </p>
                <div className="flex items-center gap-2 text-success text-sm font-medium">
                  <span>View Dashboard</span>
                  <Icon name="arrowRight" className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
            </ScrollReveal>
            {/* Card 5 - Medium, primary accent */}
            <ScrollReveal delay={320} direction="up">
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass geo-chamfer p-6 hover:border-primary/40 transition-all relative overflow-hidden group mt-8 hover-lift"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"/>
              <div className="relative z-10">
                <div className="w-12 h-12 geo-chamfer-lg bg-gradient-to-br from-primary to-primary-400 flex items-center justify-center text-white mb-4 shadow-lg shadow-primary/25">
                  <Icon name="target" className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Target Weaknesses</h3>
                <p className="text-sm text-text-secondary mb-4">
                  Focus on subjects and topics that need the most work
                </p>
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                  <span>Identify Gaps</span>
                  <Icon name="arrowRight" className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
            </ScrollReveal>
            {/* Card 6 - Medium, gold accent */}
            <ScrollReveal delay={400} direction="up">
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-light geo-chamfer p-6 hover:border-gold/40 transition-all relative overflow-hidden group hover-lift"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full blur-3xl group-hover:bg-gold/20 transition-colors"/>
              <div className="relative z-10">
                <div className="w-12 h-12 geo-chamfer-lg bg-gradient-to-br from-gold-500 to-gold-300 flex items-center justify-center text-white mb-4 shadow-lg shadow-gold/25">
                  <Icon name="award" className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Earn Recognition</h3>
                <p className="text-sm text-text-secondary mb-4">
                  Achievements and badges for milestones reached
                </p>
                <div className="flex items-center gap-2 text-gold-500 text-sm font-medium">
                  <span>View Badges</span>
                  <Icon name="arrowRight" className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* For Parents Section */}
      <section className="py-24 bg-surface/50 relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                For Parents
              </h2>
              <p className="text-text-secondary mb-8">
                See your child's real progress—not just certificates. Monitor study habits, track improvement, and ensure they're on the right path to success.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                    <Icon name="check" className="w-3 h-3" />
                  </div>
                  <div>
                    <div className="font-medium text-text-primary">Verified Performance Data</div>
                    <div className="text-sm text-text-secondary">Real exam results, not self-reported scores</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold-500 flex-shrink-0 mt-0.5">
                    <Icon name="check" className="w-3 h-3" />
                  </div>
                  <div>
                    <div className="font-medium text-text-primary">Study Habit Tracking</div>
                    <div className="text-sm text-text-secondary">Monitor streaks, daily activity, and consistency</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-coral/20 flex items-center justify-center text-coral-500 flex-shrink-0 mt-0.5">
                    <Icon name="check" className="w-3 h-3" />
                  </div>
                  <div>
                    <div className="font-medium text-text-primary">Safe Exam Environment</div>
                    <div className="text-sm text-text-secondary">Integrity-monitored testing for authentic results</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center text-success flex-shrink-0 mt-0.5">
                    <Icon name="check" className="w-3 h-3" />
                  </div>
                  <div>
                    <div className="font-medium text-text-primary">Weekly Progress Reports</div>
                    <div className="text-sm text-text-secondary">Detailed summaries sent directly to you</div>
                  </div>
                </div>
              </div>
              <Link
                to="/onboarding/role"
                className="inline-block bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-medium transition-all"
              >
                Get Started
              </Link>
            </div>
            {/* Analytics Screen Mockup */}
            <div className="terminal-container relative overflow-hidden">
              <div className="terminal-bar">
                <span className="terminal-dot bg-red-500/80" />
                <span className="terminal-dot bg-yellow-500/80" />
                <span className="terminal-dot bg-green-500/80" />
                <span className="terminal-label ml-2">analytics</span>
              </div>
              <div className="p-6 space-y-4">
                <div className="glass-light geo-chamfer p-4">
                  <div className="terminal-label mb-2">Weekly Progress</div>
                  <div className="flex items-end gap-2 h-16">
                    <div className="flex-1 bg-primary/30 rounded-t" style={{ height: '40%' }}></div>
                    <div className="flex-1 bg-primary/40 rounded-t" style={{ height: '60%' }}></div>
                    <div className="flex-1 bg-primary/50 rounded-t" style={{ height: '45%' }}></div>
                    <div className="flex-1 bg-primary/60 rounded-t" style={{ height: '80%' }}></div>
                    <div className="flex-1 bg-primary/70 rounded-t" style={{ height: '70%' }}></div>
                    <div className="flex-1 bg-primary rounded-t" style={{ height: '90%' }}></div>
                    <div className="flex-1 bg-gold rounded-t" style={{ height: '100%' }}></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-light geo-chamfer p-4">
                    <div className="terminal-label mb-1">Current Streak</div>
                    <div className="terminal-value text-2xl text-gold-400">14 days</div>
                  </div>
                  <div className="glass-light geo-chamfer p-4">
                    <div className="terminal-label mb-1">Avg. Score</div>
                    <div className="terminal-value text-2xl text-success">87%</div>
                  </div>
                </div>
                <div className="glass-light geo-chamfer p-4">
                  <div className="terminal-label mb-2">Subject Performance</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="terminal-label text-xs w-16">Math</div>
                      <div className="flex-1 bg-deep rounded-full h-2">
                        <div className="bg-primary rounded-full h-2" style={{ width: '85%' }}></div>
                      </div>
                      <div className="terminal-value text-xs">85%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="terminal-label text-xs w-16">Physics</div>
                      <div className="flex-1 bg-deep rounded-full h-2">
                        <div className="bg-gold rounded-full h-2" style={{ width: '92%' }}></div>
                      </div>
                      <div className="terminal-value text-xs">92%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="terminal-label text-xs w-16">Chemistry</div>
                      <div className="flex-1 bg-deep rounded-full h-2">
                        <div className="bg-coral rounded-full h-2" style={{ width: '78%' }}></div>
                      </div>
                      <div className="terminal-value text-xs">78%</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="scanline-overlay" />
            </div>
          </div>
        </div>
      </section>

      {/* Subject Spotlight Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Subject Spotlight
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              This week's focus: Mathematics Mastery
            </p>
          </div>
          <div className="glass geo-chamfer p-8 md:p-12 border border-primary/20 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"/>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
              <div>
                <motion.div
                  animate={{ boxShadow: ['0 0 0px rgba(245, 158, 11, 0)', '0 0 30px rgba(245, 158, 11, 0.4)', '0 0 0px rgba(245, 158, 11, 0)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/30 text-primary text-sm mb-6 border border-primary/30"
                >
                  <Icon name="book" className="w-4 h-4" />
                  Mathematics
                </motion.div>
                <h3 className="text-3xl font-bold text-text-primary mb-4">
                  Master the Fundamentals
                </h3>
                <p className="text-text-secondary mb-8 text-lg">
                  From algebra to calculus, our structured approach helps you build strong foundations. Practice with past questions and get instant feedback.
                </p>
                <div className="flex gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 geo-chamfer bg-primary/20 flex items-center justify-center text-primary">
                      <Icon name="fileText" className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="terminal-value">500+</div>
                      <div className="terminal-label text-xs">Questions</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 geo-chamfer bg-gold/20 flex items-center justify-center text-gold-500">
                      <Icon name="users" className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="terminal-value">2,000+</div>
                      <div className="terminal-label text-xs">Students</div>
                    </div>
                  </div>
                </div>
                <Link
                  to="/onboarding/role"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-primary/25"
                >
                  Start Learning
                  <Icon name="arrowRight" className="w-4 h-4" />
                </Link>
              </div>
              <div className="glass geo-chamfer p-8 relative shadow-2xl">
                {/* Lined paper effect */}
                <div className="absolute inset-0 opacity-5" style={{
                  backgroundImage: 'repeating-linear-gradient(transparent, transparent 19px, #6B7280 20px)',
                  backgroundSize: '100% 20px'
                }}></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-text-secondary text-sm font-medium">Sample Question</div>
                    <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">Algebra</div>
                  </div>
                  <div className="bg-deep/50 geo-chamfer-lg p-6 mb-6">
                    <div className="text-text-primary font-medium text-lg mb-4">
                      If x² - 5x + 6 = 0, find the values of x
                    </div>
                    <div className="space-y-3">
                      <motion.label
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-3 p-3 rounded-lg glass-light cursor-pointer hover:border-primary/40 transition-all"
                      >
                        <div className="w-5 h-5 rounded border-2 border-border hover:border-primary transition-colors"></div>
                        <span className="text-text-secondary">x = 2, x = 3</span>
                      </motion.label>
                      <motion.label
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-3 p-3 rounded-lg glass-light cursor-pointer hover:border-primary/40 transition-all"
                      >
                        <div className="w-5 h-5 rounded border-2 border-border hover:border-primary transition-colors"></div>
                        <span className="text-text-secondary">x = -2, x = -3</span>
                      </motion.label>
                      <motion.label
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-3 p-3 rounded-lg glass-light cursor-pointer hover:border-primary/40 transition-all"
                      >
                        <div className="w-5 h-5 rounded border-2 border-border hover:border-primary transition-colors"></div>
                        <span className="text-text-secondary">x = 1, x = 6</span>
                      </motion.label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-text-secondary">Difficulty: Medium</div>
                    <div className="flex items-center gap-1 text-success text-sm">
                      <Icon name="check" className="w-4 h-4" />
                      <span>Instant Feedback</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Success Quotes */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Success Stories
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Real students, real results
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Speech Bubble 1 */}
            <motion.div
              whileHover={{ y: -4 }}
              className="relative"
            >
              <div className="glass geo-chamfer p-8 relative shadow-lg">
                {/* Speech bubble tail */}
                <div className="absolute -bottom-3 left-8 w-6 h-6 glass transform rotate-45"></div>
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-400 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-primary/25">
                      <span className="font-bold text-lg">C</span>
                    </div>
                    <div>
                      <div className="font-semibold text-text-primary mb-1">Chidi</div>
                      <div className="text-sm text-text-secondary">SS3, Lagos</div>
                    </div>
                  </div>
                  <p className="text-text-primary text-lg leading-relaxed mb-4">
                    "My JAMB went from 220 to 290. The mock exams were exactly like the real thing."
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex text-gold-500">
                      <Icon name="star" className="w-4 h-4 fill-current" />
                      <Icon name="star" className="w-4 h-4 fill-current" />
                      <Icon name="star" className="w-4 h-4 fill-current" />
                      <Icon name="star" className="w-4 h-4 fill-current" />
                      <Icon name="star" className="w-4 h-4 fill-current" />
                    </div>
                    <span className="text-sm text-text-secondary">Score Improvement: +70</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 ml-8">
                <div className="terminal-label text-sm">JAMB Score</div>
                <div className="flex items-center gap-2">
                  <span className="text-text-secondary line-through">220</span>
                  <Icon name="arrowRight" className="w-4 h-4 text-success" />
                  <span className="terminal-value text-2xl text-success">290</span>
                </div>
              </div>
            </motion.div>
            {/* Speech Bubble 2 */}
            <motion.div
              whileHover={{ y: -4 }}
              className="relative"
            >
              <div className="glass geo-chamfer p-8 relative shadow-lg">
                {/* Speech bubble tail */}
                <div className="absolute -bottom-3 left-8 w-6 h-6 glass transform rotate-45"></div>
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-500 to-gold-300 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-gold/25">
                      <span className="font-bold text-lg">A</span>
                    </div>
                    <div>
                      <div className="font-semibold text-text-primary mb-1">Amaka</div>
                      <div className="text-sm text-text-secondary">SS2, Abuja</div>
                    </div>
                  </div>
                  <p className="text-text-primary text-lg leading-relaxed mb-4">
                    "I finally understood Physics through the detailed explanations and practice questions."
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex text-gold-500">
                      <Icon name="star" className="w-4 h-4 fill-current" />
                      <Icon name="star" className="w-4 h-4 fill-current" />
                      <Icon name="star" className="w-4 h-4 fill-current" />
                      <Icon name="star" className="w-4 h-4 fill-current" />
                      <Icon name="star" className="w-4 h-4 fill-current" />
                    </div>
                    <span className="text-sm text-text-secondary">Subject: Physics</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 ml-8">
                <div className="terminal-label text-sm">Physics Grade</div>
                <div className="flex items-center gap-2">
                  <span className="text-text-secondary line-through">C4</span>
                  <Icon name="arrowRight" className="w-4 h-4 text-success" />
                  <span className="terminal-value text-2xl text-success">A1</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Centres Card Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="bg-gradient-to-r from-primary to-gold geo-chamfer-lg p-8 md:p-12 relative overflow-hidden">
            {/* Animated Wave Effect */}
            <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
                <path
                  fill="rgba(255,255,255,0.1)"
                  d="M0,50 C240,80 480,20 720,50 C960,80 1200,20 1440,50 L1440,100 L0,100 Z"
                  className="animate-pulse"
                />
              </svg>
            </div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  For Tutorial Centres
                </h2>
                <p className="text-white/80 mb-8">
                  Transform your centre with powerful tools for exam management, student tracking, and performance analytics.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-white/90">
                    <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center">
                      <Icon name="check" className="w-3 h-3 text-white" />
                    </div>
                    <span>Create and manage exams with ease</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/90">
                    <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center">
                      <Icon name="check" className="w-3 h-3 text-white" />
                    </div>
                    <span>Track student performance in real-time</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/90">
                    <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center">
                      <Icon name="check" className="w-3 h-3 text-white" />
                    </div>
                    <span>Generate detailed reports for parents</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/90">
                    <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center">
                      <Icon name="check" className="w-3 h-3 text-white" />
                    </div>
                    <span>Access verified question banks</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/90">
                    <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center">
                      <Icon name="check" className="w-3 h-3 text-white" />
                    </div>
                    <span>Build your centre's reputation</span>
                  </div>
                </div>
                <Link
                  to="/centres/register"
                  className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-medium hover:bg-white/90 transition-all shadow-lg"
                >
                  Register Your Centre
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="glass geo-chamfer p-6"
                >
                  <div className="terminal-value text-3xl text-white mb-1">150+</div>
                  <div className="terminal-label text-sm text-white/70">Active Centres</div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="glass geo-chamfer p-6"
                >
                  <div className="terminal-value text-3xl text-white mb-1">50K+</div>
                  <div className="terminal-label text-sm text-white/70">Students Managed</div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="glass geo-chamfer p-6"
                >
                  <div className="terminal-value text-3xl text-white mb-1">85%</div>
                  <div className="terminal-label text-sm text-white/70">Score Improvement</div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="glass geo-chamfer p-6"
                >
                  <div className="terminal-value text-3xl text-white mb-1">24/7</div>
                  <div className="terminal-label text-sm text-white/70">Support</div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section — gradient accent */}
      <section className="py-24 gradient-accent relative">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Your Exam Success Story Starts Now
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto mb-8">
            Join thousands of Nigerian students already achieving their goals with ADJ EduQuest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/onboarding/role"
              className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-lg font-medium transition-all shadow-glow text-center hover-glow"
            >
              Start Learning Free
            </Link>
            <Link
              to="/centres"
              className="glass border border-white/10 text-text-primary px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-all text-center"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
