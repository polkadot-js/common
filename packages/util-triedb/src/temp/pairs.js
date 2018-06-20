// Copyright 2017-2018 @polkadot/util-triedb authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Trie$Pairs } from '@polkadot/util-triehash/types';
import type { Temp$Storage } from './types';

export default function pairs (storage: Temp$Storage): Trie$Pairs {
  // flowlint-next-line unclear-type:off
  const keys = ((Object.keys(storage): any): Array<Uint8Array>);

  return keys.map((k) => storage[k]);
}
