// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createBundle } from '@polkadot/dev/config/rollup';

const pkgs = [
  '@polkadot/hw-ledger',
  '@polkadot/keyring',
  '@polkadot/networks',
  '@polkadot/util',
  '@polkadot/util-crypto',
  '@polkadot/x-fetch',
  '@polkadot/x-global',
  '@polkadot/x-randomvalues',
  '@polkadot/x-rxjs',
  '@polkadot/x-textdecoder',
  '@polkadot/x-textencoder',
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
  }
};

export default pkgs.map((pkg) =>
  createBundle({ external, pkg, ...(overrides[pkg] || {}) })
);
