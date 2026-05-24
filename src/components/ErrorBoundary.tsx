import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Icon } from './Icon'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="min-h-screen bg-deep flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-coral/20 flex items-center justify-center">
              <Icon name="shield" className="w-8 h-8 text-coral" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2 font-display">Something went wrong</h1>
            <p className="text-text-secondary mb-6 font-body">
              An unexpected error occurred. You can try reloading the page.
            </p>
            {this.state.error && (
              <div className="mb-6 p-4 bg-surface rounded-lg border border-border text-left">
                <code className="text-sm text-coral font-mono break-all">
                  {this.state.error.message}
                </code>
              </div>
            )}
            <div className="flex gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 bg-raised border border-border rounded-lg text-text-secondary hover:text-white transition-colors font-body"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg text-white font-semibold font-body"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
