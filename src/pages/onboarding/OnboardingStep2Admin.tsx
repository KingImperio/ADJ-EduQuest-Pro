import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from '../../components/Icon'
import { loadOnboardingData, saveOnboardingData } from '../../utils/onboardingStorage'
import { AuthLayout } from '../../components/ui/AuthLayout'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

const nigerianStates = [
  'Abia', 'Abuja (FCT)', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
  'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
  'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
  'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
]

export default function OnboardingStep2Admin() {
  const navigate = useNavigate()
  const [centreName, setCentreName] = useState('')
  const [state, setState] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [studentCount, setStudentCount] = useState('')

  useEffect(() => {
    const data = loadOnboardingData()
    if (data.adminDetails) {
      setCentreName(data.adminDetails.centreName || '')
      setState(data.adminDetails.state || '')
      setEmail(data.adminDetails.email || '')
      setPhone(data.adminDetails.phone || '')
      setStudentCount(data.adminDetails.studentCount || '')
    }
  }, [])

  const saveData = (updates: object) => {
    const data = loadOnboardingData()
    saveOnboardingData({ adminDetails: { ...data.adminDetails, ...updates } })
  }

  const canProceed = centreName && state && email && phone

  return (
    <AuthLayout
      headline={<>Centre<span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Management</span></>}
      subtitle="Register your learning centre and join the network of educational institutions transforming learning."
      stats={[
        { value: '500+', label: 'Centres' },
        { value: '2K+', label: 'Admins' },
        { value: '24/7', label: 'Support' },
      ]}
      stepIndicator={{ current: 1, total: 3 }}
      footer={
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/onboarding/role')} className="px-6 py-3 geo-chamfer-sm text-text-muted hover:text-white transition-colors font-medium font-body">
            Back
          </button>
          <Button variant="danger" onClick={() => { if (canProceed) navigate('/onboarding/evaluation') }} disabled={!canProceed} className="flex-1">
            Continue
          </Button>
        </div>
      }
    >
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-display">Register Your Centre</h2>
        <p className="text-text-secondary font-body">Tell us about your learning institution</p>
      </div>

      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); if (canProceed) navigate('/onboarding/evaluation') }}>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <Input
            label="Centre Name"
            type="text"
            value={centreName}
            onChange={(e) => { setCentreName(e.target.value); saveData({ centreName: e.target.value }) }}
            placeholder="e.g., Excellence Tutorial Centre"
            icon={<Icon name="building2" className="w-5 h-5" />}
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <label className="block text-sm font-medium text-text-secondary mb-2 font-body">State Location</label>
          <div className="relative">
            <select
              value={state}
              onChange={(e) => { setState(e.target.value); saveData({ state: e.target.value }) }}
              className="w-full bg-deepest border-2 border-border geo-chamfer-sm py-3 pl-4 pr-10 text-text-primary focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer font-body"
            >
              <option value="" disabled className="bg-raised">Select your state</option>
              {nigerianStates.map(s => (
                <option key={s} value={s} className="bg-deep">{s}</option>
              ))}
            </select>
            <Icon name="chevronDown" className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <Input
            label="Official Email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); saveData({ email: e.target.value }) }}
            placeholder="admin@yourcentre.com"
            icon={<Icon name="mail" className="w-5 h-5" />}
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <Input
            label="Contact Phone"
            type="tel"
            value={phone}
            onChange={(e) => { setPhone(e.target.value); saveData({ phone: e.target.value }) }}
            placeholder="+234 800 000 0000"
            icon={<Icon name="phone" className="w-5 h-5" />}
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <Input
            label="Estimated Student Count"
            type="number"
            value={studentCount}
            onChange={(e) => { setStudentCount(e.target.value); saveData({ studentCount: e.target.value }) }}
            placeholder="e.g., 150"
            icon={<Icon name="users" className="w-5 h-5" />}
          />
          <p className="text-xs text-text-muted mt-1 font-body">Optional</p>
        </motion.div>
      </form>
    </AuthLayout>
  )
}
