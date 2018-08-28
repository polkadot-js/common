// Copyright 2017-2018 @polkadot/db-diskdown authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import mkdirp from 'mkdirp';
import path from 'path';
import rimraf from 'rimraf';

import Combined from './Combined';

describe.skip('Combined (compacting)', () => {
  const combined = new Combined(process.cwd());

  it('compacts without failing', () => {
    expect(
      combined.compact()
    ).not.toBe(0);
  });
});
