// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import path from 'path';

import { createBundle } from '@polkadot/dev/config/rollup';

const pkgs = [
  '@polkadot/hw-ledger',
  '@polkadot/keyring',
  '@polkadot/networks',
  '@polkadot/util',
  '@polkadot/util-crypto'
];

const external = [
  ...pkgs
];

const entries = ['hw-ledger-transports', 'x-fetch', 'x-global', 'x-randomvalues', 'x-textdecoder', 'x-textencoder', 'x-ws'].map((p) => ({
  find: `@polkadot/${p}`,
  replacement: path.resolve(process.cwd(), `packages/${p}/build`)
}));

const overrides = {
  '@polkadot/hw-ledger': {
    // these are all in the un-shakable and unused hdDerivation stuff from the Zondax libs, ignore
    entries: ['bip39', 'hash.js', 'bip32-ed25519', 'bs58', 'blakejs'].map((find) => ({
      find,
      replacement: path.resolve(process.cwd(), 'node_modules/empty/object.js')
    }))
  },
  '@polkadot/util-crypto': {
    entries: [
      {
        find: '@polkadot/wasm-crypto',
        replacement: path.resolve(process.cwd(), 'node_modules/@polkadot/wasm-crypto/bundle.js')
      }
    ]
  }
};

export default pkgs.map((pkg) => {
  const override = (overrides[pkg] || {});

  return createBundle({
    external,
    pkg,
    ...override,
    entries: entries.concat(...(override.entries || []))
  });
});
