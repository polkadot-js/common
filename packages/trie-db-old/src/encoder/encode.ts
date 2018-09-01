// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import { Logger } from '@polkadot/util/types';

import assert from '@polkadot/util/assert';
import isBuffer from '@polkadot/util/is/buffer';
import isU8a from '@polkadot/util/is/u8a';
import u8aToBuffer from '@polkadot/util/u8a/toBuffer';

export default function encode (l: Logger) {
  return (value: Buffer | Uint8Array | null): Buffer => {
    // l.debug(() => ['encoding', value ? value.toString() : value]);

    if (!value || value.length === 0) {
      return Buffer.alloc(0);
    }

    const isBufferIn = isBuffer(value);
    const isU8aIn = isU8a(value);

    assert(isBufferIn || isU8aIn, `Expected Buffer | Uint8Array | null input, received '${typeof value}'`);

    return isBufferIn
      ? value as Buffer
      : u8aToBuffer(value);
  };
}
