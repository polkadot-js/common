// ISC, Copyright 2017 Jaco Greeff

const { jsonrpcSignature } = require('./index');

describe('jsonrpc', () => {
  describe('jsonrpcSignature', () => {
    it('formats the signature according to the specification', () => {
      expect(
        jsonrpcSignature(
          'test_method',
          [
            { name: 'b', type: 'A' },
            { name: 'a', type: 'B' }
          ],
          { type: 'A' }
        )
      ).toEqual('test_method (b: A, a: B): A');
    });
  });
});
