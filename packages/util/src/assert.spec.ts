// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

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
