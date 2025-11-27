import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "GalaxyLearn",
  description: "Temukan keajaiban tata surya kita, dari planet raksasa hingga asteroid misterius yang mengelilingi matahari.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/192x192.png", sizes: "192x192", type: "image/png" },
      { url: "512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CineHub",
  },
  generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#1a1a2e",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="CineHub" />
      </head>
      <body className="bg-white text-gray-900">
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}

function ServiceWorkerRegistration() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
              navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                  console.log('[v0] Service Worker registered:', registration);
                })
                .catch(error => {
                  console.log('[v0] Service Worker registration failed:', error);
                });
            });
          }
        `,
      }}
    />
  )
}