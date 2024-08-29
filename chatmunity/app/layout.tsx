import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

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
        <nav id="main-nav">
          <section className="logo">
            <label>CM</label>
          </section>

          <section className="search-menu">
            <label><FontAwesomeIcon icon={faMagnifyingGlass} /></label>
            <input className="search-input" />
          </section>

          <section className="nav-menu">
            <Link href='/main'>
              <FontAwesomeIcon icon={faHome} />
            </Link>
          </section>
        </nav>

        {children}
      </body>
    </html>
  );
}
