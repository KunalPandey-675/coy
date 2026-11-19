import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coy - Discover",
  description: "Find your match with Coy's swipe-based discovery feature",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
