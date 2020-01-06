// Copyright 2017-2020 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import { hexToU8a, numberToHex } from '@polkadot/util';

export default function encodeLength (length: number, offset: number): Uint8Array {
  if (length < 56) {
    return new Uint8Array([length + offset]);
  }

  const hexLength = numberToHex(length).slice(2);

  return hexToU8a(
    numberToHex(offset + 55 + hexLength.length / 2) + hexLength
  );
}
