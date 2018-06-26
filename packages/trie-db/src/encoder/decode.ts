// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import { Logger } from '@polkadot/util/types';

import assert from '@polkadot/util/assert';
import isBuffer from '@polkadot/util/is/buffer';
import isU8a from '@polkadot/util/is/u8a';
import toU8a from '@polkadot/util/u8a/toU8a';

export default function decode (l: Logger) {
  return (value: Buffer | Uint8Array | null): Uint8Array => {
    // l.debug(() => ['decoding', value]);

    if (!value || !value.length) {
      return new Uint8Array(0);
    }

    const isBufferIn = isBuffer(value);
    const isU8aIn = isU8a(value);

    assert(isBufferIn || isU8aIn, `Expected a Buffer | Uint8Array | null input type, received '${typeof value}'`);

    return isBufferIn
      ? toU8a(value)
      : value;
  };
}
