import { useEffect, useRef, RefObject } from 'react'
import { gsap } from 'gsap'

interface AnimationOptions {
  duration?: number
  delay?: number
  ease?: string
  onComplete?: () => void
}

export function useFadeIn(
  ref: RefObject<HTMLElement>,
  options: AnimationOptions = {}
) {
  useEffect(() => {
    if (!ref.current) return

    const { duration = 1, delay = 0, ease = 'power2.out', onComplete } = options

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease,
        onComplete,
      }
    )
  }, [ref, options])
}

export function useRotate(
  ref: RefObject<HTMLElement>,
  options: AnimationOptions = {}
) {
  useEffect(() => {
    if (!ref.current) return

    const { duration = 2, delay = 0, ease = 'none' } = options

    gsap.to(ref.current, {
      rotation: 360,
      duration,
      delay,
      ease,
      repeat: -1,
    })
  }, [ref, options])
}

export function useParallax(ref: RefObject<HTMLElement>, speed: number = 0.5) {
  useEffect(() => {
    if (!ref.current) return

    const handleScroll = () => {
      if (!ref.current) return
      const scrolled = window.scrollY
      const yPos = -(scrolled * speed)
      ref.current.style.transform = `translateY(${yPos}px)`
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [ref, speed])
}