// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import keyDerive from './derive';

describe('keyDerive', () => {
  it('derives on "hello world"', () => {
    expect(
      keyDerive('hello world')
    ).toEqual({
      path: [],
      phrase: 'hello world'
    });
  });

  it('derives on "hello world/1', () => {
    expect(
      keyDerive('hello world/1')
    ).toEqual({
      path: [
        { _isHard: false, _data: Uint8Array.from([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) }
      ],
      phrase: 'hello world'
    });
  });

  it('derives on "hello world/DOT', () => {
    expect(
      keyDerive('hello world/DOT')
    ).toEqual({
      path: [
        { _isHard: false, _data: Uint8Array.from([68, 79, 84, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) }
      ],
      phrase: 'hello world'
    });
  });

  it('derives on "hello world//1', () => {
    expect(
      keyDerive('hello world//1')
    ).toEqual({
      path: [
        { _isHard: true, _data: Uint8Array.from([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) }
      ],
      phrase: 'hello world'
    });
  });

  it('derives on "hello world//DOT', () => {
    expect(
      keyDerive('hello world//DOT')
    ).toEqual({
      path: [
        { _isHard: true, _data: Uint8Array.from([68, 79, 84, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) }
      ],
      phrase: 'hello world'
    });
  });

  it('derives on "hello world//1/DOT', () => {
    expect(
      keyDerive('hello world//1/DOT')
    ).toEqual({
      path: [
        { _isHard: true, _data: Uint8Array.from([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) },
        { _isHard: false, _data: Uint8Array.from([68, 79, 84, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) }
      ],
      phrase: 'hello world'
    });
  });

  it('derives on "hello world//DOT/1', () => {
    expect(
      keyDerive('hello world//DOT/1')
    ).toEqual({
      path: [
        { _isHard: true, _data: Uint8Array.from([68, 79, 84, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) },
        { _isHard: false, _data: Uint8Array.from([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) }
      ],
      phrase: 'hello world'
    });
  });

  it('derives on "hello world///password"', () => {
    expect(
      keyDerive('hello world///password')
    ).toEqual({
      password: 'password',
      path: [],
      phrase: 'hello world'
    });
  });

  it('derives on "hello world//1/DOT///password"', () => {
    expect(
      keyDerive('hello world//1/DOT///password')
    ).toEqual({
      path: [
        { _isHard: true, _data: Uint8Array.from([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) },
        { _isHard: false, _data: Uint8Array.from([68, 79, 84, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) }
      ],
      password: 'password',
      phrase: 'hello world'
    });
  });

  it('derives on "hello world/1//DOT///password"', () => {
    expect(
      keyDerive('hello world/1//DOT///password')
    ).toEqual({
      path: [
        { _isHard: false, _data: Uint8Array.from([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) },
        { _isHard: true, _data: Uint8Array.from([68, 79, 84, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) }
      ],
      password: 'password',
      phrase: 'hello world'
    });
  });

  it('derives on actual Alice', () => {
    expect(
      keyDerive('bottom drive obey lake curtain smoke basket hold race lonely fit walk//Alice')
    ).toEqual({
      path: [
        { _isHard: true, _data: Uint8Array.from([65, 108, 105, 99, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) }
      ],
      phrase: 'bottom drive obey lake curtain smoke basket hold race lonely fit walk'
    });
  });
});
