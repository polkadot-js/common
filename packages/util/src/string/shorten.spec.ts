// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { stringShorten } from '.';

describe('stringShorten', (): void => {
  it('returns the value as-is when <= maxLength', (): void => {
    expect(
      stringShorten('0123456789', 4)
    ).toEqual('0123456789');
  });

  it('returns the shortened value when > maxLength', (): void => {
    expect(
      stringShorten('0123456789', 3)
    ).toEqual('012…789');
  });
});
