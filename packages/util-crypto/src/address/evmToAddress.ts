// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import encode from './encode';
import { Prefix } from './types';

import hasher from '../secp256k1/hasher';
import { HashType } from '../secp256k1/types';

import { u8aConcat } from '@polkadot/util';

/**
 * @name evmToAddress
 * @summary Converts an EVM address to its corresponding SS58 address.
 */
export default function evmToAddress (evmAddress: string | Uint8Array, ss58Format?: Prefix, hashType: HashType = 'blake2'): string {
  const wrapError = (message: string) => `Converting ${evmAddress as string}: ${message}`;

  const message = u8aConcat('evm:', evmAddress);

  if (message.length !== 24) {
    throw new Error(wrapError('Invalid evm address length'));
  }

  const address = hasher(hashType, message);

  return encode(address, ss58Format);
}
