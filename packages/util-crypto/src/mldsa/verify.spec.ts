// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { mldsaVerify } from './verify.js';

describe('mldsaVerify', (): void => {
  it('throws an error as it is not yet implemented', (): void => {
    expect(() => mldsaVerify()).toThrow('mldsa verification is not implemented');
  });
});
