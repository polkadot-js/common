// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { isEthereumChecksum } from './';

const ADDRESS = '0x00a329c0648769A73afAc7F9381E08FB43dBEA72';

describe('isEthereumChecksum', () => {
  it('returns false on invalid address', () => {
    expect(isEthereumChecksum('0xinvalid')).toBe(false);
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
