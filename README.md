# asdfgh

[![npm version](https://badge.fury.io/js/asdfgh.svg)](https://badge.fury.io/js/asdfgh)

Lightweight, asynchronous wrapper for zxcvbn.  asdfgh is about 616 bytes min+gzip, it will only load zxcvbn (~200kb) when it's actually used.

**Made for use in a browser either directly, or via a Node-style bundler such as Browserify or Webpack.**

## Installation

```
npm i asdfgh
```

## Usage

```
import asdfgh from 'asdfgh';

async function checkPassphrase(pwd) {
  try {
    // check passphrase
    var result = await asdfgh(pwd);

    // do something with the results
    ...
  } catch(err) {
    ...
  }
}

// must call before any password check
function changeAsdfghOptions() {
  // default values used

  // url to load zxcvbn from
  const url = "https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js";

  // integrity parameter for script element
  const integritySRI = "sha256-Znf8FdJF85f1LV0JmPOob5qudSrns8pLPZ6qkd/+F0o=";

  // max time to wait for zxcvbn before timing out
  const timeout = 5000;

  asdfgh.setDefaults(url, integritySRI, timeoutMS);
}
```

## Interface

* `asdfgh(passphrase, user_inputs)` - exports a function which is a promisified wrapper for zxcvbn
  * arguments: [see zxcvbn](https://github.com/dropbox/zxcvbn)
* `asdfgh.setDefaults(url, integritySRI, timeoutMS)`
  * Must be called before any passphrase checks are started
  * default:
    * version: 4.4.2
    * from [cdnjs/cloudflare](https://cdnjs.com/libraries/zxcvbn)
  * `url` (default cloudflare/cdnjs) is the location of the zxcvbn.js to load
  * `integritySRI` [optional] integrity SRI for script element
  * `timeoutMS` [optional] milliseconds to wait for zxcvbn to load before timing out


  ## License

  MIT License