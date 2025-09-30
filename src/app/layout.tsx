import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/colors.css";
import ThemeSidebar from "@/components/layout/ThemeSidebar";
import MobileNav from "@/components/layout/MobileNav";
// import FloatingChatBot from "@/components/layout/FloatingChatBot";
import { ActivityTrackerProvider } from "@/components/providers/ActivityTrackerProvider";
import { CURRENT_THEME, getThemeConfig } from "@/config/theme";
import WitchWrapper from '@/components/animations/WitchWrapper';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const themeConfig = getThemeConfig();

export const metadata: Metadata = {
  title: themeConfig.siteTitle,
  description: "Interactive animations and graphics showcase",
  icons: {
    icon: '/fav.png',
    shortcut: '/fav.png',
    apple: '/fav.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased theme-${CURRENT_THEME}`}
      >
        <ActivityTrackerProvider>
          <div className={`flex min-h-screen ${CURRENT_THEME === 'halloween' ? 'main-bg' : 'main-bg'}`}>
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
              <ThemeSidebar />
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <MobileNav />
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-auto pt-16 md:pt-0">
              {children}
            </main>
            {/* <FloatingChatBot /> */}

            {/* Walking Witch - Halloween theme, desktop only */}
            <WitchWrapper />
          </div>
        </ActivityTrackerProvider>
      </body>
    </html>
  );
}
