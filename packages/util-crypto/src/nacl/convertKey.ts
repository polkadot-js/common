// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import ed2curve from 'ed2curve';

export function convertSecretKeyToCurve25519 (secretKey: Uint8Array): Uint8Array {
  return ed2curve.convertSecretKey(secretKey);
}

export function convertPublicKeyToCurve25519 (publicKey: Uint8Array): Uint8Array {
  return ed2curve.convertPublicKey(publicKey) as Uint8Array;
}
