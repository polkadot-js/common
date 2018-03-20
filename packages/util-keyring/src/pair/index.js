// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeypairType } from '@polkadot/util-crypto/types';
import type { KeyringPair } from '../types';

const naclFromSeed = require('@polkadot/util-crypto/nacl/keypair/fromSeed');
const naclSign = require('@polkadot/util-crypto/nacl/sign');
const naclVerify = require('@polkadot/util-crypto/nacl/verify');
const assert = require('@polkadot/util/assert');

const decode = require('./decode');
const encode = require('./encode');

function decodePkcs8 (encoded: Uint8Array, passphrase?: Uint8Array | string) {
  const { publicKey, secretKey } = decode(encoded, passphrase);
  const validate = naclFromSeed(secretKey.subarray(0, 32));

  assert(validate.publicKey.toString() === publicKey.toString(), 'Pkcs8 decoded keys are not matching');

  return {
    publicKey,
    secretKey
  };
}

module.exports = function pair ({ publicKey, secretKey }: KeypairType): KeyringPair {
  return {
    decodePkcs8: (encoded: Uint8Array, passphrase?: Uint8Array | string): void => {
      const decoded = decodePkcs8(encoded, passphrase);

      publicKey = decoded.publicKey;
      secretKey = decoded.secretKey;
    },
    encodePkcs8: (passphrase?: Uint8Array | string): Uint8Array =>
      encode(secretKey, passphrase),
    publicKey: (): Uint8Array =>
      publicKey,
    sign: (message: Uint8Array): Uint8Array =>
      naclSign(message, secretKey),
    verify: (message: Uint8Array, signature: Uint8Array): boolean =>
      naclVerify(message, signature, publicKey)
  };
};
