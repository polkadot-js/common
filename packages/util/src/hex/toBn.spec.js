// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { hexToBn } from './index';

describe('hexToBn', () => {
  it('converts prefixed hex values to BN', () => {
    expect(
      hexToBn(0x81).toString(16)
    ).toEqual('81');
  });

  it('converts null values to BN(0)', () => {
    expect(
      hexToBn(null).toString()
    ).toEqual('0');
  });

  it('converts 0x values to BN(0)', () => {
    expect(
      hexToBn('0x').toString()
    ).toEqual('0');
  });

  it('converts 0x values to BN(0) (LE)', () => {
    expect(
      hexToBn('0x', true).toString()
    ).toEqual('0');
  });

  it('converts little-endian', () => {
    expect(
      hexToBn('0x4500000000000000', true).toString()
    ).toEqual('69');
  });

  it('handles starting zeros correctly (BE)', () => {
    expect(
      hexToBn('0x0000000000000100', false).toString()
    ).toEqual('256');
  });

  it('handles starting zeros correctly (LE)', () => {
    expect(
      hexToBn('0x0001000000000000', true).toString()
    ).toEqual('256');
  });
});
