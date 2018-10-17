// Copyright 2017-2018 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import toSecret from './toSecret';

export default function toSeed (mnemonic: string): Uint8Array {
  return toSecret(mnemonic).subarray(0, 32);
}
