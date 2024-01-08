// Copyright 2017-2024 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import util from 'node:util';

import { extractGlobal } from '@polkadot/x-global';

export { packageInfo } from './packageInfo.js';

class Fallback {
  #encoder: util.TextEncoder;

  constructor () {
    this.#encoder = new util.TextEncoder();
  }

  // For a Jest 26.0.1 environment, Buffer !== Uint8Array
  encode (value: string): Uint8Array {
    return Uint8Array.from(this.#encoder.encode(value));
  }
}

export const TextEncoder = /*#__PURE__*/ extractGlobal('TextEncoder', Fallback);
