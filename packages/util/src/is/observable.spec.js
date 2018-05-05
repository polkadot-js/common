// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { isObservable } = require('./index');

describe('isObservable', () => {
  it('returns true on valid observables', () => {
    expect(
      isObservable({ next: () => true })
    ).toEqual(true);
  });

  it('returns false on invalid objects', () => {
    expect(
      isObservable('notAnObservable')
    ).toEqual(false);
  });

  it('returns false on invalid next functions', () => {
    expect(
      isObservable({ next: true })
    ).toEqual(false);
  });
});
