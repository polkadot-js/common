[![polkadotjs](https://img.shields.io/badge/polkadot-js-orange.svg?style=flat-square)](https://polkadot.js.org)
![isc](https://img.shields.io/badge/license-ISC-lightgrey.svg?style=flat-square)
[![style](https://img.shields.io/badge/code%20style-semistandard-lightgrey.svg?style=flat-square)](https://github.com/Flet/semistandard)
[![npm](https://img.shields.io/npm/v/@polkadot/trie-hash.svg?style=flat-square)](https://www.npmjs.com/package/@polkadot/trie-hash)
[![travis](https://img.shields.io/travis/polkadot-js/trie-hash.svg?style=flat-square)](https://travis-ci.org/polkadot-js/trie-hash)
[![maintainability](https://img.shields.io/codeclimate/maintainability/polkadot-js/trie-hash.svg?style=flat-square)](https://codeclimate.com/github/polkadot-js/trie-hash/maintainability)
[![coverage](https://img.shields.io/coveralls/polkadot-js/trie-hash.svg?style=flat-square)](https://coveralls.io/github/polkadot-js/trie?branch=master)
[![dependency](https://david-dm.org/polkadot-js/trie.svg?style=flat-square&path=packages/trie-hash)](https://david-dm.org/polkadot-js/trie?path=packages/trie-hash)
[![devDependency](https://david-dm.org/polkadot-js/trie-hash/dev-status.svg?style=flat-square&path=packages/trie-hash)](https://david-dm.org/polkadot-js/trie-hash?path=packages/trie-hash#info=devDependencies)

# @polkadot/trie-hash

Calculate ordered and unordered [Ethereum Trie hashes](https://github.com/ethereum/wiki/wiki/Patricia-Tree) from inputs.

## Usage

Installation -

```
yarn add @polkadot/trie-hash
```

Functions can be imported as follows:

```js
import { trieRoot } from '@polkadot/trie-hash';
```

## Documentation and Available Utilities

Below is a list of currently exposed methods published at the [Polkadot-JS Common Documentation Portal](https://polkadot.js.org/common/trie-hash/).

- [trie-hash](https://polkadot.js.org/common/trie-hash/README.md)
  - Functions
    - Encode
      - [encode](https://polkadot.js.org/common/trie-hash/modules/_encode_index_.md)
      - [encodeAux](https://polkadot.js.org/common/trie-hash/modules/_encode_aux_.md)
      - [encodeHexPrefix](https://polkadot.js.org/common/trie-hash/modules/_encode_hexprefix_.md)
      - [encodePairs](https://polkadot.js.org/common/trie-hash/modules/_encode_pairs_.md)
      - [encodeShared](https://polkadot.js.org/common/trie-hash/modules/_encode_shared_.md)
      - [encodeSingle](https://polkadot.js.org/common/trie-hash/modules/_encode_single_.md)
    - Trie Root
      - [trieRoot](https://polkadot.js.org/common/trie-hash/modules/_root_.md)
      - [trieRootOrdered](https://polkadot.js.org/common/trie-hash/modules/_rootordered_.md)
    - Util
      - [asNibbles](https://polkadot.js.org/common/trie-hash/modules/_util_asnibbles_.md)
      - [fromNibbles](https://polkadot.js.org/common/trie-hash/modules/_util_fromnibbles_.md)
      - [genRoot](https://polkadot.js.org/common/trie-hash/modules/_util_genroot_.md)
      - [getSharedLength](https://polkadot.js.org/common/trie-hash/modules/_util_sharedlength_.md)
      - [pairsUniq](https://polkadot.js.org/common/trie-hash/modules/_util_pairsuniq_.md)
      - [sharedPrefixLength](https://polkadot.js.org/common/trie-hash/modules/_util_sharedprefixlength_.md)
