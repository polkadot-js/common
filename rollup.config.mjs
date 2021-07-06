// Copyright 2019-2021 @polkadot/wasm-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createBundle } from '@polkadot/dev/config/rollup';

const pkgs = [
  '@polkadot/hw-ledger',
  '@polkadot/keyring',
  '@polkadot/networks',
  '@polkadot/util',
  '@polkadot/util-crypto',
  '@polkadot/x-fetch', // browser
  '@polkadot/x-global',
  '@polkadot/x-randomvalues', // browser
  '@polkadot/x-rxjs',
  '@polkadot/x-textdecoder', // browser
  '@polkadot/x-textencoder', // browser
  '@polkadot/x-ws'
];

const external = [
  ...pkgs,
  '@polkadot/wasm-crypto'
];

const overrides = {
  '@polkadot/hwledger': {
    entries: [
      { find: '@polkadot/hw-ledger-transports', replacement: '../../hw-ledger-transports/build' }
    ]
  },
  '@polkadot/x-fetch': {
    index: 'browser.js'
  },
  '@polkadot/x-randomvalues': {
    index: 'browser.js'
  },
  '@polkadot/x-textdecoder': {
    index: 'browser.js'
  },
  '@polkadot/x-textencoder': {
    index: 'browser.js'
  },
  '@polkadot/x-ws': {
    index: 'browser.js'
  }
};

export default pkgs.map((pkg) =>
  createBundle({ ...(overrides[pkg] || {}), external, pkg })
);
