'use client'

import { useActivityTracker } from '@/hooks/useActivityTracker'

export function ActivityTrackerProvider({ children }: { children: React.ReactNode }) {
  // Initialize activity tracking
  useActivityTracker()

  return <>{children}</>
}