[![polkadotjs](https://img.shields.io/badge/polkadot-js-orange.svg?style=flat-square)](https://polkadot.js.org)
![isc](https://img.shields.io/badge/license-ISC-lightgrey.svg?style=flat-square)
[![style](https://img.shields.io/badge/code%20style-semistandard-lightgrey.svg?style=flat-square)](https://github.com/Flet/semistandard)
[![npm](https://img.shields.io/npm/v/@polkadot/primitives-json.svg?style=flat-square)](https://www.npmjs.com/package/@polkadot/primitives-json)
[![travis](https://img.shields.io/travis/polkadot-js/types.svg?style=flat-square)](https://travis-ci.org/polkadot-js/types)
[![maintainability](https://img.shields.io/codeclimate/maintainability/polkadot-js/types.svg?style=flat-square)](https://codeclimate.com/github/polkadot-js/types/maintainability)
[![coverage](https://img.shields.io/coveralls/polkadot-js/types.svg?style=flat-square)](https://coveralls.io/github/polkadot-js/types?branch=master)
[![dependency](https://david-dm.org/polkadot-js/types.svg?style=flat-square&path=packages/primitives-json)](https://david-dm.org/polkadot-js/types?path=packages/primitives-json)
[![devDependency](https://david-dm.org/polkadot-js/types/dev-status.svg?style=flat-square&path=packages/primitives-json)](https://david-dm.org/polkadot-js/types?path=packages/primitives-json#info=devDependencies)

# @polkadot/primitives-json

Conversion of Polkadot types to and from a structure with Json-only primitives, ready for serialisation. As such, it does not stringify itself, rather converts from complex classes to the correct Json reprsentation.

## Usage

Installation -

```
npm install --save @polkadot/primitives-json
```

Usage -

```js
const { parachainIdDecode, parachainIdEncode } from '@polkadot/primitives-json');

parachainIdDecode(     // step 3 - BN `0x123456`
  parachainIdEncode(   // step 1 -  string `'0x123456'`
    new BN('0x123456') // step 0 - BN `0x123456`
  )
);
```
