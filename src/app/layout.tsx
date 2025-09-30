import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/colors.css";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
// import FloatingChatBot from "@/components/layout/FloatingChatBot";
import { ActivityTrackerProvider } from "@/components/providers/ActivityTrackerProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "For you",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ActivityTrackerProvider>
          <div className="flex min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
              <Sidebar />
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
          </div>
        </ActivityTrackerProvider>
      </body>
    </html>
  );
}
