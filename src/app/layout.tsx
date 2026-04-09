import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Port Design System From Local Clone",
    template: "%s | Port Design System From Local Clone",
  },
  description:
    "Senior-grade skill repository for full visual replacement of a Next.js target from a local source clone.",
  applicationName: "Port Design System From Local Clone",
  keywords: [
    "port-design-system-from-local-clone",
    "full visual replacement",
    "nextjs migration",
    "gsap",
    "lenis",
    "scrolltrigger",
    "codex skill",
    "cursor command",
  ],
  openGraph: {
    title: "Port Design System From Local Clone",
    description:
      "Full visual replacement skill for porting a local source design system into an existing Next.js target.",
    siteName: "Port Design System From Local Clone",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Port Design System From Local Clone",
    description:
      "Full visual replacement skill for porting a local source design system into an existing Next.js target.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
