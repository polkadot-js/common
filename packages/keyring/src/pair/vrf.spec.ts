// Copyright 2017-2026 @polkadot/keyring authors & contributors
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

  for (const [type, pairFromSeed] of [
    ['ecdsa', secp256k1PairFromSeed],
    ['ed25519', ed25519PairFromSeed],
    ['sr25519', sr25519PairFromSeed]
  ] as const) {
    const signer = createPair({ toSS58, type }, pairFromSeed(new Uint8Array(32).fill(1)));
    const verifier = createPair({ toSS58, type }, pairFromSeed(new Uint8Array(32).fill(2)));
    const proof = signer.vrfSign(MESSAGE, CONTEXT);

    it(`verifies ${type} proofs with the supplied remote public key`, (): void => {
      expect(verifier.vrfVerify(MESSAGE, proof, signer.publicKey, CONTEXT)).toBe(true);
    });

    it(`verifies ${type} proofs with a hex-encoded remote public key`, (): void => {
      expect(verifier.vrfVerify(MESSAGE, proof, u8aToHex(signer.publicKey), CONTEXT)).toBe(true);
    });

    it(`rejects ${type} proofs when the supplied signer does not match`, (): void => {
      expect(signer.vrfVerify(MESSAGE, proof, verifier.publicKey, CONTEXT)).toBe(false);
    });

    it(`verifies ${type} proofs from a public-only keyring pair`, (): void => {
      const publicOnly = createPair({ toSS58, type }, { publicKey: verifier.publicKey });

      expect(publicOnly.isLocked).toBe(true);
      expect(publicOnly.vrfVerify(MESSAGE, proof, signer.publicKey, CONTEXT)).toBe(true);
    });
  }

  it('rejects an sr25519 proof when the message, context or extra data changes', (): void => {
    const extra = 'extra data';
    const proof = sr25519.vrfSign(MESSAGE, CONTEXT, extra);

    expect(sr25519.vrfVerify(`${MESSAGE}!`, proof, sr25519.publicKey, CONTEXT, extra)).toBe(false);
    expect(sr25519.vrfVerify(MESSAGE, proof, sr25519.publicKey, `${CONTEXT}!`, extra)).toBe(false);
    expect(sr25519.vrfVerify(MESSAGE, proof, sr25519.publicKey, CONTEXT, `${extra}!`)).toBe(false);
  });
});
