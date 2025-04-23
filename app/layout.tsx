import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "imgz | Placeholder Image Generator",
  description:
    "Generate placeholder images on the fly with customizable parameters",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "placeholder",
    "image generator",
    "dummy images",
    "imgz",
    "on-the-fly image",
  ],
  metadataBase: new URL("https://imgz.app"),
  openGraph: {
    title: "imgz | Placeholder Image Generator",
    description:
      "Generate placeholder images on the fly with customizable parameters.",
    url: "https://imgz.app",
    siteName: "imgz",
    images: [
      {
        url: "https://imgz.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "imgz | Placeholder Image Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "imgz | Placeholder Image Generator",
    description:
      "Generate placeholder images on the fly with customizable parameters.",
    images: ["https://imgz.app/og-image.png"],
    site: "@damianricobelli",
    creator: "@damianricobelli",
  },
  generator: "Next.js",
  applicationName: "imgz",
  category: "utility",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jakarta.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
