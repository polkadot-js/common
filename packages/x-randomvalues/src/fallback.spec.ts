// Copyright 2017-2021 @polkadot/x-randomvalues authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { insecureRandomValues } from './fallback';

describe('fallback (insecure)', (): void => {
  it('subsequent results does not match', (): void => {
    expect(
      insecureRandomValues(new Uint8Array(32)).toString()
    ).not.toEqual(
      insecureRandomValues(new Uint8Array(32)).toString()
    );
  });

  it('generates with the supplied length', (): void => {
    expect(
      insecureRandomValues(new Uint8Array(128))
    ).toHaveLength(128);
  });
});
