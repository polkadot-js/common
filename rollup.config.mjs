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
  ...pkgs,
  '@polkadot/wasm-crypto'
];

const entries = ['hw-ledger-transports', 'x-fetch', 'x-global', 'x-randomvalues', 'x-textdecoder', 'x-textencoder', 'x-ws'].map((p) => ({
  find: `@polkadot/${p}`,
  replacement: path.resolve(process.cwd(), `packages/${p}/build`)
}));

const overrides = {
  '@polkadot/hw-ledger': {
    entries: ['bip39', 'hash.js', 'bip32-ed25519', 'bs58', 'blakejs'].map((find) => ({
      find,
      replacement: path.resolve(process.cwd(), 'node_modules/empty/object.js')
    }))
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
