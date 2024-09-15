import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import TopNavbar from "@/components/layout/TopNavbar";
import SideNavbar from "@/components/layout/SideNavbar";
import FriendsPanel from "@/components/layout/FriendsPanel";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chatmunity",
  description: "채팅이 자유로운 커뮤니티입니다",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopNavbar />
        <SideNavbar />
        <FriendsPanel />
        <main id="main-panel">
          {children}
        </main>
      </body>
    </html>
  );
}
