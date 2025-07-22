// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ml_dsa87 } from '@noble/post-quantum/ml-dsa.js';

import { u8aToU8a } from '@polkadot/util';

import { MLDSA_PUBLIC_KEY_LENGTH, MLDSA_SIGNATURE_LENGTH } from './constants.js';

/**
 * @name mldsaVerify
 * @summary Verifies a message using the mldsa signature algorithm.
 * @description
 * This function verifies the signature of a given message using mldsa.
 * Uses ML-DSA-87 (highest security level) for post-quantum signature verification.
 *
 * @param message - The message that was signed.
 * @param signature - The signature to verify.
 * @param publicKey - The public key to use for verification.
 * @returns Returns a boolean indicating if the signature is valid.
 * @example
 * <BR>
 *
 * ```javascript
 * import { mldsaVerify } from '@polkadot/util-crypto';
 *
 * mldsaVerify([...], [...], [...]); // => true/false
 * ```
 */
export function mldsaVerify (
  message: Uint8Array | string,
  signature: Uint8Array,
  publicKey: Uint8Array
): boolean {
  const messageU8a = u8aToU8a(message);

  if (publicKey.length !== MLDSA_PUBLIC_KEY_LENGTH) {
    throw new Error(`Invalid publicKey, received ${publicKey.length}, expected ${MLDSA_PUBLIC_KEY_LENGTH}`);
  } else if (signature.length !== MLDSA_SIGNATURE_LENGTH) {
    throw new Error(`Invalid signature, received ${signature.length} bytes, expected ${MLDSA_SIGNATURE_LENGTH}`);
  }

  try {
    return ml_dsa87.verify(publicKey, messageU8a, signature);
  } catch {
    return false;
  }
}
