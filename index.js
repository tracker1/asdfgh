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
    var c = 0;
    var hnd = setInterval(function(){
      c++;
      if (typeof zxcvbn === 'function') {
        clearInterval(hnd);
        return resolve(zxcvbn);
      }
      if (c * 100 > loadTimeout) {
        clearInterval(hnd);
        return reject(new Error('Timeout loading zxcvbn'));
      }
    }, 100);
  }).then(function(zxcvbn) {
    // remove heavy promise wrapper
    return (loadScriptPromise = Promise.resolve(zxcvbn));
  }, function(error) {
    // when an error happens, clear the saved promise
    loadScriptPromise = null;
    throw error;
  }));
}

module.exports = function(password, user_inputs) {
  return loadLibrary().then(function(zxcvbn) {
    return zxcvbn(password, user_inputs);
  });
};

module.exports.setDefaults(url, integrity, timeout) {
  loadUrl = url;
  loadIntegrity = integrity;
  if (!isNaN(timeout) && timeout > 0) {
    loadTimeout = timeout;
  }
}
