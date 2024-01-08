// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aEq } from '../u8a/eq.js';
import { isU8a } from './u8a.js';

// general elf header
const ELF_MAGIC = new Uint8Array([0x7f, 0x45, 0x4c, 0x46]); // ELF magic bytes: 0x7f, 'E', 'L', 'F'

// contract-specific PVM header
const PVM_MAGIC = new Uint8Array([0x50, 0x56, 0x4d, 0x00]); // 'P', 'V', 'M', 0x00

/**
 * @name isRiscV
 * @summary Tests if the input has a RISC-V header
 * @description
 * Checks to see if the input Uint8Array contains a valid RISC-V header
 */
export function isRiscV (bytes: unknown): bytes is Uint8Array {
  if (isU8a(bytes)) {
    const start = bytes.subarray(0, 4);

    return u8aEq(start, PVM_MAGIC) || u8aEq(start, ELF_MAGIC);
  }

  return false;
}
