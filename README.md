[![polkadotjs](https://img.shields.io/badge/polkadot-js-orange?label=&logo=&style=for-the-badge)](https://polkadot.js.org)
![license](https://img.shields.io/badge/License-Apache%202.0-blue?label=&logo=apache&style=for-the-badge)
[![npm](https://img.shields.io/npm/v/@polkadot/util?label=&logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@polkadot/util)
[![beta](https://img.shields.io/npm/v/@polkadot/util/beta?label=&logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@polkadot/util)
[![travisci](https://img.shields.io/travis/com/polkadot-js/common?label=label=&logo=travis&style=for-the-badge)](https://travis-ci.com/polkadot-js/common)
[![circleci](https://img.shields.io/circleci/build/github/polkadot-js/common/master?label=&logo=circleci&style=for-the-badge)](https://circleci.com/gh/polkadot-js/common)
[![maintainability](https://img.shields.io/codeclimate/maintainability/polkadot-js/common?label=&logo=code-climate&style=for-the-badge)](https://codeclimate.com/github/polkadot-js/common)
[![coverage](https://img.shields.io/codeclimate/coverage/polkadot-js/common?label=&logo=code-climate&style=for-the-badge)](https://codeclimate.com/github/polkadot-js/common)
[![greenkeeper](https://img.shields.io/badge/greenkeeper-enabled-brightgreen?label=&logo=greenkeeper&style=for-the-badge)](https://greenkeeper.io/)

# @polkadot/common

Various useful utility functions that are used across all projects in the [@polkadot](https://polkadot.js.org) namespace. It provides utility functions with additional safety checks, allowing not only for consistent coding, but also reducing the general boilerplate.

## overview

This repository is split up into a number of internal packages, namely utilities -

- [keyring](packages/keyring/) Keyring management
- [util](packages/util/) General utilities
- [util-crypto](packages/util-crypto/) Crypto and hashing utilities
- [util-rlp](packages/util-rlp/) RLP encoding & decoding

Various useful trie and database interfaces -

- [db](packages/db/) Sync memory and disk database interfaces
- [trie-db](packages/trie-db/) Merkle Patricia Tree implementation adapted for Polkadot
- [trie-hash](packages/trie-hash/) Calculate hashes (either ordered or unordered) from a set of inputs

## development

Contributions are welcome!

To start off, this repo (along with others in the [@polkadot](https://github.com/polkadot-js/) family) uses yarn workspaces to organise the code. As such, after cloning, its dependencies _should_ be installed via `yarn`, not via npm; the latter will result in broken dependencies.

To get started -

1. Clone the repo locally, via `git clone https://github.com/polkadot-js/common <optional local path>`
2. Ensure that you have a recent version of Node.js, for development purposes [Node 10](https://nodejs.org/en/) is recommended.
3. Ensure that you have a recent version of Yarn, for development purposes [Yarn >=1.10.1](https://yarnpkg.com/docs/install) is required.
4. Install the dependencies by running `yarn`
5. Build the everything via `yarn run build`
6. You can also launch the API Docs, via `yarn vuepress dev docs`
7. Access the docs via [http://localhost:8080](http://localhost:8080)

## tutorials

Looking for tutorials to get started? Look at [examples](https://polkadot.js.org/api/examples/keyring/) for guides on how to use the base utilities.
