import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "solveD | Fixed-wing UAV concept engineering",
  description:
    "Explore solveD preliminary fixed-wing UAV engineering services and submit a structured project brief for review.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
