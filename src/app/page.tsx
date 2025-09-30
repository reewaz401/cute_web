'use client'

import SheepCongratulations from '@/components/animations/SheepCongratulations'
import HomeLine from '@/components/HomeLine'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <SheepCongratulations />

      <div className="mt-4 md:mt-8 max-w-2xl text-center px-4">
        <HomeLine />
      </div>
    </div>
  )
}