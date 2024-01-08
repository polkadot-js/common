// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { u8aToHex } from '@polkadot/util';

import { ledgerMaster } from './master.js';

const MNEMONIC = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
const XPRV = '0x402b03cd9c8bed9ba9f9bd6cd9c315ce9fcc59c7c25d37c85a36096617e69d418e35cb4a3b737afd007f0688618f21a8831643c0e6c77fc33c06026d2a0fc93832596435e70647d7d98ef102a32ea40319ca8fb6c851d7346d3bd8f9d1492658';

describe('ledgerDerive', (): void => {
  it('derives a known master xprv', (): void => {
    expect(u8aToHex(
      ledgerMaster(MNEMONIC)
    )).toEqual(XPRV);
  });
});
