// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';
import type { Keypair } from '../types';

import ed25519 from 'tweeted25519';

import { assert, u8aToU8a } from '@polkadot/util';
import { ed25519Sign, isReady } from '@polkadot/wasm-crypto';

/**
 * @name ed25519Sign
 * @summary Signs a message using the supplied secretKey
 * @description
 * Returns message signature of `message`, using the `secretKey`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { ed25519Sign } from '@polkadot/util-crypto';
 *
 * ed25519Sign([...], [...]); // => [...]
 * ```
 */
export function ed25519Sign (message: HexString | Uint8Array | string, { publicKey, secretKey }: Partial<Keypair>, onlyJs?: boolean): Uint8Array {
  assert(secretKey, 'Expected a valid secretKey');

  const messageU8a = u8aToU8a(message);

  return !onlyJs && isReady()
    ? ed25519Sign(publicKey as Uint8Array, secretKey.subarray(0, 32), messageU8a)
    : ed25519.sign.detached(messageU8a, secretKey);
}
