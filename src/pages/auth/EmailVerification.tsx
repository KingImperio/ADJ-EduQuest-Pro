import { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { Icon } from '../../components/Icon'
import { supabase } from '../../lib/supabase'
import { useAuthStore } from '../../stores/authStore'
import { AuthLayout } from '../../components/ui/AuthLayout'
import { Button } from '../../components/ui/Button'

export default function EmailVerification() {
  const navigate = useNavigate()
  const { setLoading, setUser, setSession, fetchProfile } = useAuthStore()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') || ''
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const accessToken = hashParams.get('access_token')
    const refreshToken = hashParams.get('refresh_token')
    const type = hashParams.get('type')

    if (type === 'signup' && accessToken && refreshToken) {
      handleEmailVerification(accessToken, refreshToken)
    } else if (type === 'recovery') {
      setIsVerified(true)
    }
  }, [])

  const handleEmailVerification = async (accessToken: string, refreshToken: string) => {
    setIsVerifying(true)
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      })

      if (error) throw error

      if (data.user) {
        setUser(data.user)
        setSession(data.session)
        await fetchProfile(data.user.id)
        setIsVerified(true)
        setTimeout(() => navigate('/onboarding/role', { replace: true }), 2000)
      }
    } catch {
      setErrorMsg('Verification failed. The link may be expired.')
    } finally {
      setIsVerifying(false)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  const handleResendEmail = async () => {
    setCountdown(60)
    setCanResend(false)
    setErrorMsg('')

    try {
      const { error } = await supabase.auth.resend({ type: 'signup', email })
      if (error) throw error
    } catch {
      setErrorMsg('Failed to resend email.')
    }
  }

  if (isVerified) {
    return (
      <AuthLayout
        headline={<>You're All<span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-500">Set!</span></>}
        footer={
          <Link to="/auth/signin" className="block w-full">
            <Button className="w-full">Continue to Sign In</Button>
          </Link>
        }
      >
        <div className="text-center">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="checkCircle" className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 font-display">Email Verified!</h2>
          <p className="text-text-secondary font-body">Your email is confirmed. Redirecting to onboarding...</p>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      headline={<>Verify Your<span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-light">Email</span></>}
      subtitle="One last step! Check your inbox and click the verification link to activate your account."
      footer={
        <Link to="/auth/signin" className="block text-center text-text-muted hover:text-white transition-colors text-sm font-body">
          Back to Sign In
        </Link>
      }
    >
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-display">Check Your Email</h2>
        <p className="text-text-secondary font-body">We've sent a verification link to:</p>
        {email && <p className="text-primary-light font-semibold mt-1 font-body">{email}</p>}
      </div>

      {isVerifying ? (
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-text-secondary font-body">Verifying...</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-surface rounded-lg border border-border">
            <p className="text-text-secondary text-sm mb-2 font-body">Click the link in your email to continue</p>
            <p className="text-text-muted text-xs font-body">
              Didn't receive it? Check your <span className="text-gold font-medium">spam folder</span>
            </p>
          </div>

          {errorMsg && <p className="text-error text-sm font-body">{errorMsg}</p>}

          <Button
            variant="secondary"
            className="w-full"
            onClick={handleResendEmail}
            disabled={!canResend}
            icon={<Icon name="mail" className="w-4 h-4" />}
          >
            {canResend ? 'Resend Email' : `Resend in ${countdown}s`}
          </Button>
        </div>
      )}
    </AuthLayout>
  )
}
