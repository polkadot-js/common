// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { sha512 as sha512Js } from '@noble/hashes/lib/sha512';

import { hasBigInt } from '@polkadot/util';
import { isReady, sha512 } from '@polkadot/wasm-crypto';

/**
 * @name sha512AsU8a
 * @summary Creates sha-512 hash of the input.
 * @description
 * Returns a sha-512 `Uint8Array` from the supplied data.
 * @example
 * <BR>
 *
 * ```javascript
 * import { sha512AsU8a } from '@polkadot/util-crypto';
 *
 * sha512AsU8a(Uint8Array.from([...])); // => Uint8Array([...])
 * ```
 */
export function sha512AsU8a (data: Uint8Array, onlyJs = false): Uint8Array {
  return !hasBigInt || (isReady() && !onlyJs)
    ? sha512(data)
    : sha512Js(data);
}
