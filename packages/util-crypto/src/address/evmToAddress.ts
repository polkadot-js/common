// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';
import type { HashType } from '../secp256k1/types';
import type { Prefix } from './types';

import { assert, u8aConcat } from '@polkadot/util';

import { hasher } from '../secp256k1/hasher';
import { encodeAddress } from './encode';

/**
 * @name evmToAddress
 * @summary Converts an EVM address to its corresponding SS58 address.
 */
export function evmToAddress (evmAddress: HexString | string | Uint8Array, ss58Format?: Prefix, hashType: HashType = 'blake2'): string {
  const message = u8aConcat('evm:', evmAddress);

  assert(message.length === 24, () => `Converting ${evmAddress as string}: Invalid evm address length`);

  return encodeAddress(hasher(hashType, message), ss58Format);
}
