const CACHE='wsd-pro-v1';
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html','./manifest.webmanifest'])));
});
self.addEventListener('activate',e=>{ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  if (url.origin===location.origin) {
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
  }
});