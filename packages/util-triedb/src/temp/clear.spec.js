// Copyright 2017-2018 @polkadot/util-triedb authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import factory from './index';

describe('clear', () => {
  let memory;

  beforeEach(() => {
    memory = factory();
  });

  it('clears all values', () => {
    memory.set(new Uint8Array([1]), new Uint8Array([2]));
    memory.clear();

    expect(
      memory.isEmpty()
    ).toEqual(true);
  });
});
