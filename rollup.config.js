// Copyright 2019-2021 @polkadot/wasm-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  {
    external: [
      '@polkadot/x-global',
      '@polkadot/x-textdecoder',
      '@polkadot/x-textencoder'
    ],
    input: 'packages/util/build/index.js',
    output: {
      file: 'build/util/bundle/polkadotUtil.js',
      format: 'iife',
      globals: {
        '@polkadot/x-global': 'polkadotXGlobal',
        '@polkadot/x-textdecoder': 'polkadotXTextdecoder',
        '@polkadot/x-textencoder': 'polkadotXTextencoder'
      },
      name: 'polkadotUtil'
    },
    plugins: [
      alias({}),
      nodeResolve(),
      commonjs()
    ]
  },
  // {
  //   external: [
  //     '@polkadot/util',
  //     '@polkadot/x-randomvalues'
  //   ],
  //   input: 'packages/util-crypto/build/index.js',
  //   output: {
  //     file: 'build/util-crypto/bundle/polkadotUtilCrypto.js',
  //     format: 'iife',
  //     globals: {
  //       '@polkadot/util': 'polkadotUtil',
  //       '@polkadot/x-randomvalues': 'polkadotXRandomvalues'
  //     },
  //     name: 'polkadotUtilCrypto'
  //   },
  //   plugins: [
  //     alias({}),
  //     nodeResolve(),
  //     commonjs()
  //   ]
  // },
  {
    external: [
      '@polkadot/x-global'
    ],
    input: 'packages/x-fetch/build/browser.js',
    output: {
      file: 'build/x-fetch/bundle/polkadotXFetch.js',
      format: 'iife',
      globals: {
        '@polkadot/x-global': 'polkadotXGlobal'
      },
      name: 'polkadotXFetch'
    },
    plugins: [
      alias({}),
      nodeResolve(),
      commonjs()
    ]
  },
  {
    external: [
    ],
    input: 'packages/x-global/build/index.js',
    output: {
      file: 'build/x-global/bundle/polkadotXGlobal.js',
      format: 'iife',
      globals: {
      },
      name: 'polkadotXGlobal'
    },
    plugins: [
      alias({}),
      nodeResolve(),
      commonjs()
    ]
  },
  {
    external: [
      '@polkadot/x-global'
    ],
    input: 'packages/x-randomvalues/build/browser.js',
    output: {
      file: 'build/x-randomvalues/bundle/polkadotXRandomvalues.js',
      format: 'iife',
      globals: {
        '@polkadot/x-global': 'polkadotXGlobal'
      },
      name: 'polkadotXRandomvalues'
    },
    plugins: [
      alias({}),
      nodeResolve(),
      commonjs()
    ]
  },
  {
    external: [
      '@polkadot/x-global'
    ],
    input: 'packages/x-rxjs/build/index.js',
    output: {
      file: 'build/x-rxjs/bundle/polkadotXRxjs.js',
      format: 'iife',
      globals: {
        '@polkadot/x-global': 'polkadotXGlobal'
      },
      name: 'polkadotXRxjs'
    },
    plugins: [
      alias({}),
      nodeResolve(),
      commonjs()
    ]
  },
  {
    external: [
      '@polkadot/x-global'
    ],
    input: 'packages/x-textdecoder/build/browser.js',
    output: {
      file: 'build/x-textdecoder/bundle/polkadotXTextdecoder.js',
      format: 'iife',
      globals: {
        '@polkadot/x-global': 'polkadotXGlobal'
      },
      name: 'polkadotXTextdecoder'
    },
    plugins: [
      alias({}),
      nodeResolve(),
      commonjs()
    ]
  },
  {
    external: [
      '@polkadot/x-global'
    ],
    input: 'packages/x-textencoder/build/browser.js',
    output: {
      file: 'build/x-textencoder/bundle/polkadotXTextencoder.js',
      format: 'iife',
      globals: {
        '@polkadot/x-global': 'polkadotXGlobal'
      },
      name: 'polkadotXTextencoder'
    },
    plugins: [
      alias({}),
      nodeResolve(),
      commonjs()
    ]
  },
  {
    external: [
      '@polkadot/x-global'
    ],
    input: 'packages/x-ws/build/browser.js',
    output: {
      file: 'build/x-ws/bundle/polkadotXWs.js',
      format: 'iife',
      globals: {
        '@polkadot/x-global': 'polkadotXGlobal'
      },
      name: 'polkadotXWs'
    },
    plugins: [
      alias({}),
      nodeResolve(),
      commonjs()
    ]
  }
];
