import { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { supabase } from './lib/supabase'
import { useAuthStore } from './stores/authStore'
import { reportWebVitals, observeResources } from './lib/webVitals'
import { ErrorBoundary } from './components/ErrorBoundary'
import Landing from './pages/Landing'

// Lazy load route components for code splitting
const Features = lazy(() => import('./pages/Features'))
const HowItWorks = lazy(() => import('./pages/HowItWorks'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Centres = lazy(() => import('./pages/Centres'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Testimonials = lazy(() => import('./pages/Testimonials'))

// Auth pages
const SignIn = lazy(() => import('./pages/auth/SignIn'))
const SignUp = lazy(() => import('./pages/auth/SignUp'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'))
const EmailVerification = lazy(() => import('./pages/auth/EmailVerification'))

// Onboarding pages
const OnboardingStep1 = lazy(() => import('./pages/onboarding/OnboardingStep1'))
const OnboardingStep2Student = lazy(() => import('./pages/onboarding/OnboardingStep2Student'))
const OnboardingStep2Teacher = lazy(() => import('./pages/onboarding/OnboardingStep2Teacher'))
const OnboardingStep2Admin = lazy(() => import('./pages/onboarding/OnboardingStep2Admin'))
const AdminEvaluation = lazy(() => import('./pages/onboarding/AdminEvaluation'))
const OnboardingStep3 = lazy(() => import('./pages/onboarding/OnboardingStep3'))

// Dashboard & Learning pages
const StudentDashboard = lazy(() => import('./pages/dashboard/StudentDashboard'))
const Profile = lazy(() => import('./pages/Profile'))
const ExamTaking = lazy(() => import('./pages/exam/ExamTaking'))
const CourseLearning = lazy(() => import('./pages/course/CourseLearning'))

// Components
const AppLayout = lazy(() => import('./components/AppLayout'))
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'))

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// Simple page loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen bg-deep flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-[3px] border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-text-secondary text-sm">Loading...</p>
      </div>
    </div>
  )
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

function AppRoutes() {
  const { setUser, setSession, setLoading,
          fetchProfile } = useAuthStore()

  // Initialize web vitals tracking
  useEffect(() => {
    reportWebVitals()
    observeResources()
  }, [])

   useEffect(() => {
     supabase.auth.getSession().then(({ data: { session } }) => {
       setSession(session)
       setUser(session?.user ?? null)
       if (session?.user) {
         fetchProfile(session.user.id)
       }
       setLoading(false)
       useAuthStore.setState({ isInitialized: true })
     })

     let subscription: { data: { subscription: { unsubscribe: () => void } }; } | null = null;

     subscription = supabase.auth.onAuthStateChange(
       (_event, session) => {
         setSession(session)
         setUser(session?.user ?? null)
         if (session?.user) {
           fetchProfile(session.user.id)
         }
         setLoading(false)
       }
     )

     return () => {
       subscription?.data.subscription.unsubscribe()
     }
   }, [])

  // Layout wrapper for authenticated routes
  function AuthenticatedLayout() {
    return (
      <AppLayout>
        <Outlet />
      </AppLayout>
    )
  }

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />
      
      {/* Marketing Pages */}
      <Route path="/features" element={<Features />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/centres" element={<Centres />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/testimonials" element={<Testimonials />} />
      
      {/* Onboarding Routes */}
      <Route path="/onboarding/role" element={<OnboardingStep1 />} />
      <Route path="/onboarding/student" element={<OnboardingStep2Student />} />
      <Route path="/onboarding/teacher" element={<OnboardingStep2Teacher />} />
      <Route path="/onboarding/admin" element={<OnboardingStep2Admin />} />
      <Route path="/onboarding/evaluation" element={<AdminEvaluation />} />
      <Route path="/onboarding/subjects" element={<OnboardingStep3 />} />
      
      {/* Auth Routes */}
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      <Route path="/auth/email-verification" element={<EmailVerification />} />
      
      {/* Authenticated Routes with Layout */}
      <Route element={<ProtectedRoute><AuthenticatedLayout /></ProtectedRoute>}>
        <Route path="/exam/:examId" element={<ExamTaking />} />
        <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId" element={<CourseLearning />} />
        <Route path="/course/:courseId" element={<CourseLearning />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </Suspense>
    </>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
