// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hexToNumber } from '.';

describe('hexToNumber', (): void => {
  it('converts an empty to NaN', (): void => {
    expect(
      hexToNumber()
    ).toEqual(NaN);
  });

  it('converts to a number from hex', (): void => {
    expect(
      hexToNumber('0x1234')
    ).toEqual(0x1234);
  });
});
