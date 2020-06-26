// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import bs58 from 'bs58';
import { u8aToBuffer } from '@polkadot/util';

export default function base58Decode (value: Uint8Array): string {
  return bs58.encode(
    u8aToBuffer(value)
  );
}
