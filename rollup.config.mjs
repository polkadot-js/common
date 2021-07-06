// Copyright 2019-2021 @polkadot/wasm-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createInput, createOutput, createPlugins } from '@polkadot/dev/config/rollup';

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

export default [
  {
    external,
    input: createInput('hw-ledger'),
    output: createOutput('hw-ledger', external),
    plugins: createPlugins([
      { find: '@polkadot/hw-ledger-transports', replacement: '../../hw-ledger-transports/build' }
    ])
  },
  {
    external,
    input: createInput('keyring'),
    output: createOutput('keyring', external),
    plugins: createPlugins()
  },
  {
    external,
    input: createInput('networks'),
    output: createOutput('networks', external),
    plugins: createPlugins()
  },
  {
    external,
    input: createInput('util'),
    output: createOutput('util', external),
    plugins: createPlugins()
  },
  {
    external,
    input: createInput('util-crypto'),
    output: createOutput('util-crypto', external),
    plugins: createPlugins()
  },
  {
    external,
    input: createInput('x-fetch', 'browser.js'),
    output: createOutput('x-fetch', external),
    plugins: createPlugins()
  },
  {
    external,
    input: createInput('x-global'),
    output: createOutput('x-global', external),
    plugins: createPlugins()
  },
  {
    external,
    input: createInput('x-randomvalues', 'browser.js'),
    output: createOutput('x-randomvalues', external),
    plugins: createPlugins()
  },
  {
    external,
    input: createInput('x-rxjs'),
    output: createOutput('x-rxjs', external),
    plugins: createPlugins()
  },
  {
    external,
    input: createInput('x-textdecoder', 'browser.js'),
    output: createOutput('x-textdecoder', external),
    plugins: createPlugins()
  },
  {
    external,
    input: createInput('x-textencoder', 'browser.js'),
    output: createOutput('x-textencoder', external),
    plugins: createPlugins()
  },
  {
    external,
    input: createInput('x-ws', 'browser.js'),
    output: createOutput('x-ws', external),
    plugins: createPlugins()
  }
];
