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
      path: "../public/font/general-sans/GeneralSans-Extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/font/general-sans/GeneralSans-ExtralightItalic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/font/general-sans/GeneralSans-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/font/general-sans/GeneralSans-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/font/general-sans/GeneralSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/general-sans/GeneralSans-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/font/general-sans/GeneralSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/font/general-sans/GeneralSans-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/font/general-sans/GeneralSans-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/font/general-sans/GeneralSans-SemiboldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/font/general-sans/GeneralSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/font/general-sans/GeneralSans-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ] as const satisfies FontSource[],
  variable: "--font-general-sans",
  display: "swap",
});

export const poppins = localFont({
  src: [
    {
      path: "../public/font/poppins/Poppins-Thin.ttf",
      weight: "400",
      style: "normal",
    },
  ] as const satisfies FontSource[],
  variable: "--font-poppins",
});
