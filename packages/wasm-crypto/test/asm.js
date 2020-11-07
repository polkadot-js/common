// Copyright 2019-2020 @polkadot/wasm-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

global.WebAssembly = null;

require('override-require')(
  (request) => request.endsWith('wasm/asm-empty'),
  () => require('../build/wasm/asm')
);

const { runUnassisted } = require('./all');

runUnassisted();
