// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { KeypairType, VerifyResult } from '../types';

import { assert, u8aToU8a } from '@polkadot/util';

import addressDecode from '../address/decode';
import naclVerify from '../nacl/verify';
import schnorrkelVerify from '../schnorrkel/verify';
import secp256k1Verify from '../secp256k1/verify';

const VERIFIERS: [KeypairType, (message: Uint8Array | string, signature: Uint8Array | string, publicKey: Uint8Array | string) => boolean][] = [
  ['ed25519', naclVerify],
  ['sr25519', schnorrkelVerify],
  [
    'ecdsa',
    (message: Uint8Array | string, signature: Uint8Array | string, publicKey: Uint8Array | string) =>
      secp256k1Verify(message, signature, publicKey, 'blake2')
  ],
  [
    'ethereum',
    (message: Uint8Array | string, signature: Uint8Array | string, publicKey: Uint8Array | string) =>
      secp256k1Verify(message, signature, publicKey, 'keccak')
  ]
];

const CRYPTO_TYPES: KeypairType[] = [
  'ed25519',
  'sr25519',
  'ecdsa',
  'ethereum'
];

function verifyDetect (result: VerifyResult, message: Uint8Array | string, signature: Uint8Array, publicKey: Uint8Array): VerifyResult {
  result.isValid = VERIFIERS.some(([crypto, verify]): boolean => {
    try {
      if (verify(message, signature, publicKey)) {
        result.crypto = crypto;

        return true;
      }
    } catch (error) {
      // do nothing, result.isValid still set to false
    }

    return false;
  });

  return result;
}

function verifyMultisig (result: VerifyResult, message: Uint8Array | string, signature: Uint8Array, publicKey: Uint8Array): VerifyResult {
  assert([0, 1, 2].includes(signature[0]), `Unknown crypto type, expected signature prefix [0..2], found ${signature[0]}`);

  result.crypto = CRYPTO_TYPES[signature[0]] || 'none';

  try {
    result.isValid = {
      ecdsa: (): boolean => secp256k1Verify(message, signature.subarray(1), publicKey, 'blake2'),
      ed25519: (): boolean => naclVerify(message, signature.subarray(1), publicKey),
      ethereum: (): boolean => secp256k1Verify(message, signature.subarray(1), publicKey, 'keccak'),
      none: (): boolean => { throw Error('no verify for `none` crypto type'); },
      sr25519: (): boolean => schnorrkelVerify(message, signature.subarray(1), publicKey)
    }[result.crypto]();
  } catch (error) {
    // ignore, result.isValid still set to false
  }

  return result;
}

export default function signatureVerify (message: Uint8Array | string, signature: Uint8Array | string, addressOrPublicKey: Uint8Array | string): VerifyResult {
  const signatureU8a = u8aToU8a(signature);

  assert([64, 65, 66].includes(signatureU8a.length), `Invalid signature length, expected [64..66] bytes, found ${signatureU8a.length}`);

  const result: VerifyResult = { crypto: 'none', isValid: false };
  const publicKey = addressDecode(addressOrPublicKey);
  const isMultisig = [0, 1, 2].includes(signatureU8a[0]) && [65, 66].includes(signatureU8a.length);

  if (isMultisig) {
    return verifyMultisig(result, message, signatureU8a, publicKey);
  } else {
    return verifyDetect(result, message, signatureU8a, publicKey);
  }
}
