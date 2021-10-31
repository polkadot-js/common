// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';
import type { Prefix } from './types';

import { u8aSorted } from '@polkadot/util';

import { encodeAddress } from './encode';
import { addressToU8a } from './util';

export function sortAddresses (addresses: (HexString | Uint8Array | string)[], ss58Format?: Prefix): string[] {
  const u8aToAddress = (u8a: Uint8Array) => encodeAddress(u8a, ss58Format);

  return u8aSorted(
    addresses.map(addressToU8a)
  ).map(u8aToAddress);
}
