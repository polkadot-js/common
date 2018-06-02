// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeyringPair, KeyringPair$Json, KeyringPair$Meta } from '../types';

const hexToU8a = require('@polkadot/util/hex/toU8a');

const addressEncode = require('../address/encode');

const publicKey = hexToU8a(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
);
const address = addressEncode(publicKey);
const meta = {
  name: 'everybody'
};
const json = {
  address,
  encoded: '',
  encoding: {
    content: 'none',
    type: 'none',
    version: '0'
  },
  meta
};

module.exports = function everybody (): KeyringPair {
  return {
    address: (): string =>
      address,
    decodePkcs8: (passphrase?: string, encoded?: Uint8Array): void =>
      undefined,
    encodePkcs8: (passphrase?: string): Uint8Array =>
      new Uint8Array(0),
    getMeta: (): KeyringPair$Meta =>
      meta,
    hasSecretKey: (): boolean =>
      true,
    publicKey: (): Uint8Array =>
      publicKey,
    setMeta: (meta: KeyringPair$Meta): void =>
      undefined,
    sign: (message: Uint8Array): Uint8Array =>
      new Uint8Array(64),
    toJson: (passphrase?: string): KeyringPair$Json =>
      json,
    verify: (message: Uint8Array, signature: Uint8Array): boolean =>
      false
  };
};
