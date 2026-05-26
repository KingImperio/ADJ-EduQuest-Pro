import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from '../../components/Icon'
import { loadOnboardingData, saveOnboardingData } from '../../utils/onboardingStorage'
import type { UserRole } from '../../utils/onboardingStorage'
import { AuthLayout } from '../../components/ui/AuthLayout'
import { Button } from '../../components/ui/Button'

const roles = [
  {
    id: 'student' as UserRole,
    label: 'Student',
    tagline: 'Learn & Grow',
    description: 'Access quests, track progress, earn rewards as you master subjects.',
    icon: 'user',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'teacher' as UserRole,
    label: 'Teacher',
    tagline: 'Guide & Inspire',
    description: 'Create assignments, monitor performance, manage classroom leaderboards.',
    icon: 'users',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 'admin' as UserRole,
    label: 'Centre Admin',
    tagline: 'Lead & Manage',
    description: 'Oversee classes, manage curriculum, view institution analytics.',
    icon: 'building2',
    gradient: 'from-orange-500 to-red-600',
  },
]

export default function OnboardingStep1() {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)

  useEffect(() => {
    const data = loadOnboardingData()
    if (data.role) setSelectedRole(data.role)
  }, [])

  const handleSelect = (role: UserRole) => {
    setSelectedRole(role)
    saveOnboardingData({ role })
  }

  const handleContinue = () => {
    if (!selectedRole) return
    switch (selectedRole) {
      case 'student': navigate('/onboarding/student'); break
      case 'teacher': navigate('/onboarding/teacher'); break
      case 'admin': navigate('/onboarding/admin'); break
    }
  }

  return (
    <AuthLayout
      headline={<>Begin Your<span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-gold-400">Journey</span></>}
      subtitle="Join thousands of learners, educators, and institutions transforming education across Nigeria."
      stats={[
        { value: '10K+', label: 'Students' },
        { value: '1K+', label: 'Teachers' },
        { value: '50+', label: 'Centres' },
      ]}
      stepIndicator={{ current: 0, total: 3 }}
      footer={
        <p className="text-center text-sm text-text-muted font-body">
          Already have an account?{' '}
          <button onClick={() => navigate('/auth/signin')} className="text-primary-light hover:text-primary-300 font-medium transition-colors">
            Sign in
          </button>
        </p>
      }
    >
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-display">I am joining as...</h2>
        <p className="text-text-secondary font-body">Select your role to personalize your experience</p>
      </div>

      <div className="space-y-4 mb-8">
        {roles.map((role, index) => {
          const isSelected = selectedRole === role.id
          return (
            <motion.button
              key={role.id}
              onClick={() => handleSelect(role.id)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full relative overflow-hidden geo-chamfer p-5 text-left transition-all duration-300 ${
                isSelected
                  ? 'glass-strong border-2 border-primary/50 shadow-card'
                  : 'glass-light border-2 border-transparent hover:border-outline'
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="selection-indicator"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary-light"
                />
              )}

              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 geo-chamfer flex items-center justify-center transition-colors ${
                  isSelected ? `bg-gradient-to-br ${role.gradient} shadow-lg` : 'bg-raised'
                }`}>
                  <Icon name={role.icon as any} className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-text-muted'}`} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className={`font-semibold text-lg font-display ${isSelected ? 'text-white' : 'text-text-secondary'}`}>
                      {role.label}
                    </span>
                    {isSelected && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary-light font-body"
                      >
                        {role.tagline}
                      </motion.span>
                    )}
                  </div>
                  <p className={`text-sm mt-0.5 font-body ${isSelected ? 'text-text-secondary' : 'text-text-muted'}`}>
                    {role.description}
                  </p>
                </div>

                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected ? 'border-primary bg-primary' : 'border-border'
                }`}>
                  {isSelected && <Icon name="check" className="w-4 h-4 text-white" />}
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>

      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/')} className="px-6 py-3 rounded-lg text-text-muted hover:text-white transition-colors font-medium font-body">
          Back
        </button>
        <Button onClick={handleContinue} disabled={!selectedRole} className="flex-1">
          Continue
        </Button>
      </div>
    </AuthLayout>
  )
}
