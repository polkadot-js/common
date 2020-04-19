// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeypairType, VerifyResult } from '../types';

import { assert, u8aToU8a } from '@polkadot/util';

import addressDecode from '../address/decode';
import naclVerify from '../nacl/verify';
import schnorrkelVerify from '../schnorrkel/verify';
import secp256k1Verify from '../secp256k1/verify';

const VERIFIERS: [KeypairType, (message: Uint8Array | string, signature: Uint8Array | string, publicKey: Uint8Array | string) => boolean][] = [
  ['ed25519', naclVerify],
  ['sr25519', schnorrkelVerify],
  ['ecdsa', secp256k1Verify]
];

const CRYPTO_TYPES: [KeypairType] = [
  'ed25519',
  'sr25519',
  'ecdsa'
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

  result.crypto = CRYPTO_TYPES[signature[0]];

  try {
    switch (result.crypto) {
      case 'ed25519':
        result.isValid = naclVerify(message, signature.subarray(1), publicKey);
        break;
      case 'sr25519':
        result.isValid = schnorrkelVerify(message, signature.subarray(1), publicKey);
        break;
      case 'ecdsa':
        result.isValid = secp256k1Verify(message, signature.subarray(1), publicKey);
        break;
    }
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

  const multisig = [0, 1, 2].includes(signatureU8a[0]) && [65, 66].includes(signatureU8a.length);
  if (multisig) {
    return verifyMultisig(result, message, signatureU8a, publicKey);
  } else {
    return verifyDetect(result, message, signatureU8a, publicKey);
  }
}
