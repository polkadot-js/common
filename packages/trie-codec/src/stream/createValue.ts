// Copyright 2017-2020 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { compactAddLength } from '@polkadot/util';

const NO_VALUE = new Uint8Array();

export default function createValue (value: null | Uint8Array): Uint8Array {
  return value
    ? compactAddLength(value)
    : NO_VALUE;
}
