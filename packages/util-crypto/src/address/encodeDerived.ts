// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '@polkadot/util';
import type { Prefix } from './types.js';

import { decodeAddress } from './decode.js';
import { encodeAddress } from './encode.js';
import { createKeyDerived } from './keyDerived.js';

/**
 * @name encodeDerivedAddress
 * @summary Creates a derived address as used in Substrate utility.
 * @description
 * Creates a Substrate derived address based on the input address/publicKey and the index supplied.
 */
export function encodeDerivedAddress (who: string | Uint8Array, index: bigint | BN | number, ss58Format?: Prefix): string {
  return encodeAddress(createKeyDerived(decodeAddress(who), index), ss58Format);
}
