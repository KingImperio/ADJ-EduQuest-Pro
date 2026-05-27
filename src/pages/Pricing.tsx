import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from '../components/Icon'
import { textColors, borderColors } from '../utils/colorClasses'
import MarketingHeader from '../components/MarketingHeader'
import MarketingFooter from '../components/MarketingFooter'
import AnimatedGradientBackground from '../components/AnimatedGradientBackground'
import ScrollReveal from '../components/ui/ScrollReveal'
import GlassCard from '../components/ui/GlassCard'
import SectionHeading from '../components/ui/SectionHeading'

interface Plan {
  id: string
  name: string
  price: string
  period: string
  description: string
  features: string[]
  popular?: boolean
  cta: string
}

const studentPlans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '₦0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Access to basic courses',
      '5 practice exams per month',
      'Basic progress tracking',
      'Community forum access',
      'Mobile app access'
    ],
    cta: 'Get Started Free'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₦2,500',
    period: 'per month',
    description: 'Most popular for serious students',
    features: [
      'Everything in Free',
      'Unlimited practice exams',
      'AI-powered recommendations',
      'Detailed analytics dashboard',
      'Priority support',
      'Offline mode',
      'Exclusive content access'
    ],
    popular: true,
    cta: 'Start Premium Trial'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₦7,500',
    period: 'per month',
    description: 'Maximum features for top performers',
    features: [
      'Everything in Premium',
      '1-on-1 tutoring sessions',
      'Personalized study plans',
      'Exam preparation coaching',
      'Career guidance',
      'Certificate of completion',
      'Early access to new features'
    ],
    cta: 'Go Pro'
  }
]

const teacherPlans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '₦5,000',
    period: 'per month',
    description: 'For individual teachers',
    features: [
      'Up to 50 students',
      'Basic course creation',
      'Exam builder',
      'Student progress tracking',
      'Content sharing'
    ],
    cta: 'Start Teaching'
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '₦15,000',
    period: 'per month',
    description: 'For growing teaching businesses',
    features: [
      'Up to 200 students',
      'Advanced course creation',
      'Live session hosting',
      'Analytics dashboard',
      'Custom branding',
      'Payment processing'
    ],
    popular: true,
    cta: 'Go Professional'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'For large institutions',
    features: [
      'Unlimited students',
      'White-label solution',
      'API access',
      'Dedicated support',
      'Custom integrations',
      'Training & onboarding'
    ],
    cta: 'Contact Sales'
  }
]

const centrePlans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: '₦25,000',
    period: 'per month',
    description: 'For small tutorial centres',
    features: [
      'Up to 100 students',
      '5 teacher accounts',
      'Basic analytics',
      'Content management',
      'Parent portal'
    ],
    cta: 'Start Basic'
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '₦75,000',
    period: 'per month',
    description: 'For growing centres',
    features: [
      'Up to 500 students',
      '20 teacher accounts',
      'Advanced analytics',
      'Marketing tools',
      'Automated workflows',
      'Custom branding'
    ],
    popular: true,
    cta: 'Scale Up'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₦200,000',
    period: 'per month',
    description: 'For established centres',
    features: [
      'Unlimited students',
      'Unlimited teachers',
      'Full analytics suite',
      'White-label solution',
      'API access',
      'Priority support',
      'Custom integrations'
    ],
    cta: 'Go Premium'
  }
]

export default function Pricing() {
  const [userType, setUserType] = useState<'student' | 'teacher' | 'centre'>('student')
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const plans = userType === 'student' ? studentPlans : userType === 'teacher' ? teacherPlans : centrePlans

  const userTypeColors = {
    student: { bg: 'bg-primary', hover: 'hover:bg-primary-hover', border: 'border-primary', shadow: 'shadow-glow', text: 'text-primary' },
    teacher: { bg: 'bg-gold', hover: 'hover:bg-gold-hover', border: 'border-gold', shadow: 'shadow-gold', text: 'text-gold' },
    centre: { bg: 'bg-coral', hover: 'hover:bg-coral-hover', border: 'border-coral', shadow: 'shadow-coral', text: 'text-coral' }
  }

  const colors = userTypeColors[userType]

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
          <span className="inline-block px-3 py-1.5 bg-gold/10 border border-gold/20 text-gold text-sm rounded-full mb-4">
            Flexible Plans
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Simple, Transparent <span className="bg-gradient-to-r from-gold to-coral bg-clip-text text-transparent">Pricing</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-8">
            Choose the plan that fits your needs. No hidden fees, cancel anytime.
          </p>

          {/* User Type Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setUserType('student')}
              className={`px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 ${
                userType === 'student'
                  ? 'bg-primary text-white shadow-glow'
                  : 'bg-surface text-text-secondary hover:text-primary border border-border hover:border-primary'
              }`}
            >
              <span className="flex items-center gap-2">
                <Icon name="user" className="w-5 h-5" />
                For Students
              </span>
            </button>
            <button
              onClick={() => setUserType('teacher')}
              className={`px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 ${
                userType === 'teacher'
                  ? 'bg-gold text-deep shadow-gold'
                  : 'bg-surface text-text-secondary hover:text-gold border border-border hover:border-gold'
              }`}
            >
              <span className="flex items-center gap-2">
                <Icon name="graduationCap" className="w-5 h-5" />
                For Teachers
              </span>
            </button>
            <button
              onClick={() => setUserType('centre')}
              className={`px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 ${
                userType === 'centre'
                  ? 'bg-coral text-white shadow-coral'
                  : 'bg-surface text-text-secondary hover:text-coral border border-border hover:border-coral'
              }`}
            >
              <span className="flex items-center gap-2">
                <Icon name="building2" className="w-5 h-5" />
                For Centres
              </span>
            </button>
          </div>

          {/* Billing Period Toggle */}
          {userType === 'student' && (
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm ${billingPeriod === 'monthly' ? 'text-primary' : 'text-text-secondary'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  billingPeriod === 'yearly' ? 'bg-primary' : 'bg-raised'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`text-sm ${billingPeriod === 'yearly' ? 'text-primary' : 'text-text-secondary'}`}>
                Yearly <span className="text-gold-500">(Save 20%)</span>
              </span>
            </div>
          )}
        </motion.div>
      </section>

      {/* Pricing Cards — ScrollReveal + GlassCard */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, idx) => {
              const planAccents = ['primary' as const, 'gold' as const, 'coral' as const]
              const accent = planAccents[idx]
              return (
                <ScrollReveal key={plan.id} delay={idx * 100} direction="up">
                  <GlassCard
                    variant="glass-light"
                    accent={accent}
                    hoverLift
                    glow={plan.popular}
                    chamfer
                    className={`p-6 relative ${plan.popular ? 'scale-105' : ''}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className={`${colors.bg} text-white text-xs font-medium px-3 py-1 rounded-full`}>
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold text-text-primary mb-2">{plan.name}</h3>
                      <p className="text-text-secondary text-sm mb-4">{plan.description}</p>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className={`terminal-value text-3xl ${plan.popular ? colors.text : textColors[accent] || 'text-primary'}`}>{plan.price}</span>
                        <span className="terminal-label text-sm">/{plan.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-text-secondary">
                          <Icon name="checkCircle" className={`w-4 h-4 ${plan.popular ? colors.text : textColors[accent] || 'text-primary'} shrink-0 mt-0.5`} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/onboarding/role"
                      className={`group block w-full py-3 rounded-lg font-medium text-center transition-all ${
                        plan.popular
                          ? `${colors.bg} ${colors.hover} text-white ${colors.shadow}`
                          : `bg-transparent border border-border hover:${borderColors[accent] || 'hover:border-primary'} ${textColors[accent] || 'text-primary'}`
                      }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {plan.cta}
                        {plan.popular && <Icon name="arrowRight" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                      </span>
                    </Link>
                  </GlassCard>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section — ScrollReveal */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title={<>Frequently Asked <span className={colors.text}>Questions</span></>}
          />
          <div className="space-y-4">
            {[
              { q: 'Can I change my plan later?', a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.', icon: 'arrowRight' },
              { q: 'Is there a free trial?', a: 'Yes, all paid plans come with a 7-day free trial. No credit card required.', icon: 'sparkles' },
              { q: 'What payment methods do you accept?', a: 'We accept bank transfers, card payments, and mobile money. Contact us for enterprise billing options.', icon: 'creditCard' }
            ].map((faq, idx) => (
              <ScrollReveal key={idx} delay={idx * 100} direction="left">
                <div className="glass-light rounded-xl p-6 hover:border-opacity-80 transition-all hover-lift">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 geo-chamfer flex items-center justify-center ${idx === 1 ? 'bg-gold/20' : idx === 2 ? 'bg-coral/20' : 'bg-primary/20'}`}>
                      <Icon name={faq.icon as any} className={`w-4 h-4 ${idx === 1 ? 'text-gold' : idx === 2 ? 'text-coral' : 'text-primary'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-2">{faq.q}</h3>
                      <p className="text-text-secondary text-sm">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
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
          <div className={`bg-gradient-to-r ${colors.bg.replace('bg-', 'from-')}/20 via-gold-500/10 to-coral/20 rounded-2xl p-8 md:p-12 text-center border border-${colors.text.replace('text-', '')}/30 relative overflow-hidden hover-glow`}>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 rounded-full blur-[60px]" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px]" />

            <div className="relative">
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Not Sure Which Plan to Choose?
              </h2>
              <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                Our team can help you find the perfect plan for your needs
              </p>
              <Link
                to="/contact"
                className={`group inline-flex items-center gap-2 px-8 py-3 ${colors.bg} ${colors.hover} text-white geo-chamfer font-medium transition-all ${colors.shadow}`}
              >
                Contact Us
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
