import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from '../../components/Icon'
import { loadOnboardingData, saveOnboardingData } from '../../utils/onboardingStorage'
import { AuthLayout } from '../../components/ui/AuthLayout'
import { Button } from '../../components/ui/Button'

const classLevels = [
  { group: 'Senior Secondary', options: ['SS3', 'SS2', 'SS1'] },
  { group: 'Junior Secondary', options: ['JSS3', 'JSS2', 'JSS1'] },
]

const departments = [
  { id: 'science', name: 'Science', icon: 'flask', color: 'from-blue-500 to-cyan-500' },
  { id: 'arts', name: 'Arts', icon: 'palette', color: 'from-purple-500 to-pink-500' },
  { id: 'commercial', name: 'Commercial', icon: 'trendingUp', color: 'from-green-500 to-emerald-500' },
  { id: 'general', name: 'General', icon: 'school', color: 'from-orange-500 to-amber-500' },
]

const targetExams = [
  { id: 'waec', name: 'WAEC' },
  { id: 'jamb', name: 'JAMB' },
  { id: 'neco', name: 'NECO' },
  { id: 'gce', name: 'GCE' },
]

export default function OnboardingStep2Student() {
  const navigate = useNavigate()
  const [classLevel, setClassLevel] = useState('')
  const [department, setDepartment] = useState('')
  const [selectedExams, setSelectedExams] = useState<string[]>([])

  useEffect(() => {
    const data = loadOnboardingData()
    if (data.studentDetails) {
      setClassLevel(data.studentDetails.classLevel || '')
      setDepartment(data.studentDetails.department || '')
      setSelectedExams(data.studentDetails.targetExams || [])
    }
  }, [])

  const saveData = (updates: object) => {
    const data = loadOnboardingData()
    saveOnboardingData({ studentDetails: { ...data.studentDetails, ...updates } })
  }

  const handleClassChange = (value: string) => {
    setClassLevel(value)
    saveData({ classLevel: value })
  }

  const handleDepartmentSelect = (deptId: string) => {
    setDepartment(deptId)
    saveData({ department: deptId })
  }

  const handleExamToggle = (examId: string) => {
    const newExams = selectedExams.includes(examId)
      ? selectedExams.filter(e => e !== examId)
      : [...selectedExams, examId]
    setSelectedExams(newExams)
    saveData({ targetExams: newExams })
  }

  const canProceed = classLevel && department

  return (
    <AuthLayout
      headline={<>Student<span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-400">Profile</span></>}
      subtitle="Tell us about your academic journey so we can personalize your learning experience."
      stats={[
        { value: '9', label: 'Subjects' },
        { value: '4', label: 'Exams' },
        { value: '\u221E', label: 'Quests' },
      ]}
      stepIndicator={{ current: 1, total: 3 }}
      footer={
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/onboarding/role')} className="px-6 py-3 geo-chamfer-sm text-text-muted hover:text-white transition-colors font-medium font-body">
            Back
          </button>
          <Button onClick={() => { if (canProceed) navigate('/onboarding/subjects') }} disabled={!canProceed} className="flex-1">
            Continue
          </Button>
        </div>
      }
    >
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-display">Academic Details</h2>
        <p className="text-text-secondary font-body">Help us understand your educational background</p>
      </div>

      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); if (canProceed) navigate('/onboarding/subjects') }}>
        {/* Class Level */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <label className="block text-sm font-medium text-text-secondary mb-2 font-body">Current Class Level</label>
          <div className="relative">
            <select
              value={classLevel}
              onChange={(e) => handleClassChange(e.target.value)}
              className="w-full bg-deepest border-2 border-border geo-chamfer-sm py-3 px-4 text-text-primary focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer font-body"
            >
              <option value="" disabled>Select your class</option>
              {classLevels.map(group => (
                <optgroup key={group.group} label={group.group} className="bg-raised">
                  {group.options.map(option => (
                    <option key={option} value={option} className="bg-deep">{option}</option>
                  ))}
                </optgroup>
              ))}
            </select>
            <Icon name="chevronDown" className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
          </div>
        </motion.div>

        {/* Department */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <label className="block text-sm font-medium text-text-secondary mb-3 font-body">Department</label>
          <div className="grid grid-cols-2 gap-3">
            {departments.map((dept) => {
              const isSelected = department === dept.id
              return (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => handleDepartmentSelect(dept.id)}
                  className={`relative overflow-hidden geo-chamfer-sm p-4 text-left transition-all duration-300 ${
                    isSelected ? 'glass-strong border-2 border-primary/50' : 'glass-light border-2 border-transparent hover:border-outline'
                  }`}
                >
                  {isSelected && <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${dept.color}`} />}
                  <div className="relative z-10">
                    <div className={`w-10 h-10 geo-chamfer-sm flex items-center justify-center mb-2 ${isSelected ? `bg-gradient-to-br ${dept.color}` : 'bg-raised'}`}>
                      <Icon name={dept.icon as any} className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-text-muted'}`} />
                    </div>
                    <span className={`text-sm font-medium font-body ${isSelected ? 'text-white' : 'text-text-muted'}`}>{dept.name}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Target Exams */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <label className="block text-sm font-medium text-text-secondary mb-3 font-body">
            Target Exams <span className="text-text-muted">(Optional)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {targetExams.map((exam) => {
              const isSelected = selectedExams.includes(exam.id)
              return (
                <button
                  key={exam.id}
                  type="button"
                  onClick={() => handleExamToggle(exam.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all font-body ${
                    isSelected
                      ? 'bg-primary/20 text-primary-light border border-primary/50'
                      : 'bg-surface/50 text-text-muted border border-border hover:border-outline'
                  }`}
                >
                  {isSelected && <Icon name="check" className="w-3 h-3 inline mr-1" />}
                  {exam.name}
                </button>
              )
            })}
          </div>
        </motion.div>
      </form>
    </AuthLayout>
  )
}
