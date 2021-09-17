// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

export * from './address/types';
export * from './json/types';

export interface Keypair {
  publicKey: Uint8Array;
  secretKey: Uint8Array;
}

export interface Seedpair {
  publicKey: Uint8Array;
  seed: Uint8Array;
}

export type KeypairType = 'ed25519' | 'sr25519' | 'ecdsa' | 'ethereum';

export interface VerifyResult {
  crypto: 'none' | KeypairType;
  isValid: boolean;
  isWrapped: boolean;
  publicKey: Uint8Array;
}
