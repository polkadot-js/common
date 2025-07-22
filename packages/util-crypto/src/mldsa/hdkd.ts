// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../types.js';
import type { DeriveJunction } from '../key/DeriveJunction.js';

/**
 * @name keyHdkdMldsa
 * @summary Derive MLDSA key from path
 * @description
 * MLDSA (ML-DSA) key derivation is currently not fully implemented.
 * Unlike elliptic curve cryptography, lattice-based algorithms like MLDSA
 * do not support non-hardened key derivation due to the lack of
 * homomorphic properties in lattice operations.
 *
 * This function currently throws an error for any derivation attempts.
 * Future implementations should support only hardened derivation paths.
 */
export function keyHdkdMldsa (_pair: Keypair, _junction: DeriveJunction): Keypair {
  throw new Error('ML-DSA key derivation not implemented - only hardened derivation paths would be supported');
}
