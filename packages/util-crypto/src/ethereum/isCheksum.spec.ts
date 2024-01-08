// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { isEthereumChecksum } from './index.js';

const ADDRESS = '0x00a329c0648769A73afAc7F9381E08FB43dBEA72';

describe('isEthereumChecksum', () => {
  it('returns false on invalid address', () => {
    expect(isEthereumChecksum('0x00a329c0648769')).toBe(false);
  });

  it('returns false on non-checksum address', () => {
    expect(isEthereumChecksum('0x1234567890abcdeedcba1234567890abcdeedcba')).toBe(false);
  });

  it('returns false when fully lowercase', () => {
    expect(isEthereumChecksum(ADDRESS.toLowerCase())).toBe(false);
  });

  it('returns false when fully uppercase', () => {
    expect(isEthereumChecksum(ADDRESS.toUpperCase().replace('0X', '0x'))).toBe(false);
  });

  it('returns true on a checksummed address', () => {
    expect(isEthereumChecksum(ADDRESS)).toBe(true);
  });
});
