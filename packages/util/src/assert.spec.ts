// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { assert } from '.';

describe('assert', (): void => {
  it('should not throw an error when test is true', (): void => {
    assert(true, 'nothing should be thrown');
  });

  it('should throw an error when test is not true', (): void => {
    expect(
      (): void => assert(false, 'error thrown')
    ).toThrow(/error thrown/);
  });

  it('should throw an error when message: () => string', (): void => {
    expect(
      (): void => assert(false, (): string => 'message from function')
    ).toThrow(/message from function/);
  });
});
