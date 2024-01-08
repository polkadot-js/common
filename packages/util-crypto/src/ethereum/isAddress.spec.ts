// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { isEthereumAddress } from './index.js';

const ADDRESS = '0x00a329c0648769A73afAc7F9381E08FB43dBEA72';

describe('isEthereumAddress', () => {
  it('returns true when fully lowercase', () => {
    expect(isEthereumAddress(ADDRESS.toLowerCase())).toBe(true);
  });

  it('returns true when fully uppercase', () => {
    expect(isEthereumAddress(ADDRESS.toUpperCase().replace('0X', '0x'))).toBe(true);
  });

  it('returns true when checksummed', () => {
    expect(isEthereumAddress(ADDRESS)).toBe(true);
  });

  it('returns false when empty address', () => {
    expect(isEthereumAddress()).toBe(false);
  });

  it('returns false when invalid address', () => {
    expect(isEthereumAddress('0xinvalid')).toBe(false);
  });

  it('returns false when invalid address of correct length', () => {
    expect(isEthereumAddress('0xinvalid000123456789012345678901234567890')).toBe(false);
  });
});
