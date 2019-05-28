// Files to cache
var cacheName = 'iteliosPWATOTEM-v1';

var appShellFiles = [
  'audio/1.mp3',
  'images/logo_itelios@2x.png',

  'images/icons/favicon.ico',
  'images/icons/icon-32.png',
  'images/icons/icon-72.png',
  'images/icons/icon-96.png',
  'images/icons/icon-128.png',
  'images/icons/icon-144.png',
  'images/icons/icon-152.png',
  'images/icons/icon-192.png',
  'images/icons/icon-384.png',
  'images/icons/icon-512.png',

  'js/interact.min.js',
  'js/jquery.min.js',
  'js/app.js',

  'style/style.css',
  'index.html',

];

var gamesImages = [];

var contentToCache = appShellFiles.concat(gamesImages);

// Installing Service Worker
self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(contentToCache);
    })
  );
});

// Fetching content using Service Worker
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});