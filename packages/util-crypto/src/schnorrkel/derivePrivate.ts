// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { compactAddLength, stringToU8a, u8aConcat } from '@polkadot/util';

import blake2AsU8a from '../blake2/asU8a';

const HDKD = compactAddLength(stringToU8a('SchnorrRistrettoHDKD'));

export default function derivePrivate (secretKey: Uint8Array, chainCode: Uint8Array): Uint8Array {
  return blake2AsU8a(
    u8aConcat(HDKD, compactAddLength(secretKey), chainCode)
  );
}
