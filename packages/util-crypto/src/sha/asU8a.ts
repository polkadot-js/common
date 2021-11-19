// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

import hash from 'hash.js';

import { u8aToU8a } from '@polkadot/util';
import { isReady, sha256, sha512 } from '@polkadot/wasm-crypto';

/**
 * @name shaAsU8a
 * @summary Creates a sha Uint8Array from the input.
 */
export function shaAsU8a (value: HexString | Buffer | Uint8Array | string, bitLength: 256 | 512 = 256, onlyJs = false): Uint8Array {
  const is256 = bitLength === 256;
  const u8a = u8aToU8a(value);

  return isReady() && !onlyJs
    ? is256
      ? sha256(u8a)
      : sha512(u8a)
    : new Uint8Array(
      is256
        ? hash.sha256().update(u8a).digest()
        : hash.sha512().update(u8a).digest()
    );
}
