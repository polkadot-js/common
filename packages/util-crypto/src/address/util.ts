// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { decodeAddress } from './decode';

export function addressToU8a (who: string | Uint8Array): Uint8Array {
  return decodeAddress(who);
}
