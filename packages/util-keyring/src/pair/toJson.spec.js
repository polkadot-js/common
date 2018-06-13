// Copyright 2017-2018 @polkadot/util-keyring authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const keyring = require('../testingPairs')();

describe('toJson', () => {
  it('creates an unencoded output with no passphrase', () => {
    expect(
      keyring.alice.toJson()
    ).toMatchObject({
      address: '5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMaDtZ',
      encoded: '0x3053020101300506032b657004220420416c696365202020202020202020202020202020202020202020202020202020a123032100d172a74cda4c865912c32ba0a80a57ae69abae410e5ccb59dee84e2f4432db4f',
      encoding: {
        content: 'pkcs8',
        type: 'none',
        version: '0'
      },
      meta: {
        name: 'alice',
        isTesting: true
      }
    });
  });

  it('creates an encoded output with passphrase', () => {
    const json = keyring.alice.toJson('testing');

    expect(json.encoded).toHaveLength(252);
    expect(json).toMatchObject({
      address: '5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMaDtZ',
      encoding: {
        content: 'pkcs8',
        type: 'xsalsa20-poly1305',
        version: '0'
      }
    });
  });
});
