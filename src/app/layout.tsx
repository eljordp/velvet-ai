import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "VelvetAI — AI-Powered Guest List Management for Nightlife Promoters",
  description:
    "Automate your guest lists, engage guests via AI SMS bot, and grow your nightlife business. Built for promoters who want to scale.",
  openGraph: {
    title: "VelvetAI — Your Guest List Runs Itself",
    description:
      "AI-powered SMS bot, auto guest list submissions, contact management, and mass blasts. Built for nightlife promoters.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
