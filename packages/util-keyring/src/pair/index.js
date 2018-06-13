// Copyright 2017-2018 @polkadot/util-keyring authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeypairType } from '@polkadot/util-crypto/types';
import type { KeyringPair, KeyringPair$Json, KeyringPair$Meta } from '../types';
import type { PairState } from './types';

const naclSign = require('@polkadot/util-crypto/nacl/sign');
const naclVerify = require('@polkadot/util-crypto/nacl/verify');

const encodeAddress = require('../address/encode');
const decode = require('./decode');
const encode = require('./encode');
const getMeta = require('./getMeta');
const setMeta = require('./setMeta');
const toJson = require('./toJson');

module.exports = function pair ({ publicKey, secretKey }: $Shape<KeypairType>, meta?: KeyringPair$Meta = {}, defaultEncoded?: Uint8Array): KeyringPair {
  const state: PairState = {
    address: encodeAddress(publicKey),
    meta: { ...meta }
  };

  return {
    address: (): string =>
      state.address,
    decodePkcs8: (passphrase?: string, encoded?: Uint8Array): void => {
      const decoded = decode(passphrase, encoded || defaultEncoded);

      publicKey = decoded.publicKey;
      secretKey = decoded.secretKey;
      state.address = encodeAddress(publicKey);
    },
    encodePkcs8: (passphrase?: string): Uint8Array =>
      encode(secretKey, passphrase),
    getMeta: (): KeyringPair$Meta =>
      getMeta(state),
    hasSecretKey: (): boolean =>
      !!(secretKey && secretKey.length !== 0),
    publicKey: (): Uint8Array =>
      publicKey,
    setMeta: (meta: KeyringPair$Meta): void =>
      setMeta(state, meta),
    sign: (message: Uint8Array): Uint8Array =>
      naclSign(message, secretKey),
    toJson: (passphrase?: string): KeyringPair$Json =>
      toJson(state, encode(secretKey, passphrase), !!passphrase),
    verify: (message: Uint8Array, signature: Uint8Array): boolean =>
      naclVerify(message, signature, publicKey)
  };
};
