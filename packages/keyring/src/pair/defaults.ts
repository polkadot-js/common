// Copyright 2017-2025 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

/** public/secret section divider (generation 1-3, will change in 4, don't rely on value) */
export const PAIR_DIV = new Uint8Array([161, 35, 3, 33, 0]);

/** public/secret start block (generation 1-3, will change in 4, don't rely on value) */
export const PAIR_HDR = new Uint8Array([48, 83, 2, 1, 1, 48, 5, 6, 3, 43, 101, 112, 4, 34, 4, 32]);

/** length of a public key */
export const PUB_LENGTH = 32;

/** length of a salt */
export const SALT_LENGTH = 32;

/** length of a secret key */
export const SEC_LENGTH = 64;

/** length of a user-input seed */
export const SEED_LENGTH = 32;

// Generation 4 constants for variable-length keys (post-quantum support)

/** public/secret start block for generation 4 (variable-length keys) */
export const PAIR_HDR_V4 = new Uint8Array([48, 84, 2, 1, 4, 48, 5, 6, 3, 43, 101, 112, 4, 34, 4, 32]);

/** public/secret section divider for generation 4 */
export const PAIR_DIV_V4 = new Uint8Array([161, 35, 4, 33, 0]);

/** length of crypto type field in generation 4 */
export const CRYPTO_TYPE_LENGTH = 1;

/** length of key length field in generation 4 */
export const KEY_LENGTH_FIELD_SIZE = 4;

/** crypto type identifiers for generation 4 encoding */
export const CRYPTO_TYPES = {
  ed25519: 0,
  sr25519: 1,
  ecdsa: 2,
  ethereum: 2, // same as ecdsa
  mldsa: 3
} as const;
