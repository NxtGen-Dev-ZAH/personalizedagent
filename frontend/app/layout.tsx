import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Personal AI Platform",
  description:
    "Digital Mirror — proactive, context-aware AI secretary for goals, motivation, and planning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`${spaceGrotesk.variable} ${plexMono.variable} bg-[#03030a] text-slate-100 antialiased`}
      >
        <div className="grid-overlay" />
        <div className="noise-overlay" />
        <main className="relative z-10 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
