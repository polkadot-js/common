// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { hexToU8a, stringToU8a, u8aConcat, u8aToHex, u8aWrapBytes } from '@polkadot/util';
import { waitReady } from '@polkadot/wasm-crypto';

import { decodeAddress } from '../address/index.js';
import { secp256k1Sign } from '../secp256k1/sign.js';
import { signatureVerify } from './index.js';

const ADDR_ED = 'DxN4uvzwPzJLtn17yew6jEffPhXQfdKHTp2brufb98vGbPN';
const ADDR_SR = 'EK1bFgKm2FsghcttHT7TB7rNyXApFgs9fCbijMGQNyFGBQm';
const ADDR_SR_WRAP = 'J9nD3s7zssCX7bion1xctAF6xcVexcpy2uwy4jTm9JL8yuK';
const ADDR_EC = 'XyFVXiGaHxoBhXZkSh6NS2rjFyVaVNUo5UiZDqZbuSfUdji';
const ADDR_ET = '0x54Dab85EE2c7b9F7421100d7134eFb5DfA4239bF';
const MESSAGE = 'hello world';
const SIG_ED = '0x299d3bf4c8bb51af732f8067b3a3015c0862a5ff34721749d8ed6577ea2708365d1c5f76bd519009971e41156f12c70abc2533837ceb3bad9a05a99ab923de06';
const SIG_SR = '0xca01419b5a17219f7b78335658cab3b126db523a5df7be4bfc2bef76c2eb3b1dcf4ca86eb877d0a6cf6df12db5995c51d13b00e005d053b892bd09c594434288';
const SIG_SR_WRAP = '0x84b6afb1c8e54bbcb3f4872baf172580e21310e9387a53742627d6652d121447fa406b82805ed3184fb7bd519175cc9f99f283f97954d95cf966ee164df85489';
const SIG_EC = '0x994638ee586d2c5dbd9bacacbc35d9b7e9018de8f7892f00c900db63bc57b1283e2ee7bc51a9b1c1dae121ac4f4b9e2a41cd1d6bf4bb3e24d7fed6faf6d85e0501';
const SIG_ET = '0x4e35aad35793b71f08566615661c9b741d7c605bc8935ac08608dff685324d71b5704fbd14c9297d2f584ea0735f015dcf0def66b802b3f555e1db916eda4b7700';
const MUL_ED = u8aToHex(u8aConcat(new Uint8Array([0]), hexToU8a(SIG_ED)));
const MUL_SR = u8aToHex(u8aConcat(new Uint8Array([1]), hexToU8a(SIG_SR)));
const MUL_EC = u8aToHex(u8aConcat(new Uint8Array([2]), hexToU8a(SIG_EC)));
const MUL_ET = u8aToHex(u8aConcat(new Uint8Array([2]), hexToU8a(SIG_ET)));

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
    it('verifies ed25519 signature', (): void => {
      expect(signatureVerify(MESSAGE, SIG_ED, ADDR_ED)).toEqual({
        crypto: 'ed25519',
        isValid: true,
        isWrapped: false,
        publicKey: decodeAddress(ADDR_ED)
      });
    });

    it('verifies ecdsa signatures', (): void => {
      expect(signatureVerify(MESSAGE, SIG_EC, ADDR_EC)).toEqual({
        crypto: 'ecdsa',
        isValid: true,
        isWrapped: false,
        publicKey: decodeAddress(ADDR_EC)
      });
    });

    it('verifies an ethereum signature', (): void => {
      expect(signatureVerify(MESSAGE, SIG_ET, ADDR_ET)).toEqual({
        crypto: 'ethereum',
        isValid: true,
        isWrapped: false,
        publicKey: hexToU8a(ADDR_ET)
      });
    });

    it('verifies an ethereum signature (known)', (): void => {
      const message = 'Pay KSMs to the Kusama account:88dc3417d5058ec4b4503e0c12ea1a0a89be200fe98922423d4334014fa6b0ee';

      expect(signatureVerify(
        `\x19Ethereum Signed Message:\n${message.length.toString()}${message}`,
        '0x55bd020bdbbdc02de34e915effc9b18a99002f4c29f64e22e8dcbb69e722ea6c28e1bb53b9484063fbbfd205e49dcc1f620929f520c9c4c3695150f05a28f52a01',
        '0x002309df96687e44280bb72c3818358faeeb699c'
      )).toEqual({
        crypto: 'ethereum',
        isValid: true,
        isWrapped: true,
        publicKey: hexToU8a('0x002309df96687e44280bb72c3818358faeeb699c')
      });
    });

    it('fails on invalid ethereum signature', (): void => {
      expect(signatureVerify(MESSAGE, SIG_EC, ADDR_ET)).toEqual({
        crypto: 'none',
        isValid: false,
        isWrapped: false,
        publicKey: hexToU8a(ADDR_ET)
      });
    });

    it('verifies an sr25519 signature', (): void => {
      expect(signatureVerify(MESSAGE, SIG_SR, ADDR_SR)).toEqual({
        crypto: 'sr25519',
        isValid: true,
        isWrapped: false,
        publicKey: decodeAddress(ADDR_SR)
      });
    });

    it('verifies an sr25519 signature (with msg wrapper, without wrapped sig)', (): void => {
      expect(signatureVerify(u8aWrapBytes(MESSAGE), SIG_SR_WRAP, ADDR_SR_WRAP)).toEqual({
        crypto: 'sr25519',
        isValid: true,
        isWrapped: true,
        publicKey: decodeAddress(ADDR_SR_WRAP)
      });
    });

    it('verifies an sr25519 signature (without msg wrapper, with wrapped sig)', (): void => {
      expect(signatureVerify(MESSAGE, SIG_SR_WRAP, ADDR_SR_WRAP)).toEqual({
        crypto: 'sr25519',
        isValid: true,
        isWrapped: false,
        publicKey: decodeAddress(ADDR_SR_WRAP)
      });
    });

    it('allows various inputs', (): void => {
      expect(signatureVerify(stringToU8a(MESSAGE), hexToU8a(SIG_ED), decodeAddress(ADDR_ED))).toEqual({
        crypto: 'ed25519',
        isValid: true,
        isWrapped: false,
        publicKey: decodeAddress(ADDR_ED)
      });
    });

    it('fails on an invalid signature', (): void => {
      expect(signatureVerify(MESSAGE, SIG_SR, ADDR_ED)).toEqual({
        crypto: 'none',
        isValid: false,
        isWrapped: false,
        publicKey: decodeAddress(ADDR_ED)
      });
    });
  });

  describe('verifyMultisig', (): void => {
    it('verifies an ed25519 signature', (): void => {
      expect(signatureVerify(MESSAGE, MUL_ED, ADDR_ED)).toEqual({
        crypto: 'ed25519',
        isValid: true,
        isWrapped: false,
        publicKey: decodeAddress(ADDR_ED)
      });
    });

    it('verifies an ecdsa signature', (): void => {
      expect(signatureVerify(MESSAGE, MUL_EC, ADDR_EC)).toEqual({
        crypto: 'ecdsa',
        isValid: true,
        isWrapped: false,
        publicKey: decodeAddress(ADDR_EC)
      });
    });

    it('verifies an ethereum signature', (): void => {
      expect(signatureVerify(MESSAGE, MUL_ET, ADDR_ET)).toEqual({
        crypto: 'ethereum',
        isValid: true,
        isWrapped: false,
        publicKey: hexToU8a(ADDR_ET)
      });
    });

    it('verifies an sr25519 signature', (): void => {
      expect(signatureVerify(MESSAGE, MUL_SR, ADDR_SR)).toEqual({
        crypto: 'sr25519',
        isValid: true,
        isWrapped: false,
        publicKey: decodeAddress(ADDR_SR)
      });
    });

    it('fails on an invalid signature', (): void => {
      expect(signatureVerify(MESSAGE, MUL_SR, ADDR_ED)).toEqual({
        crypto: 'none',
        isValid: false,
        isWrapped: false,
        publicKey: new Uint8Array([61, 12, 55, 211, 0, 211, 97, 199, 4, 37, 17, 213, 81, 175, 166, 23, 251, 199, 144, 210, 19, 83, 186, 1, 196, 231, 14, 156, 171, 46, 141, 146])
      });
    });
    /**
     * ref: https://github.com/polkadot-js/common/issues/1898
     *
     * The following test ensures that we cover a reproduction that showed
     * an inherent issue with verifying ecdsa signatures which is fixed in
     * https://github.com/polkadot-js/common/pull/1973.
     *
     * It uses a random secretKey, and publicKey pair along with `secp256k1Sign`
     * as the signer which is used for `ecdsa`.
     */
    it('Ensure ecdsa can sign and verify 1000 messages', (): void => {
      const verifyThousandMessages = () => {
        const secretKey = new Uint8Array([
          103, 97, 114, 98, 97, 103, 101, 32, 114, 105, 100,
          103, 101, 32, 107, 105, 99, 107, 32, 114, 111, 115,
          101, 32, 101, 110, 100, 32, 115, 113, 117, 101
        ]);
        const publicKey = new Uint8Array([
          2, 179, 102, 92, 246, 50, 172, 88,
          81, 116, 8, 211, 192, 131, 154, 184,
          122, 83, 180, 104, 4, 227, 214, 195,
          140, 11, 82, 229, 49, 211, 185, 176,
          63
        ]);

        for (let i = 0; i < 1000; i++) {
          const message = `message ${i}`;
          const encodedMessage = stringToU8a(message);
          const signature = secp256k1Sign(encodedMessage, { secretKey });

          const { isValid: valid } = signatureVerify(
            message,
            signature,
            publicKey
          );

          if (!valid) {
            return false;
          }
        }

        return true;
      };

      expect(verifyThousandMessages()).toEqual(true);
    });
  });
});
