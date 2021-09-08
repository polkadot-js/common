// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

import { assert, u8aToU8a } from '@polkadot/util';
import { sr25519DerivePublicSoft } from '@polkadot/wasm-crypto';

export function schnorrkelDerivePublic (publicKey: HexString | Uint8Array | string, chainCode: HexString | Uint8Array | string): Uint8Array {
  const publicKeyU8a = u8aToU8a(publicKey);

  assert(publicKeyU8a.length === 32, () => `Invalid publicKey, received ${publicKeyU8a.length} bytes, expected 32`);

  return sr25519DerivePublicSoft(publicKeyU8a, u8aToU8a(chainCode));
}
