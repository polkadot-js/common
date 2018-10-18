[![polkadotjs](https://img.shields.io/badge/polkadot-js-orange.svg?style=flat-square)](https://polkadot.js.org)
![mpl-2](https://img.shields.io/badge/license-MPL-lightgrey.svg?style=flat-square)
[![style](https://img.shields.io/badge/code%20style-semistandard-lightgrey.svg?style=flat-square)](https://github.com/Flet/semistandard)
[![npm](https://img.shields.io/npm/v/@polkadot/db.svg?style=flat-square)](https://www.npmjs.com/package/@polkadot/db)
[![travis](https://img.shields.io/travis/polkadot-js/common.svg?style=flat-square)](https://travis-ci.org/polkadot-js/common)
[![maintainability](https://img.shields.io/codeclimate/maintainability/polkadot-js/common.svg?style=flat-square)](https://codeclimate.com/github/polkadot-js/common/maintainability)
[![coverage](https://img.shields.io/coveralls/polkadot-js/common.svg?style=flat-square)](https://coveralls.io/github/polkadot-js/common?branch=master)
[![dependency](https://david-dm.org/polkadot-js/common.svg?style=flat-square&path=packages/db)](https://david-dm.org/polkadot-js/common?path=packages/db)
[![devDependency](https://david-dm.org/polkadot-js/common/dev-status.svg?style=flat-square&path=packages/db)](https://david-dm.org/polkadot-js/common?path=packages/db#info=devDependencies)

# @polkadot/db

This is an implementation of a basic sync in-memory and on-disk database with overlays. Memory is currently used by polkadot-js/client

## Usage

Installation -

```
yarn add @polkadot/db
```

Classes can be imported as follows:

```js
// Default exports
import DiskDb from '@polkadot/db/Disk';
import MemoryDb from '@polkadot/db/Memory';
import TransactionDb from '@polkadot/db/engines/TransactionDb';
```

## Documentation and Available Utilities

No classes or methods are exposed on the [Polkadot-JS Common Documentation Portal](https://polkadot.js.org/common/db/).

However, the key classes that are available include:

- db
  - Classes
    - Engines
      - DiskDb
      - MemoryDb
      - TransactionDb