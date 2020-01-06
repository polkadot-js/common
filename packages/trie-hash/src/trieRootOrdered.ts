// Copyright 2017-2020 @polkadot/trie-hash authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Codec } from '@polkadot/trie-codec/types';
import { TriePair } from './types';

import { compactToU8a } from '@polkadot/util';

import { DEFAULT_CODEC } from './defaults';
import trieRoot from './trieRoot';

/**
 * @name trieRootOrdered
 * @summary Creates a trie hash from the supplied values.
 * @description
 * From an `Array<Uint8Array>` input, calculate the ordered triehash and return the result as a `Uint8Array`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { stringToU8a } from '@polkadot/util';
 * import { trieRootOrdered } from '@polkadot/trie-hash';
 *
 * trieRootOrdered([
 *   stringToU8a('doe'),
 *   stringToU8a('reindeer')
 * ]); // => 0xe766d5d51b89dc39d981b41bda63248d7abce4f0225eefd023792a540bcffee3
 * ```
 */
export default function trieRootOrdered (input: Uint8Array[], codec: Codec = DEFAULT_CODEC): Uint8Array {
  return trieRoot(
    input.map((v, index): TriePair => ({
      k: compactToU8a(index),
      v
    })),
    codec
  );
}
