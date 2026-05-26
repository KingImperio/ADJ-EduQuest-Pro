import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from '../../components/Icon'
import { subjects, getCategoryInfo } from '../../data/subjects'
import { loadOnboardingData, saveOnboardingData } from '../../utils/onboardingStorage'
import type { UserRole } from '../../utils/onboardingStorage'
import SubjectSelectionModal from './SubjectSelectionModal'
import { AuthLayout } from '../../components/ui/AuthLayout'
import { Button } from '../../components/ui/Button'

export default function OnboardingStep3() {
  const navigate = useNavigate()
  const [role, setRole] = useState<UserRole | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [teacherMain, setTeacherMain] = useState<string | null>(null)
  const [teacherSupplementary, setTeacherSupplementary] = useState<string[]>([])

  useEffect(() => {
    const data = loadOnboardingData()
    if (data.role) {
      setRole(data.role)
    } else {
      navigate('/onboarding/role')
    }
  }, [navigate])

  useEffect(() => {
    const data = loadOnboardingData()
    setSelectedSubjects(data.selectedSubjects || [])
    if (data.teacherSubjectTypes) {
      setTeacherMain(data.teacherSubjectTypes.main)
      setTeacherSupplementary(data.teacherSubjectTypes.supplementary || [])
    }
  }, [])

  const handleSubjectSelect = (newSelection: string[]) => {
    setSelectedSubjects(newSelection)
    if (role === 'teacher') {
      const data = loadOnboardingData()
      if (data.teacherSubjectTypes) {
        setTeacherMain(data.teacherSubjectTypes.main)
        setTeacherSupplementary(data.teacherSubjectTypes.supplementary || [])
      } else if (newSelection.length > 0) {
        setTeacherMain(newSelection[0])
        setTeacherSupplementary(newSelection.slice(1))
        saveOnboardingData({
          selectedSubjects: newSelection,
          teacherSubjectTypes: { main: newSelection[0], supplementary: newSelection.slice(1) }
        })
        return
      }
    }
    saveOnboardingData({ selectedSubjects: newSelection })
  }

  const handleRemoveSubject = (subjectId: string) => {
    const newSelection = selectedSubjects.filter(id => id !== subjectId)
    setSelectedSubjects(newSelection)
    if (role === 'teacher') {
      let newMain = teacherMain
      let newSupplementary = teacherSupplementary
      if (teacherMain === subjectId) {
        newMain = null
        if (newSupplementary.length > 0) {
          newMain = newSupplementary[0]
          newSupplementary = newSupplementary.slice(1)
        }
      } else {
        newSupplementary = newSupplementary.filter(id => id !== subjectId)
      }
      setTeacherMain(newMain)
      setTeacherSupplementary(newSupplementary)
      saveOnboardingData({
        selectedSubjects: newSelection,
        teacherSubjectTypes: { main: newMain, supplementary: newSupplementary }
      })
    } else {
      saveOnboardingData({ selectedSubjects: newSelection })
    }
  }

  const handleContinue = () => {
    if (selectedSubjects.length === 0) return
    switch (role) {
      case 'student': navigate('/auth/signup/student'); break
      case 'teacher': navigate('/auth/signup/teacher'); break
      case 'admin': navigate('/auth/signup/admin'); break
    }
  }

  const handleBack = () => {
    switch (role) {
      case 'student': navigate('/onboarding/student'); break
      case 'teacher': navigate('/onboarding/teacher'); break
      case 'admin': navigate('/onboarding/admin'); break
    }
  }

  const handleSkip = () => {
    if (role === 'student') {
      if (window.confirm('Are you sure? Selecting subjects helps us personalize your learning experience.')) {
        navigate('/auth/signup/student')
      }
    }
  }

  const getSubjectDisplay = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId)
    if (!subject) return null
    const categoryInfo = getCategoryInfo(subject.category)
    const isMain = teacherMain === subjectId
    const isSupplementary = teacherSupplementary.includes(subjectId)

    return (
      <motion.div
        key={subjectId}
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 ${
          isMain ? 'bg-success/10 border-success/50' : isSupplementary ? 'bg-gold/10 border-gold/50' : 'bg-primary/10 border-primary/50'
        }`}
      >
        <Icon name={subject.icon as any} className={`w-5 h-5 ${categoryInfo?.color || 'text-text-muted'}`} />
        <span className="text-sm text-white flex-1 font-body">{subject.name}</span>
        {role === 'teacher' && (
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium font-body ${isMain ? 'bg-success text-white' : 'bg-gold text-gray-900'}`}>
            {isMain ? 'Main' : 'Supp'}
          </span>
        )}
        <button
          onClick={() => handleRemoveSubject(subjectId)}
          className="w-6 h-6 rounded-full bg-raised flex items-center justify-center hover:bg-error/20 transition-colors"
        >
          <Icon name="x" className="w-4 h-4 text-text-muted" />
        </button>
      </motion.div>
    )
  }

  const getRoleTheme = () => {
    switch (role) {
      case 'student': return { gradient: 'from-primary to-primary-light' }
      case 'teacher': return { gradient: 'from-gold to-gold-600' }
      case 'admin': return { gradient: 'from-coral to-coral-600' }
      default: return { gradient: 'from-primary to-primary-light' }
    }
  }

  const theme = getRoleTheme()

  return (
    <AuthLayout
      headline={<>{role === 'teacher' ? 'Subject' : 'Final'}<span className={`block text-transparent bg-clip-text bg-gradient-to-r ${theme.gradient}`}>{role === 'teacher' ? 'Specialty' : 'Selection'}</span></>}
      subtitle={role === 'teacher' ? 'Select the subjects you teach to connect with students who need your expertise.' : role === 'admin' ? 'Choose subjects your centre will focus on.' : 'Select the subjects you want to master on your learning journey.'}
      stats={[
        { value: '9+', label: 'Categories' },
        { value: role === 'teacher' ? '3' : '\u221E', label: role === 'teacher' ? 'Max Subjects' : 'Subjects' },
        { value: '100%', label: 'Personalized' },
      ]}
      stepIndicator={{ current: 2, total: 3 }}
      footer={
        <div className="flex items-center gap-4">
          <button onClick={handleBack} className="px-6 py-3 rounded-lg text-text-muted hover:text-white transition-colors font-medium font-body">
            Back
          </button>
          {role === 'student' && (
            <button onClick={handleSkip} className="px-6 py-3 rounded-lg text-text-muted hover:text-text-secondary transition-colors text-sm font-body">
              Skip for now
            </button>
          )}
          <Button onClick={handleContinue} disabled={selectedSubjects.length === 0} className="flex-1">
            Complete Setup
          </Button>
        </div>
      }
    >
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-display">
          {role === 'teacher' ? 'Which subjects do you teach?' : 'Select your subjects'}
        </h2>
        <p className="text-text-secondary font-body">
          {role === 'teacher' ? 'Choose up to 3 subjects you are qualified to teach' : 'Choose the subjects you want to focus on'}
        </p>
      </div>

      {/* Selected Subjects */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-text-secondary font-body">
            {role === 'teacher' ? `Selected (${selectedSubjects.length}/3)` : `Selected (${selectedSubjects.length})`}
          </span>
          <button onClick={() => setIsModalOpen(true)} className="text-sm text-primary-light hover:text-primary-300 transition-colors font-medium font-body">
            {selectedSubjects.length > 0 ? 'Modify' : 'Browse Subjects'}
          </button>
        </div>

        {selectedSubjects.length > 0 ? (
          <div className="space-y-2">
            {selectedSubjects.map(subjectId => getSubjectDisplay(subjectId))}
          </div>
        ) : (
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full p-8 rounded-lg border-2 border-dashed border-border hover:border-outline transition-colors text-center"
          >
            <Icon name="bookOpen" className="w-10 h-10 text-border mx-auto mb-3" />
            <p className="text-text-muted mb-1 font-body">No subjects selected</p>
            <p className="text-primary-light text-sm font-medium font-body">Click to browse subjects</p>
          </button>
        )}
      </motion.div>

      {/* Subject Selection Modal */}
      <SubjectSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSubjectSelect}
        role={(role as UserRole) || 'student'}
        initialSelection={selectedSubjects}
        teacherSubjectTypes={{ main: teacherMain, supplementary: teacherSupplementary }}
      />
    </AuthLayout>
  )
}
