import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals'

// Web Vitals reporting utility
// Tracks Core Web Vitals and sends to analytics console

type VitalsMetric = {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta?: number
  id: string
  navigationType?: string
}

function sendToAnalytics(metric: VitalsMetric) {
  // Log to console in development
  if (import.meta.env.DEV) {
    const color = 
      metric.rating === 'good' ? '🟢' : 
      metric.rating === 'needs-improvement' ? '🟡' : '🔴'
    
    console.log(
      `[Web Vitals] ${color} ${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`
    )
  }

  // In production, you could send to analytics service
  // Example: gtag('event', metric.name, { value: metric.value, ... })
  
  // Send to your analytics endpoint
  // fetch('/api/analytics/vitals', {
  //   method: 'POST',
  //   body: JSON.stringify(metric),
  //   headers: { 'Content-Type': 'application/json' },
  //   keepalive: true,
  // })
}

function getRating(name: string, value: number): VitalsMetric['rating'] {
  // Core Web Vitals thresholds
  const thresholds: Record<string, { good: number; poor: number }> = {
    CLS: { good: 0.1, poor: 0.25 },
    INP: { good: 200, poor: 500 },
    FCP: { good: 1800, poor: 3000 },
    LCP: { good: 2500, poor: 4000 },
    TTFB: { good: 800, poor: 1800 },
  }

  const threshold = thresholds[name]
  if (!threshold) return 'good'

  if (value <= threshold.good) return 'good'
  if (value >= threshold.poor) return 'poor'
  return 'needs-improvement'
}

function processMetric(metric: Metric): VitalsMetric {
  return {
    name: metric.name,
    value: metric.value,
    rating: getRating(metric.name, metric.value),
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  }
}

export function reportWebVitals() {
  // Core Web Vitals
  onCLS((metric: Metric) => sendToAnalytics(processMetric(metric)))
  onINP((metric: Metric) => sendToAnalytics(processMetric(metric)))
  onFCP((metric: Metric) => sendToAnalytics(processMetric(metric)))
  onLCP((metric: Metric) => sendToAnalytics(processMetric(metric)))
  onTTFB((metric: Metric) => sendToAnalytics(processMetric(metric)))
}

// Custom performance marks for React components
export function markPerformance(label: string) {
  if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark(label)
  }
}

export function measurePerformance(label: string, startMark: string, endMark: string) {
  if (typeof performance !== 'undefined' && performance.measure) {
    try {
      performance.measure(label, startMark, endMark)
      const entries = performance.getEntriesByName(label)
      const lastEntry = entries[entries.length - 1]
      
      if (import.meta.env.DEV && lastEntry) {
        console.log(`[Performance] ${label}: ${lastEntry.duration.toFixed(2)}ms`)
      }
    } catch (e) {
      // Marks might not exist
    }
  }
}

// Resource loading observer
export function observeResources() {
  if (typeof PerformanceObserver === 'undefined') return

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resource = entry as PerformanceResourceTiming
          
          // Log slow resources in development
          if (import.meta.env.DEV && resource.duration > 1000) {
            console.warn(`[Slow Resource] ${resource.name}: ${resource.duration.toFixed(0)}ms`)
          }
        }
      }
    })

    observer.observe({ entryTypes: ['resource'] })
  } catch (e) {
    // PerformanceObserver not supported
  }
}
