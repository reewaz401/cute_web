'use client'

import { CURRENT_THEME } from '@/config/theme'
import SheepCongratulations from './SheepCongratulations'
import HalloweenGhost from './HalloweenGhost'

export default function ThemeGreeting() {
  if (CURRENT_THEME === 'halloween') {
    return <HalloweenGhost />
  }
  return <SheepCongratulations />
}