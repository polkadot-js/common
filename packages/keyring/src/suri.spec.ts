// Copyright 2017-2019 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// From https://github.com/paritytech/substrate/wiki/Secret-URI-Test-Vectors

import { u8aToHex } from '@polkadot/util';
import { cryptoWaitReady } from '@polkadot/util-crypto';

import Keyring from '.';

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
    pk: '0xfcd8958e6b3ad5c45e122b9a4bf1dffdb69d24a07af59d4bd9e27c532dc43057',
    ss: '5HnEGDAaEp4bxa6tmtavBsNapAkZ5vyooHZZWM8KtAPVBHNu',
    uri: `${PHRASE}//foo`
  },
  {
    pk: '0x26f9e9c2c194787460145bdef9626823e7af240bdbb8e0989083476ea20ad035',
    ss: '5Cwov7Jv4KNXUFtEUeC48uApBbDksafCLxqcXoywoS61jWum',
    uri: `${PHRASE}//foo/bar`
  },
  {
    pk: '0x6ce53bcbaae734fa07e740b9694a818d277e7cda436953c2326ca66500498373',
    ss: '5EXV8Dn5WmuoZdjHRVGasRTCUnSjRKRPn8JYb2M2TpwfsNHK',
    uri: `${PHRASE}/foo//bar`
  },
  {
    pk: '0x7a95f4e9fe84c8cde02da06f518805aa58dcb998820d0e7a43590d6bae6dd52b',
    ss: '5EqSFCEzyLtviPMBdnMNF4NBNsJeHuXdS323Q6jpcVdBTzRs',
    uri: `${PHRASE}//foo/bar//42/69`
  },
  {
    pk: '0x1e9a84784e7e90ca04feb76ca35c241884112257011ce75c6d82b1cff1b0b222',
    ss: '5CkqCG9e974XQe2dbF9kUNvMonspAUu9wD8U6xCJ52gW8qYB',
    uri: `${PHRASE}//foo/bar//42/69///password`
  },
  {
    pk: '0x56443a3a9173a22315838b38410cfe9d67feadfcea71e4894e3f9fd15ec1117f',
    ss: '5E1pF3pJWjhkkcfSgsw8GbrVFt7FQJqJinWT8eKGDC5GH9xs',
    uri: `${PHRASE}//Alice`
  }
];

describe('keyring.addFromUri', () => {
  const keyring = new Keyring({ type: 'sr25519' });

  beforeEach(async () => {
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
