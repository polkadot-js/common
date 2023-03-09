// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';
import type { HashType } from '../secp256k1/types.js';
import type { Prefix } from './types.js';

import { u8aConcat } from '@polkadot/util';

import { hasher } from '../secp256k1/hasher.js';
import { encodeAddress } from './encode.js';

/**
 * @name evmToAddress
 * @summary Converts an EVM address to its corresponding SS58 address.
 */
export function evmToAddress (evmAddress: HexString | string | Uint8Array, ss58Format?: Prefix, hashType: HashType = 'blake2'): string {
  const message = u8aConcat('evm:', evmAddress);

  if (message.length !== 24) {
    throw new Error(`Converting ${evmAddress as string}: Invalid evm address length`);
  }

  return encodeAddress(hasher(hashType, message), ss58Format);
}
