// Pulse9 service worker
// Caches the static app shell so the UI can install as a PWA and reopen instantly.
// Live chat data always goes over the network (socket.io) — this never caches messages.

const CACHE_VERSION = "pulse9-shell-v1";
const APP_SHELL = ["/", "/manifest.webmanifest", "/icon-192.png", "/icon-512.png", "/pulse9_logo.png"];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => cache.addAll(APP_SHELL)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_VERSION).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const { request } = event;

  // Never intercept sockets, API calls, or non-GET requests.
  if (request.method !== "GET" || request.url.includes("/socket.io/")) return;

  event.respondWith(
    caches.match(request).then(
      cached =>
        cached ||
        fetch(request)
          .then(response => {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then(cache => cache.put(request, copy)).catch(() => {});
            return response;
          })
          .catch(() => cached)
    )
  );
});
