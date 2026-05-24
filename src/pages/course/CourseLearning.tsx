import { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Icon } from '../../components/Icon'

interface Lesson {
  id: string
  title: string
  type: 'video' | 'text' | 'quiz' | 'assignment'
  duration: number
  completed: boolean
  locked: boolean
}

interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
  progress: number
}

const mockCourse: Module[] = [
  {
    id: 'module-1',
    title: 'Introduction to Organic Chemistry',
    description: 'Learn the fundamentals of organic compounds and their properties',
    progress: 70,
    lessons: [
      { id: '1-1', title: 'What is Organic Chemistry?', type: 'video', duration: 15, completed: true, locked: false },
      { id: '1-2', title: 'Carbon Bonding', type: 'video', duration: 20, completed: true, locked: false },
      { id: '1-3', title: 'Functional Groups', type: 'text', duration: 10, completed: true, locked: false },
      { id: '1-4', title: 'Practice Quiz', type: 'quiz', duration: 15, completed: false, locked: false },
      { id: '1-5', title: 'Module Assignment', type: 'assignment', duration: 30, completed: false, locked: false }
    ]
  },
  {
    id: 'module-2', 
    title: 'Hydrocarbons',
    description: 'Explore the world of carbon and hydrogen compounds',
    progress: 30,
    lessons: [
      { id: '2-1', title: 'Alkanes', type: 'video', duration: 25, completed: true, locked: false },
      { id: '2-2', title: 'Alkenes', type: 'video', duration: 22, completed: false, locked: false },
      { id: '2-3', title: 'Alkynes', type: 'video', duration: 18, completed: false, locked: true },
      { id: '2-4', title: 'Isomerism', type: 'text', duration: 12, completed: false, locked: true },
      { id: '2-5', title: 'Hydrocarbon Quiz', type: 'quiz', duration: 20, completed: false, locked: true }
    ]
  }
]

export default function CourseLearning() {
  const { moduleId, lessonId } = useParams()
  const [selectedModule, setSelectedModule] = useState<Module>(mockCourse[0])
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(mockCourse[0].lessons[3])
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackTime, setPlaybackTime] = useState(0)
  const [showNotes, setShowNotes] = useState(false)
  const [notes, setNotes] = useState('')
  const playbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Find current lesson based on URL params
  useEffect(() => {
    if (moduleId && lessonId) {
      const module = mockCourse.find(m => m.id === moduleId)
      if (module) {
        setSelectedModule(module)
        const lesson = module.lessons.find(l => l.id === lessonId)
        if (lesson) setSelectedLesson(lesson)
      }
    }
  }, [moduleId, lessonId])

  // Mock video playback simulation
  useEffect(() => {
    if (isPlaying && selectedLesson.type === 'video') {
      // Clear any existing timer before creating a new one
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current)
      }

      playbackTimerRef.current = setInterval(() => {
        setPlaybackTime(prev => {
          if (prev >= selectedLesson.duration * 60) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)

      return () => {
        if (playbackTimerRef.current) {
          clearInterval(playbackTimerRef.current)
          playbackTimerRef.current = null
        }
      }
    }
  }, [isPlaying, selectedLesson])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleLessonClick = (lesson: Lesson) => {
    if (!lesson.locked) {
      setSelectedLesson(lesson)
      setIsPlaying(false)
      setPlaybackTime(0)
    }
  }

  const handleCompleteLesson = () => {
    // Mark lesson as completed
    const updatedModule = {
      ...selectedModule,
      lessons: selectedModule.lessons.map(l => 
        l.id === selectedLesson.id ? { ...l, completed: true } : l
      )
    }
    setSelectedModule(updatedModule)
    
    // Move to next lesson
    const currentIndex = updatedModule.lessons.findIndex(l => l.id === selectedLesson.id)
    if (currentIndex < updatedModule.lessons.length - 1) {
      const nextLesson = updatedModule.lessons[currentIndex + 1]
      if (!nextLesson.locked) {
        setSelectedLesson(nextLesson)
        setPlaybackTime(0)
        setIsPlaying(false)
      }
    }
  }

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return 'playCircle'
      case 'text': return 'fileText'
      case 'quiz': return 'target'
      case 'assignment': return 'edit'
      default: return 'fileText'
    }
  }

  const getLessonColor = (lesson: Lesson) => {
    if (lesson.locked) return 'text-muted'
    if (lesson.completed) return 'text-success'
    return 'text-primary'
  }

  return (
    <div className="min-h-screen bg-deep flex">
      {/* Course Sidebar */}
      <aside className="hidden lg:block w-80 bg-surface border-r border-border">
        <div className="p-4 lg:p-6">
          <Link to="/dashboard" className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-6">
            <Icon name="chevronRight" className="w-4 h-4 rotate-180" />
            Back to Dashboard
          </Link>
          
          <h2 className="font-semibold text-primary mb-2">Organic Chemistry</h2>
          <p className="text-sm text-text-secondary mb-6">Module 4 of 8</p>

          {/* Course Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-text-secondary">Course Progress</span>
              <span className="text-sm font-medium text-primary">52%</span>
            </div>
            <div className="h-2 bg-raised rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[52%] rounded-full" />
            </div>
          </div>

          {/* Modules */}
          <div className="space-y-4">
            {mockCourse.map((module) => (
              <div key={module.id} className="border border-border rounded-lg p-3 lg:p-4">
                <h3 className="font-medium text-primary mb-1">{module.title}</h3>
                <p className="text-xs text-text-secondary mb-3">{module.description}</p>
                
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-text-secondary">Progress</span>
                    <span className="text-xs font-medium text-primary">{module.progress}%</span>
                  </div>
                  <div className="h-1 bg-raised rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  {module.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => handleLessonClick(lesson)}
                      disabled={lesson.locked}
                      className={`w-full text-left p-3 rounded-lg border transition-all flex items-center gap-3 ${
                        selectedLesson.id === lesson.id
                          ? 'border-primary bg-primary/20'
                          : lesson.locked
                          ? 'border-deepest opacity-50 cursor-not-allowed'
                          : 'border-border hover:border-outline hover:bg-raised'
                      }`}
                    >
                      <Icon 
                        name={getLessonIcon(lesson.type)} 
                        className={`w-4 h-4 ${getLessonColor(lesson)}`} 
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${getLessonColor(lesson)}`}>
                          {lesson.title}
                        </p>
                        <p className="text-xs text-muted">
                          {lesson.duration} min • {lesson.type}
                        </p>
                      </div>
                      {lesson.completed && (
                        <Icon name="checkCircle" className="w-4 h-4 text-success" />
                      )}
                      {lesson.locked && (
                        <Icon name="user" className="w-4 h-4 text-muted" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-surface border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-primary">{selectedLesson.title}</h1>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-sm text-text-secondary capitalize">{selectedLesson.type}</span>
                <span className="text-sm text-text-secondary">•</span>
                <span className="text-sm text-text-secondary">{selectedLesson.duration} minutes</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowNotes(!showNotes)}
                className={`p-2 rounded-lg transition-colors ${
                  showNotes 
                    ? 'bg-primary text-white' 
                    : 'text-text-secondary hover:text-primary hover:bg-raised'
                }`}
              >
                <Icon name="edit" className="w-5 h-5" />
              </button>
              <button className="p-2 text-text-secondary hover:text-primary hover:bg-raised rounded-lg transition-colors">
                <Icon name="download" className="w-5 h-5" />
              </button>
              <button className="p-2 text-text-secondary hover:text-primary hover:bg-raised rounded-lg transition-colors">
                <Icon name="settings" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex">
          {/* Lesson Content */}
          <div className="flex-1 p-4 lg:p-6">
            {selectedLesson.type === 'video' && (
              <div className="max-w-3xl mx-auto">
                {/* Video Player */}
                <div className="bg-black rounded-lg overflow-hidden mb-4 md:mb-6 relative w-full" style={{ aspectRatio: '16/9' }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {!isPlaying && playbackTime === 0 && (
                      <button
                        onClick={() => setIsPlaying(true)}
                        className="w-16 h-16 md:w-20 md:h-20 bg-primary/80 rounded-full flex items-center justify-center hover:bg-primary transition-colors group"
                      >
                        <Icon name="playCircle" className="w-10 h-10 md:w-12 md:h-12 text-primary group-hover:scale-110 transition-transform" />
                      </button>
                    )}
                    
                    {isPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Icon name="flask" className="w-16 h-16 text-primary mx-auto mb-4" />
                          <p className="text-primary">Video content playing...</p>
                          <p className="text-muted">{formatTime(playbackTime)} / {formatTime(selectedLesson.duration * 60)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Video Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 md:p-4 z-10">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        <Icon name={isPlaying ? 'pause' : 'playCircle'} className="w-6 h-6" />
                      </button>
                      
                      <div className="flex-1">
                        <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all"
                            style={{ width: `${(playbackTime / (selectedLesson.duration * 60)) * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      <span className="text-primary text-sm font-mono">
                        {formatTime(playbackTime)} / {formatTime(selectedLesson.duration * 60)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Video Description */}
                <div className="bg-surface rounded-lg border border-border p-4 lg:p-5">
                  <h2 className="font-semibold text-primary mb-4">Lesson Overview</h2>
                  <p className="text-text-secondary mb-6">
                    This comprehensive video lesson covers the fundamental concepts of {selectedModule.title.toLowerCase()}. 
                    You'll learn about key principles, practical applications, and problem-solving techniques.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2 lg:gap-4 mb-4 lg:mb-6">
                    <div className="text-center p-3 bg-raised rounded-lg">
                      <Icon name="clock" className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium text-primary">{selectedLesson.duration} min</p>
                      <p className="text-xs text-muted">Duration</p>
                    </div>
                    <div className="text-center p-3 bg-raised rounded-lg">
                      <Icon name="target" className="w-5 h-5 lg:w-6 lg:h-6 text-primary mx-auto mb-1 lg:mb-2" />
                      <p className="text-sm font-medium text-primary">Intermediate</p>
                      <p className="text-xs text-muted">Level</p>
                    </div>
                    <div className="text-center p-3 bg-raised rounded-lg">
                      <Icon name="award" className="w-5 h-5 lg:w-6 lg:h-6 text-primary mx-auto mb-1 lg:mb-2" />
                      <p className="text-sm font-medium text-primary">50 XP</p>
                      <p className="text-xs text-muted">Reward</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleCompleteLesson}
                      disabled={selectedLesson.completed}
                      className="flex-1 py-3 bg-primary hover:bg-primary-600 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {selectedLesson.completed ? 'Completed ✓' : 'Mark as Complete'}
                    </button>
                    <button className="px-6 py-3 bg-transparent border border-border hover:bg-raised text-primary rounded-lg transition-colors font-medium">
                      Next Lesson
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedLesson.type === 'text' && (
              <div className="max-w-3xl mx-auto">
                <div className="bg-surface rounded-lg border border-border p-4 lg:p-6">
                  <h2 className="text-2xl font-bold text-primary mb-6">Lesson Content</h2>
                  
                  <div className="prose prose-invert max-w-none">
                    <p className="text-text-secondary mb-4">
                      Welcome to this lesson on {selectedModule.title}. This text-based lesson will guide you through 
                      the essential concepts step by step.
                    </p>
                    
                    <h3 className="text-lg font-semibold text-primary mb-3 mt-6">Key Concepts</h3>
                    <ul className="text-text-secondary space-y-2 mb-6">
                      <li>Understanding molecular structures</li>
                      <li>Chemical bonding principles</li>
                      <li>Reaction mechanisms</li>
                      <li>Practical applications</li>
                    </ul>
                    
                    <h3 className="text-lg font-semibold text-primary mb-3 mt-6">Detailed Explanation</h3>
                    <p className="text-text-secondary mb-4">
                      Organic chemistry is the study of carbon-containing compounds. Carbon's unique ability to 
                      form four stable bonds allows for the creation of complex molecular structures...
                    </p>
                    
                    <div className="bg-raised rounded-lg p-4 my-6 border-l-4 border-primary">
                      <p className="text-primary font-medium mb-2">💡 Key Insight</p>
                      <p className="text-text-secondary">
                        Understanding the electron configuration of carbon is crucial for mastering organic chemistry.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={handleCompleteLesson}
                      disabled={selectedLesson.completed}
                      className="flex-1 py-3 bg-primary hover:bg-primary-600 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {selectedLesson.completed ? 'Completed ✓' : 'Mark as Complete'}
                    </button>
                    <button className="px-6 py-3 bg-transparent border border-border hover:bg-raised text-primary rounded-lg transition-colors font-medium">
                      Next Lesson
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedLesson.type === 'quiz' && (
              <div className="max-w-3xl mx-auto">
                <div className="bg-surface rounded-lg border border-border p-4 lg:p-6">
                  <h2 className="text-2xl font-bold text-primary mb-6">Practice Quiz</h2>
                  <p className="text-text-secondary mb-8">
                    Test your understanding of the concepts covered in this module.
                  </p>
                  
                  <div className="text-center py-12">
                    <Icon name="target" className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-primary mb-2">Quiz Starting Soon</h3>
                    <p className="text-text-secondary mb-6">This quiz contains 10 questions and has a 15-minute time limit.</p>
                    <button className="px-8 py-3 bg-primary hover:bg-primary-600 text-white rounded-lg transition-colors font-medium">
                      Start Quiz
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedLesson.type === 'assignment' && (
              <div className="max-w-3xl mx-auto">
                <div className="bg-surface rounded-lg border border-border p-4 lg:p-6">
                  <h2 className="text-2xl font-bold text-primary mb-6">Module Assignment</h2>
                  <p className="text-text-secondary mb-8">
                    Complete this assignment to demonstrate your understanding of the module concepts.
                  </p>
                  
                  <div className="text-center py-12">
                    <Icon name="edit" className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-primary mb-2">Assignment Details</h3>
                    <p className="text-text-secondary mb-6">Download the assignment brief and submit your completed work.</p>
                    <div className="flex gap-4 justify-center">
                      <button className="px-6 py-3 bg-primary hover:bg-primary-600 text-white rounded-lg transition-colors font-medium flex items-center gap-2">
                        <Icon name="download" className="w-4 h-4" />
                        Download Assignment
                      </button>
                      <button className="px-6 py-3 bg-transparent border border-border hover:bg-raised text-primary rounded-lg transition-colors font-medium">
                        Submit Work
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notes Panel */}
          {showNotes && (
            <aside className="w-80 bg-surface border-l border-border p-4 lg:p-6">
              <h3 className="font-semibold text-primary mb-4">Your Notes</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Take notes here..."
                className="w-full h-64 bg-deepest border border-border rounded-lg p-3 text-primary placeholder:text-muted resize-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-2 bg-primary hover:bg-primary-600 text-white rounded-lg transition-colors text-sm font-medium">
                  Save Notes
                </button>
                <button className="px-4 py-2 bg-transparent border border-border hover:bg-raised text-primary rounded-lg transition-colors text-sm font-medium">
                  Clear
                </button>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-primary mb-3">Quick References</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-raised rounded-lg">
                    <p className="text-sm font-medium text-primary mb-1">Formula Sheet</p>
                    <p className="text-xs text-text-secondary">Key formulas and equations</p>
                  </div>
                  <div className="p-3 bg-raised rounded-lg">
                    <p className="text-sm font-medium text-primary mb-1">Glossary</p>
                    <p className="text-xs text-text-secondary">Important terms and definitions</p>
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>
      </main>
    </div>
  )
}
