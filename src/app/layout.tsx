import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Puvi's Portfolio",
  description: "Personal portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        {/* Removed duplicate CommandPalette component */}
        {children}
      </body>
    </html>
  );
}