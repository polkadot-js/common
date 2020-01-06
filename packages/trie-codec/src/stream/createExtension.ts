// Copyright 2017-2020 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { fuseNibbles } from '../util';

export default function createExtension (key: Uint8Array): Uint8Array {
  return fuseNibbles(key, false);
}
