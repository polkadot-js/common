[![polkadotjs](https://img.shields.io/badge/polkadot-js-orange.svg?style=flat-square)](https://polkadot.js.org)
![isc](https://img.shields.io/badge/license-ISC-lightgrey.svg?style=flat-square)
[![style](https://img.shields.io/badge/code%20style-semistandard-lightgrey.svg?style=flat-square)](https://github.com/Flet/semistandard)
[![npm](https://img.shields.io/npm/v/@polkadot/util-crypto.svg?style=flat-square)](https://www.npmjs.com/package/@polkadot/util-crypto)
[![travis](https://img.shields.io/travis/polkadot-js/common.svg?style=flat-square)](https://travis-ci.org/polkadot-js/common)
[![maintainability](https://img.shields.io/codeclimate/maintainability/polkadot-js/common.svg?style=flat-square)](https://codeclimate.com/github/polkadot-js/common/maintainability)
[![coverage](https://img.shields.io/coveralls/polkadot-js/common.svg?style=flat-square)](https://coveralls.io/github/polkadot-js/common?branch=master)
[![dependency](https://david-dm.org/polkadot-js/common.svg?style=flat-square&path=packages/util)](https://david-dm.org/polkadot-js/common?path=packages/util-crypto)
[![devDependency](https://david-dm.org/polkadot-js/common/dev-status.svg?style=flat-square&path=packages/util-crypto)](https://david-dm.org/polkadot-js/common?path=packages/util-crypto#info=devDependencies)

# @polkadot/util-crypto

Various useful cyrpto utility functions that are used across all projects in the [@polkadot](https://polkadot.js.org) namespace. It provides utility functions with additional safety checks, allowing not only for consistent coding, but also reducing the general boilerplate.

## Available Utilities

For a list of currently exposed methods, see the [Polkadot-JS Common Documentation Portal](https://polkadot.js.org/api/common/util-crypto/).

### Blake2b

* Creates a blake2b u8a output containing a hash from a u8a input bytes using given bit-length or default bit-length of 256. An optional key u8a of up to 64 bytes may be provided
* Creates a blake2b hex string with optionally specified bit-length from the u8a input or default bit-length used is 256
* Uses the [Blake2b](https://blake2.net/) hash function of [blakejs](https://www.npmjs.com/package/blakejs) library
* Note: All hashes used in Polkadot-JS are 32 bytes (i.e. 256 / 8)
* Note: BLAKE hash functions are in the Nacl library
* Note: Only handles up to 2**53 bytes of input

### Keccak

* Creates a Keccak-256 hex string from the input (such as for conversion from seed phrase)
* Creates a Keccak-256 Uint8Array from the input
* Uses the Keccak-256 hash function from the [js-sha3](https://www.npmjs.com/package/js-sha3) library

### Mnemonic

* Generate valid mnemonics (for account seed phrase) using [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
* Converts mnemonics to a valid seed secret with Uint8Array output

### Nacl

* Implements [NaCl](http://nacl.cr.yp.to/) secret-key authenticated encryption, public-key authenticated encryption, hashing, and public-key signatures
* Decrypts a message that has been encrypted with a secret key using Nacl
* Encrypts a message with a secret key and generates an associated nonce using Nacl
* Signing a message with a secret key to generate a valid signature using Nacl
* Verifies a signed message by providing the message, signature, and public key (associated with the secret key that signed it) using Nacl

### Random

* Returns a sequence of secure random bytes in a variety of formats
* Creates a u8a with a specified (optional) bit-length (default 32) filled with random bytes
* Creates a hex string with a specified (optional) bit-length (default 32) filled with random bytes
* Creates a random number from random secure bytes

### SHA-512

* Implements SHA-512 hashing functions for a variety of input and outputs
* Creates a SHA-512 hash of u8a input
* Uses the SHA-512 hash function of [tweetnacl](https://www.npmjs.com/package/tweetnacl) library

### xxHash

* Create xxhash64 values with specified bitlengths
* Creates a xxhash64 u8a from the input with a specified (optional) bit-length (default 64)
* Creates a xxhash64 hex string from the input with a specified (optional) bit-length (default 64)
* Uses [xxHash](http://cyan4973.github.io/xxHash/) to generate values as BN, hex & number output
