// Copyright 2017-2018 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import mkdirp from 'mkdirp';
import os from 'os';
import path from 'path';
import toU8a from '@polkadot/util/u8a/fromString';

import LevelDb from './LevelDb';

describe('LevelDb', () => {
  const location = path.join(os.tmpdir(), '--test-LevelDb');
  let db;

  beforeAll(() => {
    mkdirp.sync(location);

    db = new LevelDb(location);
    db.open();
  });

  afterAll(() => {
    db.close();
    rimraf.sync(location);
  });

  it('sets & retrieves', () => {
    const key = toU8a('key0');
    const value = toU8a('value0');

    db.put(key, value);

    expect(db.get(key)).toEqual(value);
  });

  it('retrieves null for non-existing', () => {
    const key = toU8a('key1');

    expect(db.get(key)).toEqual(null);
  });

  it('overrides values', () => {
    const key = toU8a('key2');
    const value = toU8a('value1');
    const replace = toU8a('value2');

    db.put(key, value);

    expect(db.get(key)).toEqual(value);

    db.put(key, replace);

    expect(db.get(key)).toEqual(replace);
  });

  it('deletes values', () => {
    const key = toU8a('key2');

    db.del(key);

    expect(db.get(key)).toEqual(null);
  });
});
