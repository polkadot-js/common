// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { lazyMethod, lazyMethods } from '.';

describe('lazyMethod', (): void => {
  it('adds a key on the object', (): void => {
    const test: Record<string, unknown> = {};

    expect(test.a).not.toBeDefined();

    lazyMethod(test, 'a', () => 123);

    expect(test.a).toEqual(123);
  });

  it('allows the name to be retrieved', (): void => {
    const test: Record<string, unknown> = {};

    expect(test.a).not.toBeDefined();

    lazyMethod(test, 456, () => 123, () => 'a');

    expect(test.a).toEqual(123);
  });

  it('calls the getter lazily', (): void => {
    const test: Record<string, unknown> = {};
    const getter = jest.fn(() => 123);

    expect(test.a).not.toBeDefined();

    lazyMethod(test, 'a', getter);

    expect(Object.prototype.hasOwnProperty.call(test, 'a')).toEqual(true);
    expect(getter).not.toHaveBeenCalled();
    expect(test.a).toEqual(123);
    expect(getter).toHaveBeenCalledWith('a');
  });

  it('calls the getter a single time', (): void => {
    const test: Record<string, unknown> = {};
    const getter = jest.fn(() => 123);

    lazyMethod(test, 'a', getter);

    expect(getter).not.toHaveBeenCalled();
    expect(test.a).toEqual(123);
    expect(getter).toHaveBeenCalledWith('a');
    expect(test.a).toEqual(123);
    expect(getter).toHaveBeenCalledTimes(1);
  });
});

describe('lazyMethods', (): void => {
  it('sets multiple properties', (): void => {
    const test: Record<string, unknown> = {};
    const getter = jest.fn((name: string) => name);
    const set = lazyMethods(test, ['a', 'b', 'c'], getter);

    expect(set.a).toEqual('a');
    expect(set.b).toEqual('b');
    expect(getter).toHaveBeenCalledTimes(2);
    expect(set.a).toEqual('a');
    expect(set.b).toEqual('b');
    expect(getter).toHaveBeenCalledTimes(2);
  });
});
