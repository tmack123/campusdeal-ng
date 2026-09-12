// Service Worker v6 — Force fresh every time
const CACHE = 'campusdeal-v99';

self.addEventListener('install', function(e) {
  self.skipWaiting(); // Install immediately
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.map(function(key) {
          return caches.delete(key); // Delete ALL old caches
        })
      );
    }).then(function() {
      return self.clients.claim(); // Take control immediately
    })
  );
});

self.addEventListener('fetch', function(e) {
  // Always fetch fresh from network for HTML
  if(e.request.headers.get('accept') && e.request.headers.get('accept').includes('text/html')){
    e.respondWith(
      fetch(e.request, {cache: 'no-store'}).catch(function() {
        return caches.match(e.request);
      })
    );
    return;
  }
  // Always fetch fresh
  e.respondWith(
    fetch(e.request).catch(function() {
      return caches.match(e.request);
    })
  );
});
