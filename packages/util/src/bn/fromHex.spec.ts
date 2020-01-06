// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import isFunction from '../is/function';

import { bnFromHex } from '.';

describe('bnFromHex', (): void => {
  it('exists as a function', (): void => {
    expect(
      isFunction(bnFromHex)
    ).toEqual(true);
  });
});
