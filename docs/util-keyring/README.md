
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

* ["util-crypto/src/blake2/asU8a"](modules/_util_crypto_src_blake2_asu8a_.md)
* ["util-crypto/src/blake2/blake2b/asU8a"](modules/_util_crypto_src_blake2_blake2b_asu8a_.md)
* ["util-crypto/src/nacl/decrypt"](modules/_util_crypto_src_nacl_decrypt_.md)
* ["util-crypto/src/nacl/encrypt"](modules/_util_crypto_src_nacl_encrypt_.md)
* ["util-crypto/src/nacl/keypair/fromSeed"](modules/_util_crypto_src_nacl_keypair_fromseed_.md)
* ["util-crypto/src/nacl/sign"](modules/_util_crypto_src_nacl_sign_.md)
* ["util-crypto/src/nacl/verify"](modules/_util_crypto_src_nacl_verify_.md)
* ["util-crypto/src/random/asU8a"](modules/_util_crypto_src_random_asu8a_.md)
* ["util-keyring/src/address/decode"](modules/_util_keyring_src_address_decode_.md)
* ["util-keyring/src/address/encode"](modules/_util_keyring_src_address_encode_.md)
* ["util-keyring/src/address/index"](modules/_util_keyring_src_address_index_.md)
* ["util-keyring/src/index"](modules/_util_keyring_src_index_.md)
* ["util-keyring/src/pair/decode"](modules/_util_keyring_src_pair_decode_.md)
* ["util-keyring/src/pair/defaults"](modules/_util_keyring_src_pair_defaults_.md)
* ["util-keyring/src/pair/encode"](modules/_util_keyring_src_pair_encode_.md)
* ["util-keyring/src/pair/getMeta"](modules/_util_keyring_src_pair_getmeta_.md)
* ["util-keyring/src/pair/index"](modules/_util_keyring_src_pair_index_.md)
* ["util-keyring/src/pair/nobody"](modules/_util_keyring_src_pair_nobody_.md)
* ["util-keyring/src/pair/setMeta"](modules/_util_keyring_src_pair_setmeta_.md)
* ["util-keyring/src/pair/toJson"](modules/_util_keyring_src_pair_tojson_.md)
* ["util-keyring/src/pairs"](modules/_util_keyring_src_pairs_.md)
* ["util-keyring/src/testing"](modules/_util_keyring_src_testing_.md)
* ["util-keyring/src/testingPairs"](modules/_util_keyring_src_testingpairs_.md)
* ["util/src/assert"](modules/_util_src_assert_.md)
* ["util/src/buffer/toU8a"](modules/_util_src_buffer_tou8a_.md)
* ["util/src/ext/error"](modules/_util_src_ext_error_.md)
* ["util/src/hex/hasPrefix"](modules/_util_src_hex_hasprefix_.md)
* ["util/src/hex/stripPrefix"](modules/_util_src_hex_stripprefix_.md)
* ["util/src/hex/toU8a"](modules/_util_src_hex_tou8a_.md)
* ["util/src/is/buffer"](modules/_util_src_is_buffer_.md)
* ["util/src/is/function"](modules/_util_src_is_function_.md)
* ["util/src/is/hex"](modules/_util_src_is_hex_.md)
* ["util/src/is/instanceOf"](modules/_util_src_is_instanceof_.md)
* ["util/src/is/string"](modules/_util_src_is_string_.md)
* ["util/src/is/u8a"](modules/_util_src_is_u8a_.md)
* ["util/src/u8a/concat"](modules/_util_src_u8a_concat_.md)
* ["util/src/u8a/fixLength"](modules/_util_src_u8a_fixlength_.md)
* ["util/src/u8a/fromString"](modules/_util_src_u8a_fromstring_.md)
* ["util/src/u8a/fromUtf8"](modules/_util_src_u8a_fromutf8_.md)
* ["util/src/u8a/polyfill/textEncoder"](modules/_util_src_u8a_polyfill_textencoder_.md)
* ["util/src/u8a/toBuffer"](modules/_util_src_u8a_tobuffer_.md)
* ["util/src/u8a/toHex"](modules/_util_src_u8a_tohex_.md)
* ["util/src/u8a/toU8a"](modules/_util_src_u8a_tou8a_.md)

---

