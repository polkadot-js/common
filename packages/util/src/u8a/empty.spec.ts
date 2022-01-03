// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { performance } from '../test/performance';
import { u8aEmpty } from '.';

const ztest = new Uint8Array(32);

describe('u8aEmpty', (): void => {
  it('returns true on zero length', (): void => {
    expect(
      u8aEmpty(new Uint8Array())
    ).toEqual(true);
  });

  it('returns true on all zero values', (): void => {
    expect(
      u8aEmpty(new Uint8Array([0, 0, 0, 0, 0, 0]))
    ).toEqual(true);
  });

  it('returns false when value is found', (): void => {
    expect(
      u8aEmpty(new Uint8Array([0, 0, 0, 0, 0, 1]))
    ).toEqual(false);
  });

  performance('u8aEmpty (32 cmp)', 1000000, [[ztest]], u8aEmpty);
});
