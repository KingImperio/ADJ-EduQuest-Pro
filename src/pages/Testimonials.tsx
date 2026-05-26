import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from '../components/Icon'
import MarketingHeader from '../components/MarketingHeader'
import MarketingFooter from '../components/MarketingFooter'
import AnimatedGradientBackground from '../components/AnimatedGradientBackground'

interface Testimonial {
  id: string
  name: string
  role: string
  image: string
  quote: string
  metrics: {
    label: string
    value: string
  }[]
  category: 'student' | 'teacher' | 'centre'
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Adaeze Nwankwo',
    role: 'JAMB Candidate',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
    quote: 'ADJ EduQuest helped me score 290 in JAMB! The practice exams were exactly like the real thing, and the analytics showed me exactly what to focus on. I got into my dream university.',
    metrics: [
      { label: 'JAMB Score', value: '290/400' },
      { label: 'Improvement', value: '+40 points' },
      { label: 'Study Time', value: '3 months' }
    ],
    category: 'student'
  },
  {
    id: '2',
    name: 'Chinedu Okafor',
    role: 'Centre Director, Excel Tutorials',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    quote: 'Our centre\'s WAEC pass rate jumped from 65% to 92% in just one year. The platform gives us real insights into student performance and helps us target weak areas effectively.',
    metrics: [
      { label: 'Pass Rate', value: '92%' },
      { label: 'Students', value: '200+' },
      { label: 'Growth', value: '+27%' }
    ],
    category: 'centre'
  },
  {
    id: '3',
    name: 'Fatima Ibrahim',
    role: 'Mathematics Teacher',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    quote: 'I\'ve been teaching for 10 years, and ADJ EduQuest has transformed how I work. I can create content once and reach hundreds of students. The income from course sales has doubled my earnings.',
    metrics: [
      { label: 'Students Reached', value: '500+' },
      { label: 'Course Sales', value: '₦150K/month' },
      { label: 'Rating', value: '4.9/5' }
    ],
    category: 'teacher'
  },
  {
    id: '4',
    name: 'Emeka Nwosu',
    role: 'SS3 Student',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
    quote: 'I was struggling with Physics until I found ADJ EduQuest. The video lessons broke down complex topics into simple concepts. I went from failing to getting an A in my WAEC.',
    metrics: [
      { label: 'Physics Grade', value: 'A1' },
      { label: 'Overall Score', value: '8 A\'s' },
      { label: 'Time Spent', value: '4 months' }
    ],
    category: 'student'
  },
  {
    id: '5',
    name: 'Amina Yusuf',
    role: 'Principal, Peak Academy',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    quote: 'Managing 300 students was overwhelming before ADJ EduQuest. Now I can track everyone\'s progress, assign teachers effectively, and communicate with parents. It\'s like having an extra admin team.',
    metrics: [
      { label: 'Students', value: '300+' },
      { label: 'Teachers', value: '15' },
      { label: 'Efficiency', value: '+60%' }
    ],
    category: 'centre'
  },
  {
    id: '6',
    name: 'Oluwaseun Adeyemi',
    role: 'Chemistry Teacher',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    quote: 'The gamification features keep my students engaged like never before. They compete for XP and badges while learning. Their test scores have improved dramatically since we started using the platform.',
    metrics: [
      { label: 'Engagement', value: '85%' },
      { label: 'Avg Score', value: '+25%' },
      { label: 'Active Users', value: '150' }
    ],
    category: 'teacher'
  }
]

const categories = ['All', 'Students', 'Teachers', 'Centres']

export default function Testimonials() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredTestimonials = selectedCategory === 'All'
    ? testimonials
    : testimonials.filter(t => {
        if (selectedCategory === 'Students') return t.category === 'student'
        if (selectedCategory === 'Teachers') return t.category === 'teacher'
        if (selectedCategory === 'Centres') return t.category === 'centre'
        return true
      })

  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    'All': { bg: 'bg-primary', text: 'text-primary', border: 'border-primary' },
    'Students': { bg: 'bg-gold', text: 'text-gold', border: 'border-gold' },
    'Teachers': { bg: 'bg-coral', text: 'text-coral', border: 'border-coral' },
    'Centres': { bg: 'bg-success', text: 'text-success', border: 'border-success' }
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
          <span className="inline-block px-3 py-1.5 bg-coral/10 border border-coral/20 text-coral text-sm rounded-full mb-4">
            Real Results
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Success <span className="bg-gradient-to-r from-primary to-coral bg-clip-text text-transparent">Stories</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-8">
            See how students, teachers, and centres are achieving their goals with ADJ EduQuest
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => {
              const colors = categoryColors[category]
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                    selectedCategory === category
                      ? `${colors.bg} text-white shadow-glow`
                      : `bg-surface text-text-secondary hover:${colors.text} hover:${colors.border} border border-border`
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '50K+', label: 'Active Students', color: 'text-primary' },
              { value: '500+', label: 'Partner Centres', color: 'text-gold' },
              { value: '40%', label: 'Avg. Improvement', color: 'text-coral' },
              { value: '98%', label: 'Satisfaction', color: 'text-success' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-light geo-chamfer p-6 text-center hover:border-opacity-80 transition-all"
              >
                <div className={`terminal-value text-3xl mb-2 ${stat.color}`}>{stat.value}</div>
                <div className="terminal-label text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map((testimonial, idx) => {
              const accentColors = [
                { border: 'hover:border-primary', icon: 'text-primary' },
                { border: 'hover:border-gold', icon: 'text-gold' },
                { border: 'hover:border-coral', icon: 'text-coral' }
              ]
              const colors = accentColors[idx % accentColors.length]
              return (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`glass-light geo-chamfer p-6 ${colors.border}/50 transition-all hover:-translate-y-1`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      loading="lazy"
                      decoding="async"
                      className="w-14 h-14 rounded-full object-cover border-2 border-border"
                    />
                    <div>
                      <h3 className="font-semibold text-text-primary">{testimonial.name}</h3>
                      <p className="text-text-secondary text-sm">{testimonial.role}</p>
                    </div>
                  </div>

                  <p className="text-text-secondary text-sm mb-6 italic">"{testimonial.quote}"</p>

                  <div className="space-y-2 border-t border-border/50 pt-4">
                    {testimonial.metrics.map((metric, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-text-secondary">{metric.label}</span>
                        <span className={`${colors.icon} font-medium`}>{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
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
          <div className="bg-gradient-to-r from-primary/20 via-gold-500/10 to-coral/20 geo-chamfer-lg p-8 md:p-12 text-center border border-primary/30 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 rounded-full blur-[60px]" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-coral/20 rounded-full blur-[60px]" />

            <div className="relative">
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Ready to Write Your Success Story?
              </h2>
              <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                Join thousands of students, teachers, and centres already achieving their goals with ADJ EduQuest
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/onboarding/role"
                  className="group px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-all shadow-glow hover:shadow-[0_0_30px_rgba(45,82,232,0.5)] flex items-center justify-center gap-2"
                >
                  Start Your Journey
                  <Icon name="arrowRight" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/how-it-works"
                  className="px-8 py-3 border border-border hover:border-gold text-text-primary hover:text-gold rounded-lg font-medium transition-colors"
                >
                  Learn How
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
