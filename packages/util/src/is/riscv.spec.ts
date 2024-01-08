// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { isRiscV } from './index.js';

describe('isRiscV', (): void => {
  it('is false on non-elf/non-pvm header', (): void => {
    expect(isRiscV(new Uint8Array([0, 97, 115, 109, 1, 2, 3]))).toEqual(false);
  });

  it('is false on partial-elf/pvm header', (): void => {
    expect(isRiscV(new Uint8Array([0x7f, 0x45, 0x4c]))).toEqual(false);
  });

  it('is false on empty byte before elf/pvm header', (): void => {
    expect(
      isRiscV(
        new Uint8Array([0x00, 0x7f, 0x45, 0x4c, 0x46, 0xff, 0x00, 0x42, 0x23])
      )
    ).toEqual(false);
  });

  it('is true when a elf header is found', (): void => {
    expect(
      isRiscV(new Uint8Array([0x7f, 0x45, 0x4c, 0x46, 0xff, 0x00, 0x42, 0x23]))
    ).toEqual(true);
  });

  it('is true when a pvm header is found', (): void => {
    expect(
      isRiscV(new Uint8Array([0x50, 0x56, 0x4d, 0x00, 0xff, 0x00, 0x42, 0x23]))
    ).toEqual(true);
  });
});
