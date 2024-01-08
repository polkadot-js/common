// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import path from 'node:path';

import { createBundle } from '@polkadot/dev/config/rollup';

const pkgs = [
  '@polkadot/hw-ledger',
  '@polkadot/keyring',
  '@polkadot/util',
  '@polkadot/util-crypto'
];

const external = [
  ...pkgs
];

const entries = ['hw-ledger-transports', 'networks', 'x-bigint', 'x-fetch', 'x-global', 'x-randomvalues', 'x-textdecoder', 'x-textencoder', 'x-ws'].reduce((all, p) => ({
  ...all,
  [`@polkadot/${p}`]: path.resolve(process.cwd(), `packages/${p}/build`)
}), {});

const overrides = {
  '@polkadot/hw-ledger': {
    // these are all used in the un-shakeable (and unused inside @polkadot/*) hdDerivation
    // functionality from the Zondax libs, disable it completely with empty stubs
    entries: {
      'bip32-ed25519': path.resolve(process.cwd(), 'packages/x-bundle/build/empty.js'),
      bip39: path.resolve(process.cwd(), 'packages/x-bundle/build/empty.js'),
      blakejs: path.resolve(process.cwd(), 'packages/x-bundle/build/empty.js'),
      bs58: path.resolve(process.cwd(), 'packages/x-bundle/build/empty.js'),
      events: path.resolve(process.cwd(), 'packages/x-bundle/build/empty.js'),
      'hash.js': path.resolve(process.cwd(), 'packages/x-bundle/build/empty.js')
    }
  },
  '@polkadot/util-crypto': {
    entries: {
      '@polkadot/wasm-crypto': path.resolve(process.cwd(), 'node_modules/@polkadot/wasm-crypto/bundle.js'),
      'bn.js': path.resolve(process.cwd(), 'packages/x-bundle/build/cjs/bn.js'),
      buffer: path.resolve(process.cwd(), 'packages/x-bundle/build/buffer.js'),
      crypto: path.resolve(process.cwd(), 'packages/x-bundle/build/crypto.js')
    },
    inject: {
      Buffer: path.resolve(process.cwd(), 'packages/x-bundle/build/buffer.js'),
      crypto: path.resolve(process.cwd(), 'packages/x-bundle/build/crypto.js'),
      inherits: path.resolve(process.cwd(), 'packages/x-bundle/build/inherits.js')
    },
    polyfill: false
  }
};

export default pkgs.map((pkg) => {
  const override = (overrides[pkg] || {});

  return createBundle({
    external,
    pkg,
    ...override,
    entries: {
      ...entries,
      ...(override.entries || {})
    }
  });
});
