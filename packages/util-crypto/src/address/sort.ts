// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Prefix } from './types';

import { u8aSorted } from '@polkadot/util';

import decodeAddress from './decode';
import encodeAddress from './encode';

export default function sortAddresses (addresses: (Uint8Array | string)[], ss58Format?: Prefix): string[] {
  return u8aSorted(
    addresses.map((who) => decodeAddress(who))
  ).map((u8a) => encodeAddress(u8a, ss58Format));
}
