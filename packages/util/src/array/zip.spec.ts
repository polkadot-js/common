// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { arrayZip } from '.';

describe('arrayZip', (): void => {
  it('zips a simple one', (): void => {
    expect(
      arrayZip(['a', 'b', 'c'], [1, 2, 3])
    ).toEqual([['a', 1], ['b', 2], ['c', 3]]);
  });

  it('zips where values > keys', (): void => {
    expect(
      arrayZip(['a', 'b', 'c'], [1, 2, 3, 4])
    ).toEqual([['a', 1], ['b', 2], ['c', 3]]);
  });

  it('zips where values < keys', (): void => {
    expect(
      arrayZip(['a', 'b', 'c'], [1, 2])
    ).toEqual([['a', 1], ['b', 2], ['c', undefined]]);
  });
});
