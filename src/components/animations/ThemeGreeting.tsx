'use client'

import { CURRENT_THEME } from '@/config/theme'
import SheepCongratulations from './SheepCongratulations'
import ChristmasNewYear from './ChristmasNewYear'

export default function ThemeGreeting() {
  if (CURRENT_THEME === 'christmas') {
    return <ChristmasNewYear />
  }
  return <SheepCongratulations />
}
