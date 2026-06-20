// Onboarding Data Persistence Utility
// Uses localStorage to maintain state between onboarding steps

import type { UserRole } from '../types'

export interface OnboardingData {
  // Step 1: Role Selection
  role: UserRole | null
  
  // Step 2A: Student Details
  studentDetails: {
    classLevel: string // SS1, SS2, SS3, JSS1, JSS2, JSS3
    department: string // Science, Arts, Commercial, General
    targetExams: string[] // WAEC, JAMB, NECO, GCE
  }
  
  // Step 2B: Teacher Details
  teacherDetails: {
    subjects: string[] // Subject IDs
    hasInviteCode: boolean
    inviteCode: string
    centreName: string
  }
  
  // Step 2C: Admin Details
  adminDetails: {
    centreName: string
    state: string
    email: string
    phone: string
    studentCount: string
  }
  
  // Step 3: Subject Selection
  selectedSubjects: string[] // Subject IDs
  
  // Teacher-specific: Main vs Supplementary subjects
  teacherSubjectTypes: {
    main: string | null
    supplementary: string[] // Max 2
  }
}

const STORAGE_KEY = 'eq_onboarding_data'

// Get default empty state
export const getDefaultOnboardingData = (): OnboardingData => ({
  role: null,
  studentDetails: {
    classLevel: '',
    department: '',
    targetExams: [],
  },
  teacherDetails: {
    subjects: [],
    hasInviteCode: false,
    inviteCode: '',
    centreName: '',
  },
  adminDetails: {
    centreName: '',
    state: '',
    email: '',
    phone: '',
    studentCount: '',
  },
  selectedSubjects: [],
  teacherSubjectTypes: {
    main: null,
    supplementary: [],
  },
})

// Load onboarding data from localStorage
export const loadOnboardingData = (): OnboardingData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...getDefaultOnboardingData(), ...JSON.parse(stored) }
    }
  } catch (error) {
    console.error('Failed to load onboarding data:', error)
  }
  return getDefaultOnboardingData()
}

// Save onboarding data to localStorage
export const saveOnboardingData = (data: Partial<OnboardingData>): void => {
  try {
    const current = loadOnboardingData()
    const updated = { ...current, ...data }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch (error) {
    console.error('Failed to save onboarding data:', error)
  }
}

// Update specific section
export const updateOnboardingSection = <K extends keyof OnboardingData>(
  section: K,
  data: OnboardingData[K]
): void => {
  saveOnboardingData({ [section]: data })
}

// Clear all onboarding data (call after successful signup)
export const clearOnboardingData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear onboarding data:', error)
  }
}

// Check if user has completed specific step
export const hasCompletedStep = (step: 1 | 2 | 3): boolean => {
  const data = loadOnboardingData()
  
  switch (step) {
    case 1:
      return data.role !== null
    case 2:
      if (data.role === 'student') {
        return data.studentDetails.classLevel !== '' && 
               data.studentDetails.department !== ''
      }
      if (data.role === 'teacher') {
        return data.teacherDetails.subjects.length > 0
      }
      if (data.role === 'admin') {
        return data.adminDetails.centreName !== '' && 
               data.adminDetails.state !== ''
      }
      return false
    case 3:
      return data.selectedSubjects.length > 0
    default:
      return false
  }
}

// Get role-based color theme
export const getRoleTheme = (role: UserRole | null) => {
  const themes = {
    student: {
      primary: 'text-primary',
      bg: 'bg-primary',
      border: 'border-primary',
      accent: 'text-success',
      accentBg: 'bg-success',
      accentBorder: 'border-success',
      gradient: 'from-primary via-success to-gold',
    },
    teacher: {
      primary: 'text-primary',
      bg: 'bg-primary',
      border: 'border-primary',
      accent: 'text-gold',
      accentBg: 'bg-gold',
      accentBorder: 'border-gold',
      gradient: 'from-primary via-gold to-coral',
    },
    centre_admin: {
      primary: 'text-primary',
      bg: 'bg-primary',
      border: 'border-primary',
      accent: 'text-coral',
      accentBg: 'bg-coral',
      accentBorder: 'border-coral',
      gradient: 'from-primary via-coral to-purple-500',
    },
    school_admin: {
      primary: 'text-primary',
      bg: 'bg-primary',
      border: 'border-primary',
      accent: 'text-coral',
      accentBg: 'bg-coral',
      accentBorder: 'border-coral',
      gradient: 'from-primary via-coral to-purple-500',
    },
    platform_admin: {
      primary: 'text-primary',
      bg: 'bg-primary',
      border: 'border-primary',
      accent: 'text-coral',
      accentBg: 'bg-coral',
      accentBorder: 'border-coral',
      gradient: 'from-primary via-coral to-purple-500',
    },
    parent: {
      primary: 'text-primary',
      bg: 'bg-primary',
      border: 'border-primary',
      accent: 'text-gold',
      accentBg: 'bg-gold',
      accentBorder: 'border-gold',
      gradient: 'from-primary via-gold to-coral',
    },
  }

  if (!role) return themes.student
  return themes[role] ?? themes.student
}

// Validate if can proceed to next step
export const canProceedToStep = (targetStep: 2 | 3, role: UserRole | null): boolean => {
  if (!role) return false
  
  if (targetStep === 2) {
    return hasCompletedStep(1)
  }
  
  if (targetStep === 3) {
    return hasCompletedStep(1) && hasCompletedStep(2)
  }
  
  return false
}

// Get completion percentage
export const getOnboardingProgress = (): number => {
  const data = loadOnboardingData()
  let completed = 0
  
  if (data.role) completed += 33
  if (hasCompletedStep(2)) completed += 33
  if (hasCompletedStep(3)) completed += 34
  
  return completed
}
