export interface AnimationConfig {
  duration?: number
  delay?: number
  ease?: string | number[]
  repeat?: number
  yoyo?: boolean
}

export interface MotionVariants {
  initial?: Record<string, any>
  animate?: Record<string, any>
  exit?: Record<string, any>
  hover?: Record<string, any>
  tap?: Record<string, any>
}

export interface LottieAnimationProps {
  animationData: any
  loop?: boolean
  autoplay?: boolean
  speed?: number
  onComplete?: () => void
}

export interface Three3DProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
  color?: string
  metalness?: number
  roughness?: number
}

export type AnimationType = 'fade' | 'slide' | 'scale' | 'rotate' | 'bounce' | 'custom'

export interface AnimationTrigger {
  type: 'scroll' | 'hover' | 'click' | 'inView' | 'auto'
  threshold?: number
  once?: boolean
}