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

  it('has the correct instanceof', (): void => {
    expect(
      isBigInt(new BigIntClass(0))
    ).toEqual(true);
  });

  it('has a top-level toString method', (): void => {
    const test = new BigIntClass(16);

    expect(test.toString()).toEqual('16');
    expect(test.toString(16)).toEqual('10');
  });

  it('cane be added together', (): void => {
    expect(new BigIntClass(16) + new BigIntClass(10)).toEqual(26n);
  });

  it('has the correct type for inherited', (): void => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    class Test extends BigIntClass implements BigInt {
    }

    expect(isBigInt(new Test(0x16))).toEqual(true);
  });

  it('inhertited class has own methods', (): void => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    class Test extends BigIntClass {
      toHex (): string {
        return `0x${(this as unknown as bigint).toString(16)}`;
      }
    }

    expect(new Test(0x16).toHex()).toEqual('0x16');
  });

  it('inhertited class still acts like bigint', (): void => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    class Test extends BigIntClass {
      // nothing
    }

    const test = new Test(0x16n);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(test.toString(16)).toEqual('16');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(test * 2n).toEqual(44n);
  });
});
