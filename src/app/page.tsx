'use client'

import SheepCongratulations from '@/components/animations/SheepCongratulations'
import HomeLine from '@/components/HomeLine'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <SheepCongratulations />

      <div className="mt-8 max-w-2xl text-center">
        <HomeLine />
      </div>
    </div>
  )
}