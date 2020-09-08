// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Prefix } from './types';

import BN from 'bn.js';

import encode from './encode';
import keyMulti from './keyMulti';

/**
 * @name encodeMultiAddress
 * @summary Creates a multisig address.
 * @description
 * Creates a Substrate multisig address based on the input address and the required threshold.
 */
export default function encodeMultiAddress (who: (Uint8Array | string)[], threshold: BigInt | BN | number, ss58Format?: Prefix): string {
  return encode(keyMulti(who, threshold), ss58Format);
}
