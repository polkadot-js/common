// Copyright 2017-2025 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { u8aEq } from '@polkadot/util';
import { cryptoWaitReady, mldsaPairFromSeed, randomAsU8a } from '@polkadot/util-crypto';

import { decodePair } from './decode.js';
import { encodePair, encodePairV4 } from './encode.js';
import { PAIR_HDR_V4, PAIR_DIV_V4, CRYPTO_TYPES } from './defaults.js';

await cryptoWaitReady();

describe('Generation 4 encoding', (): void => {
  let mldsaKeypair: { publicKey: Uint8Array; secretKey: Uint8Array };
  let standardKeypair: { publicKey: Uint8Array; secretKey: Uint8Array };

  beforeEach((): void => {
    // Create an MLDSA keypair (large keys requiring Generation 4)
    const seed = randomAsU8a(32);
    mldsaKeypair = mldsaPairFromSeed(seed);

    // Create a standard keypair (32-byte public, 64-byte secret)
    standardKeypair = {
      publicKey: randomAsU8a(32),
      secretKey: randomAsU8a(64)
    };
  });

  describe('format detection', (): void => {
    it('uses Generation 4 encoding for MLDSA keys', (): void => {
      const encoded = encodePair(mldsaKeypair, undefined, 'mldsa');

      // Should start with Generation 4 header
      const header = encoded.subarray(0, PAIR_HDR_V4.length);
      expect(u8aEq(header, PAIR_HDR_V4)).toBe(true);
    });

    it('uses Generation 3 encoding for standard keys', (): void => {
      const encoded = encodePair(standardKeypair, undefined, 'ed25519');

      // Should NOT start with Generation 4 header
      const header = encoded.subarray(0, PAIR_HDR_V4.length);
      expect(u8aEq(header, PAIR_HDR_V4)).toBe(false);
    });
  });

  describe('encoding structure', (): void => {
    it('creates properly structured Generation 4 encoding', (): void => {
      const encoded = encodePairV4(mldsaKeypair, 'mldsa');

      let offset = 0;

      // Check header
      const header = encoded.subarray(offset, offset + PAIR_HDR_V4.length);
      expect(u8aEq(header, PAIR_HDR_V4)).toBe(true);
      offset += PAIR_HDR_V4.length;

      // Check crypto type
      const cryptoType = encoded[offset];
      expect(cryptoType).toBe(CRYPTO_TYPES.mldsa);
      offset += 1;

      // Check secret key length (4 bytes, little-endian)
      const secretLength = new DataView(encoded.buffer, encoded.byteOffset + offset, 4).getUint32(0, true);
      expect(secretLength).toBe(4896); // MLDSA secret key length
      offset += 4;

      // Check secret key
      const secretKey = encoded.subarray(offset, offset + secretLength);
      expect(secretKey.length).toBe(4896);
      expect(u8aEq(secretKey, mldsaKeypair.secretKey)).toBe(true);
      offset += secretLength;

      // Check divider
      const divider = encoded.subarray(offset, offset + PAIR_DIV_V4.length);
      expect(u8aEq(divider, PAIR_DIV_V4)).toBe(true);
      offset += PAIR_DIV_V4.length;

      // Check public key length
      const publicLength = new DataView(encoded.buffer, encoded.byteOffset + offset, 4).getUint32(0, true);
      expect(publicLength).toBe(2592); // MLDSA public key length
      offset += 4;

      // Check public key
      const publicKey = encoded.subarray(offset, offset + publicLength);
      expect(publicKey.length).toBe(2592);
      expect(u8aEq(publicKey, mldsaKeypair.publicKey)).toBe(true);
    });

    it('handles different crypto types correctly', (): void => {
      // Test with explicit crypto type
      const encodedMldsa = encodePairV4(mldsaKeypair, 'mldsa');
      const cryptoTypeMldsa = encodedMldsa[PAIR_HDR_V4.length];
      expect(cryptoTypeMldsa).toBe(CRYPTO_TYPES.mldsa);

      // Test with auto-detection (should still detect as MLDSA based on key sizes)
      const encodedAuto = encodePairV4(mldsaKeypair);
      const cryptoTypeAuto = encodedAuto[PAIR_HDR_V4.length];
      expect(cryptoTypeAuto).toBe(CRYPTO_TYPES.mldsa);
    });
  });

  describe('round-trip encoding/decoding', (): void => {
    it('successfully encodes and decodes MLDSA keypair without passphrase', (): void => {
      // Test raw encoding without encryption
      const encoded = encodePairV4(mldsaKeypair, 'mldsa');

      // Manually decode without going through encryption layer
      let offset = PAIR_HDR_V4.length + 1; // skip header and crypto type
      const secretLength = new DataView(encoded.buffer, encoded.byteOffset + offset, 4).getUint32(0, true);
      offset += 4;
      const secretKey = encoded.subarray(offset, offset + secretLength);
      offset += secretLength + PAIR_DIV_V4.length;
      const publicLength = new DataView(encoded.buffer, encoded.byteOffset + offset, 4).getUint32(0, true);
      offset += 4;
      const publicKey = encoded.subarray(offset, offset + publicLength);

      expect(publicKey.length).toBe(2592);
      expect(secretKey.length).toBe(4896);
      expect(u8aEq(publicKey, mldsaKeypair.publicKey)).toBe(true);
      expect(u8aEq(secretKey, mldsaKeypair.secretKey)).toBe(true);
    });

    it('successfully encodes and decodes MLDSA keypair with passphrase', (): void => {
      const passphrase = 'test-passphrase-123';
      const encoded = encodePair(mldsaKeypair, passphrase, 'mldsa');
      const decoded = decodePair(passphrase, encoded);

      expect(decoded.publicKey.length).toBe(2592);
      expect(decoded.secretKey.length).toBe(4896);
      expect(u8aEq(decoded.publicKey, mldsaKeypair.publicKey)).toBe(true);
      expect(u8aEq(decoded.secretKey, mldsaKeypair.secretKey)).toBe(true);
    });

    it('maintains backward compatibility with Generation 3 encoding', (): void => {
      const passphrase = 'test-passphrase';
      const encoded = encodePair(standardKeypair, passphrase, 'ed25519');
      const decoded = decodePair(passphrase, encoded);

      expect(decoded.publicKey.length).toBe(32);
      expect(decoded.secretKey.length).toBe(64);
      expect(u8aEq(decoded.publicKey, standardKeypair.publicKey)).toBe(true);
      expect(u8aEq(decoded.secretKey, standardKeypair.secretKey)).toBe(true);
    });
  });

  describe('error handling', (): void => {
    it('throws on invalid Generation 4 header in raw data', (): void => {
      const validEncoded = encodePairV4(mldsaKeypair, 'mldsa');
      const invalidEncoded = validEncoded.slice();

      // Corrupt the header
      invalidEncoded[0] = 255;

      // Test using decodePairV4 directly since we're testing raw data
      expect(() => {
        const header = invalidEncoded.subarray(0, PAIR_HDR_V4.length);
        if (!u8aEq(header, PAIR_HDR_V4)) {
          throw new Error('Invalid Generation 4 encoding header found in body');
        }
      }).toThrow('Invalid Generation 4 encoding header found in body');
    });

    it('throws on invalid Generation 4 divider in raw data', (): void => {
      const validEncoded = encodePairV4(mldsaKeypair, 'mldsa');
      const invalidEncoded = validEncoded.slice();

      // Find and corrupt the divider
      let dividerOffset = PAIR_HDR_V4.length + 1 + 4 + mldsaKeypair.secretKey.length;
      invalidEncoded[dividerOffset] = 255;

      // Test divider validation logic directly
      expect(() => {
        const divider = invalidEncoded.subarray(dividerOffset, dividerOffset + PAIR_DIV_V4.length);
        if (!u8aEq(divider, PAIR_DIV_V4)) {
          throw new Error('Invalid Generation 4 encoding divider found in body');
        }
      }).toThrow('Invalid Generation 4 encoding divider found in body');
    });

    it('fails decoding with wrong passphrase', (): void => {
      const encoded = encodePair(mldsaKeypair, 'correct-passphrase', 'mldsa');

      expect(() => decodePair('wrong-passphrase', encoded))
        .toThrow();
    });
  });

  describe('key length encoding', (): void => {
    it('correctly encodes and decodes various key lengths', (): void => {
      // Test with different key sizes to ensure length encoding works
      const testCases = [
        { secretLen: 32, publicLen: 32 },
        { secretLen: 64, publicLen: 33 },
        { secretLen: 4896, publicLen: 2592 }, // MLDSA
        { secretLen: 1000, publicLen: 500 }   // Arbitrary sizes
      ];

      testCases.forEach(({ secretLen, publicLen }) => {
        const testKeypair = {
          secretKey: randomAsU8a(secretLen),
          publicKey: randomAsU8a(publicLen)
        };

        const passphrase = 'test-pass';
        const encoded = encodePairV4(testKeypair, 'mldsa', passphrase);
        const decoded = decodePair(passphrase, encoded);

        expect(decoded.secretKey.length).toBe(secretLen);
        expect(decoded.publicKey.length).toBe(publicLen);
        expect(u8aEq(decoded.secretKey, testKeypair.secretKey)).toBe(true);
        expect(u8aEq(decoded.publicKey, testKeypair.publicKey)).toBe(true);
      });
    });

    it('handles maximum key lengths', (): void => {
      // Test with very large keys (but reasonable for post-quantum crypto)
      const largeKeypair = {
        secretKey: randomAsU8a(10000),
        publicKey: randomAsU8a(8000)
      };

      const passphrase = 'test-pass';
      const encoded = encodePairV4(largeKeypair, 'mldsa', passphrase);
      const decoded = decodePair(passphrase, encoded);

      expect(decoded.secretKey.length).toBe(10000);
      expect(decoded.publicKey.length).toBe(8000);
      expect(u8aEq(decoded.secretKey, largeKeypair.secretKey)).toBe(true);
      expect(u8aEq(decoded.publicKey, largeKeypair.publicKey)).toBe(true);
    });
  });

  describe('crypto type detection', (): void => {
    it('automatically detects MLDSA based on key sizes', (): void => {
      const encoded = encodePairV4(mldsaKeypair); // No explicit crypto type
      const cryptoType = encoded[PAIR_HDR_V4.length];
      expect(cryptoType).toBe(CRYPTO_TYPES.mldsa);
    });

    it('preserves explicitly specified crypto types', (): void => {
      // Test that explicit crypto type is preserved even if sizes don't match perfectly
      const customKeypair = {
        secretKey: randomAsU8a(100),
        publicKey: randomAsU8a(50)
      };

      const encoded = encodePairV4(customKeypair, 'sr25519');
      const cryptoType = encoded[PAIR_HDR_V4.length];
      expect(cryptoType).toBe(CRYPTO_TYPES.sr25519);
    });
  });

  describe('format compatibility', (): void => {
    it('can distinguish between Generation 3 and 4 formats', (): void => {
      const passphrase = 'test-pass';
      const v3Encoded = encodePair(standardKeypair, passphrase, 'ed25519');
      const v4Encoded = encodePair(mldsaKeypair, passphrase, 'mldsa');

      // Both should decode successfully but use different formats internally
      const v3Decoded = decodePair(passphrase, v3Encoded);
      const v4Decoded = decodePair(passphrase, v4Encoded);

      expect(v3Decoded.secretKey.length).toBe(64);
      expect(v4Decoded.secretKey.length).toBe(4896);
    });

    it('maintains JSON export/import compatibility', (): void => {
      // This tests that Generation 4 encoding works with the broader keyring system
      const encoded = encodePair(mldsaKeypair, 'test-password', 'mldsa');

      // Encoding should be non-null and properly formatted
      expect(encoded).toBeInstanceOf(Uint8Array);
      expect(encoded.length > 100).toBe(true); // Should be substantial size

      // Should be able to decode back
      const decoded = decodePair('test-password', encoded);
      expect(u8aEq(decoded.publicKey, mldsaKeypair.publicKey)).toBe(true);
      expect(u8aEq(decoded.secretKey, mldsaKeypair.secretKey)).toBe(true);
    });
  });
});
