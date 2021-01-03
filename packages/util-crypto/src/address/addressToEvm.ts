// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { decodeAddress } from './decode';

/**
 * @name addressToEvm
 * @summary Converts an SS58 address to its corresponding EVM address.
 */
export function addressToEvm (address: string | Uint8Array, ignoreChecksum?: boolean): Uint8Array {
  const decoded = decodeAddress(address, ignoreChecksum);

  return decoded.subarray(0, 20);
}
