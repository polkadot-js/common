// Copyright 2017-2018 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Compact } from '@polkadot/types/codec';

const NO_VALUE = new Uint8Array();

export default function createValue (value: null | Uint8Array): Uint8Array {
  return value
    ? Compact.addLengthPrefix(value)
    : NO_VALUE;
}
