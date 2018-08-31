(function() {
  var defaultUrl =
    "https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js";
  var defaultIntegrity = "sha256-Znf8FdJF85f1LV0JmPOob5qudSrns8pLPZ6qkd/+F0o=";

  var loadUrl = defaultUrl;
  var loadIntegrity = defaultIntegrity;
  var loadTimeout = 5000;

  var loadScriptPromise = null;

  function loadLibrary() {
    if (typeof zxcvbn === "function") return Promise.resolve(zxcvbn);
    if (loadScriptPromise) return loadScriptPromise;

    var c = 0;
    var hnd = null;
    return (loadScriptPromise = new Promise(function(resolve, reject) {
      // create and attach zxcvbn script
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.onload = function() {
        resolve(zxcvbn);
      };
      script.onerror = reject;
      script.src = loadUrl;
      if (loadIntegrity) {
        script.integrity = loadIntegrity;
      }
      script.crossOrigin = "anonymous";
      document.getElementsByTagName("head")[0].appendChild(script);

      // timeout and fallback for onload/onerror
      hnd = setInterval(function() {
        c++;
        if (typeof zxcvbn === "function") {
          return resolve(zxcvbn);
        }
        if (c * 100 > loadTimeout) {
          return reject(new Error("Timeout loading zxcvbn"));
        }
      }, 100);
    }).then(
      function(zxcvbn) {
        // remove heavy promise wrapper
        clearInterval(hnd);
        return (loadScriptPromise = Promise.resolve(zxcvbn));
      },
      function(error) {
        // when an error happens, clear the saved promise
        clearInterval(hnd);
        loadScriptPromise = null;
        throw error;
      }
    ));
  }

  var asdfgh = function(password, user_inputs) {
    return loadLibrary().then(function(zxcvbn) {
      return zxcvbn(password, user_inputs);
    });
  };

  asdfgh.setDefaults = function(url, integrity, timeout) {
    loadUrl = url;
    loadIntegrity = integrity;
    if (!isNaN(timeout) && timeout > 0) {
      loadTimeout = timeout;
    }
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = asdfgh;
  } else if (window) {
    window.asdfgh = asdfgh;
  } else {
    throw new Error(
      "asdfgh: Not in a Node/Browserify/Webpack or browser environment."
    );
  }
})();
