// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

import { u8aToHex } from '@polkadot/util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createAsHex <T extends (...args: any[]) => Uint8Array> (fn: T): (...args: Parameters<T>) => HexString {
  return (...args: Parameters<T>): HexString =>
    u8aToHex(fn(...args));
}

export function createBitHasher <T> (bitLength: T, fn: (data: HexString | Buffer | Uint8Array | string, bitLength: T, onlyJs?: boolean) => Uint8Array): (data: HexString | Buffer | Uint8Array | string, onlyJs?: boolean) => Uint8Array {
  return (data: HexString | Buffer | Uint8Array | string, onlyJs?: boolean): Uint8Array =>
    fn(data, bitLength, onlyJs);
}
