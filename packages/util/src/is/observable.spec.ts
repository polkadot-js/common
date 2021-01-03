// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

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
