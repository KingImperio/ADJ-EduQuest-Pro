import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from '../../components/Icon'
import { supabase } from '../../lib/supabase'
import { AuthLayout } from '../../components/ui/AuthLayout'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg('')

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })
      if (error) throw error
      setIsSubmitted(true)
    } catch (err: any) {
      setErrorMsg(err.message.includes('Invalid email') ? 'Please enter a valid email' : 'Failed to send email')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <AuthLayout
        headline={<>Check Your<span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-500">Email</span></>}
        footer={
          <div className="space-y-3">
            <Button variant="secondary" className="w-full" onClick={() => setIsSubmitted(false)}>
              Try Different Email
            </Button>
            <Link to="/auth/signin" className="block text-center text-text-muted hover:text-white transition-colors text-sm font-body">
              Back to Sign In
            </Link>
          </div>
        }
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="mail" className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 font-display">Email Sent</h2>
          <p className="text-text-secondary mb-4 font-body">
            Reset instructions sent to:<br />
            <span className="text-white font-semibold">{email}</span>
          </p>
          <div className="p-4 glass-light geo-chamfer">
            <p className="text-text-secondary text-sm font-body">
              Didn't receive it? Check your <span className="text-gold font-medium">spam folder</span> or try a different email.
            </p>
          </div>
        </motion.div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      headline={<>Forgot<span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-light">Password?</span></>}
      subtitle="No worries! Enter your email and we'll send you reset instructions."
      footer={
        <Link to="/auth/signin" className="inline-flex items-center gap-1 text-text-muted hover:text-white transition-colors text-sm font-body">
          <Icon name="chevronRight" className="w-4 h-4 rotate-180" />
          Back to Sign In
        </Link>
      }
    >
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-display">Reset Password</h2>
        <p className="text-text-secondary font-body">Enter your email to receive reset instructions</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          error={errorMsg}
          icon={<Icon name="mail" className="w-5 h-5" />}
        />

        <Button type="submit" isLoading={isLoading} disabled={!email} className="w-full" icon={<Icon name="arrowRight" className="w-5 h-5" />}>
          Send Instructions
        </Button>
      </form>
    </AuthLayout>
  )
}
