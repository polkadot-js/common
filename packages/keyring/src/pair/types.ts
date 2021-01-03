// Copyright 2017-2021 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

export interface PairInfo {
  publicKey: Uint8Array;
  secretKey?: Uint8Array;
  seed?: Uint8Array | null;
}
