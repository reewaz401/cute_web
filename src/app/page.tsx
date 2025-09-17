'use client'

import SheepCongratulations from '@/components/animations/SheepCongratulations'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <SheepCongratulations />

      <div className="mt-8 max-w-2xl text-center">
        <p className="text-lg text-gray-700 leading-relaxed">
          Congratulations, for your visa approval, this is what you worked for and waht we wanted.
          . I am vey happy right now. Thank you. I hope to see you soon. I always wanted to congratulate you like this haha, but I also added some option if you are bored in office. :D
        </p>
      </div>
    </div>
  )
}