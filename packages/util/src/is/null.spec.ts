// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import { isNull } from './index.js';

describe('isNull', (): void => {
  it('returns true when a null value', (): void => {
    expect(
      isNull(null)
    ).toEqual(true);
  });

  it('returns false on non-null values', (): void => {
    expect(
      isNull()
    ).toEqual(false);
  });
});
