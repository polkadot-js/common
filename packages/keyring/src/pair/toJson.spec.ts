// Copyright 2017-2020 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createTestPairs } from '../testingPairs';
import Keyring from '../keyring';

const testPairsKeyring = createTestPairs({ type: 'ed25519' }, false);

describe('toJson', (): void => {
  it('creates an unencoded output with no passphrase with ed25519', (): void => {
    expect(
      testPairsKeyring.alice.toJson()
    ).toMatchObject({
      address: '5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMaQua',
      encoded: 'MFMCAQEwBQYDK2VwBCIEIEFsaWNlICAgICAgICAgICAgICAgICAgICAgICAgICAg0XKnTNpMhlkSwyugqApXrmmrrkEOXMtZ3uhOL0Qy20+hIwMhANFyp0zaTIZZEsMroKgKV65pq65BDlzLWd7oTi9EMttP',
      encoding: {
        content: ['pkcs8', 'ed25519'],
        type: ['none'],
        version: '3'
      },
      meta: {
        isTesting: true,
        name: 'alice'
      }
    });
  });

  it('creates an encoded output with passphrase with ed25519', (): void => {
    const json = testPairsKeyring.alice.toJson('testing');

    expect(json.encoded).toHaveLength(268);
    expect(json).toMatchObject({
      address: '5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMaQua',
      encoding: {
        content: ['pkcs8', 'ed25519'],
        type: ['scrypt', 'xsalsa20-poly1305'],
        version: '3'
      }
    });
  });

  const ethereumPair = new Keyring({ type: 'ethereum' });
  const pairOpts = {
    meta: {
      genesisHash: '0xc8d32cd0020b9da3804ef726f876604b7fcf5a799e687221a959f2dba5c78f18',
      name: 'MyEthAccount',
      tags: []
    },
    pairType: 'ethereum',
    password: 'SomePassword',
    suri: '0x728746aaa496d72abd7e3ef7bcdbaa87d5ba36ad612989ec782c0efb78c56866'
  };

  it('creates an unencoded output with no passphrase for ethereum account with ethereum type', (): void => {
    const pair = ethereumPair.addFromUri(pairOpts.suri, pairOpts.meta, pairOpts.pairType as 'ethereum');

    const json = pair.toJson();

    expect(json).toMatchObject({
      address: '0x5D0aa7d985DfF020174C907e3b57F5C8b5741013',
      encoded: 'MFMCAQEwBQYDK2VwBCIEIHKHRqqkltcqvX4+97zbqofVujatYSmJ7HgsDvt4xWhmoSMDIQACqEZqFaw+I6dWa1sSwYCJn6wGo8VQ4/4GTV3EyCHIAiA=',
      encoding: {
        content: ['pkcs8', 'ethereum'],
        type: ['none'],
        version: '3'
      },
      meta: {
        genesisHash: '0xc8d32cd0020b9da3804ef726f876604b7fcf5a799e687221a959f2dba5c78f18',
        name: 'MyEthAccount',
        tags: []
      }
    });
  });

  it('creates an encoded output with passphrase for ethereum account with ethereum type', (): void => {
    const pair = ethereumPair.addFromUri(pairOpts.suri, pairOpts.meta, pairOpts.pairType as 'ethereum');

    const json = pair.toJson(pairOpts.password);

    expect(json).toMatchObject({
      address: '0x5D0aa7d985DfF020174C907e3b57F5C8b5741013',
      encoding: {
        content: ['pkcs8', 'ethereum'],
        type: ['scrypt', 'xsalsa20-poly1305'],
        version: '3'
      },
      meta: {
        genesisHash: '0xc8d32cd0020b9da3804ef726f876604b7fcf5a799e687221a959f2dba5c78f18',
        name: 'MyEthAccount',
        tags: []
      }
    }
    );
  });
});
