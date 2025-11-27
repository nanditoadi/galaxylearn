import type React from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation"; // ⬅ Tambahkan ini!

export const metadata: Metadata = {
  title: "GalaxyLearn",
  description:
    "Temukan keajaiban tata surya kita, dari planet raksasa hingga asteroid misterius yang mengelilingi matahari.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/512x512.png", sizes: "512x512", type: "image/png" }, // ⬅ perbaiki path
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "GalaxyLearn", // ⬅ sebelumnya masih "CineHub"
  },
  generator: "v0.app",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#1a1a2e",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="bg-slate-950">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="GalaxyLearn" />{" "}
        {/* update nama */}
      </head>

      {/* 🚀 Navbar Selalu Ada di Semua Halaman */}
      <body className="bg-slate-950 text-white min-h-screen overflow-x-hidden">
        <Navigation />

        <main className="pt-12 pb-10 min-h-screen bg-[#050814]">
          {children}
        </main>

        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}

function ServiceWorkerRegistration() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
              navigator.serviceWorker.register('/sw.js')
                .then(reg => console.log('[GalaxyLearn] Service Worker registered:', reg))
                .catch(err => console.log('[GalaxyLearn] SW registration failed:', err));
            });
          }
        `,
      }}
    />
  );
}
