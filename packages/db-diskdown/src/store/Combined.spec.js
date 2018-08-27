// Copyright 2017-2018 @polkadot/db-diskdown authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import mkdirp from 'mkdirp';
import path from 'path';
import rimraf from 'rimraf';

import Combined from './Combined';

const KEY_A = Buffer.from([
  1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]);
const KEY_B = Buffer.from([
  2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]);
const KEY_C = Buffer.from([
  1, 2, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]);
const KEY_D = Buffer.from([
  1, 2, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]);
const KEY_E = Buffer.from([
  1, 2, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]);
const VAL_A = Buffer.from([0x42, 1, 0x69]);
const VAL_B = Buffer.from([0x42, 1, 2, 0x69]);
const VAL_C = Buffer.from([0x42, 1, 2, 3, 0x69]);
const VAL_D = Buffer.from([0x42, 1, 2, 3, 4, 0x69]);
const VAL_E = Buffer.from([0x42, 1, 2, 3, 4, 5, 0x69]);

describe('StoreCombined', () => {
  const testGet = (key, val) =>
    expect(store.get(key).equals(val)).toEqual(true);

  const location = path.join(process.cwd(), '--test-Combined');
  let store;

  beforeAll(() => {
    mkdirp.sync(location);

    store = new Combined(location);
  });

  afterAll(() => {
    rimraf.sync(location);
  });

  it('writes an entry', () => {
    console.error('A: execute');

    store.set(KEY_A, VAL_A);

    console.error('A: expectations');

    testGet(KEY_A, VAL_A);
  });

  it('writes an entry (additional)', () => {
    console.error('B: execute');

    store.set(KEY_B, VAL_B);

    console.error('A: expectations');

    testGet(KEY_A, VAL_A);
    testGet(KEY_B, VAL_B);
  });

  it('writes an entry (expanding the tree)', () => {
    console.error('C: execute');

    store.set(KEY_C, VAL_C);

    console.error('C: expectations');

    testGet(KEY_A, VAL_A);
    testGet(KEY_B, VAL_B);
    testGet(KEY_C, VAL_C);
  });

  it('writes an entry (expanding the tree, again)', () => {
    console.error('D: execute');

    store.set(KEY_D, VAL_D);

    console.error('D: expectations');

    testGet(KEY_A, VAL_A);
    testGet(KEY_B, VAL_B);
    testGet(KEY_C, VAL_C);
    testGet(KEY_D, VAL_D);
  });

  it('writes an entry (expanding the tree, yet again)', () => {
    console.error('E: execute');

    store.set(KEY_E, VAL_E);

    console.error('E: expectations');

    testGet(KEY_A, VAL_A);
    testGet(KEY_B, VAL_B);
    testGet(KEY_C, VAL_C);
    testGet(KEY_D, VAL_D);
    testGet(KEY_E, VAL_E);
  });
});
