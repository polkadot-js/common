// Copyright 2019-2020 @polkadot/wasm-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

export function bip39Generate (words: 12 | 15 | 18 | 21 | 24): string;
export function bip39ToEntropy (phrase: string): Uint8Array;
export function bip39ToMiniSecret (phrase: string, password: string): Uint8Array;
export function bip39ToSeed (phrase: string, password: string): Uint8Array;
export function bip39Validate (phrase: string): boolean;

export function ed25519KeypairFromSeed (seed: Uint8Array): Uint8Array;
export function ed25519Sign (publicKey: Uint8Array, secretKey: Uint8Array, message: Uint8Array): Uint8Array;
export function ed25519Verify (signature: Uint8Array, message: Uint8Array, publicKey: Uint8Array): boolean;

export function sr25519DeriveKeypairHard (pair: Uint8Array, chainCode: Uint8Array): Uint8Array;
export function sr25519DeriveKeypairSoft (pair: Uint8Array, chainCode: Uint8Array): Uint8Array;
export function sr25519DerivePublicSoft (publicKey: Uint8Array, chainCode: Uint8Array): Uint8Array;
export function sr25519KeypairFromSeed (seed: Uint8Array): Uint8Array;
export function sr25519Sign (publicKey: Uint8Array, secretKey: Uint8Array, message: Uint8Array): Uint8Array;
export function sr25519Verify (signature: Uint8Array, message: Uint8Array, publicKey: Uint8Array): boolean;

export function blake2b (data: Uint8Array, key: Uint8Array, byteSize: number): Uint8Array;
export function keccak256 (data: Uint8Array): Uint8Array;
export function pbkdf2 (data: Uint8Array, salt: Uint8Array, rounds: number): Uint8Array;
export function scrypt (password: Uint8Array, salt: Uint8Array, log2N: number, r: number, p: number): Uint8Array;
// export function secp256k1IsRecoverable (message: Uint8Array, signature: Uint8Array): number;
// export function secp256k1Recover (message: Uint8Array, signature: Uint8Array): Uint8Array;
export function sha512 (data: Uint8Array): Uint8Array;
export function twox (data: Uint8Array, rounds: number): Uint8Array;

export function isReady (): boolean;
export function waitReady (): Promise<boolean>;
