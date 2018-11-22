[![polkadotjs](https://img.shields.io/badge/polkadot-js-orange.svg?style=flat-square)](https://polkadot.js.org)
![license](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=flat-square)
[![style](https://img.shields.io/badge/code%20style-semistandard-lightgrey.svg?style=flat-square)](https://github.com/Flet/semistandard)
[![travis](https://img.shields.io/travis/polkadot-js/common.svg?style=flat-square)](https://travis-ci.org/polkadot-js/common)
[![maintainability](https://img.shields.io/codeclimate/maintainability/polkadot-js/common.svg?style=flat-square)](https://codeclimate.com/github/polkadot-js/common/maintainability)
[![coverage](https://img.shields.io/coveralls/polkadot-js/common.svg?style=flat-square)](https://coveralls.io/github/polkadot-js/common?branch=master)
[![greenkeeper](https://img.shields.io/badge/greenkeeper-enabled-brightgreen.svg?style=flat-square)](https://greenkeeper.io/)

# @polkadot/common

Various useful utility functions that are used across all projects in the [@polkadot](https://polkadot.js.org) namespace. It provides utility functions with additional safety checks, allowing not only for consistent coding, but also reducing the general boilerplate.

## overview

It is split up into a number of internal packages, namely utilities -

- [keyring](packages/keyring/) Keyring management
- [util](packages/util/) General utilities
- [util-crypto](packages/util-crypto/) Crypto and hashing utilities
- [util-rlp](packages/util-rlp/) RLP encoding & decoding

Various useful trie and database interfaces -

- [db](packages/db/) Sync memory and disk database interfaces
- [trie-db](packages/trie-db/) Merkle Patricia Tree implementation adapcted for Polkadot
- [trie-hash](packages/trie-hash/) Calculate hashes (either ordered or unordered) from a set of inputs

## development

Contributions are welcome!

To start off, this repo (along with others in the [@polkadot](https://github.com/polkadot-js/) family) uses yarn workspaces to organise the code. As such, after cloning, its dependencies _should_ be installed via `yarn`, not via npm; the latter will result in broken dependencies.

To get started -

1. Clone the repo locally, via `git clone https://github.com/polkadot-js/common <optional local path>`
2. Ensure that you have a recent version of Node.js, for development purposes [Node 10](https://nodejs.org/en/) is recommended.
3. Ensure that you have a recent version of Yarn, for development purposes [Yarn >=1.3.2](https://yarnpkg.com/docs/install) is required.
4. Install the dependencies by running `yarn`
5. Build the API Docs, via `yarn run build`
6. Ready! Now you can launch the API Docs, via `yarn gitbook serve`
7. Access the API Docs via [http://localhost:4000](http://localhost:4000)

## tutorials

Looking for tutorials to get started? Look at [examples](https://polkadot.js.org/api/examples/keyring/) for guides on how to use the base utilities.
