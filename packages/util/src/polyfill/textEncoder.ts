// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

if (typeof TextEncoder === 'undefined') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-var-requires
    const { TextEncoder: UTE } = require('util') as { TextEncoder: { new(): TextEncoder } };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access
    (global as any).TextEncoder = class {
      #encoder: TextEncoder;

      constructor () {
        this.#encoder = new UTE();
      }

      // For a Jest 26.0.1 environment, Buffer !== Uint8Array
      encode (value: string): Uint8Array {
        const encoded = this.#encoder.encode(value);

        return Uint8Array.from(encoded);
      }
    };
  } catch (error) {
    // noop
  }
}
