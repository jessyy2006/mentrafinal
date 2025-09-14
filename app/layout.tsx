import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mentra 2.0",
  description: "Interactive project building instructions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}