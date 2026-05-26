import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon, IconName } from '../components/Icon'
import MarketingHeader from '../components/MarketingHeader'
import MarketingFooter from '../components/MarketingFooter'
import AnimatedGradientBackground from '../components/AnimatedGradientBackground'

interface Step {
  id: number
  title: string
  description: string
  icon: IconName
  details: string[]
}

const studentSteps: Step[] = [
  {
    id: 1,
    title: 'Create Your Profile',
    description: 'Sign up as a student and build your academic profile',
    icon: 'user',
    details: ['Select your subjects and exam boards', 'Set your learning goals', 'Choose your study preferences']
  },
  {
    id: 2,
    title: 'Explore Courses',
    description: 'Browse our verified course library and start learning',
    icon: 'bookOpen',
    details: ['Access expert-verified content', 'Watch video lessons', 'Read comprehensive notes']
  },
  {
    id: 3,
    title: 'Practice with Smart Exams',
    description: 'Take adaptive exams that match your skill level',
    icon: 'target',
    details: ['AI-powered question generation', 'Instant feedback and explanations', 'Track your progress over time']
  },
  {
    id: 4,
    title: 'Earn Rewards',
    description: 'Complete quests and earn XP, badges, and achievements',
    icon: 'trophy',
    details: ['Daily quests and challenges', 'Compete on leaderboards', 'Unlock exclusive content']
  },
  {
    id: 5,
    title: 'Track Progress',
    description: 'Monitor your improvement with detailed analytics',
    icon: 'chartBar',
    details: ['Performance insights', 'Weakness identification', 'Personalized recommendations']
  }
]

const teacherSteps: Step[] = [
  {
    id: 1,
    title: 'Set Up Your Profile',
    description: 'Create your teacher account and verify credentials',
    icon: 'user',
    details: ['Upload teaching credentials', 'Specify subjects and expertise', 'Set availability']
  },
  {
    id: 2,
    title: 'Create Content',
    description: 'Build courses, exams, and study materials',
    icon: 'edit',
    details: ['Video lessons and notes', 'Practice questions', 'Assessment materials']
  },
  {
    id: 3,
    title: 'Engage Students',
    description: 'Connect with students and provide guidance',
    icon: 'graduationCap',
    details: ['Live sessions and Q&A', 'Personalized feedback', 'Progress tracking']
  },
  {
    id: 4,
    title: 'Manage Classes',
    description: 'Organize students and track class performance',
    icon: 'layers',
    details: ['Class rosters', 'Grade management', 'Attendance tracking']
  },
  {
    id: 5,
    title: 'Earn Revenue',
    description: 'Monetize your content and expertise',
    icon: 'coins',
    details: ['Course sales', 'Premium tutoring', 'Content licensing']
  }
]

const centreSteps: Step[] = [
  {
    id: 1,
    title: 'Register Your Centre',
    description: 'Sign up as a tutorial centre and verify business',
    icon: 'building2',
    details: ['Business verification', 'Centre profile setup', 'Staff onboarding']
  },
  {
    id: 2,
    title: 'Onboard Teachers',
    description: 'Add your teachers and create teaching teams',
    icon: 'user',
    details: ['Teacher accounts', 'Subject assignments', 'Performance tracking']
  },
  {
    id: 3,
    title: 'Enroll Students',
    description: 'Bulk enroll students and manage cohorts',
    icon: 'user',
    details: ['Bulk enrollment', 'Cohort management', 'Progress monitoring']
  },
  {
    id: 4,
    title: 'Track Performance',
    description: 'Monitor centre-wide performance and analytics',
    icon: 'chartBar',
    details: ['Student performance', 'Teacher effectiveness', 'Centre metrics']
  },
  {
    id: 5,
    title: 'Scale Operations',
    description: 'Grow your centre with our platform tools',
    icon: 'arrowRight',
    details: ['Marketing tools', 'Automated workflows', 'Revenue optimization']
  }
]

export default function HowItWorks() {
  const [userType, setUserType] = useState<'student' | 'teacher' | 'centre'>('student')

  const steps = userType === 'student' ? studentSteps : userType === 'teacher' ? teacherSteps : centreSteps

  const userTypeColors = {
    student: { bg: 'bg-primary', hover: 'hover:bg-primary-hover', shadow: 'shadow-glow', icon: 'text-primary', gradient: 'from-primary to-primary-hover' },
    teacher: { bg: 'bg-gold', hover: 'hover:bg-gold-hover', shadow: 'shadow-gold', icon: 'text-gold', gradient: 'from-gold to-gold-hover' },
    centre: { bg: 'bg-coral', hover: 'hover:bg-coral-hover', shadow: 'shadow-coral', icon: 'text-coral', gradient: 'from-coral to-coral-hover' }
  }

  const currentColors = userTypeColors[userType]

  return (
    <div className="min-h-screen bg-deep relative">
      <AnimatedGradientBackground />
      <MarketingHeader />

      {/* Hero Section with Aurora */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-deep">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(at 0% 0%, rgba(30, 63, 204, 0.15) 0px, transparent 50%),
                radial-gradient(at 100% 0%, rgba(245, 158, 11, 0.1) 0px, transparent 50%),
                radial-gradient(at 50% 100%, rgba(74, 29, 150, 0.15) 0px, transparent 50%)
              `,
              backgroundColor: '#0f1117'
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-7xl mx-auto text-center"
        >
          <span className="inline-block px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary text-sm rounded-full mb-4">
            Simple Process
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            How ADJ EduQuest <span className="bg-gradient-to-r from-primary-light to-gold bg-clip-text text-transparent">Works</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-8">
            Simple steps to transform your learning or teaching experience
          </p>

          {/* User Type Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setUserType('student')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all hover:scale-105 ${
                userType === 'student'
                  ? 'bg-primary text-white shadow-glow'
                  : 'bg-surface text-text-secondary hover:text-primary border border-border hover:border-primary'
              }`}
            >
              <span className="flex items-center gap-2 text-sm sm:text-base">
                <Icon name="user" className="w-4 h-4 sm:w-5 sm:h-5" />
                For Students
              </span>
            </button>
            <button
              onClick={() => setUserType('teacher')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all hover:scale-105 ${
                userType === 'teacher'
                  ? 'bg-gold text-deep shadow-gold'
                  : 'bg-surface text-text-secondary hover:text-gold border border-border hover:border-gold'
              }`}
            >
              <span className="flex items-center gap-2 text-sm sm:text-base">
                <Icon name="graduationCap" className="w-4 h-4 sm:w-5 sm:h-5" />
                For Teachers
              </span>
            </button>
            <button
              onClick={() => setUserType('centre')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all hover:scale-105 ${
                userType === 'centre'
                  ? 'bg-coral text-white shadow-coral'
                  : 'bg-surface text-text-secondary hover:text-coral border border-border hover:border-coral'
              }`}
            >
              <span className="flex items-center gap-2 text-sm sm:text-base">
                <Icon name="building2" className="w-4 h-4 sm:w-5 sm:h-5" />
                For Centres
              </span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Steps Timeline */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line with gradient based on user type */}
            <div className={`absolute left-5 sm:left-6 top-0 bottom-0 w-0.5 hidden md:block bg-gradient-to-b ${currentColors.gradient}`} />

            {steps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative mb-12 last:mb-0"
              >
                {/* Step Number */}
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 ${currentColors.bg} rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base ${currentColors.shadow} transition-all hover:scale-110`}>
                      {step.id}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className={`flex-1 glass-light rounded-xl p-4 sm:p-6 hover:border-opacity-50 transition-all hover-lift group min-w-0`}>
                    <div className="flex items-start gap-3 sm:gap-4 mb-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-raised geo-chamfer flex items-center justify-center group-hover:${currentColors.bg}/20 transition-colors flex-shrink-0`}>
                        <Icon name={step.icon} className={`w-5 h-5 sm:w-6 sm:h-6 ${currentColors.icon}`} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-1 sm:mb-2">{step.title}</h3>
                        <p className="text-text-secondary text-sm sm:text-base">{step.description}</p>
                      </div>
                    </div>

                    {/* Step Details */}
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center gap-2 text-sm text-text-secondary">
                          <Icon name="checkCircle" className={`w-4 h-4 ${currentColors.icon} shrink-0`} />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
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
          <div className={`bg-gradient-to-r from-${userType === 'student' ? 'primary' : userType === 'teacher' ? 'gold' : 'coral'}/20 via-gold-500/10 to-${userType === 'student' ? 'coral' : userType === 'teacher' ? 'primary' : 'gold'}/20 rounded-2xl p-8 md:p-12 text-center border border-${userType === 'student' ? 'primary' : userType === 'teacher' ? 'gold' : 'coral'}/30 relative overflow-hidden hover-glow`}>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 rounded-full blur-[60px]" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px]" />

            <div className="relative">
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                Join thousands of {userType === 'student' ? 'students' : userType === 'teacher' ? 'teachers' : 'tutorial centres'} already using ADJ EduQuest
              </p>
              <Link
                to="/onboarding/role"
                className={`group inline-flex items-center gap-2 px-8 py-3 ${currentColors.bg} hover:${currentColors.hover} text-white geo-chamfer font-medium transition-all ${currentColors.shadow} hover:shadow-[0_0_30px_rgba(45,82,232,0.5)]`}
              >
                Create Your Account
                <Icon name="arrowRight" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <MarketingFooter />
    </div>
  )
}
