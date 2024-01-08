// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { lazyMethod, lazyMethods } from './index.js';

describe('lazyMethod', (): void => {
  it('adds a key on the object', (): void => {
    const test: { a?: number } = {};

    expect(test.a).not.toBeDefined();

    lazyMethod(test, 'a', () => 123);

    expect(test.a).toEqual(123);
  });

  it('allows the name to be retrieved', (): void => {
    const test: { a?: number } = {};

    expect(test.a).not.toBeDefined();

    lazyMethod(test, 456, () => 123, () => 'a');

    expect(test.a).toEqual(123);
  });

  it('calls the getter lazily', (): void => {
    const test: { a?: number } = {};
    const getter = jest.fn(() => 123);

    expect(test.a).not.toBeDefined();

    lazyMethod(test, 'a', getter);

    expect(Object.prototype.hasOwnProperty.call(test, 'a')).toEqual(true);
    expect(getter).not.toHaveBeenCalled();
    expect(test.a).toEqual(123);
    expect(getter).toHaveBeenCalledWith('a', 0, expect.objectContaining({}));
  });

  it('calls the getter a single time', (): void => {
    const test: { a?: number } = {};
    const getter = jest.fn(() => 123);

    lazyMethod(test, 'a', getter);

    expect(getter).not.toHaveBeenCalled();
    expect(test.a).toEqual(123);
    expect(getter).toHaveBeenCalledWith('a', 0, expect.objectContaining({}));
    expect(test.a).toEqual(123);
    expect(getter).toHaveBeenCalledTimes(1);
  });
});

describe('lazyMethods', (): void => {
  it('sets multiple properties', (): void => {
    const test: { a?: string; b?: string; c?: string } = {};
    const getter = jest.fn((name: string) => name);

    lazyMethods(test, ['a', 'b', 'c'], getter);

    expect(test.a).toEqual('a');
    expect(test.b).toEqual('b');
    expect(getter).toHaveBeenCalledTimes(2);
    expect(test.a).toEqual('a');
    expect(test.b).toEqual('b');
    expect(getter).toHaveBeenCalledTimes(2);
  });
});
