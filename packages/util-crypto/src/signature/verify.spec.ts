// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { hexToU8a, stringToU8a, u8aConcat, u8aToHex } from '@polkadot/util';
import { waitReady } from '@polkadot/wasm-crypto';

import { decodeAddress } from '../address';
import { signatureVerify } from '.';

const ADDR_ED = 'DxN4uvzwPzJLtn17yew6jEffPhXQfdKHTp2brufb98vGbPN';
const ADDR_SR = 'EK1bFgKm2FsghcttHT7TB7rNyXApFgs9fCbijMGQNyFGBQm';
const ADDR_EC = 'XyFVXiGaHxoBhXZkSh6NS2rjFyVaVNUo5UiZDqZbuSfUdji';
const MESSAGE = 'hello world';
const SIG_ED = '0x299d3bf4c8bb51af732f8067b3a3015c0862a5ff34721749d8ed6577ea2708365d1c5f76bd519009971e41156f12c70abc2533837ceb3bad9a05a99ab923de06';
const SIG_SR = '0xca01419b5a17219f7b78335658cab3b126db523a5df7be4bfc2bef76c2eb3b1dcf4ca86eb877d0a6cf6df12db5995c51d13b00e005d053b892bd09c594434288';
const SIG_EC = '0x994638ee586d2c5dbd9bacacbc35d9b7e9018de8f7892f00c900db63bc57b1283e2ee7bc51a9b1c1dae121ac4f4b9e2a41cd1d6bf4bb3e24d7fed6faf6d85e0501';
const MUL_ED = u8aToHex(u8aConcat(new Uint8Array([0]), hexToU8a(SIG_ED)));
const MUL_SR = u8aToHex(u8aConcat(new Uint8Array([1]), hexToU8a(SIG_SR)));
const MUL_EC = u8aToHex(u8aConcat(new Uint8Array([2]), hexToU8a(SIG_EC)));

describe('signatureVerify', (): void => {
  beforeEach(async (): Promise<void> => {
    await waitReady();
  });

  it('throws on invalid signature length', (): void => {
    expect(
      () => signatureVerify(MESSAGE, new Uint8Array(32), ADDR_ED)
    ).toThrow('Invalid signature length, expected [64..66] bytes, found 32');
  });

  describe('verifyDetect', (): void => {
    it('verifies an ed25519 signature', (): void => {
      expect(signatureVerify(MESSAGE, SIG_ED, ADDR_ED)).toEqual({
        crypto: 'ed25519',
        isValid: true
      });
    });

    it('verifies an ecdsa signature', (): void => {
      expect(signatureVerify(MESSAGE, SIG_EC, ADDR_EC)).toEqual({
        crypto: 'ecdsa',
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
    it('verifies an ed25519 signature', (): void => {
      expect(signatureVerify(MESSAGE, MUL_ED, ADDR_ED)).toEqual({
        crypto: 'ed25519',
        isValid: true
      });
    });

    it('verifies an ecdsa signature', (): void => {
      expect(signatureVerify(MESSAGE, MUL_EC, ADDR_EC)).toEqual({
        crypto: 'ecdsa',
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
