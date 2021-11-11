// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { objectProperties, objectProperty } from '.';

describe('objectProperty/objectProperties', (): void => {
  it('sets a property', (): void => {
    const test: Record<string, unknown> = {};

    expect(test.a).toEqual(undefined);

    objectProperty(test, 'a', () => 2);

    expect(test.a).toEqual(2);
  });

  it('does not override an existing property', (): void => {
    const test: Record<string, unknown> = { a: 1 };

    expect(test.a).toEqual(1);

    objectProperty(test, 'a', () => 2);

    expect(test.a).toEqual(1);
  });

  it('does not override an existing property (inherited)', (): void => {
    class Parent {
      a = 1;
    }
    class Child extends Parent {
      b = 1;
    }

    const test = new Child() as unknown as Record<string, unknown>;

    expect(test.a).toEqual(1);
    expect(test.b).toEqual(1);
    expect(test.c).toEqual(undefined);

    objectProperties(test, ['a', 'b', 'c'], () => 2);

    expect(test.a).toEqual(1);
    expect(test.b).toEqual(1);
    expect(test.c).toEqual(2);
  });

  it('calls back with the key name (single)', (): void => {
    const test: Record<string, unknown> = {};
    const getter = jest.fn(() => 123);

    objectProperty(test, 'a', getter);

    expect(getter).not.toHaveBeenCalled();
    expect(test.a).toEqual(123);
    expect(getter).toHaveBeenCalledWith('a');
  });

  it('calls back with the key name & index (numtiple)', (): void => {
    const test: Record<string, unknown> = {};
    const getter = jest.fn(() => 123);

    objectProperties(test, ['a', 'b', 'c'], getter);

    expect(getter).not.toHaveBeenCalled();
    expect(test.b).toEqual(123);
    expect(getter).toHaveBeenCalledWith('b', 1);
  });
});
