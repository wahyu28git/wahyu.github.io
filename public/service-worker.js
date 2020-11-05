importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox){
  console.log(`Workbox berhasil dimuat`);
  workbox.precaching.precacheAndRoute([
    { url: '/nav.html', revision: '2' },
    { url: '/index.html', revision: '2' },
    { url: '/manifest.json', revision: '2' },
    { url: '/EPL-Logo512.png', revision: '2' },
    { url: '/EPL-Logo192.png', revision: '2' },
    { url: '/favicon.ico', revision: '2' },
    { url: '/pages/standings.html', revision: '2' },
    { url: '/pages/teams.html', revision: '2' },
    { url: '/pages/favorit.html', revision: '2' },
    { url: '/pages/about.html', revision: '2' },
    { url: '/detail.html', revision: '2' },
    { url: '/css/materialize.min.css', revision: '2' },
    { url: '/js/materialize.min.js', revision: '2' },
    { url: '/nav.js', revision: '2' },
    { url: '/api.js', revision: '2' },
    { url: '/idb.js', revision: '2' },
    { url: '/js/req.js', revision: '2' },
]);

workbox.routing.registerRoute(
  /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
  workbox.strategies.cacheFirst({
      cacheName: 'images-cache',
      plugins: [
      new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
      ]
  })
  );


workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate()
  )

workbox.routing.registerRoute(
/\.(?:js|css)$/,
new workbox.strategies.StaleWhileRevalidate({
cacheName: 'static-resources',
})
);

workbox.routing.registerRoute(
new RegExp('/pages/'),
workbox.strategies.staleWhileRevalidate({
  cacheName: 'pages'
})
);

}else{
console.log(`Workbox gagal dimuat`);
}

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
