import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon, IconName } from '../components/Icon'
import MarketingHeader from '../components/MarketingHeader'
import MarketingFooter from '../components/MarketingFooter'
import AnimatedGradientBackground from '../components/AnimatedGradientBackground'

interface ContactInfo {
  icon: IconName
  title: string
  details: string[]
}

const contactInfo: ContactInfo[] = [
  {
    icon: 'mail',
    title: 'Email',
    details: ['support@eduquest.adj', 'partnerships@eduquest.adj']
  },
  {
    icon: 'phone',
    title: 'Phone',
    details: ['+234 800 123 4567', '+234 800 987 6543']
  },
  {
    icon: 'mapPin',
    title: 'Office',
    details: ['123 Education Way, Lagos', 'Nigeria']
  }
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }

    if (!formData.subject) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
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
          // Simulate random failure for demo
          if (Math.random() < 0.1) {
            reject(new Error('Network error. Please try again.'))
          } else {
            resolve(undefined)
          }
        }, 1500)
      })

      setIsSubmitted(true)
      setSuccessMessage('Message sent successfully! We\'ll get back to you within 24 hours.')
    } catch (err: any) {
      setError(err.message || 'Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-deep">
        <div className="w-full max-w-md glass geo-chamfer shadow-ambient border border-success/30 p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-success/30 to-success/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-success/30">
            <Icon name="checkCircle" className="w-8 h-8 text-success" />
          </div>
          <h1 className="text-2xl font-bold font-heading bg-gradient-to-r from-success via-gold to-coral bg-clip-text text-transparent mb-4">Message Sent!</h1>
          <p className="text-text-secondary mb-8 font-body">
            Thank you for reaching out. Our team will get back to you within 24 hours.
          </p>
          <Link
            to="/"
            className="block w-full py-3 bg-gradient-to-r from-primary via-gold to-coral hover:from-primary-hover hover:via-gold/90 hover:to-coral/90 text-white geo-chamfer font-heading font-medium transition-all duration-300 shadow-lg"
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

      <div className="relative z-10">
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
            <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-success/20 to-primary/20 border border-success/50 text-success text-sm rounded-full mb-4 font-heading">
              We're Here to Help
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              <span className="bg-gradient-to-r from-success via-gold to-coral bg-clip-text text-transparent">Get in Touch</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-8 font-body">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </section>

        {/* Contact Content */}
        <section className="px-6 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-text-primary mb-6">Contact Information</h2>
                {contactInfo.map((info, index) => {
                  const colorSets = [
                    { bg: 'bg-primary/20', text: 'text-text-primary', border: 'border-primary/50', iconBg: 'bg-gradient-to-br from-primary/30 to-primary/10' },
                    { bg: 'bg-gold/20', text: 'text-gold', border: 'border-gold/50', iconBg: 'bg-gradient-to-br from-gold/30 to-gold/10' },
                    { bg: 'bg-coral/20', text: 'text-coral', border: 'border-coral/50', iconBg: 'bg-gradient-to-br from-coral/30 to-coral/10' }
                  ]
                  const color = colorSets[index % colorSets.length]
                  return (
                    <div key={index} className={`glass-light geo-chamfer p-6`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 ${color.iconBg} geo-chamfer flex items-center justify-center`}>
                          <Icon name={info.icon} className={`w-5 h-5 ${color.text}`} />
                        </div>
                        <h3 className={`font-semibold ${color.text} font-heading`}>{info.title}</h3>
                      </div>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-text-secondary font-body">{detail}</p>
                      ))}
                    </div>
                  )
                })}
                <div className="glass-light geo-chamfer p-6">
                  <h3 className="font-semibold text-text-primary mb-3">Business Hours</h3>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>

                <div className="glass-light geo-chamfer p-6">
                  <h3 className="font-semibold text-text-primary mb-3">Follow Us</h3>
                  <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/5 geo-chamfer flex items-center justify-center hover:from-primary/40 hover:to-primary/20 transition-all border border-primary/30">
                      <Icon name="globe" className="w-5 h-5 text-text-primary" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-gradient-to-br from-gold/20 to-gold/5 geo-chamfer flex items-center justify-center hover:from-gold/40 hover:to-gold/20 transition-all border border-gold/30">
                      <Icon name="mail" className="w-5 h-5 text-gold" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-gradient-to-br from-coral/20 to-coral/5 geo-chamfer flex items-center justify-center hover:from-coral/40 hover:to-coral/20 transition-all border border-coral/30">
                      <Icon name="user" className="w-5 h-5 text-coral" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="glass geo-chamfer p-8">
                  <h2 className="text-2xl font-bold text-text-primary mb-6">Send us a Message</h2>

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
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-deepest border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-primary/5 transition-all"
                          placeholder="John Doe"
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
                          className="w-full bg-deepest border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-primary/5 transition-all"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full bg-deepest border border-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-primary/5 transition-all"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full bg-deepest border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-primary/5 transition-all resize-none"
                        placeholder="How can we help you?"
                        required
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
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Link */}
        <section className="px-6 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-surface border border-border geo-chamfer-lg p-8 text-center">
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                Have a quick question?
              </h2>
              <p className="text-text-secondary mb-6">
                Check out our FAQ section for answers to common questions
              </p>
              <Link 
                to="/faq"
                className="inline-block px-6 py-2 bg-transparent border border-border hover:border-primary text-text-primary geo-chamfer font-medium transition-colors"
              >
                View FAQ
              </Link>
            </div>
          </div>
        </section>

        <MarketingFooter />
      </div>
    </div>
  )
}
