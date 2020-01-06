// Copyright 2017-2020 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import { assert } from '@polkadot/util';

export default function safeParseInt (input: Uint8Array): number {
  assert(input[0] > 0, 'invalid rlp, extra zeros found');

  return input.reduce((result, value): number => (result * 256) + value, 0);
}
