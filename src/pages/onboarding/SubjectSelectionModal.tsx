import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '../../components/Icon'
import { 
  subjects, 
  subjectCategories, 
  SubjectCategory,
  searchSubjects
} from '../../data/subjects'
import type { UserRole } from '../../utils/onboardingStorage'
import { 
  loadOnboardingData, 
  saveOnboardingData 
} from '../../utils/onboardingStorage'
import { 
  FloatingParticles, 
  Shake, 
  ElasticButton
} from '../../components/MicroInteractions'

interface SubjectSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (selected: string[]) => void
  role: UserRole
  initialSelection: string[]
  teacherSubjectTypes?: {
    main: string | null
    supplementary: string[]
  }
}

export default function SubjectSelectionModal({
  isOpen,
  onClose,
  onConfirm,
  role,
  initialSelection,
  teacherSubjectTypes,
}: SubjectSelectionModalProps) {
  const [selected, setSelected] = useState<string[]>(initialSelection)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<SubjectCategory | 'all'>('all')
  const [teacherMain, setTeacherMain] = useState<string | null>(teacherSubjectTypes?.main || null)
  const [teacherSupplementary, setTeacherSupplementary] = useState<string[]>(teacherSubjectTypes?.supplementary || [])
  const [showShake, setShowShake] = useState(false)

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelected(initialSelection)
      setTeacherMain(teacherSubjectTypes?.main || null)
      setTeacherSupplementary(teacherSubjectTypes?.supplementary || [])
      setSearchQuery('')
      setActiveCategory('all')
    }
  }, [isOpen, initialSelection, teacherSubjectTypes])

  // Filter subjects based on search and category
  const filteredSubjects = useMemo(() => {
    let result = subjects
    
    if (searchQuery) {
      result = searchSubjects(searchQuery)
    }
    
    if (activeCategory !== 'all') {
      result = result.filter(s => s.category === activeCategory)
    }
    
    return result
  }, [searchQuery, activeCategory])

  const handleToggleSubject = (subjectId: string) => {
    if (role === 'teacher') {
      // Teacher logic: max 3 subjects (1 main + 2 supplementary)
      const isMain = teacherMain === subjectId
      const isSupplementary = teacherSupplementary.includes(subjectId)
      
      if (isMain) {
        // Deselect main
        setTeacherMain(null)
        setSelected(prev => prev.filter(id => id !== subjectId))
      } else if (isSupplementary) {
        // Deselect supplementary
        setTeacherSupplementary(prev => prev.filter(id => id !== subjectId))
        setSelected(prev => prev.filter(id => id !== subjectId))
      } else {
        // Try to select
        if (!teacherMain) {
          // Set as main if no main selected
          setTeacherMain(subjectId)
          setSelected(prev => [...prev, subjectId])
        } else if (teacherSupplementary.length < 2) {
          // Add as supplementary if under limit
          setTeacherSupplementary(prev => [...prev, subjectId])
          setSelected(prev => [...prev, subjectId])
        } else {
          // At limit - trigger shake animation
          setShowShake(true)
          setTimeout(() => setShowShake(false), 400)
        }
      }
    } else {
      // Student logic: unlimited selection
      setSelected(prev => 
        prev.includes(subjectId) 
          ? prev.filter(id => id !== subjectId)
          : [...prev, subjectId]
      )
    }
  }

  const handleSelectAll = () => {
    if (role === 'teacher') {
      // Teachers can only select max 3
      const firstThree = filteredSubjects.slice(0, 3).map(s => s.id)
      setSelected(firstThree)
      if (firstThree.length > 0) {
        setTeacherMain(firstThree[0])
        setTeacherSupplementary(firstThree.slice(1))
      }
    } else {
      setSelected(filteredSubjects.map(s => s.id))
    }
  }

  const handleClear = () => {
    setSelected([])
    setTeacherMain(null)
    setTeacherSupplementary([])
  }

  const handleConfirm = () => {
    // For teachers, also save the subject types
    if (role === 'teacher') {
      const data = loadOnboardingData()
      saveOnboardingData({
        ...data,
        selectedSubjects: selected,
        teacherSubjectTypes: {
          main: teacherMain,
          supplementary: teacherSupplementary
        }
      })
    }
    onConfirm(selected)
    onClose()
  }

  const getSubjectStatus = (subjectId: string): 'main' | 'supplementary' | 'selected' | null => {
    if (role !== 'teacher') {
      return selected.includes(subjectId) ? 'selected' : null
    }
    if (teacherMain === subjectId) return 'main'
    if (teacherSupplementary.includes(subjectId)) return 'supplementary'
    return null
  }

  const canConfirm = selected.length > 0
  const teacherAtLimit = role === 'teacher' && selected.length >= 3

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="w-full max-w-5xl max-h-[85vh] sm:max-h-[90vh] bg-surface rounded-xl border border-border shadow-2xl overflow-hidden flex flex-col relative mx-2 sm:mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Floating particles inside modal */}
          <FloatingParticles count={10} color="rgba(45, 82, 232, 0.05)" />
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-border bg-gradient-to-r from-primary/10 via-gold/5 to-coral/10">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="font-headline-lg text-headline-lg text-text-primary text-base sm:text-lg md:text-xl">
                {role === 'teacher' ? 'Select Your Teaching Subjects' : 'Which subjects are you focused on?'}
              </h2>
              <motion.button
                onClick={onClose}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-bg-raised flex items-center justify-center hover:bg-overlay transition-colors flex-shrink-0 ml-2"
              >
                <Icon name="x" className="w-4 h-4 sm:w-5 sm:h-5 text-text-secondary" />
              </motion.button>
            </div>
            
            <p className="text-text-secondary font-body-md text-sm sm:text-base">
              {role === 'teacher' 
                ? 'Select up to 3 subjects: 1 main subject and 2 supplementary.'
                : 'Select the subjects you want to master. We will tailor your quests accordingly.'
              }
            </p>

            {/* Teacher Selection Counter with shake */}
            <Shake trigger={showShake}>
              {role === 'teacher' && (
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-text-secondary">Main:</span>
                    <span className={`font-label-md ${teacherMain ? 'text-success' : 'text-text-muted'}`}>
                      {teacherMain ? '1/1' : '0/1'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-text-secondary">Supplementary:</span>
                    <span className={`font-label-md ${teacherSupplementary.length === 2 ? 'text-success' : 'text-text-muted'}`}>
                      {teacherSupplementary.length}/2
                    </span>
                  </div>
                  {teacherAtLimit && (
                    <motion.span 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="text-xs text-coral bg-coral/10 px-2 py-1 rounded-full"
                    >
                      Max reached
                    </motion.span>
                  )}
                </div>
              )}
            </Shake>
          </div>

          {/* Search & Filter */}
          <div className="p-4 border-b border-border bg-deep/50">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search subjects..."
                  className="w-full bg-deep border border-border rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                />
                {searchQuery && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-bg-raised flex items-center justify-center hover:bg-overlay"
                  >
                    <Icon name="x" className="w-4 h-4 text-text-muted" />
                  </motion.button>
                )}
              </div>

              {/* Category Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                <motion.button
                  onClick={() => setActiveCategory('all')}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    px-4 py-2 rounded-full font-label-md text-sm whitespace-nowrap transition-all border
                    ${activeCategory === 'all' 
                      ? 'bg-primary text-white border-primary shadow-[0_0_10px_rgba(45,82,232,0.4)]' 
                      : 'bg-raised text-text-secondary border-border hover:border-primary/50'
                    }
                  `}
                >
                  All
                </motion.button>
                {subjectCategories.map((cat) => (
                  <motion.button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      px-4 py-2 rounded-full font-label-md text-sm whitespace-nowrap transition-all border
                      ${activeCategory === cat.id 
                        ? `${cat.bgColor} ${cat.color} ${cat.borderColor} shadow-[0_0_10px_rgba(0,0,0,0.2)]` 
                        : 'bg-raised text-text-secondary border-border hover:border-primary/50'
                      }
                    `}
                  >
                    {cat.name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex justify-end gap-2 mt-4">
              <motion.button
                onClick={handleSelectAll}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 text-sm font-label-md text-primary-500 hover:text-primary-400 transition-colors"
              >
                {role === 'teacher' ? 'Select First 3' : 'Select All'}
              </motion.button>
              <motion.button
                onClick={handleClear}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 text-sm font-label-md text-text-muted hover:text-text-primary transition-colors"
              >
                Clear
              </motion.button>
            </div>
          </div>

          {/* Subject Grid */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
              <AnimatePresence mode="popLayout">
                {filteredSubjects.map((subject, index) => {
                  const status = getSubjectStatus(subject.id)
                  const isSelected = status !== null
                  const categoryInfo = subjectCategories.find(c => c.id === subject.category)

                  return (
                    <motion.label
                      key={subject.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2, delay: index * 0.02 }}
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        relative cursor-pointer rounded-lg p-3 flex flex-col items-center justify-center gap-1.5 transition-all
                        ${isSelected 
                          ? status === 'main'
                            ? 'bg-success/30 border-2 border-success shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                            : status === 'supplementary'
                              ? 'bg-gold/30 border-2 border-gold shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                              : 'bg-primary/30 border-2 border-primary shadow-[0_0_15px_rgba(45,82,232,0.4)]'
                          : `${categoryInfo?.bgColor || 'bg-deep'} border-2 ${categoryInfo?.borderColor || 'border-border'} hover:border-primary/50 hover:bg-raised`
                        }
                        ${teacherAtLimit && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSubject(subject.id)}
                        disabled={teacherAtLimit && !isSelected}
                        className="sr-only"
                      />

                      {/* Status Badge */}
                      {isSelected && role === 'teacher' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={`
                            absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase
                            ${status === 'main' 
                              ? 'bg-success text-white' 
                              : 'bg-gold text-bg-deepest'
                            }
                          `}
                        >
                          {status === 'main' ? 'Main' : 'Supp'}
                        </motion.div>
                      )}

                      {/* Icon */}
                      <Icon 
                        name={subject.icon as any} 
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${isSelected ? (status === 'main' ? 'text-success' : status === 'supplementary' ? 'text-gold' : 'text-white') : categoryInfo?.color || 'text-text-muted'}`}
                      />

                      {/* Name */}
                      <span className={`font-label-md text-[10px] sm:text-xs text-center leading-tight ${isSelected ? 'text-white' : 'text-text-primary'}`}>
                        {subject.name}
                      </span>

                      {/* Checkmark for selected */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="absolute bottom-2 right-2"
                        >
                          <Icon name="check" className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </motion.label>
                  )
                })}
              </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredSubjects.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Icon name="search" className="w-12 h-12 text-text-muted mx-auto mb-4" />
                <p className="text-text-secondary">No subjects found matching &quot;{searchQuery}&quot;</p>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 sm:p-4 border-t border-border bg-bg-raised flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary">
                {selected.length} subject{selected.length !== 1 ? 's' : ''} selected
              </span>
              {role === 'teacher' && (
                <span className="text-xs text-text-muted">
                  (max 3)
                </span>
              )}
            </div>

            <div className="flex gap-3">
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-lg border border-border text-text-primary font-label-md hover:bg-raised transition-colors"
              >
                Cancel
              </motion.button>
              <ElasticButton
                onClick={handleConfirm}
                className={`
                  px-6 py-3 rounded-lg font-label-md transition-all flex items-center gap-2
                  ${canConfirm 
                    ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-[0_0_15px_rgba(45,82,232,0.4)]' 
                    : 'bg-bg-raised text-text-muted cursor-not-allowed'
                  }
                `}
              >
                <span className="flex items-center gap-2">
                  Confirm Selection
                  <motion.div
                    animate={canConfirm ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <Icon name="check" className="w-5 h-5" />
                  </motion.div>
                </span>
              </ElasticButton>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
