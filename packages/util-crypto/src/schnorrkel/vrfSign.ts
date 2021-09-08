// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';
import type { Keypair } from '../types';

import { assert, u8aToU8a } from '@polkadot/util';
import { vrfSign } from '@polkadot/wasm-crypto';

const EMPTY_U8A = new Uint8Array();

/**
 * @name schnorrkelVrfSign
 * @description Sign with sr25519 vrf signing (deterministic)
 */
export function schnorrkelVrfSign (message: HexString | Uint8Array | string, { secretKey }: Partial<Keypair>, context: HexString | string | Uint8Array = EMPTY_U8A, extra: HexString | string | Uint8Array = EMPTY_U8A): Uint8Array {
  assert(secretKey?.length === 64, 'Invalid secretKey, expected 64-bytes');

  return vrfSign(secretKey, u8aToU8a(context), u8aToU8a(message), u8aToU8a(extra));
}
