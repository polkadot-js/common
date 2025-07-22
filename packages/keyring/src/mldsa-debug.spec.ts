// Copyright 2017-2025 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { stringToU8a } from '@polkadot/util';
import { blake2AsU8a, cryptoWaitReady, mldsaPairFromSeed, mldsaSign, mldsaVerify, randomAsU8a, signatureVerify } from '@polkadot/util-crypto';

import Keyring from './index.js';

await cryptoWaitReady();

describe('MLDSA debugging', (): void => {
  const MESSAGE = 'test message for debugging';
  const seed = new Uint8Array(32).fill(42);

  it('verifies direct MLDSA functions work', (): void => {
    console.log('=== Testing Direct MLDSA Functions ===');

    const pair = mldsaPairFromSeed(seed);
    console.log('Generated keypair:');
    console.log('- Public key length:', pair.publicKey.length);
    console.log('- Secret key length:', pair.secretKey.length);

    const signature = mldsaSign(MESSAGE, pair);
    console.log('Generated signature:');
    console.log('- Signature length:', signature.length);

    const isValid = mldsaVerify(MESSAGE, signature, pair.publicKey);
    console.log('Direct verification result:', isValid);

    expect(isValid).toBe(true);
  });

  it('checks keyring pair creation and properties', (): void => {
    console.log('\n=== Testing Keyring Pair Creation ===');

    const keyring = new Keyring({ type: 'mldsa' });
    const pair = keyring.addFromSeed(seed);

    console.log('Keyring pair properties:');
    console.log('- Type:', pair.type);
    console.log('- Public key length:', pair.publicKey.length);
    console.log('- Address:', pair.address);
    console.log('- Address length:', pair.address.length);

    // Check what the address actually is
    const addressRaw = pair.addressRaw;
    console.log('- Address raw length:', addressRaw.length);
    console.log('- Address raw bytes:', Array.from(addressRaw.slice(0, 8)).map(b => b.toString(16)).join(' '));

    expect(pair.type).toBe('mldsa');
    expect(pair.publicKey.length).toBe(2592);
  });

  it('checks signature generation through keyring', (): void => {
    console.log('\n=== Testing Keyring Signature Generation ===');

    const keyring = new Keyring({ type: 'mldsa' });
    const pair = keyring.addFromSeed(seed);

    const signature = pair.sign(MESSAGE);
    console.log('Keyring signature:');
    console.log('- Signature length:', signature.length);
    console.log('- First few bytes:', Array.from(signature.slice(0, 8)).map(b => b.toString(16)).join(' '));

    // Check if signature has type prefix
    const signatureWithType = pair.sign(MESSAGE, { withType: true });
    console.log('Signature with type:');
    console.log('- Length:', signatureWithType.length);
    console.log('- First byte (type):', signatureWithType[0]);

    expect(signature.length).toBe(4627);
    expect(signatureWithType.length).toBe(4628);
    expect(signatureWithType[0]).toBe(3);
  });

  it('tests different verification methods', (): void => {
    console.log('\n=== Testing Different Verification Methods ===');

    const keyring = new Keyring({ type: 'mldsa' });
    const pair = keyring.addFromSeed(seed);
    const signature = pair.sign(MESSAGE);

    // Method 1: Direct MLDSA verification with raw public key
    console.log('Method 1: Direct mldsaVerify with raw public key');
    const directResult = mldsaVerify(MESSAGE, signature, pair.publicKey);
    console.log('- Result:', directResult);

    // Method 2: Keyring verify with raw public key
    console.log('Method 2: Keyring verify with raw public key');
    try {
      const keyringRawResult = pair.verify(MESSAGE, signature, pair.publicKey);
      console.log('- Result:', keyringRawResult);
    } catch (error) {
      console.log('- Error:', error.message);
    }

    // Method 3: Keyring verify with address
    console.log('Method 3: Keyring verify with address');
    try {
      const keyringAddrResult = pair.verify(MESSAGE, signature, pair.address);
      console.log('- Result:', keyringAddrResult);
    } catch (error) {
      console.log('- Error:', error.message);
    }

    // Method 4: signatureVerify with hashed public key
    console.log('Method 4: signatureVerify with hashed public key');
    const hashedPubkey = blake2AsU8a(pair.publicKey);
    try {
      const sigVerifyResult = signatureVerify(MESSAGE, signature, hashedPubkey);
      console.log('- Result:', sigVerifyResult.isValid);
      console.log('- Crypto type detected:', sigVerifyResult.crypto);
    } catch (error) {
      console.log('- Error:', error.message);
    }

    // Method 5: signatureVerify with address
    console.log('Method 5: signatureVerify with address');
    try {
      const sigVerifyAddrResult = signatureVerify(MESSAGE, signature, pair.address);
      console.log('- Result:', sigVerifyAddrResult.isValid);
      console.log('- Crypto type detected:', sigVerifyAddrResult.crypto);
    } catch (error) {
      console.log('- Error:', error.message);
    }

    expect(directResult).toBe(true);
  });

  it('tests signature verification with different signature formats', (): void => {
    console.log('\n=== Testing Signature Formats ===');

    const keyring = new Keyring({ type: 'mldsa' });
    const pair = keyring.addFromSeed(seed);

    const signature = pair.sign(MESSAGE);
    const signatureWithType = pair.sign(MESSAGE, { withType: true });

    console.log('Testing raw signature (4627 bytes)');
    try {
      const result1 = signatureVerify(MESSAGE, signature, pair.address);
      console.log('- Result:', result1.isValid, '- Crypto:', result1.crypto);
    } catch (error) {
      console.log('- Error:', error.message);
    }

    console.log('Testing prefixed signature (4628 bytes)');
    try {
      const result2 = signatureVerify(MESSAGE, signatureWithType, pair.address);
      console.log('- Result:', result2.isValid, '- Crypto:', result2.crypto);
    } catch (error) {
      console.log('- Error:', error.message);
    }
  });

  it('compares addresses between direct and keyring methods', (): void => {
    console.log('\n=== Comparing Address Generation ===');

    // Direct method
    const directPair = mldsaPairFromSeed(seed);
    const directAddress = blake2AsU8a(directPair.publicKey);

    // Keyring method
    const keyring = new Keyring({ type: 'mldsa' });
    const keyringPair = keyring.addFromSeed(seed);
    const keyringAddressRaw = keyringPair.addressRaw;

    console.log('Direct address (blake2 of pubkey):');
    console.log('- Length:', directAddress.length);
    console.log('- First 8 bytes:', Array.from(directAddress.slice(0, 8)).map(b => b.toString(16).padStart(2, '0')).join(' '));

    console.log('Keyring address raw:');
    console.log('- Length:', keyringAddressRaw.length);
    console.log('- First 8 bytes:', Array.from(keyringAddressRaw.slice(0, 8)).map(b => b.toString(16).padStart(2, '0')).join(' '));

    console.log('Are addresses equal?', directAddress.every((val, i) => val === keyringAddressRaw[i]));

    expect(directAddress).toEqual(keyringAddressRaw);
  });
});
