// Copyright 2017-2024 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { u8aToHex } from '@polkadot/util';
import { cryptoWaitReady, ed25519PairFromSeed, encodeAddress as toSS58, randomAsU8a, secp256k1PairFromSeed, sr25519PairFromSeed } from '@polkadot/util-crypto';

import { createPair } from './index.js';

const MESSAGE = 'this is a test message';
const CONTEXT = 'some context';

await cryptoWaitReady();

const ecdsa = createPair({ toSS58, type: 'ecdsa' }, secp256k1PairFromSeed(randomAsU8a()));
const ed25519 = createPair({ toSS58, type: 'ed25519' }, ed25519PairFromSeed(randomAsU8a()));
const sr25519 = createPair({ toSS58, type: 'sr25519' }, sr25519PairFromSeed(randomAsU8a()));

describe('vrf', (): void => {
  it('has deterministic signature values for ecdsa', (): void => {
    const sig1 = ecdsa.vrfSign(MESSAGE, CONTEXT);
    const sig2 = ecdsa.vrfSign(MESSAGE, CONTEXT);

    expect(u8aToHex(sig1)).toEqual(u8aToHex(sig2));
    expect(ecdsa.vrfVerify(MESSAGE, sig1, ecdsa.publicKey, CONTEXT)).toEqual(true);
    expect(ecdsa.vrfVerify(MESSAGE, sig2, ecdsa.publicKey, CONTEXT)).toEqual(true);
  });

  it('has deterministic signature values for ed25519', (): void => {
    const sig1 = ed25519.vrfSign(MESSAGE, CONTEXT);
    const sig2 = ed25519.vrfSign(MESSAGE, CONTEXT);

    expect(u8aToHex(sig1)).toEqual(u8aToHex(sig2));
    expect(ed25519.vrfVerify(MESSAGE, sig1, ed25519.publicKey, CONTEXT)).toEqual(true);
    expect(ed25519.vrfVerify(MESSAGE, sig2, ed25519.publicKey, CONTEXT)).toEqual(true);
  });

  it('has deterministic signature values for sr25519', (): void => {
    const sig1 = sr25519.vrfSign(MESSAGE, CONTEXT);
    const sig2 = sr25519.vrfSign(MESSAGE, CONTEXT);

    expect(u8aToHex(sig1.slice(0, 32))).toEqual(u8aToHex(sig2.slice(0, 32)));
    expect(sr25519.vrfVerify(MESSAGE, sig1, sr25519.publicKey, CONTEXT)).toEqual(true);
    expect(sr25519.vrfVerify(MESSAGE, sig2, sr25519.publicKey, CONTEXT)).toEqual(true);
  });
});
