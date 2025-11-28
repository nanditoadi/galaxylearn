/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope

const CACHE_NAME = "galaxylearn-v1"
const PRECACHE_URLS = ["/", "/offline.html", "/icon-192x192.png", "/icon-512x512.png"]

const STATIC_ASSETS = [/\.(js|css|woff|woff2)$/, /\/placeholder\.svg/]

self.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch(() => {
        console.log("[SW] Initial cache failed - continuing anyway")
      })
    }),
  )
  self.skipWaiting()
})

self.addEventListener("activate", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  self.clients.claim()
})

self.addEventListener("fetch", (event: FetchEvent) => {
  const { request } = event
  const url = new URL(request.url)

  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // Return cached response if available
      if (cachedResponse) {
        return cachedResponse
      }

      // Try to fetch from network
      return fetch(request)
        .then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type === "error") {
            return response
          }

          // Clone the response for caching
          const responseToCache = response.clone()

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache)
          })

          return response
        })
        .catch(() => {
          // Offline fallback for HTML pages
          if (request.headers.get("accept")?.includes("text/html")) {
            return caches.match("/offline.html").catch(() => {
              // Last resort: return a minimal response
              return new Response("Offline - Unable to load page", {
                status: 503,
                statusText: "Service Unavailable",
                headers: new Headers({
                  "Content-Type": "text/plain",
                }),
              })
            })
          }

          // For images/assets, return a placeholder
          if (request.headers.get("accept")?.includes("image")) {
            return new Response(
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="#f0f0f0" width="400" height="300"/><text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="16" fill="#999">Offline</text></svg>',
              {
                status: 200,
                headers: new Headers({
                  "Content-Type": "image/svg+xml",
                }),
              },
            )
          }

          return fetch(request)
        })
    }),
  )
})

export {}
