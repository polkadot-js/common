// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable @typescript-eslint/unbound-method */

describe('String padEnd', (): void => {
  let stringEnd: (length: number, fill?: string) => string;

  beforeEach((): void => {
    stringEnd = String.prototype.padEnd;

    // eslint-disable-next-line no-extend-native,@typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment
    String.prototype.padEnd = null as any;

    require('./padEnd');
  });

  afterEach((): void => {
    // eslint-disable-next-line no-extend-native
    String.prototype.padEnd = stringEnd;
  });

  it('does padding', (): void => {
    expect('test'.padEnd(8, 'A')).toEqual('testAAAA');
    expect('test'.padEnd(8)).toEqual('test    ');
  });
});
