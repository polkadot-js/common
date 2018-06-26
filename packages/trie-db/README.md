[![polkadotjs](https://img.shields.io/badge/polkadot-js-orange.svg?style=flat-square)](https://polkadot.js.org)
![mpl-2](https://img.shields.io/badge/license-MPL-lightgrey.svg?style=flat-square)
[![style](https://img.shields.io/badge/code%20style-semistandard-lightgrey.svg?style=flat-square)](https://github.com/Flet/semistandard)
[![npm](https://img.shields.io/npm/v/@polkadot/trie-db.svg?style=flat-square)](https://www.npmjs.com/package/@polkadot/trie-db)
[![travis](https://img.shields.io/travis/polkadot-js/trie.svg?style=flat-square)](https://travis-ci.org/polkadot-js/trie)
[![maintainability](https://img.shields.io/codeclimate/maintainability/polkadot-js/trie.svg?style=flat-square)](https://codeclimate.com/github/polkadot-js/trie/maintainability)
[![coverage](https://img.shields.io/coveralls/polkadot-js/trie.svg?style=flat-square)](https://coveralls.io/github/polkadot-js/trie?branch=master)
[![dependency](https://david-dm.org/polkadot-js/trie.svg?style=flat-square&path=packages/trie)](https://david-dm.org/polkadot-js/trie?path=packages/trie-db)
[![devDependency](https://david-dm.org/polkadot-js/trie/dev-status.svg?style=flat-square&path=packages/trie-db)](https://david-dm.org/polkadot-js/trie?path=packages/trie-db#info=devDependencies)

# @polkadot/trie-db

An Implementation of the [Ethereum Merkle Patricia Tree](https://github.com/ethereum/wiki/wiki/Patricia-Tree) that uses Blake2 for hashing.

# Adapted from Ethereum

The has been adapted from the [original EthereumJs implementation](https://github.com/ethereumjs/merkle-patricia-tree) with the following changes -

- Introduce [TypeScript](https://www.typescriptlang.org/) into the mix
- ES6-ify as applicable (Classes, `self` -> `this`, `function() {}` -> `() => {}`)
- Moves to a Promise-based interface (as applicable)
- Support only Uint8Array key/values (Buffer/String in the original)
- Use utilities from [@polkadot/util](https://github.com/polkadot-js/common)
- Supports blake2 hashing (sha3 in the original), aligning with the Polkadot tech stack)
- Updated the build steps with sources moved to [src/](src/)
- Tests updated to use [Jest](https://facebook.github.io/jest/)
- Upgrade interfaces to latest [levelup](https://github.com/Level/levelup)
- Removed the secure interface (not applicable for Substrate chains)

... well at least the above is the _idea_ behind the fork ...
