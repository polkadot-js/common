// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import path from 'path';

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

const entries = ['hw-ledger-transports', 'networks', 'x-bigint', 'x-fetch', 'x-global', 'x-noble-hashes', 'x-noble-secp256k1', 'x-randomvalues', 'x-textdecoder', 'x-textencoder', 'x-ws'].reduce((all, p) => ({
  ...all,
  [`@polkadot/${p}`]: path.resolve(process.cwd(), `packages/${p}/build`)
}), {});

const overrides = {
  '@polkadot/hw-ledger': {
    // these are all in the un-shakable and unused hdDerivation stuff from the Zondax libs, ignore
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
      'bn.js': path.resolve(process.cwd(), 'packages/x-bundle/build/bn.cjs'),
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
