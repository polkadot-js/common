// Copyright 2017-2018 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import assert from '@polkadot/util/assert';

import internalDecode from './decode';

export default function decoder (input?: Uint8Array): Uint8Array | Array<any> {
  if (!input || input.length === 0) {
    return new Uint8Array([]);
  }

  const { decoded, remainder } = internalDecode(input);

  assert(remainder.length === 0, 'invalid remainder');

  return decoded;
}
