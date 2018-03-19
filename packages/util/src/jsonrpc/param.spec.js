// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { jsonrpcParam } = require('./index');

describe('jsonrpcParam', () => {
  it('formats input parameters (name & type)', () => {
    expect(
      jsonrpcParam(
        { name: 'b', type: 'A' }
      )
    ).toEqual('b: A');
  });

  it('formats output paramaters (type-only)', () => {
    expect(
      jsonrpcParam(
        { type: 'A' }
      )
    ).toEqual('A');
  });
});
