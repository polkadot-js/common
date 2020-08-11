// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ethereumEncode } from './';

const ADDRESS = '0x00a329c0648769A73afAc7F9381E08FB43dBEA72';

describe('formatAddress', () => {
  it('returns 0x00..00 for no address', () => {
    expect(ethereumEncode()).toBe('0x');
  });

  it('returns 0x00..00 on invalid address', () => {
    expect(ethereumEncode('0xnotaddress')).toBe('0x');
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
