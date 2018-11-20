// Copyright 2017-2018 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { compactAddLength, u8aConcat } from '@polkadot/util/index';

import { fuseNibbles } from '../util';

export default function createLeaf (key: Uint8Array, value: Uint8Array): Uint8Array {
  return u8aConcat(
    fuseNibbles(key, true),
    compactAddLength(value)
  );
}
