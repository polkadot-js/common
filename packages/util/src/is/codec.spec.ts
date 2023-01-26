// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { perfCmp } from '../test';
import { isCodec } from '.';

const ptest = {
  registry: {
    get: () => null
  },
  toHex: () => '0x',
  toU8a: () => new Uint8Array()
};

describe('isCodec', (): void => {
  it('is false on no value', (): void => {
    expect(isCodec()).toEqual(false);
  });

  it('is true when codec-like signature is found', (): void => {
    expect(
      isCodec({
        registry: {
          get: () => null
        },
        toHex: () => '0x',
        toU8a: () => new Uint8Array()
      })
    ).toEqual(true);
  });

  it('is true when invalid codec-like signature is found', (): void => {
    expect(
      isCodec({
        toHex: () => '0x',
        toU8a: () => new Uint8Array()
      })
    ).toEqual(false);
    expect(
      isCodec({
        registry: {
          get: () => null
        },
        toHex: 1,
        toU8a: () => new Uint8Array()
      })
    ).toEqual(false);
  });

  perfCmp('isCodec', ['isCodec', 'instanceof'], 500_000, [[ptest]], (v: unknown, isSecond) =>
    isSecond
      ? !(v instanceof String)
      : isCodec(v)
  );
});
