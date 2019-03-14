// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import schnorrkel from '@polkadot/schnorrkel-js';

export default function derivePublic (publicKey: Uint8Array, chainCode: Uint8Array): Uint8Array {
  return schnorrkel.derivePublicSimple(publicKey, chainCode);
}
