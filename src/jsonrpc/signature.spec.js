// ISC, Copyright 2017 Jaco Greeff

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
