// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { perf } from '../test/index.js';
import { objectProperties, objectProperty } from './index.js';

describe('objectProperty/objectProperties', (): void => {
  it('sets a property', (): void => {
    const test: { a?: unknown } = {};

    expect(test.a).toEqual(undefined);

    objectProperty(test, 'a', () => 2);

    expect(Object.prototype.hasOwnProperty.call(test, 'a')).toBe(true);
    expect('a' in test).toEqual(true);
    expect(test.a).toEqual(2);
  });

  it('does not override an existing property (record)', (): void => {
    const test = { a: 1 };

    expect(test.a).toEqual(1);

    objectProperty(test, 'a', () => 2);

    expect(test.a).toEqual(1);
  });

  it('does not override an existing property (class)', (): void => {
    class Test {
      b = 1;

      get a () {
        return 1 + 0;
      }
    }

    const test = new Test();

    expect(test.a).toEqual(1);
    expect(test.b).toEqual(1);

    objectProperty(test, 'a', () => 2);
    objectProperty(test, 'b', () => 2);

    expect(test.a).toEqual(1);
    expect(test.b).toEqual(1);
  });

  it('does not override an existing property (inherited)', (): void => {
    class Parent extends Map<string, unknown> {
      constructor () {
        super();

        this.set('a', 1);
      }

      get a (): unknown {
        return this.get('a');
      }
    }

    class Child extends Parent {
      constructor () {
        super();

        this.set('b', 1);
      }

      get b (): unknown {
        return this.get('b');
      }
    }

    const test = new Child() as unknown as { a: number; b: number; c?: number };

    expect(test.a).toEqual(1);
    expect(test.b).toEqual(1);
    expect(test.c).toEqual(undefined);

    objectProperties(test, ['a', 'b', 'c'], () => 2);

    expect(test.a).toEqual(1);
    expect(test.b).toEqual(1);
    expect(test.c).toEqual(2);
  });

  it('works with this used in classes', (): void => {
    class Test extends Map<string, unknown> {
      constructor () {
        super();

        this.set('a', 1);

        objectProperty(this, 'a', (k) => this.get(k));
      }
    }

    const test = new Test() as unknown as { a: number };

    expect(test.a).toEqual(1);
  });

  it('works with this used in classes (multiples)', (): void => {
    class Test extends Map<string, unknown> {
      constructor () {
        super();

        this.set('a', 1);
        this.set('b', 2);

        objectProperties(this, ['a', 'b'], (k) => this.get(k));
      }
    }

    const test = new Test() as unknown as { a: number; b: number };

    expect(test.a).toEqual(1);
    expect(test.b).toEqual(2);
  });

  it('calls back with the key name (single)', (): void => {
    const test: { a?: number } = {};
    const getter = jest.fn(() => 123);

    objectProperty(test, 'a', getter);

    expect(getter).not.toHaveBeenCalled();
    expect(test.a).toEqual(123);
    expect(getter).toHaveBeenCalledWith('a', 0, expect.objectContaining({}));
  });

  it('calls back with the key name & index (numtiple)', (): void => {
    const test: { a?: number; b?: number; c?: number } = {};
    const getter = jest.fn(() => 123);

    objectProperties(test, ['a', 'b', 'c'], getter);

    expect(getter).not.toHaveBeenCalled();
    expect(test.b).toEqual(123);
    expect(getter).toHaveBeenCalledWith('b', 1, expect.objectContaining({}));
  });

  perf('objectProperties (obj)', 50_000, [[]], () => objectProperties({}, ['foo', 'bar', 'baz'], (k) => k));
  perf('objectProperties (map)', 50_000, [[]], () => objectProperties(new Map(), ['foo', 'bar', 'baz'], (k) => k));
});
