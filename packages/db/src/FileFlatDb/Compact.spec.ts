// Copyright 2017-2019 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import FileFlatDb from './index';

describe.skip('FileFlatDb (compacting)', () => {
  const combined = new FileFlatDb(process.cwd());

  it('compacts without failing', () => {
    expect(
      combined.maintain(() => {
        // noop
      })
    ).not.toBe(0);
  });
});
