// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { newBigInt } from '@polkadot/util';

// Adapted from https://github.com/pierrec/js-xxhash/blob/0504e76f3d31a21ae8528a7f590c7289c9e431d2/lib/xxhash64.js
//
// xxHash64 implementation in pure Javascript
// Copyright (C) 2016, Pierre Curto
// MIT license
//
// Changes made:
//   - converted to TypeScript
//   - uses native JS BigInt (no external dependencies)
//   - support only for Uint8Array inputs
//   - no constructor function, straight fill & digest
//   - update code removed, only called once, no streams

interface State {
  seed: bigint;
  u8a: Uint8Array;
  u8asize: number;
  v1: bigint;
  v2: bigint;
  v3: bigint;
  v4: bigint;
}

const P64_1 = newBigInt('11400714785074694791');
const P64_2 = newBigInt('14029467366897019727');
const P64_3 = newBigInt('1609587929392839161');
const P64_4 = newBigInt('9650029242287828579');
const P64_5 = newBigInt('2870177450012600261');

// mask for a u64, all bits set
const U64 = newBigInt('0xffffffffffffffff');

// various constants
const N0 = newBigInt(0);
const N1 = newBigInt(1);
const N7 = newBigInt(7);
const N11 = newBigInt(11);
const N12 = newBigInt(12);
const N16 = newBigInt(16);
const N18 = newBigInt(18);
const N23 = newBigInt(23);
const N27 = newBigInt(27);
const N29 = newBigInt(29);
const N31 = newBigInt(31);
const N32 = newBigInt(32);
const N33 = newBigInt(33);
const N64 = newBigInt(64);
const N256 = newBigInt(256);

function rotl (a: bigint, b: bigint): bigint {
  const c = a & U64;

  return ((c << b) | (c >> (N64 - b))) & U64;
}

function fromU8a (u8a: Uint8Array, p: number, count: 2 | 4): bigint {
  const bigints = new Array<bigint>(count);
  let offset = 0;

  for (let i = 0; i < count; i++, offset += 2) {
    bigints[i] = BigInt(u8a[p + offset] | (u8a[p + 1 + offset] << 8));
  }

  let result = N0;

  for (let i = count - 1; i >= 0; i--) {
    result = (result << N16) + bigints[i];
  }

  return result;
}

function toU8a (h64: bigint): Uint8Array {
  const result = new Uint8Array(8);

  for (let i = 7; i >= 0; i--) {
    result[i] = Number(h64 % N256);

    h64 = h64 / N256;
  }

  return result;
}

function state (initSeed: bigint | number): State {
  const seed = BigInt(initSeed);

  return {
    seed,
    u8a: new Uint8Array(32),
    u8asize: 0,
    v1: seed + P64_1 + P64_2,
    v2: seed + P64_2,
    v3: seed,
    v4: seed - P64_1
  };
}

function init (state: State, input: Uint8Array): State {
  if (input.length < 32) {
    state.u8a.set(input);
    state.u8asize = input.length;

    return state;
  }

  const limit = input.length - 32;
  let p = 0;

  if (limit >= 0) {
    const adjustV = (v: bigint) =>
      P64_1 * rotl(v + P64_2 * fromU8a(input, p, 4), N31);

    do {
      state.v1 = adjustV(state.v1); p += 8;
      state.v2 = adjustV(state.v2); p += 8;
      state.v3 = adjustV(state.v3); p += 8;
      state.v4 = adjustV(state.v4); p += 8;
    } while (p <= limit);
  }

  if (p < input.length) {
    state.u8a.set(input.subarray(p, input.length));
    state.u8asize = input.length - p;
  }

  return state;
}

export function xxhash64 (input: Uint8Array, initSeed: bigint | number): Uint8Array {
  const { seed, u8a, u8asize, v1, v2, v3, v4 } = init(state(initSeed), input);
  let p = 0;
  let h64 = U64 & (BigInt(input.length) + (
    input.length >= 32
      ? (((((((((rotl(v1, N1) + rotl(v2, N7) + rotl(v3, N12) + rotl(v4, N18)) ^ (P64_1 * rotl(v1 * P64_2, N31))) * P64_1 + P64_4) ^ (P64_1 * rotl(v2 * P64_2, N31))) * P64_1 + P64_4) ^ (P64_1 * rotl(v3 * P64_2, N31))) * P64_1 + P64_4) ^ (P64_1 * rotl(v4 * P64_2, N31))) * P64_1 + P64_4)
      : (seed + P64_5)
  ));

  while (p <= (u8asize - 8)) {
    h64 = U64 & (P64_4 + P64_1 * rotl(h64 ^ (P64_1 * rotl(P64_2 * fromU8a(u8a, p, 4), N31)), N27));
    p += 8;
  }

  if ((p + 4) <= u8asize) {
    h64 = U64 & (P64_3 + P64_2 * rotl(h64 ^ (P64_1 * fromU8a(u8a, p, 2)), N23));
    p += 4;
  }

  while (p < u8asize) {
    h64 = U64 & (P64_1 * rotl(h64 ^ (P64_5 * BigInt(u8a[p++])), N11));
  }

  h64 = U64 & (P64_2 * (h64 ^ (h64 >> N33)));
  h64 = U64 & (P64_3 * (h64 ^ (h64 >> N29)));

  return toU8a(U64 & (h64 ^ (h64 >> N32)));
}
