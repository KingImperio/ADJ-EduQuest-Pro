import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../components/Icon'

interface Question {
  id: number
  type: 'multiple-choice' | 'true-false' | 'fill-blank'
  question: string
  options?: string[]
  correctAnswer?: number | string
  points: number
  subject: string
  difficulty: 'easy' | 'medium' | 'hard'
}

const mockQuestions: Question[] = [
  {
    id: 1,
    type: 'multiple-choice',
    question: "What is the chemical formula for water?",
    options: ["H2O", "CO2", "O2", "NaCl"],
    correctAnswer: 0,
    points: 5,
    subject: "Chemistry",
    difficulty: "easy"
  },
  {
    id: 2,
    type: 'true-false',
    question: "The human heart has four chambers.",
    correctAnswer: "true",
    points: 3,
    subject: "Biology",
    difficulty: "easy"
  },
  {
    id: 3,
    type: 'multiple-choice',
    question: "Solve for x: 2x + 5 = 15",
    options: ["x = 5", "x = 10", "x = 7.5", "x = 3"],
    correctAnswer: 0,
    points: 8,
    subject: "Mathematics",
    difficulty: "medium"
  },
  {
    id: 4,
    type: 'fill-blank',
    question: "The capital of Nigeria is _____.",
    correctAnswer: "Abuja",
    points: 4,
    subject: "Geography",
    difficulty: "easy"
  }
]

export default function ExamTaking() {
  const navigate = useNavigate()
  
  const [questions] = useState<Question[]>(mockQuestions)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | number>>({})
  const [timeRemaining, setTimeRemaining] = useState(45 * 60) // 45 minutes
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  // Define handleSubmit before useEffect to avoid temporal dead zone
  const handleSubmit = useCallback(() => {
    setIsSubmitted(true)
    // Calculate results and redirect
    setTimeout(() => {
      navigate('/dashboard')
    }, 2000)
  }, [navigate])

  // Timer countdown
  useEffect(() => {
    if (timeRemaining <= 0 || isSubmitted || isPaused) return

    // Clear any existing timer before creating a new one
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Auto-submit when time runs out
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [timeRemaining, isSubmitted, isPaused, handleSubmit])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswer = (answer: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      setShowSubmitConfirm(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index)
  }

  const calculateScore = () => {
    let score = 0
    let totalPoints = 0

    questions.forEach(question => {
      totalPoints += question.points
      const userAnswer = answers[question.id]
      
      if (userAnswer === question.correctAnswer) {
        score += question.points
      }
    })

    return { score, totalPoints, percentage: Math.round((score / totalPoints) * 100) }
  }

  if (isSubmitted) {
    const { score, totalPoints, percentage } = calculateScore()
    
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-deep">
        <div className="w-full max-w-md bg-surface rounded-xl shadow-ambient border border-border p-8 text-center">
          <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="checkCircle" className="w-8 h-8 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-primary mb-4">Exam Submitted!</h1>
          <div className="space-y-4 mb-8">
            <div>
              <p className="text-3xl font-bold text-primary">{percentage}%</p>
              <p className="text-text-secondary">Score</p>
            </div>
            <div className="text-sm text-text-secondary">
              <p>You scored {score} out of {totalPoints} points</p>
              <p>Answered {Object.keys(answers).length} of {questions.length} questions</p>
            </div>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-3 bg-primary hover:bg-primary-600 text-white rounded-lg transition-colors font-medium"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-deep flex flex-col">
      {/* Exam Header */}
      <header className="bg-surface border-b border-border px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSubmitConfirm(true)}
              className="text-text-secondary hover:text-primary transition-colors"
            >
              <Icon name="x" className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-semibold text-primary">JAMB Chemistry Mock</h1>
              <p className="text-sm text-text-secondary">Comprehensive Assessment</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Timer */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
              timeRemaining < 300 ? 'bg-error/20 text-error' : 'bg-primary/20 text-primary'
            }`}>
              <Icon name="clock" className="w-4 h-4" />
              <span className="font-mono font-semibold">{formatTime(timeRemaining)}</span>
            </div>
            
            {/* Progress */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary">
                {currentQuestionIndex + 1}/{questions.length}
              </span>
              <div className="w-32 h-2 bg-raised rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Pause Button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 text-text-secondary hover:text-primary transition-colors rounded-lg hover:bg-raised"
            >
              <Icon name={isPaused ? 'playCircle' : 'pause'} className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Pause Overlay */}
      {isPaused && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-xl border border-border p-8 max-w-sm w-full mx-4">
            <h2 className="text-xl font-bold text-primary mb-4">Exam Paused</h2>
            <p className="text-text-secondary mb-6">
              Your exam has been paused. The timer has stopped.
            </p>
            <button
              onClick={() => setIsPaused(false)}
              className="w-full py-3 bg-primary hover:bg-primary-600 text-primary rounded-lg transition-colors font-medium"
            >
              Resume Exam
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Question Navigation Sidebar */}
        <aside className="hidden lg:block w-64 bg-surface border-r border-border p-4">
          <h3 className="font-semibold text-primary mb-4">Question Navigator</h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((question, index) => {
              const hasAnswer = answers[question.id] !== undefined
              const isCurrent = index === currentQuestionIndex
              
              return (
                <button
                  key={question.id}
                  onClick={() => handleJumpToQuestion(index)}
                  className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                    isCurrent
                      ? 'bg-primary text-white ring-2 ring-primary'
                      : hasAnswer
                      ? 'bg-success/20 text-success border border-success/30'
                      : 'bg-raised text-text-secondary hover:bg-deepest'
                  }`}
                >
                  {index + 1}
                </button>
              )
            })}
          </div>
          
          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 bg-primary rounded" />
              <span className="text-text-secondary">Current</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 bg-success/20 border border-success/30 rounded" />
              <span className="text-text-secondary">Answered</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 bg-raised rounded" />
              <span className="text-text-secondary">Not Answered</span>
            </div>
          </div>
        </aside>

        {/* Question Content */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Question Header */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  currentQuestion.difficulty === 'easy' ? 'bg-success/20 text-success' :
                  currentQuestion.difficulty === 'medium' ? 'bg-gold-500/20 text-gold-500' :
                  'bg-error/20 text-error'
                }`}>
                  {currentQuestion.difficulty.toUpperCase()}
                </span>
                <span className="text-sm text-text-secondary">
                  {currentQuestion.subject} • {currentQuestion.points} points
                </span>
              </div>
            </div>

            {/* Question */}
            <div className="bg-surface rounded-xl border border-border p-8 mb-8">
              <h2 className="text-xl font-semibold text-primary mb-6">
                {currentQuestion.question}
              </h2>

              {/* Answer Options */}
              {currentQuestion.type === 'multiple-choice' && (
                <div className="space-y-3">
                  {currentQuestion.options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        answers[currentQuestion.id] === index
                          ? 'border-primary bg-primary/20 text-primary'
                          : 'border-border hover:border-outline hover:bg-raised'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          answers[currentQuestion.id] === index
                            ? 'border-primary bg-primary'
                            : 'border-border'
                        }`}>
                          {answers[currentQuestion.id] === index && (
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                        <span className="text-primary">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'true-false' && (
                <div className="space-y-3">
                  {['true', 'false'].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        answers[currentQuestion.id] === option
                          ? 'border-primary bg-primary/20 text-primary'
                          : 'border-border hover:border-outline hover:bg-raised'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          answers[currentQuestion.id] === option
                            ? 'border-primary bg-primary'
                            : 'border-border'
                        }`}>
                          {answers[currentQuestion.id] === option && (
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                        <span className="text-primary capitalize">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'fill-blank' && (
                <input
                  type="text"
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full p-4 bg-deepest border border-border rounded-lg text-primary placeholder:text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-3 bg-transparent border border-border hover:bg-raised text-primary rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Icon name="chevronRight" className="w-4 h-4 rotate-180" />
                Previous
              </button>

              <button
                onClick={handleNext}
                className="px-6 py-3 bg-primary hover:bg-primary-600 text-primary rounded-lg transition-colors font-medium flex items-center gap-2"
              >
                {currentQuestionIndex === questions.length - 1 ? 'Submit Exam' : 'Next'}
                <Icon name="arrowRight" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-xl border border-border p-8 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-primary mb-4">Submit Exam?</h2>
            <p className="text-text-secondary mb-6">
              You're about to submit your exam. You have answered {Object.keys(answers).length} out of {questions.length} questions.
              {Object.keys(answers).length < questions.length && (
                <span className="text-error block mt-2">
                  Unanswered questions will be marked as incorrect.
                </span>
              )}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 py-3 bg-transparent border border-border hover:bg-raised text-primary rounded-lg transition-colors font-medium"
              >
                Review Answers
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 bg-primary hover:bg-primary-600 text-primary rounded-lg transition-colors font-medium"
              >
                Submit Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
