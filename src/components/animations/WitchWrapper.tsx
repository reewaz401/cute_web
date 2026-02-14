'use client'

import { CURRENT_THEME } from '@/config/theme'
import dynamic from 'next/dynamic'

const WalkingSanta = dynamic(() => import('./WalkingSanta'), {
  ssr: false
})

export default function WitchWrapper() {
  if (CURRENT_THEME !== 'christmas') return null

  return <WalkingSanta />
}
