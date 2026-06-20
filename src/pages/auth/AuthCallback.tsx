import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuthStore } from '../../stores/authStore'

export default function AuthCallback() {
  const navigate = useNavigate()
  const { setUser, setSession, fetchProfile } = useAuthStore()
  const [error, setError] = useState('')

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // OAuth providers redirect with tokens in the URL hash
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const accessToken = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')
        const errorDescription = hashParams.get('error_description')

        if (errorDescription) {
          setError(errorDescription)
          setTimeout(() => navigate('/auth/signin'), 3000)
          return
        }

        if (accessToken && refreshToken) {
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          })

          if (sessionError) throw sessionError

          if (data.user && data.session) {
            setSession(data.session)
            setUser(data.user)
            await fetchProfile(data.user.id)
            navigate('/dashboard', { replace: true })
            return
          }
        }

        // No tokens in URL — redirect to sign in
        navigate('/auth/signin', { replace: true })
      } catch (err: any) {
        setError(err.message || 'Authentication failed')
        setTimeout(() => navigate('/auth/signin'), 3000)
      }
    }

    handleCallback()
  }, [navigate, setUser, setSession, fetchProfile])

  if (error) {
    return (
      <div className="min-h-screen bg-deep flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-coral/20 flex items-center justify-center">
            <span className="text-coral text-2xl">!</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2 font-display">Authentication Error</h1>
          <p className="text-text-secondary mb-4 font-body">{error}</p>
          <p className="text-text-muted text-sm font-body">Redirecting to sign in...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-deep flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-[3px] border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-text-secondary text-sm font-body">Completing sign in...</p>
      </div>
    </div>
  )
}
