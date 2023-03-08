// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import { isNumber } from './index.js';

describe('isNumber', (): void => {
  it('returns true on valid numbers', (): void => {
    expect(
      isNumber(2)
    ).toEqual(true);
  });

  it('returns false on invalid numbers', (): void => {
    expect(
      isNumber('2')
    ).toEqual(false);
  });
});
