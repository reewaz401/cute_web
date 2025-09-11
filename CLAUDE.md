# Claude Instructions for Curte Animation Site

## Project Overview
This is a Next.js 15 project with TypeScript designed for heavy graphic animations and visual effects. The project uses a full-stack architecture with both frontend and backend capabilities within the same codebase.

## Tech Stack
- **Framework**: Next.js 15.5.3 with App Router and Turbopack
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with CSS Variables
- **Animation Libraries**:
  - Framer Motion (Complex UI animations)
  - Lottie React (Vector animations)
  - GSAP (Advanced timeline animations)
  - Three.js with React Three Fiber (3D graphics)
  - React Three Drei (Three.js helpers)

## Project Structure
```
curte-animation-site/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── animations/   # Animation-specific components
│   │   ├── ui/          # UI components
│   │   └── common/      # Shared components
│   ├── styles/          # Style files
│   │   └── colors.css   # Color variables
│   ├── lib/             # Utility functions
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript type definitions
│   └── api/             # API routes (backend)
├── public/              # Static assets
│   ├── animations/      # Lottie JSON files
│   ├── models/         # 3D models
│   └── images/         # Images and textures
└── package.json        # Dependencies

```

## Color System
The project uses a comprehensive CSS variable system defined in `src/styles/colors.css`. All colors should be referenced through these variables:

### Available Color Scales:
- **Primary**: `--primary-50` to `--primary-950`
- **Secondary**: `--secondary-50` to `--secondary-950`
- **Accent**: `--accent-50` to `--accent-900`
- **Neutral**: `--neutral-50` to `--neutral-950`
- **Success**: `--success-50` to `--success-900`
- **Error**: `--error-50` to `--error-900`
- **Warning**: `--warning-50` to `--warning-900`

### Semantic Variables:
- **Backgrounds**: `--bg-primary`, `--bg-secondary`, `--bg-tertiary`, `--bg-dark`
- **Text**: `--text-primary`, `--text-secondary`, `--text-tertiary`, `--text-inverse`
- **Borders**: `--border-light`, `--border-default`, `--border-dark`
- **Shadows**: `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`

## Using Colors in Components

### In CSS/Tailwind:
```css
/* CSS */
.my-element {
  background: var(--primary-500);
  color: var(--text-primary);
}

/* Tailwind classes */
<div className="bg-primary-500 text-primary-900">
```

### In JavaScript/TypeScript:
```typescript
const styles = {
  backgroundColor: 'var(--primary-500)',
  color: 'var(--text-primary)'
}
```

## Animation Guidelines

### 1. Framer Motion
Use for UI animations and page transitions:
```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### 2. Lottie Animations
Use for complex vector animations:
```tsx
import Lottie from 'lottie-react'
import animationData from '@/public/animations/loading.json'

<Lottie animationData={animationData} loop={true} />
```

### 3. GSAP
Use for timeline-based animations:
```tsx
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

const ref = useRef(null)
useEffect(() => {
  gsap.to(ref.current, { rotation: 360, duration: 2 })
}, [])
```

### 4. Three.js / React Three Fiber
Use for 3D graphics:
```tsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

<Canvas>
  <ambientLight />
  <pointLight position={[10, 10, 10]} />
  <Box />
  <OrbitControls />
</Canvas>
```

## Performance Optimization

### Animation Performance:
1. **Use `will-change` CSS property** for elements that will animate
2. **Prefer transform and opacity** animations over layout properties
3. **Use `useCallback` and `useMemo`** for animation handlers
4. **Lazy load heavy animations** with dynamic imports:
   ```tsx
   const HeavyAnimation = dynamic(() => import('@/components/animations/HeavyAnimation'), {
     loading: () => <div>Loading...</div>,
     ssr: false
   })
   ```

### Image Optimization:
1. Use Next.js Image component for automatic optimization
2. Store images in appropriate formats (WebP for photos, SVG for icons)
3. Use appropriate sizes for different viewports

### Code Splitting:
1. Use dynamic imports for route-based code splitting
2. Lazy load animation libraries only when needed
3. Split large animation components into separate chunks

## Backend API Routes
API routes are located in `src/app/api/` directory. Each route should:
1. Use TypeScript for type safety
2. Implement proper error handling
3. Use environment variables for sensitive data
4. Follow RESTful conventions

Example API route:
```typescript
// src/app/api/animations/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Your logic here
    return NextResponse.json({ data: 'result' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
```

## Environment Variables
Create a `.env.local` file for environment variables:
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
```

## Development Commands
```bash
# Start development server with Turbopack
npm run dev

# Build for production with Turbopack
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Testing Strategy
1. **Unit Tests**: Test individual components and functions
2. **Integration Tests**: Test component interactions
3. **E2E Tests**: Test complete user flows
4. **Performance Tests**: Monitor animation performance

## Browser Compatibility
- Target modern browsers with ES6+ support
- Test animations on both desktop and mobile devices
- Provide fallbacks for browsers without WebGL support (for Three.js)

## Deployment Considerations
1. **Optimize bundle size** - Monitor with `next build` analyzer
2. **Enable CDN** for static assets
3. **Configure caching headers** for animations
4. **Use environment-specific configurations**
5. **Monitor Core Web Vitals** for performance

## Common Patterns

### Animation Hook Pattern:
```typescript
// hooks/useAnimation.ts
export function useAnimation(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    // Animation logic
  }, [])
}
```

### Animation Component Pattern:
```typescript
// components/animations/AnimatedCard.tsx
interface AnimatedCardProps {
  children: React.ReactNode
  delay?: number
}

export function AnimatedCard({ children, delay = 0 }: AnimatedCardProps) {
  // Animation implementation
}
```

## Important Notes
1. **Always use CSS variables** for colors to maintain consistency
2. **TypeScript is mandatory** - no `any` types unless absolutely necessary
3. **Follow Next.js 15 best practices** with App Router
4. **Optimize for performance** - animations should run at 60fps
5. **Test on multiple devices** - ensure animations work on mobile
6. **Use semantic HTML** for accessibility
7. **Implement proper loading states** for heavy animations
8. **Document complex animations** with comments

## File Naming Conventions
- Components: PascalCase (e.g., `AnimatedHero.tsx`)
- Utilities: camelCase (e.g., `animationHelpers.ts`)
- Styles: kebab-case (e.g., `animation-styles.css`)
- API routes: kebab-case (e.g., `get-animations.ts`)

## Git Workflow
1. Create feature branches from `main`
2. Use descriptive commit messages
3. Test animations before committing
4. Include performance metrics in PR descriptions

## Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP](https://greensock.com/gsap/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Lottie Files](https://lottiefiles.com/)

Remember: This project prioritizes visual excellence and smooth animations. Always consider performance implications when adding new animations or graphics.