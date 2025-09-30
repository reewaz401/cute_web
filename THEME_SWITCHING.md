# Theme Switching Guide

## How to Switch Between Halloween and Normal Theme

### Quick Switch
To switch themes, edit the file `src/config/theme.ts`:

```typescript
// For Halloween theme
export const CURRENT_THEME = 'halloween' as 'halloween' | 'normal'

// For Normal theme
export const CURRENT_THEME = 'normal' as 'halloween' | 'normal'
```

After changing, restart your development server or rebuild the project.

### What Changes with Each Theme

#### Halloween Theme (🎃)
- **Cursor**: Witch wand pointer everywhere
- **Colors**: Dark purple/black with orange accents
- **Animations**: Ghost, spiders, bats, pumpkins
- **Cat**: Black witch cat with hat
- **Home**: Haunted house
- **Messages**: Spooky Halloween messages

#### Normal Theme (🐑)
- **Cursor**: Cute lamb cursor (pointer when hovering)
- **Colors**: Light, neutral tones
- **Animations**: Sheep, confetti, sparkles
- **Cat**: Orange cat
- **Home**: Cozy house
- **Messages**: Friendly congratulations

### Files Involved
- `src/config/theme.ts` - Theme configuration
- `src/app/globals.css` - Theme-aware styles
- `src/styles/theme-switch.css` - Theme CSS classes
- `src/styles/halloween-colors.css` - Halloween color palette
- `src/components/animations/ThemeGreeting.tsx` - Switches between animations
- `src/components/layout/ThemeSidebar.tsx` - Theme-aware sidebar

### Future Enhancement Ideas
- Add more themes (Christmas, Easter, etc.)
- Create a UI toggle switch for live theme switching
- Store theme preference in localStorage
- Add seasonal auto-detection based on date