// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { assert } from '.';

describe('assert', (): void => {
  it('should not throw an error when test is true', (): void => {
    expect(
      assert(true, 'nothing should be thrown')
    ).toEqual(true);
  });

  it('should throw an error when test is not true', (): void => {
    expect(
      (): boolean => assert(false, 'error thrown')
    ).toThrow(/error thrown/);
  });

  it('should throw an error when message: () => string', (): void => {
    expect(
      (): boolean => assert(false, (): string => 'message from function')
    ).toThrow(/message from function/);
  });

  it('throws a valid constructed ExtError', (): void => {
    try {
      assert(false, 'error', -666, 'data');
    } catch (error) {
      expect(error.code).toEqual(-666);
      expect(error.data).toEqual('data');
      expect(error.message).toEqual('error');
    }
  });
});
