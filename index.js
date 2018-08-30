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
    setTimeout(function() {
      reject({ message: "Timeout loading zxcvbn" });
    }, loadTimeout);
  }).then(null, function(error) {
    loadScriptPromise = null;
    reject(error);
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
