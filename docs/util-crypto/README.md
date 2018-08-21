
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

* ["util-crypto/src/blake2/asHex"](modules/_util_crypto_src_blake2_ashex_.md)
* ["util-crypto/src/blake2/asU8a"](modules/_util_crypto_src_blake2_asu8a_.md)
* ["util-crypto/src/blake2/blake2b/asHex"](modules/_util_crypto_src_blake2_blake2b_ashex_.md)
* ["util-crypto/src/blake2/blake2b/asU8a"](modules/_util_crypto_src_blake2_blake2b_asu8a_.md)
* ["util-crypto/src/blake2/blake2b/index"](modules/_util_crypto_src_blake2_blake2b_index_.md)
* ["util-crypto/src/blake2/index"](modules/_util_crypto_src_blake2_index_.md)
* ["util-crypto/src/index"](modules/_util_crypto_src_index_.md)
* ["util-crypto/src/keccak/asHex"](modules/_util_crypto_src_keccak_ashex_.md)
* ["util-crypto/src/keccak/asU8a"](modules/_util_crypto_src_keccak_asu8a_.md)
* ["util-crypto/src/keccak/index"](modules/_util_crypto_src_keccak_index_.md)
* ["util-crypto/src/nacl/decrypt"](modules/_util_crypto_src_nacl_decrypt_.md)
* ["util-crypto/src/nacl/encrypt"](modules/_util_crypto_src_nacl_encrypt_.md)
* ["util-crypto/src/nacl/index"](modules/_util_crypto_src_nacl_index_.md)
* ["util-crypto/src/nacl/keypair/fromRandom"](modules/_util_crypto_src_nacl_keypair_fromrandom_.md)
* ["util-crypto/src/nacl/keypair/fromSecret"](modules/_util_crypto_src_nacl_keypair_fromsecret_.md)
* ["util-crypto/src/nacl/keypair/fromSeed"](modules/_util_crypto_src_nacl_keypair_fromseed_.md)
* ["util-crypto/src/nacl/keypair/fromString"](modules/_util_crypto_src_nacl_keypair_fromstring_.md)
* ["util-crypto/src/nacl/sign"](modules/_util_crypto_src_nacl_sign_.md)
* ["util-crypto/src/nacl/verify"](modules/_util_crypto_src_nacl_verify_.md)
* ["util-crypto/src/random/asHex"](modules/_util_crypto_src_random_ashex_.md)
* ["util-crypto/src/random/asNumber"](modules/_util_crypto_src_random_asnumber_.md)
* ["util-crypto/src/random/asU8a"](modules/_util_crypto_src_random_asu8a_.md)
* ["util-crypto/src/random/index"](modules/_util_crypto_src_random_index_.md)
* ["util-crypto/src/sha512/asU8a"](modules/_util_crypto_src_sha512_asu8a_.md)
* ["util-crypto/src/sha512/index"](modules/_util_crypto_src_sha512_index_.md)
* ["util-crypto/src/xxhash/asHex"](modules/_util_crypto_src_xxhash_ashex_.md)
* ["util-crypto/src/xxhash/asU8a"](modules/_util_crypto_src_xxhash_asu8a_.md)
* ["util-crypto/src/xxhash/index"](modules/_util_crypto_src_xxhash_index_.md)
* ["util-crypto/src/xxhash/xxhash64/asBn"](modules/_util_crypto_src_xxhash_xxhash64_asbn_.md)
* ["util-crypto/src/xxhash/xxhash64/asHex"](modules/_util_crypto_src_xxhash_xxhash64_ashex_.md)
* ["util-crypto/src/xxhash/xxhash64/asRaw"](modules/_util_crypto_src_xxhash_xxhash64_asraw_.md)
* ["util-crypto/src/xxhash/xxhash64/asValue"](modules/_util_crypto_src_xxhash_xxhash64_asvalue_.md)
* ["util-crypto/src/xxhash/xxhash64/index"](modules/_util_crypto_src_xxhash_xxhash64_index_.md)
* ["util/src/hex/addPrefix"](modules/_util_src_hex_addprefix_.md)
* ["util/src/hex/hasPrefix"](modules/_util_src_hex_hasprefix_.md)
* ["util/src/hex/stripPrefix"](modules/_util_src_hex_stripprefix_.md)
* ["util/src/hex/toBn"](modules/_util_src_hex_tobn_.md)
* ["util/src/is/buffer"](modules/_util_src_is_buffer_.md)
* ["util/src/is/hex"](modules/_util_src_is_hex_.md)
* ["util/src/is/instanceOf"](modules/_util_src_is_instanceof_.md)
* ["util/src/is/string"](modules/_util_src_is_string_.md)
* ["util/src/u8a/fromUtf8"](modules/_util_src_u8a_fromutf8_.md)
* ["util/src/u8a/polyfill/textEncoder"](modules/_util_src_u8a_polyfill_textencoder_.md)
* ["util/src/u8a/toBuffer"](modules/_util_src_u8a_tobuffer_.md)
* ["util/src/u8a/toHex"](modules/_util_src_u8a_tohex_.md)

---

