import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from '../components/Icon'
import MarketingHeader from '../components/MarketingHeader'
import MarketingFooter from '../components/MarketingFooter'
import AnimatedGradientBackground from '../components/AnimatedGradientBackground'

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'What is ADJ EduQuest?',
    answer: 'ADJ EduQuest is a comprehensive educational platform designed for Nigerian students, teachers, and tutorial centres. We provide smart exam systems, verified courses, gamified learning, and analytics to help students achieve academic excellence.',
    category: 'General'
  },
  {
    id: '2',
    question: 'How much does it cost to use ADJ EduQuest?',
    answer: 'We offer a free tier with basic features. Premium plans start at ₦2,500/month for students, ₦5,000/month for teachers, and ₦25,000/month for tutorial centres. All paid plans include a 7-day free trial.',
    category: 'Pricing'
  },
  {
    id: '3',
    question: 'Can I change my plan later?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we prorate the difference for upgrades.',
    category: 'Pricing'
  },
  {
    id: '4',
    question: 'What subjects and exam boards do you cover?',
    answer: 'We cover all major Nigerian subjects including Mathematics, English, Sciences, and Humanities. Our content aligns with WAEC, NECO, JAMB, and other national examination standards.',
    category: 'Content'
  },
  {
    id: '5',
    question: 'How does the smart exam system work?',
    answer: 'Our AI-powered exam system adapts to your skill level, generating questions that match your current abilities. It provides instant feedback, detailed explanations, and tracks your progress over time to identify areas for improvement.',
    category: 'Features'
  },
  {
    id: '6',
    question: 'Can I use ADJ EduQuest offline?',
    answer: 'Yes, Premium and Pro plans include offline mode. You can download courses, practice exams, and study materials to access without an internet connection.',
    category: 'Features'
  },
  {
    id: '7',
    question: 'How do teachers create content on the platform?',
    answer: 'Teachers can create video lessons, notes, practice questions, and assessments using our intuitive content creation tools. Content can be shared with students, sold on our marketplace, or used within their own tutorial centres.',
    category: 'Teachers'
  },
  {
    id: '8',
    question: 'What features do tutorial centres get?',
    answer: 'Tutorial centres get student management, teacher onboarding, bulk enrollment, comprehensive analytics, marketing tools, and white-label options. The Growth and Premium plans include advanced features like API access and custom integrations.',
    category: 'Centres'
  },
  {
    id: '9',
    question: 'How do I verify my teaching credentials?',
    answer: 'Teachers can upload their credentials during sign-up. Our team reviews and verifies qualifications within 2-3 business days. Verified teachers receive a badge and access to premium features.',
    category: 'Teachers'
  },
  {
    id: '10',
    question: 'What payment methods do you accept?',
    answer: 'We accept bank transfers, card payments (Visa, Mastercard), and mobile money. For enterprise customers, we offer invoice-based billing and custom payment terms.',
    category: 'Pricing'
  },
  {
    id: '11',
    question: 'Is my data secure on ADJ EduQuest?',
    answer: 'Absolutely. We use industry-standard encryption, secure servers, and comply with data protection regulations. Your personal information and academic data are never shared with third parties without your consent.',
    category: 'Privacy'
  },
  {
    id: '12',
    question: 'How do I contact support?',
    answer: 'You can reach our support team via email at support@eduquest.adj, phone at +234 800 123 4567, or through the contact form on our website. Premium users get priority support with faster response times.',
    category: 'Support'
  }
]

const categories = ['All', 'General', 'Pricing', 'Features', 'Content', 'Teachers', 'Centres', 'Privacy', 'Support']

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)

  const filteredFAQs = selectedCategory === 'All'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory)

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id)
  }

  const categoryColors: Record<string, { bg: string; text: string; border: string; icon: string }> = {
    'All': { bg: 'bg-primary', text: 'text-primary', border: 'border-primary', icon: 'target' },
    'General': { bg: 'bg-gold', text: 'text-gold', border: 'border-gold', icon: 'sparkles' },
    'Pricing': { bg: 'bg-coral', text: 'text-coral', border: 'border-coral', icon: 'coins' },
    'Features': { bg: 'bg-success', text: 'text-success', border: 'border-success', icon: 'checkCircle' },
    'Content': { bg: 'bg-primary', text: 'text-primary', border: 'border-primary', icon: 'bookOpen' },
    'Teachers': { bg: 'bg-gold', text: 'text-gold', border: 'border-gold', icon: 'graduationCap' },
    'Centres': { bg: 'bg-coral', text: 'text-coral', border: 'border-coral', icon: 'building2' },
    'Privacy': { bg: 'bg-success', text: 'text-success', border: 'border-success', icon: 'shield' },
    'Support': { bg: 'bg-primary', text: 'text-primary', border: 'border-primary', icon: 'mail' }
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-7xl mx-auto text-center"
        >
          <span className="inline-block px-3 py-1.5 bg-success/10 border border-success/20 text-success text-sm rounded-full mb-4">
            Help Center
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Frequently Asked <span className="bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">Questions</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-8">
            Find answers to common questions about ADJ EduQuest
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => {
              const colors = categoryColors[category]
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 flex items-center gap-2 ${
                    selectedCategory === category
                      ? `${colors.bg} text-white shadow-glow`
                      : `bg-surface text-text-secondary hover:${colors.text} hover:${colors.border} border border-border`
                  }`}
                >
                  <Icon name={colors.icon as any} className="w-4 h-4" />
                  {category}
                </button>
              )
            })}
          </div>
        </motion.div>
      </section>

      {/* FAQ List */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {filteredFAQs.map((faq, idx) => {
              const catColors = categoryColors[faq.category] || categoryColors['All']
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className={`glass-light overflow-hidden hover:border-opacity-50 transition-all ${expandedFAQ === faq.id ? 'border-opacity-80' : ''}`}
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs ${catColors.text} bg-raised px-2 py-1 rounded-full flex items-center gap-1`}>
                          <Icon name={catColors.icon as any} className="w-3 h-3" />
                          {faq.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-text-primary">{faq.question}</h3>
                    </div>
                    <Icon
                      name="chevronRight"
                      className={`w-5 h-5 ${catColors.text} transition-transform ${
                        expandedFAQ === faq.id ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {expandedFAQ === faq.id && (
                    <div className="px-6 pb-6 pt-0 border-t border-border/50">
                      <p className="text-text-secondary">{faq.answer}</p>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-primary/20 via-gold-500/10 to-coral/20 geo-chamfer-lg p-8 md:p-12 text-center border border-success/30 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 rounded-full blur-[60px]" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-success/20 rounded-full blur-[60px]" />

            <div className="relative">
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Still Have Questions?
              </h2>
              <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                Can't find what you're looking for? Our support team is here to help
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="group px-8 py-3 bg-success hover:bg-success-hover text-white rounded-lg font-medium transition-all shadow-glow flex items-center justify-center gap-2"
                >
                  <Icon name="mail" className="w-4 h-4" />
                  Contact Support
                </Link>
                <Link
                  to="/how-it-works"
                  className="px-8 py-3 border border-border hover:border-gold text-text-primary hover:text-gold rounded-lg font-medium transition-colors"
                >
                  Learn More
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
