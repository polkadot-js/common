// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { naclEncrypt, naclKeypairFromString } = require('./index');

describe('naclEncrypt', () => {
  let secretKey;

  beforeEach(() => {
    secretKey = naclKeypairFromString('test').secretKey;
  });

  it('encrypts a message', () => {
    const message = new Uint8Array([1, 2, 3, 4, 5, 4, 3, 2, 1]);

    expect(
      naclEncrypt(message, secretKey, new Uint8Array(24))
    ).toEqual({
      encrypted: new Uint8Array([93, 217, 158, 85, 80, 152, 227, 85, 76, 189, 150, 53, 119, 41, 104, 26, 112, 117, 232, 250, 95, 83, 65, 222, 199]),
      nonce: new Uint8Array(24)
    });
  });
});
