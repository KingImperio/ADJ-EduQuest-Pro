// Complete Nigerian Secondary School Subject List (WAEC/NECO)
// Used for both Student and Teacher onboarding

export interface Subject {
  id: string
  name: string
  category: SubjectCategory
  icon: string // Material Symbols icon name
}

export type SubjectCategory = 
  | 'sciences' 
  | 'arts' 
  | 'commercial' 
  | 'languages' 
  | 'technical'

export const subjectCategories = [
  { id: 'sciences', name: 'Sciences', color: 'text-success', bgColor: 'bg-success/20', borderColor: 'border-success' },
  { id: 'arts', name: 'Arts & Humanities', color: 'text-coral', bgColor: 'bg-coral/20', borderColor: 'border-coral' },
  { id: 'commercial', name: 'Commercial', color: 'text-gold', bgColor: 'bg-gold/20', borderColor: 'border-gold' },
  { id: 'languages', name: 'Languages', color: 'text-purple-400', bgColor: 'bg-purple-500/20', borderColor: 'border-purple-400' },
  { id: 'technical', name: 'Technical & Vocational', color: 'text-pink-400', bgColor: 'bg-pink-500/20', borderColor: 'border-pink-400' },
] as const

export const subjects: Subject[] = [
  // SCIENCES (11 subjects)
  { id: 'mathematics', name: 'Mathematics', category: 'sciences', icon: 'chartLine' },
  { id: 'physics', name: 'Physics', category: 'sciences', icon: 'atom' },
  { id: 'chemistry', name: 'Chemistry', category: 'sciences', icon: 'flask' },
  { id: 'biology', name: 'Biology', category: 'sciences', icon: 'brain' },
  { id: 'further-maths', name: 'Further Mathematics', category: 'sciences', icon: 'chartBar' },
  { id: 'agric-science', name: 'Agricultural Science', category: 'sciences', icon: 'sprout' },
  { id: 'animal-husbandry', name: 'Animal Husbandry', category: 'sciences', icon: 'heart' },
  { id: 'fisheries', name: 'Fisheries', category: 'sciences', icon: 'droplets' },
  { id: 'horticulture', name: 'Horticulture', category: 'sciences', icon: 'leaf' },
  { id: 'health-education', name: 'Health Education', category: 'sciences', icon: 'heartPulse' },
  { id: 'physical-education', name: 'Physical Education', category: 'sciences', icon: 'trophy' },

  // ARTS & HUMANITIES (9 subjects)
  { id: 'literature', name: 'Literature in English', category: 'arts', icon: 'bookOpen' },
  { id: 'crs', name: 'Christian Religious Studies', category: 'arts', icon: 'church' },
  { id: 'irs', name: 'Islamic Religious Studies', category: 'arts', icon: 'moon' },
  { id: 'history', name: 'History', category: 'arts', icon: 'scroll' },
  { id: 'government', name: 'Government', category: 'arts', icon: 'landmark' },
  { id: 'civic-education', name: 'Civic Education', category: 'arts', icon: 'shield' },
  { id: 'visual-arts', name: 'Visual Arts', category: 'arts', icon: 'palette' },
  { id: 'music', name: 'Music', category: 'arts', icon: 'music' },
  { id: 'french-arts', name: 'French', category: 'arts', icon: 'globe' },

  // COMMERCIAL (7 subjects)
  { id: 'accounting', name: 'Financial Accounting', category: 'commercial', icon: 'wallet' },
  { id: 'commerce', name: 'Commerce', category: 'commercial', icon: 'shoppingCart' },
  { id: 'economics', name: 'Economics', category: 'commercial', icon: 'trendingUp' },
  { id: 'business-studies', name: 'Business Studies', category: 'commercial', icon: 'briefcase' },
  { id: 'book-keeping', name: 'Book Keeping', category: 'commercial', icon: 'receipt' },
  { id: 'insurance', name: 'Insurance', category: 'commercial', icon: 'umbrella' },
  { id: 'store-management', name: 'Store Management', category: 'commercial', icon: 'archive' },

  // LANGUAGES (6 subjects)
  { id: 'english', name: 'English Language', category: 'languages', icon: 'message' },
  { id: 'yoruba', name: 'Yoruba', category: 'languages', icon: 'mic' },
  { id: 'igbo', name: 'Igbo', category: 'languages', icon: 'mic' },
  { id: 'hausa', name: 'Hausa', category: 'languages', icon: 'mic' },
  { id: 'french-lang', name: 'French', category: 'languages', icon: 'globe' },
  { id: 'arabic', name: 'Arabic', category: 'languages', icon: 'globe' },

  // TECHNICAL & VOCATIONAL (11 subjects)
  { id: 'technical-drawing', name: 'Technical Drawing', category: 'technical', icon: 'pencil' },
  { id: 'food-nutrition', name: 'Food & Nutrition', category: 'technical', icon: 'utensils' },
  { id: 'home-economics', name: 'Home Economics', category: 'technical', icon: 'home' },
  { id: 'clothing-textile', name: 'Clothing & Textile', category: 'technical', icon: 'scissors' },
  { id: 'computer-studies', name: 'Computer Studies', category: 'technical', icon: 'monitor' },
  { id: 'data-processing', name: 'Data Processing', category: 'technical', icon: 'database' },
  { id: 'woodwork', name: 'Woodwork', category: 'technical', icon: 'tree' },
  { id: 'metalwork', name: 'Metalwork', category: 'technical', icon: 'hammer' },
  { id: 'basic-electricity', name: 'Basic Electricity', category: 'technical', icon: 'zap' },
  { id: 'auto-mechanics', name: 'Auto Mechanics', category: 'technical', icon: 'car' },
  { id: 'building-construction', name: 'Building Construction', category: 'technical', icon: 'building' },
]

// Helper functions
export const getSubjectsByCategory = (category: SubjectCategory): Subject[] => {
  return subjects.filter(s => s.category === category)
}

export const getAllCategories = (): SubjectCategory[] => {
  return ['sciences', 'arts', 'commercial', 'languages', 'technical']
}

export const getCategoryInfo = (categoryId: SubjectCategory) => {
  return subjectCategories.find(c => c.id === categoryId)
}

export const searchSubjects = (query: string): Subject[] => {
  const lowerQuery = query.toLowerCase()
  return subjects.filter(s => 
    s.name.toLowerCase().includes(lowerQuery) ||
    s.category.toLowerCase().includes(lowerQuery)
  )
}
