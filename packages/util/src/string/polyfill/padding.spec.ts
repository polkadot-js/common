// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

describe('padding', () => {
  let stringEnd: (length: number, fill?: string) => string;
  let stringStart: (length: number, fill?: string) => string;

  beforeEach(() => {
    stringEnd = String.prototype.padEnd;
    stringStart = String.prototype.padStart;

    String.prototype.padEnd = null as any;
    String.prototype.padStart = null as any;

    require('./padding');
  });

  afterEach(() => {
    String.prototype.padEnd = stringEnd;
    String.prototype.padStart = stringStart;
  });

  it('does padding', () => {
    expect('test'.padEnd(8, 'A')).toEqual('testAAAA');
    expect('test'.padStart(8, 'A')).toEqual('AAAAtest');
  });
});
