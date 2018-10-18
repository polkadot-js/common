[![polkadotjs](https://img.shields.io/badge/polkadot-js-orange.svg?style=flat-square)](https://polkadot.js.org)
![isc](https://img.shields.io/badge/license-ISC-lightgrey.svg?style=flat-square)
[![style](https://img.shields.io/badge/code%20style-semistandard-lightgrey.svg?style=flat-square)](https://github.com/Flet/semistandard)
[![npm](https://img.shields.io/npm/v/@polkadot/keyring.svg?style=flat-square)](https://www.npmjs.com/package/@polkadot/keyring)
[![travis](https://img.shields.io/travis/polkadot-js/common.svg?style=flat-square)](https://travis-ci.org/polkadot-js/common)
[![maintainability](https://img.shields.io/codeclimate/maintainability/polkadot-js/common.svg?style=flat-square)](https://codeclimate.com/github/polkadot-js/common/maintainability)
[![coverage](https://img.shields.io/coveralls/polkadot-js/common.svg?style=flat-square)](https://coveralls.io/github/polkadot-js/common?branch=master)
[![dependency](https://david-dm.org/polkadot-js/common.svg?style=flat-square&path=packages/keyring)](https://david-dm.org/polkadot-js/common?path=packages/keyring)
[![devDependency](https://david-dm.org/polkadot-js/common/dev-status.svg?style=flat-square&path=packages/keyring)](https://david-dm.org/polkadot-js/common?path=packages/keyring#info=devDependencies)

# @polkadot/keyring

Key management of user accounts including generation and retrieval of keyring pairs from a variety of input combinations.

## Usage

Installation -

```
yarn add @polkadot/keyring
```

Classes and Functions can be imported as follows:

```js
import Keyring from '@polkadot/keyring'; // Default export
import { pair } from '@polkadot/keyring/pair';
import { testKeyring } from '@polkadot/keyring/testing';
```

## Documentation and Available Utilities

Below is a list of currently exposed methods published at the [Polkadot-JS Common Documentation Portal](https://polkadot.js.org/common/keyring/).

- [keyring](https://polkadot.js.org/common/keyring/README.md)
  - Classes
    - [Keyring](https://polkadot.js.org/common/keyring/classes/_index_.keyring.md)
  - Functions
    - [pair](https://polkadot.js.org/common/keyring/modules/_pair_index_.md)
    - [testKeyring](https://polkadot.js.org/common/keyring/modules/_testing_.md)
