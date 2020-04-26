// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Prefix } from './types';

import { u8aSorted } from '@polkadot/util';

import decodeAddress from './decode';
import encodeAddress from './encode';

export default function sortAddresses (addresses: (Uint8Array | string)[], ss58Format?: Prefix): string[] {
  return u8aSorted(
    addresses.map((who) => decodeAddress(who))
  ).map((u8a) => encodeAddress(u8a, ss58Format));
}
