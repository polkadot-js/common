// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { hexAddPrefix } from '.';

describe('hexAddPrefix', (): void => {
  it('does not add when prefix is available', (): void => {
    expect(
      hexAddPrefix('0x0123')
    ).toEqual('0x0123');
  });

  it('adds the prefix when it is not available', (): void => {
    expect(
      hexAddPrefix('0123')
    ).toEqual('0x0123');
  });

  it('adds extra 0 when length % 2 === 1', (): void => {
    expect(
      hexAddPrefix('123')
    ).toEqual('0x0123');
  });

  it('returns null as 0x', (): void => {
    expect(
      hexAddPrefix(null)
    ).toEqual('0x');
  });
});
