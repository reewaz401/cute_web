// Theme configuration
// Change CURRENT_THEME to switch between 'halloween' and 'normal'

export const CURRENT_THEME = 'halloween' as 'halloween' | 'normal'

export const isHalloweenTheme = () => CURRENT_THEME === 'halloween'

export const themeConfig = {
  halloween: {
    cursor: '/cursors/pumpkin-cursor.svg',
    pointerCursor: '/cursors/witch-wand-pointer.svg',
    siteName: '🎃 Spooky Zone',
    siteTitle: 'Halloween Spooktacular 🎃',
    catHome: '🏚️',
    catHomeName: 'Haunted House',
    catHomeDesc: '👻 Spooky & Scary 👻',
    catInstructions: '🧙 Click the witch cat to cast a jumping spell! Hold for more power!',
    boredTitle: 'Need Some Spooks?',
    boredSubtitle: "Let's find something spooky for you to do! 🎃",
    websitesTitle: '🕸️ Spooky Websites 🕸️',
    waitingMessage: 'Cooking... 👻',
    congratsDefault: 'HAPPY HALLOWEEN!',
  },
  normal: {
    cursor: '/cursors/lamb-cursor.svg',
    pointerCursor: '/cursors/lamb-pointer.svg',
    siteName: 'For you',
    siteTitle: 'For you',
    catHome: '🏠',
    catHomeName: "Cat's Home",
    catHomeDesc: 'Cozy & Warm',
    catInstructions: "Click the cat to jump! Hold for higher jumps. Click on the cat's left/right side to jump in that direction.",
    boredTitle: 'Feeling Bored?',
    boredSubtitle: "Let's find something fun for you to do! 🐑",
    websitesTitle: 'Timepass Websites',
    waitingMessage: 'Cooking...',
    congratsDefault: 'CONGRATULATIONS',
  }
}

export const getThemeConfig = () => {
  return themeConfig[CURRENT_THEME]
}