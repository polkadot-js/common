// Copyright 2017-2018 @polkadot/trie-hash authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Trie$Pairs } from '../types';

import { keccakAsU8a } from '@polkadot/util-crypto/index';
import rlpEncode from '@polkadot/util-rlp/encode';

import encode from '../encode';

/**
 * @name genRoot
 * @signature genRoot (pairs: Trie$Pairs): Uint8Array
 * @summary Encodes supplied pairs into u8a output by calculating with RLP.
 */
export default function genRoot (pairs: Trie$Pairs): Uint8Array {
  const encoded = encode(pairs, 0);

  return keccakAsU8a(
    rlpEncode(
      encoded.length
        ? encoded
        : new Uint8Array([])
    )
  );
}
