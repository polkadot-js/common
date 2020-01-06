// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { randomAsNumber } from '.';

describe('randomAsNumber', (): void => {
  it('generates subsequent non-matching numbers', (): void => {
    expect(
      randomAsNumber()
    ).not.toEqual(
      randomAsNumber()
    );
  });
});
