// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { isString } from '.';

describe('isString', (): void => {
  it('returns true on valid strings', (): void => {
    expect(
      isString('123')
    ).toEqual(true);
  });

  it('returns true on empty strings', (): void => {
    expect(
      isString('')
    ).toEqual(true);
  });

  it('returns true on String object', (): void => {
    expect(
      isString(String('foo'))
    ).toEqual(true);
  });

  it('returns false on invalid numbers', (): void => {
    expect(
      isString(2)
    ).toEqual(false);
  });
});
