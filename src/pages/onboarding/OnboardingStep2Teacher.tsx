import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '../../components/Icon'
import { loadOnboardingData, saveOnboardingData } from '../../utils/onboardingStorage'
import { AuthLayout } from '../../components/ui/AuthLayout'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

export default function OnboardingStep2Teacher() {
  const navigate = useNavigate()
  const [hasInviteCode, setHasInviteCode] = useState<boolean | null>(null)
  const [inviteCode, setInviteCode] = useState('')
  const [showJoinOption, setShowJoinOption] = useState(false)

  useEffect(() => {
    const data = loadOnboardingData()
    if (data.teacherDetails) {
      setHasInviteCode(data.teacherDetails.hasInviteCode)
      setInviteCode(data.teacherDetails.inviteCode)
      setShowJoinOption(!data.teacherDetails.hasInviteCode && data.teacherDetails.hasInviteCode !== null)
    }
  }, [])

  const handleInviteChoice = (hasCode: boolean) => {
    setHasInviteCode(hasCode)
    setShowJoinOption(!hasCode)
    const data = loadOnboardingData()
    saveOnboardingData({
      teacherDetails: { ...data.teacherDetails, hasInviteCode: hasCode, inviteCode: hasCode ? inviteCode : '' }
    })
  }

  const handleInviteCodeChange = (value: string) => {
    setInviteCode(value)
    const data = loadOnboardingData()
    saveOnboardingData({ teacherDetails: { ...data.teacherDetails, inviteCode: value } })
  }

  const handleContinue = () => navigate('/onboarding/subjects')

  const handleIndependentTeacher = () => {
    const data = loadOnboardingData()
    saveOnboardingData({
      teacherDetails: { ...data.teacherDetails, hasInviteCode: false, inviteCode: '', centreName: 'Independent' }
    })
    navigate('/onboarding/subjects')
  }

  const canProceed = hasInviteCode === false || (hasInviteCode === true && inviteCode.length > 0)

  return (
    <AuthLayout
      headline={<>Teacher<span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Portal</span></>}
      subtitle="Connect with your learning centre or join as an independent educator."
      stats={[
        { value: '500+', label: 'Centres' },
        { value: '50K+', label: 'Students' },
        { value: '24/7', label: 'Support' },
      ]}
      stepIndicator={{ current: 1, total: 3 }}
      footer={
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/onboarding/role')} className="px-6 py-3 rounded-lg text-text-muted hover:text-white transition-colors font-medium font-body">
            Back
          </button>
          <Button onClick={handleContinue} disabled={!canProceed} className="flex-1">
            Continue
          </Button>
        </div>
      }
    >
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-display">Centre Connection</h2>
        <p className="text-text-secondary font-body">Link to your learning centre or continue as an independent tutor</p>
      </div>

      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); if (canProceed) handleContinue() }}>
        {/* Have Code Question */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <label className="block text-sm font-medium text-text-secondary mb-3 font-body">Do you have a centre invite code?</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleInviteChoice(true)}
              className={`py-4 px-4 rounded-lg text-center transition-all font-body ${
                hasInviteCode === true
                  ? 'bg-amber-500/20 border-2 border-amber-500/50 text-amber-400'
                  : 'bg-surface/50 border-2 border-border hover:border-outline text-text-muted'
              }`}
            >
              <Icon name="checkCircle" className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Yes, I have one</span>
            </button>
            <button
              type="button"
              onClick={() => handleInviteChoice(false)}
              className={`py-4 px-4 rounded-lg text-center transition-all font-body ${
                hasInviteCode === false
                  ? 'bg-orange-500/20 border-2 border-orange-500/50 text-orange-400'
                  : 'bg-surface/50 border-2 border-border hover:border-outline text-text-muted'
              }`}
            >
              <Icon name="x" className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">No, I don't</span>
            </button>
          </div>
        </motion.div>

        {/* Invite Code Input */}
        <AnimatePresence>
          {hasInviteCode === true && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
              <Input
                label="Enter Invite Code"
                type="text"
                value={inviteCode}
                onChange={(e) => handleInviteCodeChange(e.target.value.toUpperCase())}
                placeholder="EQ-CENTRE-001"
                icon={<Icon name="lock" className="w-5 h-5" />}
                className="uppercase tracking-wider"
              />
              <p className="text-sm text-text-muted mt-2 font-body">Ask your centre admin for an invite code</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Code Options */}
        <AnimatePresence>
          {showJoinOption && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="space-y-3">
              <label className="block text-sm font-medium text-text-secondary font-body">What would you like to do?</label>

              <button
                type="button"
                onClick={() => navigate('/onboarding/subjects')}
                className="w-full p-4 rounded-lg bg-surface/50 border-2 border-border hover:border-orange-500/30 transition-all text-left flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                  <Icon name="building2" className="w-6 h-6 text-orange-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white font-display">Find a Centre</p>
                  <p className="text-sm text-text-muted font-body">Browse and apply to join existing EduQuest centres</p>
                </div>
                <Icon name="chevronRight" className="w-5 h-5 text-border group-hover:text-orange-400 transition-colors" />
              </button>

              <button
                type="button"
                onClick={handleIndependentTeacher}
                className="w-full p-4 rounded-lg bg-surface/50 border-2 border-border hover:border-primary/30 transition-all text-left flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <Icon name="graduationCap" className="w-6 h-6 text-primary-light" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white font-display">Independent Tutor</p>
                  <p className="text-sm text-text-muted font-body">Continue as a solo educator without a centre</p>
                </div>
                <Icon name="chevronRight" className="w-5 h-5 text-border group-hover:text-primary-light transition-colors" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </AuthLayout>
  )
}
