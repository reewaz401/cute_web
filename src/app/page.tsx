'use client'

import SheepCongratulations from '@/components/animations/SheepCongratulations'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <SheepCongratulations />

      <div className="mt-8 max-w-2xl text-center">
        <p className="text-lg text-gray-700 leading-relaxed">
          Congratulations, for your visa approval, this is what you worked so hard for and what we wanted too.
          I am vey happy.Thank you. I hope to see you soon. I always wanted to congratulate you like this haha. Recently I have added a menu Bored, if you ever get bored in office :D
        </p>
      </div>
    </div>
  )
}