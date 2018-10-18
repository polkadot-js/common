# @polkadot/util-crypto

Various useful cyrpto utility functions that are used across all projects in the [@polkadot](https://polkadot.js.org) namespace. It provides utility functions with additional safety checks, allowing not only for consistent coding, but also reducing the general boilerplate.

## Usage

Installation -

```
yarn add @polkadot/util-crypto
```

Functions can be imported as follows:

```js
import { mnemonicGenerate } from '@polkadot/util-crypto';
```

## Documentation and Available Utilities

Below is a list of currently exposed methods published at the [Polkadot-JS Common Documentation Portal](https://polkadot.js.org/common/util-crypto/).

- [util-crypto](https://polkadot.js.org/common/util-crypto/README.md)
  - Functions
    - Blake2b
      - [blake2AsHex](https://polkadot.js.org/common/util-crypto/modules/_blake2_ashex_.md)
      - [blake2AsU8a](https://polkadot.js.org/common/util-crypto/modules/_blake2_asu8a_.md)
      - [blake2bAsHex](https://polkadot.js.org/common/util-crypto/modules/_blake2_blake2b_ashex_.md)
      - [blake2bAsU8a](https://polkadot.js.org/common/util-crypto/modules/_blake2_blake2b_asu8a_.md)
    - Keccak
      - [keccakAsHex](https://polkadot.js.org/common/util-crypto/modules/_keccak_ashex_.md)
      - [keccakAsU8a](https://polkadot.js.org/common/util-crypto/modules/_keccak_asu8a_.md)
    - Mnemonic
      - [mnemonicGenerate](https://polkadot.js.org/common/util-crypto/modules/_mnemonic_generate_.md)
	    - [mnemonicValidate](https://polkadot.js.org/common/util-crypto/modules/_mnemonic_validate_.md)
	    - [toSecret](https://polkadot.js.org/common/util-crypto/modules/_mnemonic_tosecret_.md)
    - Nacl
      - [naclDecrypt](https://polkadot.js.org/common/util-crypto/modules/_nacl_decrypt_.md)
      - [naclEncrypt](https://polkadot.js.org/common/util-crypto/modules/_nacl_encrypt_.md)
      - [naclKeypairFromRandom](https://polkadot.js.org/common/util-crypto/modules/_nacl_keypair_fromrandom_.md)
      - [naclKeypairFromSecret](https://polkadot.js.org/common/util-crypto/modules/_nacl_keypair_fromsecret_.md)
      - [naclKeypairFromSeed](https://polkadot.js.org/common/util-crypto/modules/_nacl_keypair_fromseed_.md)
      - [naclKeypairFromString](https://polkadot.js.org/common/util-crypto/modules/_nacl_keypair_fromstring_.md)
      - [naclSign](https://polkadot.js.org/common/util-crypto/modules/_nacl_sign_.md)
      - [naclVerify](https://polkadot.js.org/common/util-crypto/modules/_nacl_verify_.md)
    - Random
      - [randomAsHex](https://polkadot.js.org/common/util-crypto/modules/_random_ashex_.md)
      - [randomAsNumber](https://polkadot.js.org/common/util-crypto/modules/_random_asnumber_.md)
      - [randomAsU8a](https://polkadot.js.org/common/util-crypto/modules/_random_asu8a_.md)
    - SHA-512
      - [sha512AsU8a](https://polkadot.js.org/common/util-crypto/modules/_sha512_asu8a_.md)
    - xxHash
      - [xxhashAsHex](https://polkadot.js.org/common/util-crypto/modules/_xxhash_ashex_.md)
      - [xxhashAsU8a](https://polkadot.js.org/common/util-crypto/modules/_xxhash_asu8a_.md)
      - [xxhash64AsBn](https://polkadot.js.org/common/util-crypto/modules/_xxhash_xxhash64_asbn_.md)
      - [xxhash64AsHex](https://polkadot.js.org/common/util-crypto/modules/_xxhash_xxhash64_ashex_.md)
      - [xxhash64AsRaw](https://polkadot.js.org/common/util-crypto/modules/_xxhash_xxhash64_asraw_.md)
      - [xxhash64AsValue](https://polkadot.js.org/common/util-crypto/modules/_xxhash_xxhash64_asvalue_.md)

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
