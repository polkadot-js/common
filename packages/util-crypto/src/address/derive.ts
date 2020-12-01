// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Prefix } from './types';

import { assert } from '@polkadot/util';

import { DeriveJunction } from '../key/DeriveJunction';
import { keyExtractPath } from '../key';
import { schnorrkelDerivePublic } from '../schnorrkel';
import { decodeAddress } from './decode';
import { encodeAddress } from './encode';

/**
 * @name deriveAddress
 * @summary Creates a sr25519 derived address from the supplied and path.
 * @description
 * Creates a sr25519 derived address based on the input address/publicKey and the uri supplied.
 */
export function deriveAddress (who: Uint8Array | string, suri: string, ss58Format?: Prefix): string {
  const { path } = keyExtractPath(suri);

  assert(path.length && !path.some((path) => path.isHard), 'Expected suri to contain a combination of non-hard paths');

  return encodeAddress(path.reduce((publicKey: Uint8Array, path: DeriveJunction): Uint8Array => {
    return schnorrkelDerivePublic(publicKey, path.chainCode);
  }, decodeAddress(who)), ss58Format);
}
