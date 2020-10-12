// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import decode from './decode';

/**
 * @name addressToEvm
 * @summary Converts an SS58 address to its corresponding EVM address.
 */
export default function addressToEvm (address: string | Uint8Array, ignoreChecksum?: boolean): Uint8Array {
  const decoded = decode(address, ignoreChecksum);

  return decoded.subarray(0, 20);
}
