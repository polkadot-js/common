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

[![Greenkeeper badge](https://badges.greenkeeper.io/polkadot-js/util.svg)](https://greenkeeper.io/)

Various useful utility functions that are used across all projects in the [@polkadot](https://polkadot.js.org) namespace. It provides utility functions with additional safety checks, allowing not only for consistent coding, but also reducing the general boilerplate.

It is split up into a number of internal packages -

- [packages/util](packages/util/) General utilities
- [packages/util-crypto](packages/util-crypto/) Crypto and hashing utilities
- [packages/util-keyring](packages/util-crypto/) Keyring management
- [packages/util-rlp](packages/util-rlp/) RLP encoding & decoding
- [packages/util-triehash](packages/util-triehash/) Calculation of trie hashes

## Contributing

- Make sure you have [Lerna](https://lernajs.io/) installed, `yarn install -g lerna`
- Bootstrap the dependencies, `yarn`
- Make any changes in the relevant package, on master merges new versions will be published automatically
