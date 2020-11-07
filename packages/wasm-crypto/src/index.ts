// Copyright 2019-2020 @polkadot/wasm-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { allocString, allocU8a, getWasm, initWasm, resultString, resultU8a, withWasm } from './bridge';
import * as imports from './imports';
import asmFallback from './wasm/asm-empty';
import wasmBytes from './wasm/bytes';

const wasmPromise = initWasm(wasmBytes, asmFallback, imports).catch(() => null);

export const bip39Generate = withWasm((wasm) =>
  (words: 12 | 15 | 18 | 21 | 24): string => {
    wasm.ext_bip39_generate(8, words);

    return resultString();
  }
);

export const bip39ToEntropy = withWasm((wasm) =>
  (phrase: string): Uint8Array => {
    const [ptr0, len0] = allocString(phrase);

    wasm.ext_bip39_to_entropy(8, ptr0, len0);

    return resultU8a();
  }
);

export const bip39ToMiniSecret = withWasm((wasm) =>
  (phrase: string, password: string): Uint8Array => {
    const [ptr0, len0] = allocString(phrase);
    const [ptr1, len1] = allocString(password);

    wasm.ext_bip39_to_mini_secret(8, ptr0, len0, ptr1, len1);

    return resultU8a();
  }
);

export const bip39ToSeed = withWasm((wasm) =>
  (phrase: string, password: string): Uint8Array => {
    const [ptr0, len0] = allocString(phrase);
    const [ptr1, len1] = allocString(password);

    wasm.ext_bip39_to_seed(8, ptr0, len0, ptr1, len1);

    return resultU8a();
  }
);

export const bip39Validate = withWasm((wasm) =>
  (phrase: string): boolean => {
    const [ptr0, len0] = allocString(phrase);
    const ret = wasm.ext_bip39_validate(ptr0, len0);

    return ret !== 0;
  }
);

export const ed25519KeypairFromSeed = withWasm((wasm) =>
  (seed: Uint8Array): Uint8Array => {
    const [ptr0, len0] = allocU8a(seed);

    wasm.ext_ed_from_seed(8, ptr0, len0);

    return resultU8a();
  }
);

export const ed25519Sign = withWasm((wasm) =>
  (pubkey: Uint8Array, seckey: Uint8Array, message: Uint8Array): Uint8Array => {
    const [ptr0, len0] = allocU8a(pubkey);
    const [ptr1, len1] = allocU8a(seckey);
    const [ptr2, len2] = allocU8a(message);

    wasm.ext_ed_sign(8, ptr0, len0, ptr1, len1, ptr2, len2);

    return resultU8a();
  }
);

export const ed25519Verify = withWasm((wasm) =>
  (signature: Uint8Array, message: Uint8Array, pubkey: Uint8Array): boolean => {
    const [ptr0, len0] = allocU8a(signature);
    const [ptr1, len1] = allocU8a(message);
    const [ptr2, len2] = allocU8a(pubkey);
    const ret = wasm.ext_ed_verify(ptr0, len0, ptr1, len1, ptr2, len2);

    return ret !== 0;
  }
);

export const sr25519DeriveKeypairHard = withWasm((wasm) =>
  (pair: Uint8Array, cc: Uint8Array): Uint8Array => {
    const [ptr0, len0] = allocU8a(pair);
    const [ptr1, len1] = allocU8a(cc);

    wasm.ext_sr_derive_keypair_hard(8, ptr0, len0, ptr1, len1);

    return resultU8a();
  }
);

export const sr25519DeriveKeypairSoft = withWasm((wasm) => (pair, cc): Uint8Array => {
  const [ptr0, len0] = allocU8a(pair);
  const [ptr1, len1] = allocU8a(cc);

  wasm.ext_sr_derive_keypair_soft(8, ptr0, len0, ptr1, len1);

  return resultU8a();
});

export const sr25519DerivePublicSoft = withWasm((wasm) =>
  (pubkey: Uint8Array, cc: Uint8Array): Uint8Array => {
    const [ptr0, len0] = allocU8a(pubkey);
    const [ptr1, len1] = allocU8a(cc);

    wasm.ext_sr_derive_public_soft(8, ptr0, len0, ptr1, len1);

    return resultU8a();
  }
);

export const sr25519KeypairFromSeed = withWasm((wasm) =>
  (seed: Uint8Array): Uint8Array => {
    const [ptr0, len0] = allocU8a(seed);

    wasm.ext_sr_from_seed(8, ptr0, len0);

    return resultU8a();
  }
);

export const sr25519Sign = withWasm((wasm) =>
  (pubkey: Uint8Array, secret: Uint8Array, message: Uint8Array): Uint8Array => {
    const [ptr0, len0] = allocU8a(pubkey);
    const [ptr1, len1] = allocU8a(secret);
    const [ptr2, len2] = allocU8a(message);

    wasm.ext_sr_sign(8, ptr0, len0, ptr1, len1, ptr2, len2);

    return resultU8a();
  }
);

export const sr25519Verify = withWasm((wasm) =>
  (signature: Uint8Array, message: Uint8Array, pubkey: Uint8Array): boolean => {
    const [ptr0, len0] = allocU8a(signature);
    const [ptr1, len1] = allocU8a(message);
    const [ptr2, len2] = allocU8a(pubkey);
    const ret = wasm.ext_sr_verify(ptr0, len0, ptr1, len1, ptr2, len2);

    return ret !== 0;
  }
);

export const blake2b = withWasm((wasm) =>
  (data: Uint8Array, key: Uint8Array, size: number): Uint8Array => {
    const [ptr0, len0] = allocU8a(data);
    const [ptr1, len1] = allocU8a(key);

    wasm.ext_blake2b(8, ptr0, len0, ptr1, len1, size);

    return resultU8a();
  }
);

export const keccak256 = withWasm((wasm) =>
  (data: Uint8Array): Uint8Array => {
    const [ptr0, len0] = allocU8a(data);

    wasm.ext_keccak256(8, ptr0, len0);

    return resultU8a();
  }
);

export const pbkdf2 = withWasm((wasm) =>
  (data: Uint8Array, salt: Uint8Array, rounds: number): Uint8Array => {
    const [ptr0, len0] = allocU8a(data);
    const [ptr1, len1] = allocU8a(salt);

    wasm.ext_pbkdf2(8, ptr0, len0, ptr1, len1, rounds);

    return resultU8a();
  }
);

export const scrypt = withWasm((wasm) =>
  (password: Uint8Array, salt: Uint8Array, log2n: number, r: number, p: number): Uint8Array => {
    const [ptr0, len0] = allocU8a(password);
    const [ptr1, len1] = allocU8a(salt);

    wasm.ext_scrypt(8, ptr0, len0, ptr1, len1, log2n, r, p);

    return resultU8a();
  }
);

export const sha512 = withWasm((wasm) =>
  (data: Uint8Array): Uint8Array => {
    const [ptr0, len0] = allocU8a(data);

    wasm.ext_sha512(8, ptr0, len0);

    return resultU8a();
  }
);

export const twox = withWasm((wasm) =>
  (data: Uint8Array, rounds: number) => {
    const [ptr0, len0] = allocU8a(data);

    wasm.ext_twox(8, ptr0, len0, rounds);

    return resultU8a();
  }
);

export function isReady (): boolean {
  return !!getWasm();
}

export function waitReady (): Promise<boolean> {
  return wasmPromise.then(() => !!getWasm());
}
