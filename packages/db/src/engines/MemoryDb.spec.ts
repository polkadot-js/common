// Copyright 2017-2019 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import MemoryDb from './MemoryDb';

describe('MemoryDb', () => {
  const memory = new MemoryDb();

  it('gets the combioned size of the entry values', () => {
    memory.put(new Uint8Array([1]), new Uint8Array([1, 2, 3]));
    memory.put(new Uint8Array([2]), new Uint8Array([1, 2, 3]));
    memory.put(new Uint8Array([3]), new Uint8Array([1, 2, 3]));

    expect(memory.size()).toEqual(9);
  });

  it('does not throw on the stubs', (done) => {
    memory.close();
    memory.open();
    memory.drop();
    memory.empty();
    memory.rename('foo', 'bar');

    memory.maintain(() => done());
  });
});
