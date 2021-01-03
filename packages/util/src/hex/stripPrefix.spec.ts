// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hexStripPrefix } from '.';

describe('hexStripPrefix', (): void => {
  it('returns an empty string when null value supplied', (): void => {
    expect(
      hexStripPrefix(null)
    ).toEqual('');
  });

  it('strips the prefix from hex strings', (): void => {
    expect(
      hexStripPrefix('0x1223')
    ).toEqual('1223');
  });

  it('returns un-prefixed hex as-is', (): void => {
    expect(
      hexStripPrefix('abcd1223')
    ).toEqual('abcd1223');
  });

  it('throws when invalid hex', (): void => {
    expect(
      (): string => hexStripPrefix('0x0x01ab')
    ).toThrow(/Invalid hex/);
  });
});
