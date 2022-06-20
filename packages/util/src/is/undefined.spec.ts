// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { perf } from '../test/performance';
import { isUndefined } from '.';

describe('isUndefined', (): void => {
  it('returns true on undefined values', (): void => {
    expect(
      isUndefined()
    ).toEqual(true);
  });

  it('returns false on defined values', (): void => {
    expect(
      isUndefined(null)
    ).toEqual(false);
  });

  perf('isUndefined', 10_000_000, [[null]], isUndefined);
});
