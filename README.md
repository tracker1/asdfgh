# asdfgh

[![npm version](https://badge.fury.io/js/asdfgh.svg)](https://badge.fury.io/js/asdfgh)

Lightweight, asynchronous wrapper for zxcvbn.  asdfgh is about 900 bytes zipped, it will only load zxcvbn (~200kb) when it's actually used.

**Made for use in a browser either directly, or via a Node-style bundler such as Browserify or Webpack.**

## Installation

```
npm i asdfgh
```

## Usage

```
import asdfgh from 'asdfgh';

// by default loads from cdnjs
// override with optional setting
//
// asdfgh.setDefaults(url, integritySRI, timeoutMS)


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

```

## Interface

* `asdfgh(passphrase, user_inputs)` - exports a function which is a promisified wrapper for zxcvbn
  * arguments: [see zxcvbn](https://github.com/dropbox/zxcvbn)
* `asdfgh.setDefaults(url, integritySRI, timeoutMS)`
  * Must be callsed before any passphrase checks are started
  * default:
    * version: 4.4.2
    * from [cdnjs/cloudflare](https://cdnjs.com/libraries/zxcvbn)
  * `url` (default cloudflare/cdnjs) is the location of the zxcvbn.js to load
  * `integritySRI` [optional] integrity SRI for script element
  * `timeoutMS` [optional] milliseconds to wait for zxcvbn to load before timing out


  ## License

  MIT License