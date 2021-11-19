// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

import { shaAsU8a } from './asU8a';

/**
 * @name sha256AsU8a
 * @summary Creates a sha256 Uint8Array from the input.
 */
export function sha256AsU8a (value: HexString | Buffer | Uint8Array | string, onlyJs = false): Uint8Array {
  return shaAsU8a(value, 256, onlyJs);
}
