// Copyright 2017-2018 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import mkdirp from 'mkdirp';
import os from 'os';
import path from 'path';
import rimraf from 'rimraf';

import FileFlatDb from './FileFlatDb';

const KEY_A = new Uint8Array([
  1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]);
const KEY_B = new Uint8Array([
  2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]);
const KEY_C = new Uint8Array([
  1, 2, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]);
const KEY_D = new Uint8Array([
  1, 2, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]);
const KEY_E = new Uint8Array([
  1, 2, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]);
const VAL_A = new Uint8Array([0x42, 1, 0x69]);
const VAL_B = new Uint8Array([0x42, 1, 2, 0x69]);
const VAL_C = new Uint8Array([0x42, 1, 2, 3, 0x69]);
const VAL_D = new Uint8Array([0x42, 1, 2, 3, 4, 0x69]);
const VAL_E = new Uint8Array([0x42, 1, 2, 3, 4, 5, 0x69]);

describe.skip('FileFlatDb (compacting)', () => {
  const combined = new FileFlatDb(process.cwd());

  it('compacts without failing', () => {
    expect(
      combined.maintain(() => {})
    ).not.toBe(0);
  });
});

// NOTE Skipped, doesn't seem to be too happy on CI (cwd issues?)
describe.skip('FileFlatDb (basics)', () => {
  const testGet = (key, value) =>
    expect(store.get(key)).toEqual(value);

  const location = path.join(process.cwd(), '--test-FileFlatDb');
  let store;

  beforeAll(() => {
    mkdirp.sync(location);

    store = new FileFlatDb(location);
    store.open();
  });

  afterAll(() => {
    store.close();
    rimraf.sync(location);
  });

  it('writes an entry', () => {
    console.error('A: execute');

    store.put(KEY_A, VAL_A);

    console.error('A: expectations');

    testGet(KEY_A, VAL_A);
  });

  it('writes an entry (additional)', () => {
    console.error('B: execute');

    store.put(KEY_B, VAL_B);

    console.error('A: expectations');

    testGet(KEY_A, VAL_A);
    testGet(KEY_B, VAL_B);
  });

  it('writes an entry (expanding the tree)', () => {
    console.error('C: execute');

    store.put(KEY_C, VAL_C);

    console.error('C: expectations');

    testGet(KEY_A, VAL_A);
    testGet(KEY_B, VAL_B);
    testGet(KEY_C, VAL_C);
  });

  it('writes an entry (expanding the tree, again)', () => {
    console.error('D: execute');

    store.put(KEY_D, VAL_D);

    console.error('D: expectations');

    testGet(KEY_A, VAL_A);
    testGet(KEY_B, VAL_B);
    testGet(KEY_C, VAL_C);
    testGet(KEY_D, VAL_D);
  });

  it('writes an entry (expanding the tree, yet again)', () => {
    console.error('E: execute');

    store.put(KEY_E, VAL_E);

    console.error('E: expectations');

    testGet(KEY_A, VAL_A);
    testGet(KEY_B, VAL_B);
    testGet(KEY_C, VAL_C);
    testGet(KEY_D, VAL_D);
    testGet(KEY_E, VAL_E);
  });
});
