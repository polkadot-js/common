// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { assert, u8aConcat } from '@polkadot/util';

const INDICATOR_COMP = new Uint8Array([3]);
const INDICATOR_FULL = new Uint8Array([4]);

export default function sanitizePublic (publicKey: Uint8Array): Uint8Array {
  assert([32, 33, 64, 65].includes(publicKey.length), 'Invalid publicKey provided');

  return [33, 65].includes(publicKey.length)
    ? publicKey
    : publicKey.length === 32
      ? u8aConcat(INDICATOR_COMP, publicKey)
      : u8aConcat(INDICATOR_FULL, publicKey);
}
