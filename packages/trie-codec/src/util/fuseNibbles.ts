// Copyright 2017-2020 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { assert, u8aConcat } from '@polkadot/util';

import { EXTENSION_NODE_BIG, EXTENSION_NODE_OFFSET, LEAF_NODE_BIG, LEAF_NODE_OFFSET } from '../constants';
import fromNibbles from './fromNibbles';

const MAX_FUSE_LENGTH = 255 + 126;

export default function fuseNibbles (nibbles: Uint8Array, isLeaf: boolean): Uint8Array {
  assert(nibbles.length < MAX_FUSE_LENGTH, `Input to fuseNibbles too large, found ${nibbles.length} >= ${MAX_FUSE_LENGTH}`);

  const [firstByteSmall, bigThreshold] = isLeaf
    ? [LEAF_NODE_OFFSET, LEAF_NODE_BIG - LEAF_NODE_OFFSET]
    : [EXTENSION_NODE_OFFSET, EXTENSION_NODE_BIG - EXTENSION_NODE_OFFSET];
  const result: Uint8Array[] = [
    Uint8Array.from([firstByteSmall + Math.min(nibbles.length, bigThreshold)])
  ];
  const oddFlag = nibbles.length % 2;

  if (nibbles.length >= bigThreshold) {
    result.push(Uint8Array.from([nibbles.length - bigThreshold]));
  }

  if (oddFlag === 1) {
    result.push(nibbles.subarray(0, 1));
  }

  result.push(fromNibbles(nibbles.subarray(oddFlag)));

  return u8aConcat(...result);
}
