# Utilities

[![Build Status](https://travis-ci.org/polkadot-js/util.svg?branch=master)](https://travis-ci.org/polkadot-js/util)
[![Coverage Status](https://coveralls.io/repos/github/polkadot-js/util/badge.svg?branch=master)](https://coveralls.io/github/polkadot-js/util?branch=master)
[![Dependency Status](https://david-dm.org/polkadot-js/util.svg)](https://david-dm.org/polkadot-js/util)
[![devDependency Status](https://david-dm.org/polkadot-js/util/dev-status.svg)](https://david-dm.org/polkadot-js/util#info=devDependencies)

## Introduction


## Usage

Installation -

```
npm install --save @polkadot/util
```

Functions can be imported directly from the package, e.g.

```
import { isHex } from '@polkadot/util';
```

Alternatively the function can be accessed directly,

```
import isHex from '@polkadot/util/is/hex';
```

## Available interfaces

The following interfaces are available

- [bn](docs/bn.md) Utilities to work with BN.js, e.g. converting to and from hex
- [buffer](docs/buffer.md) Utilities to work with Buffers, e.g. converting to and from hex
- [hex](docs/hex.md)
- [is](docs/is.md) Type-checking utilities, e.g. string or number
- [keccak](docs/keccak.md) Keccak creation, e.g. to buffer or hex
