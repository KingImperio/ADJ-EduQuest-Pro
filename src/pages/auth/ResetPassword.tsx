import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '../../components/Icon'
import { supabase } from '../../lib/supabase'
import { AuthLayout } from '../../components/ui/AuthLayout'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({ password: '', confirmPassword: '' })

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const searchParams = new URLSearchParams(window.location.search)
    const accessToken = hashParams.get('access_token') || searchParams.get('access_token')
    const refreshToken = hashParams.get('refresh_token') || searchParams.get('refresh_token')

    if (accessToken && refreshToken) {
      supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
    } else {
      navigate('/auth/forgot-password')
    }
  }, [navigate])

  const getPasswordStrength = (pw: string) => {
    if (!pw) return 0
    let strength = 0
    if (pw.length >= 8) strength++
    if (pw.length >= 12) strength++
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) strength++
    if (/\d/.test(pw)) strength++
    if (/[^a-zA-Z\d]/.test(pw)) strength++
    return Math.min(strength, 4)
  }

  const passwordStrength = getPasswordStrength(password)
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong']
  const strengthColors = ['bg-error', 'bg-error', 'bg-coral-500', 'bg-gold', 'bg-success']
  const strengthTextColors = ['text-text-muted', 'text-error', 'text-coral-400', 'text-gold-400', 'text-success']

  // Real-time password mismatch
  const passwordMismatch = confirmPassword.length > 0 && password !== confirmPassword

  const validateForm = () => {
    const newErrors = { password: '', confirmPassword: '' }
    if (!password) newErrors.password = 'Password is required'
    else if (password.length < 8) newErrors.password = 'At least 8 characters'
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) newErrors.password = 'Must contain uppercase, lowercase, and number'
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm'
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    setErrors(newErrors)
    return !newErrors.password && !newErrors.confirmPassword
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      navigate('/auth/signin', {
        state: { message: 'Password reset successfully. You can now sign in.' },
      })
    } catch {
      setErrors({ password: 'Failed to reset password. Please try again.', confirmPassword: '' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      headline={<>Set Your New<span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-light">Password</span></>}
      subtitle="Choose a strong password to secure your account."
      footer={
        <Link to="/auth/signin" className="inline-flex items-center gap-1 text-text-muted hover:text-white transition-colors text-sm font-body">
          <Icon name="chevronRight" className="w-4 h-4 rotate-180" />
          Back to Sign In
        </Link>
      }
    >
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-display">Reset Password</h2>
        <p className="text-text-secondary font-body">Enter your new password below</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Input
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            error={errors.password}
            icon={<Icon name="lock" className="w-5 h-5" />}
            rightIcon={
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-text-muted hover:text-text-secondary transition-colors">
                <Icon name={showPassword ? 'eyeOff' : 'eye'} className="w-5 h-5" />
              </button>
            }
          />
          {/* Password strength */}
          {password && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-text-muted font-body">Password strength</span>
                <span className={`text-xs font-medium font-body ${strengthTextColors[passwordStrength]}`}>
                  {strengthLabels[passwordStrength - 1] || 'Too short'}
                </span>
              </div>
              <div className="h-1.5 w-full bg-raised rounded-full overflow-hidden">
                <div
                  className={`h-full ${strengthColors[passwordStrength]} transition-all duration-300 rounded-full`}
                  style={{ width: `${(passwordStrength / 4) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <Input
            label="Confirm New Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            error={errors.confirmPassword || (passwordMismatch ? 'Passwords do not match' : '')}
            icon={<Icon name="lock" className="w-5 h-5" />}
            rightIcon={
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-text-muted hover:text-text-secondary transition-colors">
                <Icon name={showConfirmPassword ? 'eyeOff' : 'eye'} className="w-5 h-5" />
              </button>
            }
          />
        </div>

        <Button type="submit" isLoading={isLoading} className="w-full" icon={<Icon name="check" className="w-4 h-4" />}>
          Reset Password
        </Button>
      </form>

      {/* Password Requirements */}
      <div className="mt-6 p-4 bg-surface rounded-lg border border-border">
        <h3 className="text-sm font-medium text-text-primary mb-2 flex items-center gap-2 font-display">
          <Icon name="settings" className="w-4 h-4 text-primary" />
          Password Requirements
        </h3>
        <ul className="text-xs text-text-secondary space-y-1 font-body">
          {['At least 8 characters long', 'Contains uppercase and lowercase letters', 'Contains at least one number'].map((req, i) => (
            <li key={i} className="flex items-center gap-2">
              <Icon name="checkCircle" className="w-3 h-3 text-success" />
              {req}
            </li>
          ))}
        </ul>
      </div>
    </AuthLayout>
  )
}
