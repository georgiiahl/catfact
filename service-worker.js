// public/service-worker.js
self.addEventListener('install', (event) => {
    console.log('Service worker installing...');
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service worker activating...');
    event.waitUntil(clients.claim());
  });
  
  self.addEventListener('fetch', (event) => {
    console.log('Fetching:', event.request.url);
  });
  