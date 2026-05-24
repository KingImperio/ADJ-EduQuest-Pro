/**
 * Environment variable validation
 * Ensures all required environment variables are present and valid
 */

const requiredEnvVars = {
  VITE_SUPABASE_URL: {
    validate: (value: string) => {
      try {
        new URL(value)
        return true
      } catch {
        return false
      }
    },
    errorMessage: 'VITE_SUPABASE_URL must be a valid URL'
  },
  VITE_SUPABASE_ANON_KEY: {
    validate: (value: string) => value.length > 0,
    errorMessage: 'VITE_SUPABASE_ANON_KEY is required'
  },
  VITE_APP_URL: {
    validate: (value: string) => {
      try {
        new URL(value)
        return true
      } catch {
        return false
      }
    },
    errorMessage: 'VITE_APP_URL must be a valid URL'
  }
} as const

type EnvVar = keyof typeof requiredEnvVars

export function validateEnv(): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  for (const [key, config] of Object.entries(requiredEnvVars)) {
    const value = import.meta.env[key as EnvVar]

    if (!value) {
      errors.push(`${key} is missing`)
      continue
    }

    if (!config.validate(value)) {
      errors.push(config.errorMessage)
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function getEnvVar(key: EnvVar): string {
  const value = import.meta.env[key]
  
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }

  const config = requiredEnvVars[key]
  if (config && !config.validate(value)) {
    throw new Error(config.errorMessage)
  }

  return value
}

// Validate on import in development
if (import.meta.env.DEV) {
  const validation = validateEnv()
  if (!validation.isValid) {
    console.error('Environment variable validation failed:', validation.errors)
    console.error('Please check your .env.local file')
  }
}
