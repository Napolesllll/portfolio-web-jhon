import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { CommandMenu } from "@/components/layout/command-menu";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Inter para texto general
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// JetBrains Mono para código
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jhoncano.com"),
  title: {
    default: "Jhon Cano | Full Stack Developer",
    template: "%s | Jhon Cano",
  },
  description:
    "Full Stack Developer especializado en crear aplicaciones web modernas y escalables. React, Next.js, TypeScript. De Medellín para el mundo.",
  keywords: [
    "Jhon Cano",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Prisma",
    "PostgreSQL",
    "Medellín",
    "Colombia",
    "Desarrollo Web",
    "Web Developer",
  ],
  authors: [{ name: "Jhon Cano", url: "https://jhoncano.com" }],
  creator: "Jhon Cano",
  publisher: "Jhon Cano",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/mylogo.png",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://jhoncano.com",
    title: "Jhon Cano | Full Stack Developer",
    description: "Construyendo experiencias web extraordinarias",
    siteName: "Jhon Cano Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jhon Cano - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jhon Cano | Full Stack Developer",
    description: "Construyendo experiencias web extraordinarias",
    creator: "@jhoncano",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://jhoncano.com",
    types: {
      "application/rss+xml": "https://jhoncano.com/feed.xml",
    },
  },
  verification: {
    google: "tu-codigo-de-verificacion",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider />
          <CommandMenu />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}