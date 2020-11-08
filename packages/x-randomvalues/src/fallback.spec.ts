// Copyright 2017-2020 @polkadot/x-randomvalues authors & contributors
// SPDX-License-Identifier: Apache-2.0

import fallback from './fallback';

describe('fallback (insecure)', (): void => {
  it('subsequent results does not match', (): void => {
    expect(
      fallback(new Uint8Array(32)).toString()
    ).not.toEqual(
      fallback(new Uint8Array(32)).toString()
    );
  });

  it('generates with the supplied length', (): void => {
    expect(
      fallback(new Uint8Array(128))
    ).toHaveLength(128);
  });
});
