// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { jsonrpcSignature } = require('./index');

describe('jsonrpcSignature', () => {
  it('formats the signature according to the specification', () => {
    expect(
      jsonrpcSignature(
        'test_method',
        [
          { name: 'b', type: 'A' },
          { name: 'a', type: 'B' },
          { type: 'C' },
          { type: 'D' }
        ],
        { type: 'A' }
      )
    ).toEqual('test_method (b: A, a: B, C, D): A');
  });

  it('empty inputs format correctly', () => {
    expect(
      jsonrpcSignature(
        'test_method',
        [],
        { type: 'A' }
      )
    ).toEqual('test_method (): A');
  });
});
