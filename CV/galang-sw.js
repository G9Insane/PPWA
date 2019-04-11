/*Menginstall Service Worker dengan callback melewatkan menunggu penginstalasi*/
self.addEventListener('install', function(event) {
    console.log('Service worker installing...');
    self.skipWaiting();
});
/*Mengaktifkan Service Worker */
self.addEventListener('activate', function(event) {
    console.log('Service worker activating...');
});
/* mengambil data (retrive | request )sesuai dengan url|uri */
self.addEventListener('fetch', function(event) {
    console.log('Fetching:', event.request.url);
});
