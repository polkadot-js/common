// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

import { assert, u8aToU8a } from '@polkadot/util';
import { vrfVerify } from '@polkadot/wasm-crypto';

const EMPTY_U8A = new Uint8Array();

/**
 * @name schnorrkelVrfVerify
 * @description Verify with sr25519 vrf verification
 */
export function schnorrkelVrfVerify (message: HexString | Uint8Array | string, signOutput: HexString | string | Uint8Array, publicKey: HexString | Uint8Array | string, context: HexString | string | Uint8Array = EMPTY_U8A, extra: HexString | string | Uint8Array = EMPTY_U8A): boolean {
  const publicKeyU8a = u8aToU8a(publicKey);
  const proofU8a = u8aToU8a(signOutput);

  assert(publicKeyU8a.length === 32, 'Invalid publicKey, expected 32-bytes');
  assert(proofU8a.length === 96, 'Invalid vrfSign output, expected 96 bytes');

  return vrfVerify(publicKeyU8a, u8aToU8a(context), u8aToU8a(message), u8aToU8a(extra), proofU8a);
}
