import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon, IconName } from '../components/Icon'
import MarketingHeader from '../components/MarketingHeader'
import MarketingFooter from '../components/MarketingFooter'
import AnimatedGradientBackground from '../components/AnimatedGradientBackground'

interface TeamMember {
  name: string
  role: string
  image: string
  bio: string
}

interface Value {
  icon: IconName
  title: string
  description: string
  color: string // hex color
  bgColor: string // rgba string
  borderColor: string // rgba string
  hoverBorder: string // hex color
}

const teamMembers: TeamMember[] = [
  {
    name: 'Olamilekan Ajasa',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    bio: 'Former educator with 15+ years experience in Nigerian education system'
  },
  {
    name: 'Chiamaka Okafor',
    role: 'CTO & Co-Founder',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    bio: 'Tech innovator passionate about democratizing quality education'
  },
  {
    name: 'Emeka Nwosu',
    role: 'Head of Content',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    bio: 'Expert curriculum developer with focus on Nigerian exam standards'
  },
  {
    name: 'Fatima Ibrahim',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    bio: 'Operations specialist ensuring seamless platform experience'
  }
]

const values: Value[] = [
  {
    icon: 'checkCircle',
    title: 'Excellence',
    description: 'We strive for the highest quality in everything we do',
    color: '#1e3fcc',
    bgColor: 'rgba(30, 63, 204, 0.2)',
    borderColor: 'rgba(30, 63, 204, 0.3)',
    hoverBorder: '#1e3fcc'
  },
  {
    icon: 'users',
    title: 'Community',
    description: 'Building a supportive learning ecosystem for all',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.2)',
    borderColor: 'rgba(245, 158, 11, 0.3)',
    hoverBorder: '#f59e0b'
  },
  {
    icon: 'sparkles',
    title: 'Innovation',
    description: 'Constantly improving with technology and feedback',
    color: '#f4622a',
    bgColor: 'rgba(244, 98, 42, 0.2)',
    borderColor: 'rgba(244, 98, 42, 0.3)',
    hoverBorder: '#f4622a'
  },
  {
    icon: 'shield',
    title: 'Integrity',
    description: 'Transparent, honest, and ethical in all our dealings',
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.2)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    hoverBorder: '#10b981'
  }
]

const milestones = [
  { year: '2020', event: 'Founded in Lagos' },
  { year: '2021', event: '10,000 students reached' },
  { year: '2022', event: 'Launched teacher platform' },
  { year: '2023', event: '50,000 active users' },
  { year: '2024', event: '500+ partner centres' },
  { year: '2025', event: 'AI-powered tutoring launched' },
  { year: '2026', event: '100,000 students milestone' }
]

export default function About() {
  return (
    <div className="min-h-screen bg-deep relative z-0">
      <AnimatedGradientBackground />
      <MarketingHeader />

      {/* Hero Section with Aurora */}
      <section className="relative pt-32 pb-6 px-6 overflow-hidden">
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
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            About <span className="bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">ADJ EduQuest</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-8">
            Empowering Nigerian students to achieve academic excellence through innovative technology and expert-verified content
          </p>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="px-6 py-4 bg-deep relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="glass-light geo-chamfer-sm p-6 text-center transition-all hover-lift hover:shadow-lg"
              >
                <div
                  className="w-12 h-12 geo-chamfer-sm flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: value.bgColor }}
                >
                  <Icon name={value.icon} className={`w-6 h-6`} style={{ color: value.color }} />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: value.color }}>{value.title}</h3>
                <p className="text-text-secondary text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 py-12 bg-deep relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Our Mission</h2>
              <p className="text-text-secondary mb-6">
                To democratize access to quality education in Nigeria by providing affordable, accessible, and effective learning tools that help every student reach their full potential.
              </p>
              <p className="text-text-secondary">
                We believe that every student deserves access to the best educational resources, regardless of their location or background. Our platform bridges the gap between traditional learning and modern technology.
              </p>
            </div>
            <div className="glass geo-chamfer-sm p-8">
              <h3 className="text-xl font-semibold text-primary mb-4">Our Vision</h3>
              <p className="text-text-secondary mb-6">
                To become the leading educational technology platform in Africa, serving millions of students and transforming how education is delivered and consumed.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-raised geo-chamfer-sm">
                  <div className="text-2xl font-bold text-primary mb-1">50K+</div>
                  <div className="text-text-secondary text-sm">Active Students</div>
                </div>
                <div className="text-center p-4 bg-raised geo-chamfer-sm">
                  <div className="text-2xl font-bold text-primary mb-1">500+</div>
                  <div className="text-text-secondary text-sm">Partner Centres</div>
                </div>
                <div className="text-center p-4 bg-raised geo-chamfer-sm">
                  <div className="text-2xl font-bold text-primary mb-1">40%</div>
                  <div className="text-text-secondary text-sm">Avg. Improvement</div>
                </div>
                <div className="text-center p-4 bg-raised geo-chamfer-sm">
                  <div className="text-2xl font-bold text-primary mb-1">98%</div>
                  <div className="text-text-secondary text-sm">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="px-6 py-16 bg-surface/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-center justify-center md:justify-start">
                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-deep" />
                  <div className={`bg-surface border border-border geo-chamfer-sm p-6 w-full md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'}`}>
                    <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                    <div className="text-text-secondary">{milestone.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 py-16 bg-deep relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="glass-light geo-chamfer-sm p-6 text-center hover:border-primary/40 transition-colors">
                <img 
                  src={member.image} 
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-primary mb-1">{member.name}</h3>
                <p className="text-primary text-sm mb-3">{member.role}</p>
                <p className="text-text-secondary text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-gradient-to-r from-primary/20 via-gold-500/10 to-coral/20 geo-chamfer-lg p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 rounded-full blur-[60px]" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px]" />

            <div className="relative">
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Join Our <span className="text-gold">Mission</span>
              </h2>
              <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                Be part of the educational revolution in Nigeria. Together, we can help every student achieve their academic dreams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/onboarding/role"
                  className="group px-8 py-3 bg-primary hover:bg-primary-hover text-white geo-chamfer-sm font-medium transition-all shadow-glow flex items-center justify-center gap-2"
                >
                  Get Started
                  <Icon name="arrowRight" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-3 border border-border hover:border-gold text-text-primary hover:text-gold geo-chamfer-sm font-medium transition-colors"
                >
                  Contact Us
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
