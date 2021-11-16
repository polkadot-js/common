// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isBigInt } from '../is';
import { BigIntClass } from '.';

describe('BigIntClass', (): void => {
  it('has the correct valueOf', (): void => {
    expect(
      typeof new BigIntClass(0).valueOf()
    ).toEqual('bigint');
  });

  it('has the correct typeof', (): void => {
    expect(
      isBigInt(new BigIntClass(0))
    ).toEqual(true);
  });

  it('has the correct type for inherited', (): void => {
    class Test extends BigIntClass {
      toHex (): string {
        return `0x${this.toString(16)}`;
      }
    }
    expect(
      isBigInt(new Test(0))
    ).toEqual(true);
  });

  it('has a top-level toString method', (): void => {
    const test = new BigIntClass(16);

    expect(test.toString()).toEqual('16');
    expect(test.toString(16)).toEqual('10');
  });
});
