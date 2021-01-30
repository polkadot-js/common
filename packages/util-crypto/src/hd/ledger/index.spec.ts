// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aToHex } from '@polkadot/util';

import { hdLedger } from '..';

describe('ledgerDerive', (): void => {
  it('derives a known private key for Kusama', (): void => {
    expect(u8aToHex(
      hdLedger('abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about', `m/44'/${0x01b2}'/0'/0'/0'`)
        .secretKey
        .slice(0, 32)
    )).toEqual('0x98cb4e14e0e08ea876f88d728545ea7572dc07dbbe69f1731c418fb827e69d41');
  });

  it('derives a known private key for Polkadot', (): void => {
    expect(u8aToHex(
      hdLedger('abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about', `m/44'/${0x80000162}/0'/0'/0'`)
        .secretKey
        .slice(0, 32)
    )).toEqual('0xe8c68348586d53e4e8d1a864b0e4e17c75e4eb06e0c63c1432bef2ba29e69d41');
  });
});
