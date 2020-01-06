// Copyright 2017-2020 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import toU8a from '@polkadot/util/u8a/toU8a';

import LruDb from './LruDb';
import MemoryDb from './MemoryDb';

describe('LruDb', (): void => {
  const memory = new MemoryDb();
  const db = new LruDb(memory);

  it('retrieves an item from the backing when not available (caching it)', (): void => {
    const key = toU8a('test1');
    const value = toU8a('value1');

    memory.put(key, value);

    expect(db.get(key)).toEqual(value);
    expect(db._getLru(key)).toEqual({ value });
  });

  it('replaces an item (caching and backing)', (): void => {
    const key = toU8a('test1');
    const value = toU8a('test');

    db.put(key, value);

    expect(db.get(key)).toEqual(value);
    expect(memory.get(key)).toEqual(value);
    expect(db._getLru(key)).toEqual({ value });
  });

  it('retrieves item from LRU when available', (): void => {
    const key = toU8a('test1');
    const value = toU8a('test');

    memory.del(key);

    expect(db.get(key)).toEqual(value);
  });

  it('puts item both in LRU and backing', (): void => {
    const key = toU8a('test0');
    const value = toU8a('value0');

    db.put(key, value);

    expect(memory.get(key)).toEqual(value);
    expect(db._getLru(key)).toEqual({ value });
  });

  it('deletes an item from both backing and db', (): void => {
    const key = toU8a('test0');

    db.del(key);

    expect(memory.get(key)).toEqual(null);
    expect(db._getLru(key)).toEqual({ value: null });
    expect(db.get(key)).toEqual(null);
  });
});
