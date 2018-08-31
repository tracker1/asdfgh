# asdfgh

Asynchronous wrapper for use of zxcvbn in npm

For now, this only works when used in conjunction with tooling like Webpack or Browserify.  It is not build to be used in Node.js directly.

## Installation

```
npm i asdfgh
```

## Usage

```
import asdfgh from 'asdfgh'

// by default loads from cdnjs
// override with optional setting
//
// asdfgh.setDefaults(url, integritySRI, timeoutMS)
async function checkPassphrase(pwd) {
  try {
    var result = await asdfgh(pwd);
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