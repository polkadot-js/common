// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';

import { stringify } from './stringify';

describe('stringify', (): void => {
  it('stringifies a BigInt', (): void => {
    expect(
      stringify(1234n)
    ).toEqual('"1234"');
  });

  it('stringifies an array of values', (): void => {
    expect(
      stringify(['a', 1, 2n, new BN(3)])
    ).toEqual('["a",1,"2","3"]');
  });

  it('stringifies a nested object', (): void => {
    expect(
      stringify({ a: 'a', b: 1, c: { d: 2n, e: new BN(3) } })
    ).toEqual('{"a":"a","b":1,"c":{"d":"2","e":"3"}}');
  });
});
