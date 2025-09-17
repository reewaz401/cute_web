'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getActivityTracker } from '@/lib/activityTracker'

export function useActivityTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const tracker = getActivityTracker()

    if (tracker) {
      // Initialize tracking for the current page
      tracker.initPage()
    }

    // Cleanup on unmount or route change
    return () => {
      if (tracker) {
        tracker.exitPage()
      }
    }
  }, [pathname]) // Re-run when pathname changes

  // Return tracker instance for manual event logging
  return getActivityTracker()
}