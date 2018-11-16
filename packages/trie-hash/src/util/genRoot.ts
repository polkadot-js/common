// Copyright 2017-2018 @polkadot/trie-hash authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Trie$Pairs } from '../types';

// import { keccakAsU8a as hashing } from '@polkadot/util-crypto/index';
import { blake2AsU8a as hashing } from '@polkadot/util-crypto/index';
import codec from '@polkadot/trie-codec/index';

import encode from '../encode';

/**
 * @name genRoot
 * @signature genRoot (pairs: Trie$Pairs): Uint8Array
 * @summary Encodes supplied pairs into u8a output by calculating with RLP.
 */
export default function genRoot (pairs: Trie$Pairs): Uint8Array {
  const encoded = encode(pairs, 0);

  return hashing(
    encoded.length
      ? new Uint8Array()
      : codec.encode(encoded)
  );
}
