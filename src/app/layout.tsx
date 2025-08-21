import type { Metadata } from "next";
import "./globals.css";

import Background from "@/components/Background";
import { generalSans, poppins } from "@/lib/fonts";

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
      <body
        className={`${generalSans.variable} ${poppins.variable} antialiased relative`}
      >
        <Background
          variant="default"
          animate={true}
          useAllSteps={true}
          shape="default"
        />
        {children}
      </body>
    </html>
  );
}
