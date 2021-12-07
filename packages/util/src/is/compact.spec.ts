// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';

import { isCompact } from '.';

describe('isCompact', (): void => {
  it('is false on no value', (): void => {
    expect(isCompact()).toEqual(false);
  });

  it('is false on non-compact value', (): void => {
    expect(isCompact(123)).toEqual(false);
  });

  it('is true when compact-like signature is found', (): void => {
    expect(isCompact({
      toBigInt: () => BigInt(1),
      toBn: () => new BN(1),
      toNumber: () => 1,
      unwrap: () => new BN(1)
    })).toEqual(true);
  });
});
