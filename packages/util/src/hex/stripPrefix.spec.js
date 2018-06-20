// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { hexStripPrefix } from './index';

describe('hexStripPrefix', () => {
  it('returns an empty string when null value supplied', () => {
    expect(
      hexStripPrefix(null)
    ).toEqual('');
  });

  it('strips the prefix from hex strings', () => {
    expect(
      hexStripPrefix('0x1223')
    ).toEqual('1223');
  });

  it('returns un-prefixed hex as-is', () => {
    expect(
      hexStripPrefix('abcd1223')
    ).toEqual('abcd1223');
  });

  it('throws when invalid hex', () => {
    expect(
      () => hexStripPrefix('0x0x01ab')
    ).toThrow(/Invalid hex/);
  });
});
