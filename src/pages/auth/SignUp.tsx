import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '../../components/Icon'
import { supabase } from '../../lib/supabase'
import { useAuthStore } from '../../stores/authStore'
import { AuthLayout } from '../../components/ui/AuthLayout'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Divider } from '../../components/ui/Divider'

export default function SignUp() {
  const navigate = useNavigate()
  const { setLoading, setUser, setSession, fetchProfile } = useAuthStore()
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  // Real-time password mismatch
  const passwordMismatch =
    formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.displayName.trim()) newErrors.displayName = 'Display name required'
    if (!formData.email) newErrors.email = 'Email required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email'
    if (!formData.password) newErrors.password = 'Password required'
    else if (formData.password.length < 8) newErrors.password = 'Min 8 characters'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    if (!agreedToTerms) newErrors.terms = 'You must agree to the Terms of Service'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { display_name: formData.displayName, role: 'student' },
        },
      })

      if (error) throw error

      if (data.user) {
        setUser(data.user)
        setSession(data.session)
        await fetchProfile(data.user.id)
        navigate(`/auth/email-verification?email=${encodeURIComponent(formData.email)}`, { replace: true })
      }
    } catch (error: any) {
      const msg = error.message.includes('already registered')
        ? 'Account already exists'
        : 'Sign up failed'
      setErrors({ email: msg })
    } finally {
      setIsLoading(false)
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      })
      if (error) throw error
    } catch {
      setErrors({ email: 'Google sign up failed' })
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      headline={<>Start Your<span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-light">Journey</span></>}
      subtitle="Create your account and join thousands of learners transforming education across Nigeria."
      stats={[
        { value: '10K+', label: 'Students' },
        { value: '1K+', label: 'Teachers' },
        { value: '50+', label: 'Centres' },
      ]}
      footer={
        <p className="text-center text-sm text-text-muted font-body">
          Already have an account?{' '}
          <Link to="/auth/signin" className="text-primary-light hover:text-primary-300 font-medium transition-colors">
            Sign In
          </Link>
        </p>
      }
    >
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-display">Create Account</h2>
        <p className="text-text-secondary font-body">Fill in your details to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Display Name"
          type="text"
          name="displayName"
          value={formData.displayName}
          onChange={handleInputChange}
          placeholder="Your name"
          error={errors.displayName}
          icon={<Icon name="user" className="w-5 h-5" />}
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="you@example.com"
          error={errors.email}
          icon={<Icon name="mail" className="w-5 h-5" />}
        />

        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="••••••••"
          error={errors.password}
          icon={<Icon name="lock" className="w-5 h-5" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-text-muted hover:text-text-secondary transition-colors"
            >
              <Icon name={showPassword ? 'eyeOff' : 'eye'} className="w-5 h-5" />
            </button>
          }
        />

        <div>
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="••••••••"
            error={errors.confirmPassword || (passwordMismatch ? 'Passwords do not match' : '')}
            icon={<Icon name="lock" className="w-5 h-5" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-text-muted hover:text-text-secondary transition-colors"
              >
                <Icon name={showConfirmPassword ? 'eyeOff' : 'eye'} className="w-5 h-5" />
              </button>
            }
          />
        </div>

        {/* Terms */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="mt-0.5">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => {
                  setAgreedToTerms(e.target.checked)
                  if (errors.terms) setErrors(prev => ({ ...prev, terms: '' }))
                }}
                className="w-4 h-4 rounded border-border bg-deepest text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
              />
            </div>
            <span className="text-sm text-text-secondary font-body leading-snug">
              I agree to the{' '}
              <span className="text-primary-light hover:text-primary-300 transition-colors">Terms of Service</span>
              {' '}and{' '}
              <span className="text-primary-light hover:text-primary-300 transition-colors">Privacy Policy</span>
            </span>
          </label>
          {errors.terms && <p className="text-error text-sm mt-1.5 font-body">{errors.terms}</p>}
        </div>

        <Button type="submit" isLoading={isLoading} className="w-full" icon={<Icon name="arrowRight" className="w-5 h-5" />}>
          Create Account
        </Button>
      </form>

      <Divider text="or" className="my-6" />

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="w-full py-3 glass-light border border-white/10 hover:border-primary text-white rounded-lg transition-all font-medium flex items-center justify-center gap-3 font-body"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.72 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.01H2.18C1.41 8.48 1 10.18 1 12s.41 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.72 1 3.99 3.4 2.18 7.01l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Continue with Google
      </button>
    </AuthLayout>
  )
}
