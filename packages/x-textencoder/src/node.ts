// Copyright 2020 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TextEncoder as NodeTextEncoder } from 'util';

export default typeof TextEncoder === 'undefined'
  ? class {
    #encoder: NodeTextEncoder;

    constructor () {
      this.#encoder = new NodeTextEncoder();
    }

    // For a Jest 26.0.1 environment, Buffer !== Uint8Array
    encode (value: string): Uint8Array {
      const encoded = this.#encoder.encode(value);

      return Uint8Array.from(encoded);
    }
  }
  : TextEncoder;
