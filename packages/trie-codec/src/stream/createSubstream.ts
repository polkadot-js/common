// Copyright 2017-2020 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import hashing from '../hashing';
import createValue from './createValue';

export default function createSubstream (value: Uint8Array): Uint8Array {
  return createValue(
    value.length < 32
      ? value
      : hashing(value)
  );
}
