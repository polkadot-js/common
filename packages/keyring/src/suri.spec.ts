// Copyright 2017-2019 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// From https://github.com/paritytech/substrate/wiki/Secret-URI-Test-Vectors

import { u8aToHex } from '@polkadot/util/index';
import { cryptoWaitReady } from '@polkadot/util-crypto/index';

import Keyring from './index';

const PHRASE = 'bottom drive obey lake curtain smoke basket hold race lonely fit walk';

const TESTS = [
  {
    pk: '0x46ebddef8cd9bb167dc30878d7113b7e168e6f0646beffd77d69d39bad76b47a',
    ss: '5DfhGyQdFobKM8NsWvEeAKk5EQQgYe9AydgJ7rMB6E1EqAS7',
    uri: PHRASE
  },
  {
    pk: '0xb69355deefa7a8f33e9297f5af22e680f03597a99d4f4b1c44be47e7a2275802',
    ss: '5GC6LfpV352HtJPySfAecb5JdePtf4R9Vq49NUU8RhzgBq1z',
    uri: `${PHRASE}///password`
  },
  {
    pk: '0x40b9675df90efa6069ff623b0fdfcf706cd47ca7452a5056c7ad58194d23440a',
    ss: '5DXZzrDxHbkQov4QBAY4TjpwnHCMrKXkomTnKSw8UArBESDT',
    uri: `${PHRASE}/foo`
  },
  {
    pk: '0x545ecfd16d2ccbece3c3d8e284ba21b624d53a010d19673285a02aca92a62724',
    ss: '5DyL3XpLxWKJgeUYkFFhepm9DWFMHjvW6JKyVst6F6bX1DQw',
    uri: `${PHRASE}//foo`
  },
  {
    pk: '0xc6755aae1c6a172dc06a8bcf46d119a56ec04b22d7c673255dfc6fb5d7afd250',
    ss: '5GYvCYSJxHTNRMqtkLX5AGpTYjSiaHeCdVgBQJWp6Jb1eWZR',
    uri: `${PHRASE}//foo/bar`
  },
  {
    pk: '0xbed7420abfb5398eaa5c1e5ce484bf200c735ee0606ed97048dae9a6e7b1aa59',
    ss: '5GNvuAdKoC5mHzmSSctsZAC4WkrhZC5W7FBB4G3N5XMCBhMD',
    uri: `${PHRASE}/foo//bar`
  },
  {
    pk: '0xd0c0cb1e54a54222058552d7bf94a8abaaafd778adae57a30a9bba5afb01f17a',
    ss: '5GnR66wpdL4hnArhDRyyBCqchgVYXVMQDDSZQWegfSSnAEFh',
    uri: `${PHRASE}//foo/bar//42/69`
  },
  {
    pk: '0x12dccbb4d851a7bc36bb4f5f6f84a1caaf04c542509b1e3b84f1f47445c1bf08',
    ss: '5CVSJt82L8jYodrwYKCoP6LtC6V2VYPHYMHtHzjhdNr1KDdu',
    uri: `${PHRASE}//foo/bar//42/69///password`
  }
];

// TODO Enable once we have proper schnorrkel support
describe.skip('keyring.addFromUri', () => {
  let keyring: Keyring;

  beforeEach(async () => {
    keyring = new Keyring({ type: 'sr25519' });

    await cryptoWaitReady();
  });

  TESTS.forEach(({ pk, ss, uri }) => {
    it(`creates ${uri}`, () => {
      const pair = keyring.addFromUri(uri);

      expect(u8aToHex(pair.publicKey())).toEqual(pk);
      expect(pair.address()).toEqual(ss);
    });
  });
});
