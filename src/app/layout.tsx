import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/colors.css";
import Sidebar from "@/components/layout/Sidebar";
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
  title: "Curte Animation Studio",
  description: "Interactive animations and graphics showcase",
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
            <Sidebar />
            <main className="flex-1 overflow-auto">
              {children}
            </main>
            {/* <FloatingChatBot /> */}
          </div>
        </ActivityTrackerProvider>
      </body>
    </html>
  );
}
