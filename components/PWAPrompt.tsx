"use client"

import { useEffect, useState } from "react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export default function PWAPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setDeferredPrompt(null)
      setShowPrompt(false)
    }
  }

  if (!showPrompt || !deferredPrompt) return null

  return (
    <div className="fixed bottom-20 md:bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">📱</span>
            <div>
              <h3 className="font-semibold text-gray-900">Install CineHub</h3>
              <p className="text-sm text-gray-600">Akses offline dan lebih cepat</p>
            </div>
          </div>
          <button onClick={() => setShowPrompt(false)} className="text-gray-400 hover:text-gray-600 text-xl">
            ✕
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleInstall}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
          >
            Install
          </button>
          <button
            onClick={() => setShowPrompt(false)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
          >
            Nanti
          </button>
        </div>
      </div>
    </div>
  )
}
