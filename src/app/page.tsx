'use client'

import ThemeGreeting from '@/components/animations/ThemeGreeting'
import HomeLine from '@/components/HomeLine'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <ThemeGreeting />
    </div>
  )
}