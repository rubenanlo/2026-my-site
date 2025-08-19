import type { Metadata } from "next";
import "./globals.css";

import { generalSans } from "../../lib/fonts";

export const metadata: Metadata = {
  title: "rawDev",
  description: "Ruben Andino Full Stack Web Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${generalSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
