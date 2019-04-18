var CACHE_NAME = 'galang-cache';/*Memberi nama variable pada cache service worker*/
var urlsToCache = [
    '.',/*cache semua data yang ada di root server*/
    'index.html',
    'styles/main.css'
];
/*melakukan installasi service worker*/
self.addEventListener('install', function(event) {
    /**method menunggu sampai cache telah terbuka*/
    event.waitUntil(
        caches.open(CACHE_NAME)
            /*promises (method selanjutnya) mengisi galang-cache dengan isi array url pada variable urlsToCache*/
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});
/*melakukan fetch atau mengambil data pada cache service worker yang telah di registrasi*/
self.addEventListener('fetch', function(event) {
    /*Callback dengan response*/
    event.respondWith(
        /*menngecek kecocokan cache*/
        caches.match(event.request)
        /*promise setelah method berjalan*/
            .then(function(response) {
                /*Callback dengan reponse atau memanggil method fetchAndCache()
                dengan mengirim parameter event.request
                berupa url
                */
                return response || fetchAndCache(event.request);
            })
    );
});
/*membuat method fetchAndCache dengan paramter url
* yang akan digunakan saat melakukan fetch
* */
function fetchAndCache(url) {
    return fetch(url)
        .then(function(response) {
// Mengecek jika mendapat response yang tidak valid
            if (!response.ok) {
                throw Error(response.statusText);
            }
            /*Callback dengan membuka cache dan melakukan merge cache yang lama*/
            return caches.open(CACHE_NAME)
                .then(function(cache) {
                    cache.put(url, response.clone());
                    return response;
                });
        })
        //handle error dengan promises menampilkan pesan error pada konsole browser
        .catch(function(error) {
            console.log('Request failed:', error);
// You could return a custom offline 404 page here
        });
}
