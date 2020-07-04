// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Prefix } from './types';

import BN from 'bn.js';

import decode from './decode';
import encode from './encode';
import keyDerived from './keyDerived';

/**
 * @name encodeDerivedAddress
 * @summary Creates a derived address.
 * @description
 * Creates a Substrate derived address based on the input address/publicKey and the index supplied.
 */
export default function encodeDerivedAddress (who: Uint8Array | string, index: BigInt | BN | number, ss58Format?: Prefix): string {
  return encode(keyDerived(decode(who), index), ss58Format);
}
