// Copyright 2017-2020 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import toU8a from '@polkadot/util/string/toU8a';

import MemoryDb from './MemoryDb';
import TransactionDb from './TransactionDb';

describe('TransactionDb', (): void => {
  const memory = new MemoryDb();
  const db = new TransactionDb(memory);

  it('passed through values immediately when not in transaction', (): void => {
    const key = toU8a('test0');
    const value = toU8a('value0');

    db.put(key, value);

    expect(memory.get(key)).toEqual(value);
  });

  it('commits when transaction passes (result = true, put)', (): void => {
    const key = toU8a('test1');
    const value = toU8a('value1');

    expect(
      db.transaction((): boolean => {
        db.put(key, value);

        return true;
      })
    ).toEqual(true);
    expect(memory.get(key)).toEqual(value);
  });

  it('commits when transaction passes (result = true, del)', (): void => {
    const key = toU8a('test0');

    expect(
      db.transaction((): boolean => {
        db.del(key);

        return true;
      })
    ).toEqual(true);
    expect(memory.get(key)).toEqual(null);
  });

  it('does not commit when transaction fails (result = false)', (): void => {
    const key = toU8a('test2');
    const value = toU8a('value2');

    expect(
      db.transaction((): boolean => {
        db.put(key, value);

        return false;
      })
    ).toEqual(false);
    expect(memory.get(key)).toEqual(null);
  });

  it('does not commit when transaction throws', (): void => {
    const key = toU8a('test2');
    const value = toU8a('value2');

    expect(
      (): void => {
        db.transaction((): void => {
          db.put(key, value);

          throw new Error('test');
        });
      }
    ).toThrow(/test/);
    expect(memory.get(key)).toEqual(null);
  });

  it('inside the transaction, the value is set', (): void => {
    const key = toU8a('test2');
    const value = toU8a('value2');

    db.transaction((): boolean => {
      db.put(key, value);

      expect(db.get(key)).toEqual(value);

      return false;
    });
    expect(memory.get(key)).toEqual(null);
  });
});
