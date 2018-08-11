[![polkadotjs](https://img.shields.io/badge/polkadot-js-orange.svg?style=flat-square)](https://polkadot.js.org)
![isc](https://img.shields.io/badge/license-ISC-lightgrey.svg?style=flat-square)
[![style](https://img.shields.io/badge/code%20style-semistandard-lightgrey.svg?style=flat-square)](https://github.com/Flet/semistandard)
[![npm](https://img.shields.io/npm/v/@polkadot/util.svg?style=flat-square)](https://www.npmjs.com/package/@polkadot/util)
[![travis](https://img.shields.io/travis/polkadot-js/util.svg?style=flat-square)](https://travis-ci.org/polkadot-js/util)
[![maintainability](https://img.shields.io/codeclimate/maintainability/polkadot-js/util.svg?style=flat-square)](https://codeclimate.com/github/polkadot-js/util/maintainability)
[![coverage](https://img.shields.io/coveralls/polkadot-js/util.svg?style=flat-square)](https://coveralls.io/github/polkadot-js/util?branch=master)
[![greenkeeper](https://img.shields.io/badge/greenkeeper-enabled-brightgreen.svg?style=flat-square)](https://greenkeeper.io/)
[![dependency](https://david-dm.org/polkadot-js/util.svg?style=flat-square)](https://david-dm.org/polkadot-js/util)
[![devDependency](https://david-dm.org/polkadot-js/util/dev-status.svg?style=flat-square)](https://david-dm.org/polkadot-js/util#info=devDependencies)

# @polkadot/util

Various useful utility functions that are used across all projects in the [@polkadot](https://polkadot.js.org) namespace. It provides utility functions with additional safety checks, allowing not only for consistent coding, but also reducing the general boilerplate.

It is split up into a number of internal packages, namely utilities -

- [util](packages/util/) General utilities
- [util-crypto](packages/util-crypto/) Crypto and hashing utilities
- [util-keyring](packages/util-keyring/) Keyring management
- [util-rlp](packages/util-rlp/) RLP encoding & decoding

Various useful trie interfaces and utilities -

- [trie-db](packages/trie-db/) Merkle Patricia Tree implementation adapcted for Polkadot
- [trie-hash](packages/trie-hash/) Calculate hashes (either ordered or unordered) from a set of inputs

## Contributing

- Bootstrap the dependencies, `yarn`
- Make any changes in the relevant package, on master merges new versions will be published automatically to npmjs
