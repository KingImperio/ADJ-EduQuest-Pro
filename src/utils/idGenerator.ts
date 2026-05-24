// Identity System ID Generators
// Format: EQ-{ROLE}-{YEAR}{STATECODE}-{5ALPHANUM}

import type { UserRole } from './onboardingStorage'

// State code mapping (2-letter codes)
const stateCodes: Record<string, string> = {
  'abia': 'AB',
  'abuja': 'FC',
  'adamawa': 'AD',
  'akwa-ibom': 'AK',
  'anambra': 'AN',
  'bauchi': 'BA',
  'bayelsa': 'BY',
  'benue': 'BE',
  'borno': 'BO',
  'cross-river': 'CR',
  'delta': 'DE',
  'ebonyi': 'EB',
  'edo': 'ED',
  'ekiti': 'EK',
  'enugu': 'EN',
  'gombe': 'GO',
  'imo': 'IM',
  'jigawa': 'JI',
  'kaduna': 'KD',
  'kano': 'KN',
  'katsina': 'KT',
  'kebbi': 'KE',
  'kogi': 'KO',
  'kwara': 'KW',
  'lagos': 'LA',
  'nasarawa': 'NA',
  'niger': 'NI',
  'ogun': 'OG',
  'ondo': 'ON',
  'osun': 'OS',
  'oyo': 'OY',
  'plateau': 'PL',
  'rivers': 'RI',
  'sokoto': 'SO',
  'taraba': 'TA',
  'yobe': 'YO',
  'zamfara': 'ZA',
}

// Generate random alphanumeric string
const generateRandomString = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Get current year short format (e.g., "26" for 2026)
const getYearShort = (): string => {
  return new Date().getFullYear().toString().slice(-2)
}

// Convert number to ordinal word (1 → 1ST, 2 → 2ND, etc.)
const getOrdinalSuffix = (num: number): string => {
  const lastDigit = num % 10
  const lastTwoDigits = num % 100
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return `${num}TH`
  }
  
  switch (lastDigit) {
    case 1: return `${num}ST`
    case 2: return `${num}ND`
    case 3: return `${num}RD`
    default: return `${num}TH`
  }
}

// Generate Student ID: EQ-STU-26AD-2F5T
export const generateStudentId = (state: string): string => {
  const year = getYearShort()
  const stateCode = stateCodes[state.toLowerCase()] || 'XX'
  const random = generateRandomString(5)
  return `EQ-STU-${year}${stateCode}-${random}`
}

// Generate Teacher ID: EQ-TUT-26AD-2F5T
export const generateTeacherId = (state: string): string => {
  const year = getYearShort()
  const stateCode = stateCodes[state.toLowerCase()] || 'XX'
  const random = generateRandomString(5)
  return `EQ-TUT-${year}${stateCode}-${random}`
}

// Generate Admin Key: EQA-LAG-1A1A-7G8ER26
// Format: EQA-{STATE}-{CENTRENUMBER}-{RANDOM}{YEAR}
export const generateAdminKey = (state: string, centreNumber: number): string => {
  const year = getYearShort()
  const stateCode = state.toUpperCase().slice(0, 3) // First 3 letters of state
  const centreOrdinal = getOrdinalSuffix(centreNumber)
  const random = generateRandomString(5)
  return `EQA-${stateCode}-${centreOrdinal}-${random}${year}`
}

// Generic ID generator based on role
export const generateUserId = (role: UserRole, state: string, centreNumber?: number): string => {
  switch (role) {
    case 'student':
      return generateStudentId(state)
    case 'teacher':
      return generateTeacherId(state)
    case 'admin':
      if (centreNumber === undefined) {
        throw new Error('Centre number required for admin ID generation')
      }
      return generateAdminKey(state, centreNumber)
    default:
      throw new Error('Invalid role for ID generation')
  }
}

// Centre counter (in real app, this would be from database)
// For demo purposes, using localStorage to track
export const getNextCentreNumber = (): number => {
  const current = parseInt(localStorage.getItem('eq_centre_counter') || '0')
  const next = current + 1
  localStorage.setItem('eq_centre_counter', next.toString())
  return next
}

// Validate ID format (basic validation)
export const isValidId = (id: string, role: UserRole): boolean => {
  const patterns = {
    student: /^EQ-STU-\d{2}[A-Z]{2}-[A-Z0-9]{5}$/,
    teacher: /^EQ-TUT-\d{2}[A-Z]{2}-[A-Z0-9]{5}$/,
    admin: /^EQA-[A-Z]{3}-\d+(ST|ND|RD|TH)-[A-Z0-9]{5}\d{2}$/,
  }
  
  return patterns[role].test(id)
}

// Extract info from ID
export const parseId = (id: string) => {
  const studentMatch = id.match(/^EQ-STU-(\d{2})([A-Z]{2})-([A-Z0-9]{5})$/)
  const teacherMatch = id.match(/^EQ-TUT-(\d{2})([A-Z]{2})-([A-Z0-9]{5})$/)
  const adminMatch = id.match(/^EQA-([A-Z]{3})-(\d+(?:ST|ND|RD|TH))-([A-Z0-9]{5})(\d{2})$/)
  
  if (studentMatch) {
    return {
      role: 'student' as UserRole,
      year: '20' + studentMatch[1],
      stateCode: studentMatch[2],
      random: studentMatch[3],
    }
  }
  
  if (teacherMatch) {
    return {
      role: 'teacher' as UserRole,
      year: '20' + teacherMatch[1],
      stateCode: teacherMatch[2],
      random: teacherMatch[3],
    }
  }
  
  if (adminMatch) {
    return {
      role: 'admin' as UserRole,
      state: adminMatch[1],
      centreNumber: adminMatch[2],
      random: adminMatch[3],
      year: '20' + adminMatch[4],
    }
  }
  
  return null
}
