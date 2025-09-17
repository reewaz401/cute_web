'use client'

interface ActivityData {
  sessionId: string
  page: string
  pageTitle: string
  referrer: string
  screenResolution: string
  language: string
  timezone: string
  eventType?: string
  eventData?: any
}

class ActivityTracker {
  private sessionId: string
  private pageStartTime: number
  private clickCount: number = 0
  private maxScrollDepth: number = 0
  private isActive: boolean = true
  private updateInterval: NodeJS.Timeout | null = null
  private currentPage: string = ''

  constructor() {
    // Get or create session ID
    this.sessionId = this.getOrCreateSessionId()
    this.pageStartTime = Date.now()
  }

  private getOrCreateSessionId(): string {
    // Check sessionStorage first (persists for the session)
    let sessionId = sessionStorage.getItem('siteSessionId')

    if (!sessionId) {
      sessionId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36)
      sessionStorage.setItem('siteSessionId', sessionId)
    }

    return sessionId
  }

  private getDeviceInfo() {
    return {
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }
  }

  // Initialize tracking for a page
  public async initPage() {
    this.currentPage = window.location.pathname
    this.pageStartTime = Date.now()
    this.clickCount = 0
    this.maxScrollDepth = 0

    const deviceInfo = this.getDeviceInfo()

    const data: ActivityData = {
      sessionId: this.sessionId,
      page: this.currentPage,
      pageTitle: document.title,
      referrer: document.referrer,
      ...deviceInfo
    }

    // Send initial page view
    await this.sendActivity(data)

    // Set up event listeners
    this.setupEventListeners()

    // Start periodic updates
    this.startPeriodicUpdates()
  }

  private setupEventListeners() {
    // Track clicks
    document.addEventListener('click', () => {
      this.clickCount++
    })

    // Track scroll depth
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercentage = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      this.maxScrollDepth = Math.max(this.maxScrollDepth, scrollPercentage)
    })

    // Track page visibility
    document.addEventListener('visibilitychange', () => {
      this.isActive = !document.hidden
      this.updateActivity()
    })

    // Track page exit
    window.addEventListener('beforeunload', () => {
      this.exitPage()
    })
  }

  private startPeriodicUpdates() {
    // Update every 30 seconds
    this.updateInterval = setInterval(() => {
      this.updateActivity()
    }, 30000)
  }

  private async sendActivity(data: ActivityData) {
    try {
      await fetch('/api/activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    } catch (error) {
      console.error('Failed to send activity:', error)
    }
  }

  private async updateActivity() {
    const timeOnPage = Math.floor((Date.now() - this.pageStartTime) / 1000) // in seconds

    try {
      await fetch('/api/activity/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId: this.sessionId,
          page: this.currentPage,
          timeOnPage,
          clickCount: this.clickCount,
          scrollDepth: this.maxScrollDepth,
          isActive: this.isActive
        })
      })
    } catch (error) {
      console.error('Failed to update activity:', error)
    }
  }

  // Log custom events
  public async logEvent(eventType: string, eventData?: any) {
    const data: ActivityData = {
      sessionId: this.sessionId,
      page: this.currentPage,
      pageTitle: document.title,
      referrer: document.referrer,
      ...this.getDeviceInfo(),
      eventType,
      eventData
    }

    await this.sendActivity(data)
  }

  // Clean up when page exits
  public exitPage() {
    const timeOnPage = Math.floor((Date.now() - this.pageStartTime) / 1000)

    // Send final update synchronously
    const data = {
      sessionId: this.sessionId,
      page: this.currentPage,
      timeOnPage,
      clickCount: this.clickCount,
      scrollDepth: this.maxScrollDepth,
      isActive: false,
      exitTime: new Date().toISOString()
    }

    // Use sendBeacon for reliable exit tracking
    navigator.sendBeacon('/api/activity/update', JSON.stringify(data))

    // Clear interval
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
    }
  }

  // Clean up
  public destroy() {
    this.exitPage()
  }
}

// Export singleton instance
let trackerInstance: ActivityTracker | null = null

export const getActivityTracker = () => {
  if (!trackerInstance && typeof window !== 'undefined') {
    trackerInstance = new ActivityTracker()
  }
  return trackerInstance
}

export default ActivityTracker