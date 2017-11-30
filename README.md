![ISC](https://img.shields.io/badge/license-ISC-lightgrey.svg)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/Flet/semistandard)
[![npm (scoped)](https://img.shields.io/npm/v/@polkadot/util.svg)](https://www.npmjs.com/package/@polkadot/util)
[![Build Status](https://travis-ci.org/polkadot-js/util.svg?branch=master)](https://travis-ci.org/polkadot-js/util)
[![Coverage Status](https://coveralls.io/repos/github/polkadot-js/util/badge.svg?branch=master)](https://coveralls.io/github/polkadot-js/util?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/polkadot-js/util.svg)](https://greenkeeper.io/)
[![Dependency Status](https://david-dm.org/polkadot-js/util.svg)](https://david-dm.org/polkadot-js/util)
[![devDependency Status](https://david-dm.org/polkadot-js/util/dev-status.svg)](https://david-dm.org/polkadot-js/util#info=devDependencies)

# @polkadot/util

Various useful utility functions that are used across all projects in the @polkadot namespace. It provides utility functions with additional safety checks, allowing not only for consistent coding, but also reducing the general boilerplate.

## Usage

Installation -

```
npm install --save @polkadot/util
```

Functions can be imported directly from the package, e.g.

```js
import { isHex } from '@polkadot/util';
```

Alternatively the function can be accessed directly,

```js
import isHex from '@polkadot/util/is/hex';
```

## Available Utilities

For a list of currently exposed methods, see the [library documentation](docs/README.md).
