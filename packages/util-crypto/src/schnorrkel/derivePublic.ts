// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '../polyfill';

import { sr25519DerivePublicSoft } from '@polkadot/wasm-crypto';

export default function deriveSoft (publicKey: Uint8Array, chainCode: Uint8Array): Uint8Array {
  return sr25519DerivePublicSoft(publicKey, chainCode);
}
