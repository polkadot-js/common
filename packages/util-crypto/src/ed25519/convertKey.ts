// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { convertPublicKeyToX25519, convertSecretKeyToX25519 } from '@stablelib/ed25519';

export function convertPublicKeyToCurve25519 (publicKey: Uint8Array): Uint8Array {
  return convertPublicKeyToX25519(publicKey);
}

export function convertSecretKeyToCurve25519 (secretKey: Uint8Array): Uint8Array {
  return convertSecretKeyToX25519(secretKey);
}
