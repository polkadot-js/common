// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeypairType } from '@polkadot/util-crypto/types';
import type { KeyringPair } from '../types';
import type { PairState } from './types';

const naclSign = require('@polkadot/util-crypto/nacl/sign');
const naclVerify = require('@polkadot/util-crypto/nacl/verify');

const decode = require('./decode');
const encode = require('./encode');
const getMeta = require('./getMeta');
const setMeta = require('./setMeta');

module.exports = function pair ({ publicKey, secretKey }: KeypairType): KeyringPair {
  const state: PairState = {
    meta: {}
  };

  return {
    decodePkcs8: (encoded: Uint8Array, passphrase?: Uint8Array | string): void => {
      const decoded = decode(encoded, passphrase);

      publicKey = decoded.publicKey;
      secretKey = decoded.secretKey;
    },
    encodePkcs8: (passphrase?: Uint8Array | string): Uint8Array =>
      encode(secretKey, passphrase),
    getMeta: (): PairState$Meta =>
      getMeta(state),
    publicKey: (): Uint8Array =>
      publicKey,
    setMeta: (meta: PairState$Meta): void =>
      setMeta(state, meta),
    sign: (message: Uint8Array): Uint8Array =>
      naclSign(message, secretKey),
    verify: (message: Uint8Array, signature: Uint8Array): boolean =>
      naclVerify(message, signature, publicKey)
  };
};
