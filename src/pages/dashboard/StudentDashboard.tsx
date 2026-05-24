import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../../components/Icon'
import { DashboardSkeleton } from '../../components/Skeleton'

export default function StudentDashboard() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="p-3">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4">
            <h2 className="text-xl font-bold font-heading bg-gradient-to-r from-primary via-gold to-coral bg-clip-text text-transparent mb-1">Welcome back, Student!</h2>
            <p className="text-text-secondary text-sm font-body">Continue your learning journey</p>
          </div>

          {/* Quick Actions - 50% smaller with color diversity */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
            <Link 
              to="/exam/chemistry-mock-1"
              className="bg-surface border border-coral/30 rounded-lg p-3 hover:border-coral/60 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-gradient-to-br from-coral/30 to-coral/10 rounded-md flex items-center justify-center">
                  <Icon name="target" className="w-3 h-3 text-coral" />
                </div>
                <div>
                  <h3 className="font-semibold text-coral text-sm font-heading">Take Exam</h3>
                  <p className="text-xs text-text-secondary font-body">Practice tests</p>
                </div>
              </div>
              <p className="text-xs text-text-secondary font-body">3 active exams</p>
            </Link>

            <Link 
              to="/course/organic-chemistry"
              className="bg-surface border border-success/30 rounded-lg p-3 hover:border-success/60 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-gradient-to-br from-success/30 to-success/10 rounded-md flex items-center justify-center">
                  <Icon name="bookOpen" className="w-3 h-3 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-success text-sm font-heading">Continue Learning</h3>
                  <p className="text-xs text-text-secondary font-body">Courses & modules</p>
                </div>
              </div>
              <p className="text-xs text-text-secondary font-body">52% progress</p>
            </Link>

            <div className="bg-surface border border-gold/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-gradient-to-br from-gold/30 to-gold/10 rounded-md flex items-center justify-center">
                  <Icon name="trophy" className="w-3 h-3 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-gold text-sm font-heading">Achievements</h3>
                  <p className="text-xs text-text-secondary font-body">Your progress</p>
                </div>
              </div>
              <p className="text-xs text-text-secondary font-body">Level 3 • 450 XP</p>
            </div>
          </div>

          {/* Recent Activity - 50% smaller with color diversity */}
          <div className="bg-surface border border-border rounded-lg p-3">
            <h3 className="font-semibold font-heading bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent mb-3 text-sm">Recent Activity</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-coral/10 to-purple/10 rounded-lg border border-coral/20">
                <div className="w-5 h-5 bg-gradient-to-br from-coral/30 to-coral/10 rounded-full flex items-center justify-center">
                  <Icon name="checkCircle" className="w-2.5 h-2.5 text-coral" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-coral text-xs font-heading">Completed Chemistry Module</p>
                  <p className="text-xs text-text-secondary font-body">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-gold/10 to-success/10 rounded-lg border border-gold/20">
                <div className="w-5 h-5 bg-gradient-to-br from-gold/30 to-gold/10 rounded-full flex items-center justify-center">
                  <Icon name="award" className="w-2.5 h-2.5 text-gold" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gold text-xs font-heading">Earned "Quick Learner" Badge</p>
                  <p className="text-xs text-text-secondary font-body">Yesterday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
