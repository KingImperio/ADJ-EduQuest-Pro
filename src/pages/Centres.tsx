import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon, IconName } from '../components/Icon'
import MarketingHeader from '../components/MarketingHeader'
import MarketingFooter from '../components/MarketingFooter'
import AnimatedGradientBackground from '../components/AnimatedGradientBackground'
import ScrollReveal from '../components/ui/ScrollReveal'

interface CentreBenefit {
  icon: IconName
  title: string
  description: string
}

interface Testimonial {
  name: string
  role: string
  centre: string
  content: string
  metrics: string
}

const benefits: CentreBenefit[] = [
  {
    icon: 'chartBar',
    title: 'Track Every Student',
    description: 'Monitor individual and class performance with real-time analytics'
  },
  {
    icon: 'user',
    title: 'Manage Teachers',
    description: 'Onboard staff, assign subjects, and track teaching effectiveness'
  },
  {
    icon: 'bookOpen',
    title: 'Publish Content',
    description: 'Share verified courses and materials with your students'
  },
  {
    icon: 'coins',
    title: 'Increase Revenue',
    description: 'Monetize your content and grow your teaching business'
  },
  {
    icon: 'globe',
    title: 'Expand Reach',
    description: 'Connect with students beyond your physical location'
  },
  {
    icon: 'award',
    title: 'Build Reputation',
    description: 'Showcase success stories and attract more students'
  }
]

const testimonials: Testimonial[] = [
  {
    name: 'Chinedu Okafor',
    role: 'Centre Director',
    centre: 'Excel Tutorials, Lagos',
    content: 'ADJ EduQuest transformed how we manage our students. The analytics alone helped us improve our JAMB pass rate by 40%.',
    metrics: '40% improvement in pass rate'
  },
  {
    name: 'Amina Ibrahim',
    role: 'Principal',
    centre: 'Peak Academy, Abuja',
    content: 'The platform is intuitive and powerful. Our teachers love the content creation tools, and students engage more with gamified learning.',
    metrics: '200+ active students'
  },
  {
    name: 'Emeka Nwosu',
    role: 'Owner',
    centre: 'Success Prep, Port Harcourt',
    content: 'We scaled from 50 to 500 students in 6 months. The bulk enrollment and cohort management features are game-changers.',
    metrics: '10x growth in 6 months'
  }
]

export default function Centres() {
  const [formData, setFormData] = useState({
    centreName: '',
    email: '',
    phone: '',
    location: '',
    studentCount: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.centreName.trim()) {
      newErrors.centreName = 'Centre name is required'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required'
    }

    if (!formData.studentCount) {
      newErrors.studentCount = 'Student count is required'
    } else if (isNaN(Number(formData.studentCount)) || Number(formData.studentCount) < 1) {
      newErrors.studentCount = 'Please enter a valid number'
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setError('Please fix the errors above')
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.1) {
            reject(new Error('Network error. Please try again.'))
          } else {
            resolve(undefined)
          }
        }, 1500)
      })

      setIsSubmitted(true)
      setSuccessMessage('Request submitted successfully! Our team will contact you within 24 hours.')
    } catch (err: any) {
      setError(err.message || 'Failed to submit request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-deep">
        <div className="w-full max-w-md bg-surface geo-chamfer-lg shadow-ambient border border-border p-8 text-center">
          <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="checkCircle" className="w-8 h-8 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-4">Request Submitted!</h1>
          <p className="text-text-secondary mb-8">
            Our team will contact you within 24 hours to discuss how ADJ EduQuest can help your centre succeed.
          </p>
          <Link
            to="/"
            className="block w-full py-3 bg-primary hover:bg-primary-600 text-white geo-chamfer transition-colors font-medium"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
                <span className="bg-gradient-to-r from-primary via-gold to-coral bg-clip-text text-transparent">Empower Your</span>
                <br />
                <span className="bg-gradient-to-r from-coral via-purple to-primary bg-clip-text text-transparent">Tutorial Centre</span>
              </h1>
              <p className="text-text-secondary text-lg mb-8 font-body">
                Complete management platform for tutorial centres. Track students, manage teachers, and grow your business with data-driven insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/onboarding/role" 
                  className="px-8 py-3 bg-gradient-to-r from-primary to-gold hover:from-primary-hover hover:to-gold text-white rounded-lg font-heading font-medium transition-all duration-300 text-center shadow-gold hover:shadow-lg"
                >
                  Start Free Trial
                </Link>
                <Link 
                  to="/pricing" 
                  className="px-8 py-3 bg-gradient-to-r from-coral/20 to-purple/20 border border-coral/50 hover:border-coral text-coral rounded-lg font-heading font-medium transition-all duration-300 text-center"
                >
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-surface via-surface to-primary/5 border border-border geo-chamfer-lg p-8 shadow-ambient hover-lift">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold font-heading bg-gradient-to-br from-primary to-gold bg-clip-text text-transparent mb-2">500+</div>
                  <div className="text-text-secondary text-sm font-body">Centres</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold font-heading bg-gradient-to-br from-gold to-coral bg-clip-text text-transparent mb-2">50K+</div>
                  <div className="text-text-secondary text-sm font-body">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold font-heading bg-gradient-to-br from-coral to-purple bg-clip-text text-transparent mb-2">40%</div>
                  <div className="text-text-secondary text-sm font-body">Avg. Improvement</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold font-heading bg-gradient-to-br from-purple to-success bg-clip-text text-transparent mb-2">98%</div>
                  <div className="text-text-secondary text-sm font-body">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-gradient-to-r from-coral/20 via-gold-500/10 to-primary/20 rounded-2xl p-8 md:p-12 relative overflow-hidden hover-glow">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 rounded-full blur-[60px]" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-coral/20 rounded-full blur-[60px]" />

            <div className="relative">
              <h2 className="text-3xl font-bold font-heading mb-4">
                Ready to Transform Your <span className="text-coral">Tutorial Centre</span>?
              </h2>
              <p className="text-text-secondary mb-8 max-w-2xl mx-auto font-body">
                Join hundreds of tutorial centres already using ADJ EduQuest to deliver better results
              </p>
              <Link
                to="/onboarding/role"
                className="group inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-coral via-gold to-primary hover:from-coral-hover hover:via-gold/90 hover:to-primary/90 text-white rounded-lg font-heading font-medium transition-all duration-300 shadow-coral hover:shadow-lg"
              >
                Get Started Today
                <Icon name="arrowRight" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 relative">
        <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm border-y border-border" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1.5 bg-gold/10 border border-gold/20 text-gold text-sm rounded-full mb-4 font-heading">
              For Centres
            </span>
            <h2 className="text-3xl font-bold font-heading">
              Why Tutorial Centres <span className="text-gold">Choose Us</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const colorSets = [
                { border: 'border-primary/50', iconBg: 'bg-gradient-to-br from-primary/30 to-primary/10', text: 'text-text-primary' },
                { border: 'border-gold/50', iconBg: 'bg-gradient-to-br from-gold/30 to-gold/10', text: 'text-gold' },
                { border: 'border-coral/50', iconBg: 'bg-gradient-to-br from-coral/30 to-coral/10', text: 'text-coral' },
                { border: 'border-purple/50', iconBg: 'bg-gradient-to-br from-purple-500/30 to-purple-500/10', text: 'text-purple-400' },
                { border: 'border-success/50', iconBg: 'bg-gradient-to-br from-success/30 to-success/10', text: 'text-success' },
                { border: 'border-pink-400/50', iconBg: 'bg-gradient-to-br from-pink-500/30 to-pink-500/10', text: 'text-pink-400' }
              ]
              const colors = colorSets[index % colorSets.length]
              return (
                <ScrollReveal key={index} delay={index * 80}>
                  <div
                    className={`glass-light rounded-xl p-6 hover-lift hover:shadow-lg transition-all duration-300`}
                  >
                    <div className={`w-12 h-12 ${colors.iconBg} geo-chamfer flex items-center justify-center mb-4`}>
                      <Icon name={benefit.icon} className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <h3 className={`text-lg font-semibold ${colors.text} mb-2 font-heading`}>{benefit.title}</h3>
                    <p className="text-text-secondary text-sm font-body">{benefit.description}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 relative">
        <div className="absolute inset-0 bg-surface/60 backdrop-blur-sm" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1.5 bg-coral/10 border border-coral/20 text-coral text-sm rounded-full mb-4 font-heading">
              Success Stories
            </span>
            <h2 className="text-3xl font-bold font-heading">
              Stories from <span className="text-coral">Partner Centres</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => {
              const accentColors = [
                { gradient: 'from-primary via-gold to-coral', bg: 'bg-primary/20', text: 'text-text-primary', metricBg: 'bg-gradient-to-r from-primary/20 to-gold/20' },
                { gradient: 'from-coral via-purple to-pink', bg: 'bg-coral/20', text: 'text-coral', metricBg: 'bg-gradient-to-r from-coral/20 to-purple/20' },
                { gradient: 'from-success via-primary to-gold', bg: 'bg-success/20', text: 'text-success', metricBg: 'bg-gradient-to-r from-success/20 to-primary/20' }
              ]
              const accent = accentColors[index % accentColors.length]
              return (
                <ScrollReveal key={index} delay={index * 80}>
                  <div
                    className="glass-light rounded-xl p-6 hover-lift hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 ${accent.bg} rounded-full flex items-center justify-center bg-gradient-to-br ${accent.gradient} bg-opacity-20`}>
                        <Icon name="user" className={`w-6 h-6 ${accent.text}`} />
                      </div>
                      <div>
                        <h3 className={`font-semibold ${accent.text} font-heading`}>{testimonial.name}</h3>
                        <p className="text-text-secondary text-sm font-body">{testimonial.role}</p>
                        <p className="text-text-secondary text-xs font-body">{testimonial.centre}</p>
                      </div>
                    </div>
                    <p className="text-text-secondary text-sm mb-4 font-body">{testimonial.content}</p>
                    <div className={`text-xs ${accent.text} font-medium ${accent.metricBg} px-2 py-1 geo-chamfer inline-block font-heading`}>{testimonial.metrics}</div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-6 py-16 relative z-10">
        <div className="absolute inset-0 bg-surface/90 backdrop-blur-sm" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="glass geo-chamfer p-8 md:p-12 shadow-2xl">
            <h2 className="text-3xl font-bold text-text-primary text-center mb-4 font-heading">
              Ready to Transform Your Centre?
            </h2>
            <p className="text-text-secondary text-center mb-8 font-body">
              Fill out the form below and our team will reach out to discuss your needs
            </p>

            {/* Success Message */}
            {successMessage && (
              <div className="mb-6 p-4 bg-success/20 border border-success/50 geo-chamfer">
                <p className="text-success flex items-center gap-2">
                  <Icon name="checkCircle" className="w-5 h-5" />
                  {successMessage}
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-error/20 border border-error/50 geo-chamfer">
                <p className="text-error flex items-center gap-2">
                  <Icon name="x" className="w-5 h-5" />
                  {error}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Centre Name
                  </label>
                  <input
                    type="text"
                    name="centreName"
                    value={formData.centreName}
                    onChange={handleInputChange}
                    className="w-full bg-deepest border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-primary/5 transition-all"
                    placeholder="Excel Tutorials"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-deepest border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-primary/5 transition-all"
                    placeholder="contact@excel.eduquest.adj"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-deepest border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-primary/5 transition-all"
                    placeholder="+234 800 000 0000"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full bg-deepest border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-primary/5 transition-all"
                    placeholder="Lagos, Nigeria"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Number of Students
                </label>
                <select
                  name="studentCount"
                  value={formData.studentCount}
                  onChange={handleSelectChange}
                  className="w-full bg-deepest border border-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-primary/5 transition-all"
                  required
                >
                  <option value="">Select range</option>
                  <option value="1-50">1-50 students</option>
                  <option value="51-100">51-100 students</option>
                  <option value="101-500">101-500 students</option>
                  <option value="500+">500+ students</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-deepest border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-primary/5 transition-all resize-none"
                  placeholder="Tell us about your centre's needs..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-primary via-gold to-coral hover:from-primary-hover hover:via-gold/90 hover:to-coral/90 text-white rounded-lg font-heading font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Request'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
