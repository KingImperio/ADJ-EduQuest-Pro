import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '../../components/Icon'
import { loadOnboardingData } from '../../utils/onboardingStorage'
import { generateAdminKey, getNextCentreNumber } from '../../utils/idGenerator'
import { useConfetti } from '../../components/MicroInteractions'
import { AuthLayout } from '../../components/ui/AuthLayout'
import { Button } from '../../components/ui/Button'

export default function AdminEvaluation() {
  const navigate = useNavigate()
  const [adminKey, setAdminKey] = useState('')
  const [copied, setCopied] = useState(false)
  const { burst, ConfettiComponent } = useConfetti()

  useEffect(() => {
    const data = loadOnboardingData()
    const state = data.adminDetails?.state || 'Lagos'
    const centreNumber = getNextCentreNumber()
    const key = generateAdminKey(state, centreNumber)
    setAdminKey(key)
    // Fire confetti immediately
    burst()
  }, [])

  const handleCopyKey = () => {
    navigator.clipboard.writeText(adminKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <AuthLayout
        headline={<>Preliminary<span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-500">Approval</span></>}
        subtitle="Your centre has passed initial evaluation."
        stepIndicator={{ current: 2, total: 3 }}
        footer={
          <Button variant="danger" className="w-full" onClick={() => navigate('/onboarding/subjects')} icon={<Icon name="arrowRight" className="w-5 h-5" />}>
            Complete Registration
          </Button>
        }
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/20 flex items-center justify-center"
          >
            <Icon name="checkCircle" className="w-10 h-10 text-success" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2 font-display">Evaluation Complete</h2>
          <p className="text-text-secondary font-body">Here is your unique Admin Key:</p>
        </motion.div>

        {/* Admin Key Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass border-2 border-coral p-6 mb-6 relative group cursor-pointer"
          onClick={handleCopyKey}
        >
          <div className="flex items-center justify-between gap-4">
            <code className="font-mono text-lg text-coral tracking-wider">{adminKey}</code>
            <button
              onClick={(e) => { e.stopPropagation(); handleCopyKey() }}
              className={`p-3 rounded-lg transition-colors ${copied ? 'bg-success/20 text-success' : 'bg-raised text-text-muted hover:text-coral group-hover:bg-coral/10'}`}
            >
              <Icon name={copied ? 'check' : 'copy'} className="w-5 h-5" />
            </button>
          </div>
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-success font-body"
              >
                Copied to clipboard!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Important Notice */}
        <div className="bg-gold/10 border border-gold/30 geo-chamfer p-4">
          <div className="flex items-start gap-3">
            <Icon name="bell" className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
            <p className="text-sm text-text-secondary text-left font-body">
              <span className="text-gold font-medium">Important:</span> A second round of evaluation will be scheduled and communicated via email.
              Please save your Admin Key securely as it will be required for account activation.
            </p>
          </div>
        </div>
      </AuthLayout>
      <ConfettiComponent />
    </>
  )
}
