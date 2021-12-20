// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @summary Implements ed25519 operations
 */
export { convertPublicKeyToCurve25519, convertSecretKeyToCurve25519 } from './convertKey';
export { ed25519DeriveHard } from './deriveHard';
export { ed25519PairFromRandom } from './pair/fromRandom';
export { ed25519PairFromSecret } from './pair/fromSecret';
export { ed25519PairFromSeed } from './pair/fromSeed';
export { ed25519PairFromString } from './pair/fromString';
export { ed25519Sign } from './sign';
export { ed25519Verify } from './verify';
export { ed25519Encrypt } from './encrypt';
export { ed25519Decrypt } from './decrypt';
