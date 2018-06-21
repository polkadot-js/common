// Copyright 2017-2018 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.
// @flow

import assert from '@polkadot/util/assert';

export default function safeParseInt (input: Uint8Array): number {
  assert(input[0] > 0, 'invalid RLP: extra zeros');

  return input.reduce((result, value) => (result * 256) + value, 0);
}
