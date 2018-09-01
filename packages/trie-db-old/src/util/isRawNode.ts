// Copyright 2015-2018 authors & contributors of https://github.com/ethereumjs/merkle-patricia-tree
// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import isU8a from '@polkadot/util/is/u8a';

export default function isRawNode (node: Array<number> | Buffer | Uint8Array) {
  return Array.isArray(node) && !isU8a(node);
}
