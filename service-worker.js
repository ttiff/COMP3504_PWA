const cacheName = 'my-pwa-cache-v1';
const assetsToCache = [
    '/',
    '/index.html',
    '/styles/main.css',
    '/script.js',
    '/manifest.json',
];

// Install Service Worker
self.addEventListener('install', event => {

    event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assetsToCache)));
});

// Fetch from Cache
// self.addEventListener('fetch', event => {
//     event.respondWith(
//         caches.match(event.request).then(response => response || fetch(event.request))
//     );
// });

// Fetch from Cache with Time - Based Validation
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            // Check if we have a cached response
            if (cachedResponse) {
                // Get the timestamp from the cache response headers
                const cachedTime = new Date(cachedResponse.headers.get('date')).getTime();
                const now = new Date().getTime();
                const minuteInMs = 60 * 1000;

                // If cache is less than 1 minute old, return it
                if (now - cachedTime < minuteInMs) {
                    return cachedResponse;
                }
            }

            // Fetch from network and update cache
            return fetch(event.request).then(networkResponse => {
                // Clone the response since we need to use it twice
                const responseToCache = networkResponse.clone();

                // Update the cache with new response
                caches.open(cacheName).then(cache => {
                    cache.put(event.request, responseToCache);
                });

                return networkResponse;
            });
        })
    );
});


// Activate Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames.filter(name => name !== cacheName).map(name => caches.delete(name))
            )
        )
    );
});

