// Copyright 2017-2021 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import util from 'util';

import { xglobal } from '@polkadot/x-global';

export { packageInfo } from './packageInfo';

class NodeFallback {
  #encoder: util.TextEncoder;

  constructor () {
    this.#encoder = new util.TextEncoder();
  }

  // For a Jest 26.0.1 environment, Buffer !== Uint8Array
  encode (value: string): Uint8Array {
    return Uint8Array.from(this.#encoder.encode(value));
  }
}

export const TextEncoder = (
  typeof xglobal.TextEncoder === 'undefined'
    ? NodeFallback as unknown as typeof xglobal.TextEncoder
    : xglobal.TextEncoder
);
