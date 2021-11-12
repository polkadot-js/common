// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isArray } from '.';

describe('isArray', (): void => {
  it('is false on no value', (): void => {
    expect(isArray()).toEqual(false);
  });

  it('is false on non-array', (): void => {
    expect(isArray(123)).toEqual(false);
  });

  it('is true when Array is found', (): void => {
    expect(isArray([1, 2, 3])).toEqual(true);
  });
});
