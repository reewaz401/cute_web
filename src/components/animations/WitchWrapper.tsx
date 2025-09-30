'use client'

import { CURRENT_THEME } from '@/config/theme'
import dynamic from 'next/dynamic'

const WalkingWitch = dynamic(() => import('./WalkingWitch'), {
  ssr: false
})

export default function WitchWrapper() {
  if (CURRENT_THEME !== 'halloween') return null

  return <WalkingWitch />
}