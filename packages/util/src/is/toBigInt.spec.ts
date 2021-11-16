// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isToBigInt } from '.';

describe('isToBigInt', (): void => {
  it('is false on no value', (): void => {
    expect(isToBigInt()).toEqual(false);
  });

  it('is false on non-compact value', (): void => {
    expect(isToBigInt(123)).toEqual(false);
  });

  it('is true when compact-like signature is found', (): void => {
    expect(isToBigInt({
      toBigInt: () => BigInt(1)
    })).toEqual(true);
  });
});
