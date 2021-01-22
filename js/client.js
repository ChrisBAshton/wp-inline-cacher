(function () {
  // @TODO: minify & uglify this whole file, as it is inlined on the client
  var cutsTheMustard = "serviceWorker" in navigator;
  if (!cutsTheMustard) {
    console.log("inline-cache is not supported by this browser.");
    return;
  }

  // Set up service worker. It MUST live at the root to be able to intercept all requests.
  navigator.serviceWorker.register("/inline-cache-sw.js").then(function (reg) {
    if(reg.installing) {
      console.log('Service worker installing');
    } else if(reg.waiting) {
      console.log('Service worker installed');
    } else if(reg.active) {
      console.log('Service worker active');
    }
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });

  window.addEventListener('DOMContentLoaded', function (event) {
    // Detect resources in the page marked for inline caching
    // @TODO - only run this step if service worker successfully installs
    var stylesheetsToCache = [];
    Array.from(document.getElementsByTagName("style")).forEach(function (stylesheet) {
      if (stylesheet.getAttribute("data-src") && stylesheet.getAttribute("data-inline-cache")) {
        console.log("Found a stylesheet to cache", stylesheet);
        stylesheetsToCache.push({
          url: stylesheet.getAttribute("data-src"),
          hash: stylesheet.getAttribute("data-inline-cache"),
          value: stylesheet.innerText.trim(),
        });
      }
    });

    if (stylesheetsToCache.length > 0) {
      caches.open("inline-cache").then(function (cache) {
        stylesheetsToCache.forEach(function (stylesheet) {
          console.log("Saving stylesheet in cache...", stylesheet);
          cache.put(stylesheet.url, new Response(
            stylesheet.value,
            {
              "status": 200,
              "statusText": "OK",
              "headers": {
                "Content-Type":"text/css; charset=utf-8",
              },
            },
          ));
        });
      });

      function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }

      // update the cookie, so the server knows what's cached locally
      var cookie = JSON.parse(getCookie("inline-cacher") || "{}");
      stylesheetsToCache.forEach(function(stylesheet) {
        cookie[stylesheet.url] = stylesheet.hash;
      });
      document.cookie = "inline-cacher=" + JSON.stringify(cookie);

      // update the cache manifest, so the service worker only intercepts
      // resource requests that it knows have been cached already
      caches.open("inline-cache").then(function (cache) {
        cache.put("manifest", new Response(JSON.stringify(cookie)));
      });
    }
    else {
      console.log("No fresh resources to cache.");
    }
  });
})();