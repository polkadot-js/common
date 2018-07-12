// Copyright 2017-2018 @polkadot/params authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Param$Decoded } from '../../types';

import encodeAddress from '@polkadot/util-keyring/address/encode';

export default function account (input: Uint8Array, bitLength: 256 | 512): Param$Decoded {
  const length = (bitLength / 8);
  return {
    length,
    value: encodeAddress(input.subarray(length))
  };
}