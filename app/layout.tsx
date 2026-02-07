import type { Metadata, Viewport } from "next";
// import { Lato } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { Toaster } from "sonner";

// const lato = Lato({
//   weight: ["400", "700"],
//   variable: "--font-sans",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "YveChart | Design System Architecture Visually",
  description:
    "Create, design, and visualize complex system architectures with an intuitive canvas-based editor.",
  keywords: [
    "architecture",
    "design",
    "system design",
    "visualization",
    "Infrastructure",
  ],
  authors: [{ name: "YveChart" }],
  openGraph: {
    title: "YveChart",
    description: "Design System Architecture Visually",
    type: "website",
  },
  icons: {
    icon: "/yvechart_logo.svg",
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#3B82F6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/dheereshag/coloured-icons@master/app/ci.min.css"
        />
      </head>
      <body className="antialiased">
          <AuthProvider>{children}</AuthProvider>
          <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
