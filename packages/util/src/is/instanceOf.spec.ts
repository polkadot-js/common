// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isInstanceOf } from '.';

describe('isInstanceOf', (): void => {
  it('returns true on real instances', (): void => {
    expect(
      isInstanceOf(new Array(2), Array)
    ).toEqual(true);
  });

  it('returns false on non-allocated instances', (): void => {
    expect(
      isInstanceOf([], Array)
    ).toEqual(true);
  });

  it('returns false on non-instances', (): void => {
    expect(
      isInstanceOf('array', Array)
    ).toEqual(false);
  });

  it('returns false when class not specified', (): void => {
    expect(
      isInstanceOf('array', Array)
    ).toEqual(false);
  });

  it('returns false on wrong class type', (): void => {
    expect(
      isInstanceOf(new Array(2), String)
    ).toEqual(false);
  });
});
