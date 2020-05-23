// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/* eslint-disable @typescript-eslint/unbound-method */

describe('String padStart', (): void => {
  let stringStart: (length: number, fill?: string) => string;

  beforeEach((): void => {
    stringStart = String.prototype.padStart;

    // eslint-disable-next-line no-extend-native,@typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment
    String.prototype.padStart = null as any;

    require('./padStart');
  });

  afterEach((): void => {
    // eslint-disable-next-line no-extend-native
    String.prototype.padStart = stringStart;
  });

  it('does padding', (): void => {
    expect('test'.padStart(8, 'A')).toEqual('AAAAtest');
    expect('test'.padStart(8)).toEqual('    test');
  });
});
