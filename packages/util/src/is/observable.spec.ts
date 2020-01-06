// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { isObservable } from '.';

describe('isObservable', (): void => {
  it('returns true on valid observables', (): void => {
    expect(
      isObservable({ next: (): boolean => true })
    ).toEqual(true);
  });

  it('returns false on invalid objects', (): void => {
    expect(
      isObservable('notAnObservable')
    ).toEqual(false);
  });

  it('returns false on invalid next functions', (): void => {
    expect(
      isObservable({ next: true })
    ).toEqual(false);
  });
});
