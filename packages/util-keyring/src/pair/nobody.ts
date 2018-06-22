// Copyright 2017-2018 @polkadot/util-keyring authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { KeyringPair, KeyringPair$Json, KeyringPair$Meta } from '../types';

import addressEncode from '../address/encode';

const publicKey = new Uint8Array(32);
const address = addressEncode(publicKey);
const meta = {
  name: 'nobody'
};
const json: KeyringPair$Json = {
  address,
  encoded: '',
  encoding: {
    content: 'none',
    type: 'none',
    version: '0'
  },
  meta
};

export default function everybody (): KeyringPair {
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
}
