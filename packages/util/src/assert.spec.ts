// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { assert, assertReturn } from './index.js';

describe('assert', (): void => {
  it('should not throw an error when test is true', (): void => {
    assert(true, 'nothing should be thrown');
  });

  it('should throw an error when test is not true', (): void => {
    expect(
      () => assert(false, 'error thrown')
    ).toThrow(/error thrown/);
  });

  it('should throw an error when message: () => string', (): void => {
    expect(
      () => assert(false, (): string => 'message from function')
    ).toThrow(/message from function/);
  });
});

describe('assertReturn', (): void => {
  it('should not throw an error when result is true', (): void => {
    expect(assertReturn(true, 'nothing should be thrown')).toEqual(true);
  });

  it('should not throw an error when result is false', (): void => {
    expect(assertReturn(false, 'nothing should be thrown')).toEqual(false);
  });

  it('should throw an error when result is undefined', (): void => {
    expect(
      () => assertReturn(undefined, 'something thrown')
    ).toThrow(/something thrown/);
  });
});
