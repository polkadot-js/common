// Copyright 2017-2020 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import testingPairs from '../testingPairs';

const keyring = testingPairs({ type: 'ed25519' }, false);

describe('toJson', (): void => {
  it('creates an unencoded output with no passphrase', (): void => {
    expect(
      keyring.alice.toJson()
    ).toMatchObject({
      address: '5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMaQua',
      encoded: '0x3053020101300506032b657004220420416c696365202020202020202020202020202020202020202020202020202020d172a74cda4c865912c32ba0a80a57ae69abae410e5ccb59dee84e2f4432db4fa123032100d172a74cda4c865912c32ba0a80a57ae69abae410e5ccb59dee84e2f4432db4f',
      encoding: {
        content: ['pkcs8', 'ed25519'],
        type: 'none',
        version: '2'
      },
      meta: {
        isTesting: true,
        name: 'alice'
      }
    });
  });

  it('creates an encoded output with passphrase', (): void => {
    const json = keyring.alice.toJson('testing');

    expect(json.encoded).toHaveLength(316);
    expect(json).toMatchObject({
      address: '5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMaQua',
      encoding: {
        content: ['pkcs8', 'ed25519'],
        type: 'xsalsa20-poly1305',
        version: '2'
      }
    });
  });
});
