// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { base58Decode } from '../base58/decode';
import { checkAddressChecksum } from './checksum';

describe('checkAddressChecksum', (): void => {
  it('correctly extracts the info from a 1-byte-prefix address', (): void => {
    expect(
      checkAddressChecksum(base58Decode('F3opxRbN5ZbjJNU511Kj2TLuzFcDq9BGduA9TgiECafpg29'))
    ).toEqual([true, 33, 1, 2]);
  });

  it('correctly extracts the info from a 2-byte-prefix address (66)', (): void => {
    expect(
      checkAddressChecksum(base58Decode('cTGShekJ1L1UKFZR9xmv9UTJod7vqjFAPo4sDhXih2c3y1yLS'))
    ).toEqual([true, 34, 2, 66]);
  });

  it('correctly extracts the info from a 2-byte-prefix address (255)', (): void => {
    expect(
      checkAddressChecksum(base58Decode('yGHU8YKprxHbHdEv7oUK4rzMZXtsdhcXVG2CAMyC9WhzhjH2k'))
    ).toEqual([true, 34, 2, 255]);
  });

  it('correctly extracts the info from a 2-byte-prefix address (ecdsa, from Substrate)', (): void => {
    expect(
      checkAddressChecksum(base58Decode('4pbsSkWcBaYoFHrKJZp5fDVUKbqSYD9dhZZGvpp3vQ5ysVs5ybV'))
    ).toEqual([true, 35, 2, 200]);
  });
});
