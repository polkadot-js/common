// Copyright 2017-2018 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import { EncodeFunc } from './types';

import { u8aConcat } from '@polkadot/util/index';

import encodeLength from './length';

export default function encodeArray (encoder: EncodeFunc, input: any): Uint8Array {
  const encoded = u8aConcat.apply(null, input.map(encoder));

  return u8aConcat(
    encodeLength(encoded.length, 192),
    encoded
  );
}
