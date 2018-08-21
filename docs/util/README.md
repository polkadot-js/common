
[![polkadotjs](https://img.shields.io/badge/polkadot-js-orange.svg?style=flat-square)](https://polkadot.js.org) ![isc](https://img.shields.io/badge/license-ISC-lightgrey.svg?style=flat-square) [![style](https://img.shields.io/badge/code%20style-semistandard-lightgrey.svg?style=flat-square)](https://github.com/Flet/semistandard) [![npm](https://img.shields.io/npm/v/@polkadot/util.svg?style=flat-square)](https://www.npmjs.com/package/@polkadot/util) [![travis](https://img.shields.io/travis/polkadot-js/common.svg?style=flat-square)](https://travis-ci.org/polkadot-js/common) [![maintainability](https://img.shields.io/codeclimate/maintainability/polkadot-js/common.svg?style=flat-square)](https://codeclimate.com/github/polkadot-js/common/maintainability) [![coverage](https://img.shields.io/coveralls/polkadot-js/common.svg?style=flat-square)](https://coveralls.io/github/polkadot-js/common?branch=master) [![dependency](https://david-dm.org/polkadot-js/common.svg?style=flat-square&path=packages/util)](https://david-dm.org/polkadot-js/common?path=packages/util) [![devDependency](https://david-dm.org/polkadot-js/common/dev-status.svg?style=flat-square&path=packages/util)](https://david-dm.org/polkadot-js/common?path=packages/util#info=devDependencies)

@polkadot/util
==============

Various useful utility functions that are used across all projects in the [@polkadot](https://polkadot.js.org) namespace. It provides utility functions with additional safety checks, allowing not only for consistent coding, but also reducing the general boilerplate.

Usage
-----

Installation -

```
npm install --save @polkadot/util
```

Functions can be imported directly from the package, e.g.

```js
import { isHex } from '@polkadot/util';
```

Alternatively the function can be accessed directly,

```js
import isHex from '@polkadot/util/is/hex';
```

Available Utilities
-------------------

For a list of currently exposed methods, see the [library documentation](docs/README.md).

## Index

### External modules

* ["array/filter"](modules/_array_filter_.md)
* ["array/index"](modules/_array_index_.md)
* ["assert"](modules/_assert_.md)
* ["bn/fromHex"](modules/_bn_fromhex_.md)
* ["bn/index"](modules/_bn_index_.md)
* ["bn/toBn"](modules/_bn_tobn_.md)
* ["bn/toHex"](modules/_bn_tohex_.md)
* ["bn/toU8a"](modules/_bn_tou8a_.md)
* ["buffer/fromU8a"](modules/_buffer_fromu8a_.md)
* ["buffer/index"](modules/_buffer_index_.md)
* ["buffer/toU8a"](modules/_buffer_tou8a_.md)
* ["ext/error"](modules/_ext_error_.md)
* ["ext/index"](modules/_ext_index_.md)
* ["hex/addPrefix"](modules/_hex_addprefix_.md)
* ["hex/fixLength"](modules/_hex_fixlength_.md)
* ["hex/fromBn"](modules/_hex_frombn_.md)
* ["hex/fromNumber"](modules/_hex_fromnumber_.md)
* ["hex/hasPrefix"](modules/_hex_hasprefix_.md)
* ["hex/index"](modules/_hex_index_.md)
* ["hex/stripPrefix"](modules/_hex_stripprefix_.md)
* ["hex/toBn"](modules/_hex_tobn_.md)
* ["hex/toNumber"](modules/_hex_tonumber_.md)
* ["hex/toU8a"](modules/_hex_tou8a_.md)
* ["index"](modules/_index_.md)
* ["is/bn"](modules/_is_bn_.md)
* ["is/boolean"](modules/_is_boolean_.md)
* ["is/buffer"](modules/_is_buffer_.md)
* ["is/error"](modules/_is_error_.md)
* ["is/function"](modules/_is_function_.md)
* ["is/hex"](modules/_is_hex_.md)
* ["is/index"](modules/_is_index_.md)
* ["is/instanceOf"](modules/_is_instanceof_.md)
* ["is/ip"](modules/_is_ip_.md)
* ["is/null"](modules/_is_null_.md)
* ["is/number"](modules/_is_number_.md)
* ["is/object"](modules/_is_object_.md)
* ["is/observable"](modules/_is_observable_.md)
* ["is/string"](modules/_is_string_.md)
* ["is/u8a"](modules/_is_u8a_.md)
* ["is/undefined"](modules/_is_undefined_.md)
* ["logger"](modules/_logger_.md)
* ["number/fromHex"](modules/_number_fromhex_.md)
* ["number/index"](modules/_number_index_.md)
* ["number/toHex"](modules/_number_tohex_.md)
* ["number/toU8a"](modules/_number_tou8a_.md)
* ["promisify"](modules/_promisify_.md)
* ["string/index"](modules/_string_index_.md)
* ["string/shorten"](modules/_string_shorten_.md)
* ["syncify"](modules/_syncify_.md)
* ["u8a/concat"](modules/_u8a_concat_.md)
* ["u8a/fixLength"](modules/_u8a_fixlength_.md)
* ["u8a/fromBn"](modules/_u8a_frombn_.md)
* ["u8a/fromBuffer"](modules/_u8a_frombuffer_.md)
* ["u8a/fromHex"](modules/_u8a_fromhex_.md)
* ["u8a/fromString"](modules/_u8a_fromstring_.md)
* ["u8a/fromUtf8"](modules/_u8a_fromutf8_.md)
* ["u8a/index"](modules/_u8a_index_.md)
* ["u8a/polyfill/textDecoder"](modules/_u8a_polyfill_textdecoder_.md)
* ["u8a/polyfill/textEncoder"](modules/_u8a_polyfill_textencoder_.md)
* ["u8a/toBn"](modules/_u8a_tobn_.md)
* ["u8a/toBuffer"](modules/_u8a_tobuffer_.md)
* ["u8a/toHex"](modules/_u8a_tohex_.md)
* ["u8a/toString"](modules/_u8a_tostring_.md)
* ["u8a/toU8a"](modules/_u8a_tou8a_.md)
* ["u8a/toUtf8"](modules/_u8a_toutf8_.md)

---

