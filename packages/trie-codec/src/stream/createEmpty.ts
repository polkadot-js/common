// Copyright 2017-2020 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { EMPTY_TRIE } from '../constants';

export default function createEmpty (): Uint8Array {
  return Uint8Array.from([EMPTY_TRIE]);
}
