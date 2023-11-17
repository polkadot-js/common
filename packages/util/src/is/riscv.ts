// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aEq } from '../u8a/eq.js';
import { isU8a } from './u8a.js';

const ELF_MAGIC = new Uint8Array([0x50, 0x56, 0x4d, 0x00]); // 'P', 'V', 'M', 0x00

/**
 * @name isRiscV
 * @summary Tests if the input has a RISC-V header
 * @description
 * Checks to see if the input Uint8Array contains a valid RISC-V header
 */
export function isRiscV (bytes: unknown): bytes is Uint8Array {
  return isU8a(bytes) && u8aEq(bytes.subarray(0, 4), ELF_MAGIC);
}
