[![polkadotjs](https://img.shields.io/badge/polkadot-js-orange.svg?style=flat-square)](https://polkadot.js.org)
![isc](https://img.shields.io/badge/license-ISC-lightgrey.svg?style=flat-square)
[![style](https://img.shields.io/badge/code%20style-semistandard-lightgrey.svg?style=flat-square)](https://github.com/Flet/semistandard)
[![npm](https://img.shields.io/npm/v/@polkadot/trie-db.svg?style=flat-square)](https://www.npmjs.com/package/@polkadot/trie-db)
[![travis](https://img.shields.io/travis/polkadot-js/trie-db.svg?style=flat-square)](https://travis-ci.org/polkadot-js/trie-db)
[![maintainability](https://img.shields.io/codeclimate/maintainability/polkadot-js/trie-db.svg?style=flat-square)](https://codeclimate.com/github/polkadot-js/trie-db/maintainability)
[![coverage](https://img.shields.io/coveralls/polkadot-js/trie-db.svg?style=flat-square)](https://coveralls.io/github/polkadot-js/trie?branch=master)
[![dependency](https://david-dm.org/polkadot-js/trie.svg?style=flat-square&path=packages/trie-db)](https://david-dm.org/polkadot-js/trie?path=packages/trie-db)
[![devDependency](https://david-dm.org/polkadot-js/trie-db/dev-status.svg?style=flat-square&path=packages/trie-db)](https://david-dm.org/polkadot-js/trie-db?path=packages/trie-db#info=devDependencies)

# @polkadot/trie-db

A re-implementation of a Patricia Trie. Unlike other implementations, this allows for the specification of a hash function as well as encoder/decoder and operates in a sync fashion by default.

This is a JavaScript port of the [Python Ethereum Trie](https://github.com/ethereum/py-trie) with additions to support transactions (checkpoints) and multiple hashing (npot only Keccak, but also Blake2 as found in Polkadot).

## Usage

Installation -

```
yarn add @polkadot/trie-db
```

Classes can be imported as follows:

```js
import Trie from '@polkadot/trie-db'; // Default export
```

## Documentation and Available Utilities

Below is a list of currently exposed methods published at the [Polkadot-JS Common Documentation Portal](https://polkadot.js.org/common/trie-db/).

- [trie-db](https://polkadot.js.org/common/trie-db/README.md)
  - Classes
    - [Trie](https://polkadot.js.org/common/trie-db/classes/_index_.trie.md)
  - Functions
    - Util
      - [is](https://polkadot.js.org/common/trie-db/modules/_util_is_.md)
      - [key](https://polkadot.js.org/common/trie-db/modules/_util_key_.md)
      - [nibbles](https://polkadot.js.org/common/trie-db/modules/_util_nibbles_.md)
      - [node](https://polkadot.js.org/common/trie-db/modules/_util_node_.md)