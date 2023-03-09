// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { decodeAddress } from './decode.js';

export function addressToU8a (who: string | Uint8Array): Uint8Array {
  return decodeAddress(who);
}
