// Theme configuration
// Change CURRENT_THEME to switch between 'christmas' and 'normal'

export const CURRENT_THEME = 'christmas' as 'christmas' | 'normal'

export const isChristmasTheme = () => CURRENT_THEME === 'christmas'

export const themeConfig = {
  christmas: {
    cursor: '/cursors/lamb-cursor.svg',
    pointerCursor: '/cursors/lamb-pointer.svg',
    siteName: 'Merry Christmas & Happy New Year',
    siteTitle: 'Merry Christmas & Happy New Year!',
    catHome: '🏠',
    catHomeName: "Santa's Cabin",
    catHomeDesc: '🎄 Warm & Cozy 🎄',
    catInstructions: '🎅 Click the festive cat to jump! Hold for more power! Catch some snowflakes!',
    boredTitle: 'Holiday Fun Time!',
    boredSubtitle: "Let's find something festive for you to do! 🎄",
    websitesTitle: '🎄 Holiday Websites 🎄',
    waitingMessage: 'Preparing gifts... 🎁',
    congratsDefault: 'MERRY CHRISTMAS & HAPPY NEW YEAR!',
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
