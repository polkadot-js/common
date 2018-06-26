// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import { DecodedRlp } from '../types';

import assert from '@polkadot/util/assert';
import isU8a from '@polkadot/util/is/u8a';
import u8aToHex from '@polkadot/util/u8a/toHex';

export default function rlpToString (rlp: Uint8Array | DecodedRlp): string {
  if (Array.isArray(rlp)) {
    return `[ ${rlp.map(rlpToString).join(', ')} ]`;
  }

  assert(isU8a(rlp), `Expected Array | Uint8Array inside rlp, found type '${typeof rlp}'`);

  return u8aToHex(rlp);
}
