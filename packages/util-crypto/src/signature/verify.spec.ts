// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { hexToU8a, stringToU8a, u8aConcat, u8aToHex } from '@polkadot/util';
import { waitReady } from '@polkadot/wasm-crypto';

import { decodeAddress } from '../address';
import { signatureVerify } from '.';

const ADDR_ED = 'DxN4uvzwPzJLtn17yew6jEffPhXQfdKHTp2brufb98vGbPN';
const ADDR_SR = 'EK1bFgKm2FsghcttHT7TB7rNyXApFgs9fCbijMGQNyFGBQm';
const MESSAGE = 'hello world';
const SIG_ED = '0x299d3bf4c8bb51af732f8067b3a3015c0862a5ff34721749d8ed6577ea2708365d1c5f76bd519009971e41156f12c70abc2533837ceb3bad9a05a99ab923de06';
const SIG_SR = '0xca01419b5a17219f7b78335658cab3b126db523a5df7be4bfc2bef76c2eb3b1dcf4ca86eb877d0a6cf6df12db5995c51d13b00e005d053b892bd09c594434288';
const MUL_ED = u8aToHex(u8aConcat(new Uint8Array([0]), hexToU8a(SIG_ED)));
const MUL_SR = u8aToHex(u8aConcat(new Uint8Array([1]), hexToU8a(SIG_SR)));

describe('signatureVerify', (): void => {
  beforeEach(async (): Promise<void> => {
    await waitReady();
  });

  it('throws on invalid signature length', (): void => {
    expect(
      () => signatureVerify(MESSAGE, new Uint8Array(32), ADDR_ED)
    ).toThrow('Invalid signature length, expected 64 or 65 bytes, found 32');
  });

  describe('verifyDetect', (): void => {
    it('verifies an ed25519 signature', (): void => {
      expect(signatureVerify(MESSAGE, SIG_ED, ADDR_ED)).toEqual({
        crypto: 'ed25519',
        isValid: true
      });
    });

    it('verifies an sr25519 signature', (): void => {
      expect(signatureVerify(MESSAGE, SIG_SR, ADDR_SR)).toEqual({
        crypto: 'sr25519',
        isValid: true
      });
    });

    it('allows various inputs', (): void => {
      expect(signatureVerify(stringToU8a(MESSAGE), hexToU8a(SIG_ED), decodeAddress(ADDR_ED))).toEqual({
        crypto: 'ed25519',
        isValid: true
      });
    });

    it('fails on an invalid signature', (): void => {
      expect(signatureVerify(MESSAGE, SIG_SR, ADDR_ED)).toEqual({
        crypto: 'none',
        isValid: false
      });
    });
  });

  describe('verifyMultisig', (): void => {
    it('throws with invalid multisig indicator', (): void => {
      const u8aSig = hexToU8a(MUL_ED);

      u8aSig[0] = 69;

      expect(
        () => signatureVerify(MESSAGE, u8aSig, ADDR_ED)
      ).toThrow('Unknown crypto type, expected signature prefix of 0 or 1, found 69');
    });

    it('verifies an ed25519 signature', (): void => {
      expect(signatureVerify(MESSAGE, MUL_ED, ADDR_ED)).toEqual({
        crypto: 'ed25519',
        isValid: true
      });
    });

    it('verifies an sr25519 signature', (): void => {
      expect(signatureVerify(MESSAGE, MUL_SR, ADDR_SR)).toEqual({
        crypto: 'sr25519',
        isValid: true
      });
    });

    it('fails on an invalid signature', (): void => {
      expect(signatureVerify(MESSAGE, MUL_SR, ADDR_ED)).toEqual({
        crypto: 'sr25519',
        isValid: false
      });
    });
  });
});
