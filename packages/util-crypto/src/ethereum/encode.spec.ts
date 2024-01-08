// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { keccakAsU8a } from '../keccak/index.js';
import { ethereumEncode } from './index.js';

describe('formatAddress', () => {
  describe('address to address encoding', (): void => {
    const ADDRESS = '0x00a329c0648769A73afAc7F9381E08FB43dBEA72';

    it('returns 0x for no address', () => {
      expect(ethereumEncode()).toBe('0x');
    });

    it('returns fails on invalid address', () => {
      expect(
        () => ethereumEncode('0xnotaddress')
      ).toThrow(/Invalid address or publicKey provided/);
    });

    it('converts lowercase to the checksummed address', () => {
      expect(ethereumEncode(ADDRESS.toLowerCase())).toBe(ADDRESS);
    });

    it('converts uppercase to the checksummed address', () => {
      expect(ethereumEncode(ADDRESS.toUpperCase().replace('0X', '0x'))).toBe(ADDRESS);
    });

    it('returns formatted address on checksum input', () => {
      expect(ethereumEncode(ADDRESS)).toBe(ADDRESS);
    });
  });

  describe('from publicKey', (): void => {
    const ADDRESS = '0x4119b2e6c3Cb618F4f0B93ac77f9BeeC7FF02887';

    it('encodes a compressed publicKey', (): void => {
      expect(
        ethereumEncode('0x03b9dc646dd71118e5f7fda681ad9eca36eb3ee96f344f582fbe7b5bcdebb13077')
      ).toEqual(ADDRESS);
    });

    it('encodes an expanded publicKey', (): void => {
      expect(
        ethereumEncode('0x04b9dc646dd71118e5f7fda681ad9eca36eb3ee96f344f582fbe7b5bcdebb1307763fe926c273235fd979a134076d00fd1683cbd35868cb485d4a3a640e52184af')
      ).toEqual(ADDRESS);
    });

    it('encodes a pre-hashed key', (): void => {
      expect(
        ethereumEncode(
          keccakAsU8a('0xb9dc646dd71118e5f7fda681ad9eca36eb3ee96f344f582fbe7b5bcdebb1307763fe926c273235fd979a134076d00fd1683cbd35868cb485d4a3a640e52184af')
        )
      ).toEqual(ADDRESS);
    });
  });
});
