import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stock Pro | Professional Analysis",
  description: "Advanced stock analysis and technical indicators",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`antialiased bg-neutral-950 text-neutral-100 min-h-screen selection:bg-emerald-500/30`}
      >
        {children}
      </body>
    </html>
  );
}
