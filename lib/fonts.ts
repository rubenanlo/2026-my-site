import localFont from "next/font/local";

// TypeScript type for font source configuration
type FontSource = {
  path: string;
  weight: string;
  style: "normal" | "italic";
};

// Configured font instance
export const generalSans = localFont({
  src: [
    {
      path: "../public/font/GeneralSans-Extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/font/GeneralSans-ExtralightItalic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/font/GeneralSans-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/font/GeneralSans-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/font/GeneralSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/GeneralSans-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/font/GeneralSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/font/GeneralSans-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/font/GeneralSans-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/font/GeneralSans-SemiboldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/font/GeneralSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/font/GeneralSans-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ] as const satisfies FontSource[],
  variable: "--font-general-sans",
  display: "swap",
});
