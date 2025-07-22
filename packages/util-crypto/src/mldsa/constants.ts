// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @summary MLDSA constants for ML-DSA-87 (highest security level)
 * @description
 * These constants define the key and signature sizes for ML-DSA-87,
 * which corresponds to NIST security category 5 (~AES-256).
 */

/** ML-DSA-87 public key length in bytes */
export const MLDSA_PUBLIC_KEY_LENGTH = 2592;

/** ML-DSA-87 secret key length in bytes */
export const MLDSA_SECRET_KEY_LENGTH = 4896;

/** ML-DSA-87 signature length in bytes */
export const MLDSA_SIGNATURE_LENGTH = 4627;

/** ML-DSA seed length in bytes (standard for all variants) */
export const MLDSA_SEED_LENGTH = 32;

/** ML-DSA type prefix for signatures */
export const MLDSA_TYPE_PREFIX = new Uint8Array([3]);
