// Service Worker v999 - SELF DESTRUCT & CLEAR ALL
// This version unregisters itself and clears all caches

self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.map(function(key) {
          console.log('Deleting cache:', key);
          return caches.delete(key);
        })
      );
    }).then(function() {
      // Unregister this service worker
      return self.registration.unregister();
    }).then(function() {
      // Force all clients to reload
      return self.clients.matchAll();
    }).then(function(clients) {
      clients.forEach(function(client) {
        client.navigate(client.url);
      });
    })
  );
});

// Don't cache anything - pass all requests through
self.addEventListener('fetch', function(e) {
  e.respondWith(fetch(e.request));
});
