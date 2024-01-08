// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { BN } from './bn/index.js';
import { stringify } from './stringify.js';

describe('stringify', (): void => {
  it('stringifies a BigInt', (): void => {
    expect(
      stringify(1234n)
    ).toEqual('"1234"');
  });

  it('stringifies an array of values', (): void => {
    expect(
      stringify(['a', 1, 2n, new BN(69)])
    ).toEqual('["a",1,"2","45"]');
  });

  it('stringifies an array of values (with spaces)', (): void => {
    expect(
      stringify(['a', 1, 2n, new BN(3)], 2)
    ).toEqual('[\n  "a",\n  1,\n  "2",\n  "03"\n]');
  });

  it('stringifies a nested object', (): void => {
    expect(
      stringify({ a: 'a', b: 1, c: { d: 2n, e: new BN(3) } })
    ).toEqual('{"a":"a","b":1,"c":{"d":"2","e":"03"}}');
  });
});
