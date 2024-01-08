// Copyright 2017-2024 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

// From https://github.com/paritytech/substrate/wiki/Secret-URI-Test-Vectors

import type { KeypairType } from '@polkadot/util-crypto/types';

import { u8aToHex } from '@polkadot/util';
import { cryptoWaitReady } from '@polkadot/util-crypto';

import Keyring from './index.js';

const PHRASE = 'bottom drive obey lake curtain smoke basket hold race lonely fit walk';
const ETHEREUM_PHRASE = 'seed sock milk update focus rotate barely fade car face mechanic mercy';

const TESTS = {
  ecdsa: [
    {
      pk: '0x020a1091341fe5664bfa1782d5e04779689068c916b04cb365ec3153755684d9a1',
      ss: '5C7C2Z5sWbytvHpuLTvzKunnnRwQxft1jiqrLD5rhucQ5S9X',
      uri: `${PHRASE}//Alice`
    }
  ],
  ethereum: [
    {
      pk: '0x0381351b1b46d2602b0992bb5d5531f9c1696b0812feb2534b6884adc47e2e1d8b',
      ss: '0x31ea8795EE32D782C8ff41a5C68Dcbf0F5B27f6d',
      uri: `${ETHEREUM_PHRASE}/m/44'/60'/0'/0/0`
    },
    {
      pk: '0x02509540919faacf9ab52146c9aa40db68172d83777250b28e4679176e49ccdd9f',
      ss: '0xf24FF3a9CF04c71Dbc94D0b566f7A27B94566cac',
      uri: `${PHRASE}/m/44'/60'/0'/0/0`
    },
    {
      pk: '0x033bc19e36ff1673910575b6727a974a9abd80c9a875d41ab3e2648dbfb9e4b518',
      ss: '0x3Cd0A705a2DC65e5b1E1205896BaA2be8A07c6e0',
      uri: `${PHRASE}/m/44'/60'/0'/0/1`
    }
  ],
  sr25519: [
    {
      pk: '0x46ebddef8cd9bb167dc30878d7113b7e168e6f0646beffd77d69d39bad76b47a',
      ss: '5DfhGyQdFobKM8NsWvEeAKk5EQQgYe9AydgJ7rMB6E1EqRzV',
      uri: PHRASE
    },
    {
      pk: '0xb69355deefa7a8f33e9297f5af22e680f03597a99d4f4b1c44be47e7a2275802',
      ss: '5GC6LfpV352HtJPySfAecb5JdePtf4R9Vq49NUU8RhzgBqgq',
      uri: `${PHRASE}///password`
    },
    {
      pk: '0x40b9675df90efa6069ff623b0fdfcf706cd47ca7452a5056c7ad58194d23440a',
      ss: '5DXZzrDxHbkQov4QBAY4TjpwnHCMrKXkomTnKSw8UArBEY5v',
      uri: `${PHRASE}/foo`
    },
    {
      pk: '0x547d4a55642ec7ebadc0bd29b6e570b8c926059b3c0655d4948075e9a7e6f31e',
      ss: '5DyV6fZuvPemWrUqBgWwTSgoV86w6xms3KhkFU6cQcWxU8eP',
      uri: `${PHRASE}//foo`
    },
    {
      pk: '0x3841947ffcde6f5fef26fb68b59bb8665637e30e32ec2051f99cf6b9c674fe09',
      ss: '5DLU27is5iViNopQb2KxsTyPx6j4vCu8X3sk3j3NNLkPCqKM',
      uri: `${PHRASE}//foo/bar`
    },
    {
      pk: '0xdc142f7476a7b0aa262aeccf207f1d18daa90762db393006741e8a31f39dbc53',
      ss: '5H3GPTqDSpjkfDwbHy12PD6BWm8jvGSX4xYC8UMprHpTPcRg',
      uri: `${PHRASE}/foo//bar`
    },
    {
      pk: '0xa2e56b06407a6d1e819d2fc33fa0ec604b29c2e868b70b3696bb049b8725934b',
      ss: '5FkHmNgbg64MwStgCyDi2Uw3ufFu11mqQgmWT9uwK4Lghvpv',
      uri: `${PHRASE}//foo/bar//42/69`
    },
    {
      pk: '0x0e0d24e3e1ff2c07f269c99e2e0df8681fda1851ac42fc846ca2daaa90cd8f14',
      ss: '5CP8S23JBNXYNpJsL7ESPJBNnUZE6itcfM4EnDxEhaVEU6dT',
      uri: `${PHRASE}//foo/bar//42/69///password`
    },
    {
      pk: '0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d',
      ss: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      uri: `${PHRASE}//Alice`
    }
  ]
};

await cryptoWaitReady();

describe('keyring.addFromUri', (): void => {
  for (const [type, tests] of Object.entries(TESTS)) {
    const keyring = new Keyring({ type: type as KeypairType });

    describe(`${type}`, (): void => {
      tests.forEach(({ pk, ss, uri }): void => {
        it(`creates ${uri}`, (): void => {
          const pair = keyring.addFromUri(uri, {}, type as KeypairType);

          expect(u8aToHex(pair.publicKey)).toEqual(pk);
          expect(pair.address).toEqual(ss);
        });
      });
    });
  }
});
