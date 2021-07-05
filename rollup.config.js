// Copyright 2019-2021 @polkadot/wasm-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const external = [
  '@polkadot/networks',
  '@polkadot/util',
  '@polkadot/util-crypto',
  '@polkadot/wasm-crypto',
  '@polkadot/x-global',
  '@polkadot/x-randomvalues',
  '@polkadot/x-textdecoder',
  '@polkadot/x-textencoder'
];

const globals = {
  '@polkadot/networks': 'polkadotNetworks',
  '@polkadot/util': 'polkadotUtil',
  '@polkadot/util-crypto': 'polkadotUtilCrypto',
  '@polkadot/wasm-crypto': 'polkadotWasmCrypto',
  '@polkadot/x-global': 'polkadotXGlobal',
  '@polkadot/x-randomvalues': 'polkadotXRandomvalues',
  '@polkadot/x-textdecoder': 'polkadotXTextdecoder',
  '@polkadot/x-textencoder': 'polkadotXTextencoder'
};

function createPlugins (entries = []) {
  return [
    alias({ entries }),
    json(),
    nodeResolve({ browser: true }),
    commonjs()
  ];
}

function createOutput (name, out) {
  return {
    file: `${out}/${name}.js`,
    format: 'iife',
    globals,
    name
  };
}

export default [
  {
    external,
    input: 'packages/hw-ledger/build/index.js',
    output: createOutput('polkadotHwLedger', 'build/networks/bundle'),
    plugins: createPlugins([
      { find: '@polkadot/hw-ledger-transports', replacement: '../../hw-ledger-transports/build' }
    ])
  },
  {
    external,
    input: 'packages/keyring/build/index.js',
    output: createOutput('polkadotKeyring', 'build/keyring/bundle'),
    plugins: createPlugins()
  },
  {
    external,
    input: 'packages/networks/build/index.js',
    output: createOutput('polkadotNetworks', 'build/networks/bundle'),
    plugins: createPlugins()
  },
  {
    external,
    input: 'packages/util/build/index.js',
    output: createOutput('polkadotUtil', 'build/util/bundle'),
    plugins: createPlugins()
  },
  {
    external,
    input: 'packages/util-crypto/build/index.js',
    output: createOutput('polkadotUtilCrypto', 'build/util-crypto/bundle'),
    plugins: createPlugins()
  },
  {
    external,
    input: 'packages/x-fetch/build/browser.js',
    output: createOutput('polkadotXFetch', 'build/x-fetch/bundle'),
    plugins: createPlugins()
  },
  {
    external,
    input: 'packages/x-global/build/index.js',
    output: createOutput('polkadotXGlobal', 'build/x-global/bundle'),
    plugins: createPlugins()
  },
  {
    external,
    input: 'packages/x-randomvalues/build/browser.js',
    output: createOutput('polkadotXRandomvalues', 'build/x-randomvalues/bundle'),
    plugins: createPlugins()
  },
  {
    external,
    input: 'packages/x-rxjs/build/index.js',
    output: createOutput('polkadotXRxjs', 'build/x-rxjs/bundle'),
    plugins: createPlugins()
  },
  {
    external,
    input: 'packages/x-textdecoder/build/browser.js',
    output: createOutput('polkadotXTextdecoder', 'build/x-textdecoder/bundle'),
    plugins: createPlugins()
  },
  {
    external,
    input: 'packages/x-textencoder/build/browser.js',
    output: createOutput('polkadotXTextencoder', 'build/x-textencoder/bundle'),
    plugins: createPlugins()
  },
  {
    external,
    input: 'packages/x-ws/build/browser.js',
    output: createOutput('polkadotXWs', 'build/x-ws/bundle'),
    plugins: createPlugins()
  }
];
