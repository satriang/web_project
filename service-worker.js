(function() {
  'use strict';

  var CACHE_NAME = 'static-cache';
  var urlsToCache = [
    '.',
    'index.html',
    'about.html',
    'modernizr-custom.js',
    'styles/main.css',
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css',
    'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js',
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js',
    'https://fonts.googleapis.com/css?family=Raleway:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i',
    'https://fonts.googleapis.com/css?family=Lora:400,400i,700,700i',
    'css/business-casual.min.css',
    'css/business-casual.css',
    'vendor/bootstrap/css/bootstrap.css',
    'vendor/bootstrap/css/bootstrap.css.map',
    'vendor/bootstrap/css/bootstrap.min.css',
    'vendor/bootstrap/css/bootstrap.min.css.map',
    'vendor/bootstrap/js/bootstrap.bundle.js',
    'vendor/bootstrap/js/bootstrap.bundle.js.map',
    'vendor/bootstrap/js/bootstrap.bundle.min.js',
    'vendor/bootstrap/js/bootstrap.bundle.min.js.map',
    'vendor/bootstrap/js/bootstrap.js',
    'vendor/bootstrap/js/bootstrap.js.map',
    'vendor/bootstrap/js/bootstrap.min.js',
    'vendor/bootstrap/js/bootstrap.min.js.map',
    'vendor/jquery/jquery.js',
    'vendor/jquery/jquery.min.js',
    'vendor/jquery/jquery.min.map',
    'vendor/jquery/jquery.slim.js',
    'vendor/jquery/jquery.slim.min.js',
    'vendor/jquery/jquery.slim.min.map',
    'images/',
    'img/',
    'gallery.html',
    
  ];

  self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
    );
  });

  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
      .then(function(response) {
        return response || fetchAndCache(event.request);
      })
    );
  });

  function fetchAndCache(url) {
    return fetch(url)
    .then(function(response) {
      // Check if we received a valid response
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return caches.open(CACHE_NAME)
      .then(function(cache) {
        cache.put(url, response.clone());
        return response;
      });
    })
    .catch(function(error) {
      console.log('Request failed:', error);
      // You could return a custom offline 404 page here
    });
  }

})();
