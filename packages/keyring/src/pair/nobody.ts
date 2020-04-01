// Copyright 2017-2020 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeyringPair, KeyringPair$Json, KeyringPair$Meta } from '../types';

import { encodeAddress } from '@polkadot/util-crypto';

const publicKey = new Uint8Array(32);
const address = encodeAddress(publicKey);
const meta = {
  isTesting: true,
  name: 'nobody'
};
const json: KeyringPair$Json = {
  address,
  encoded: '',
  encoding: {
    content: ['pkcs8', 'ed25519'],
    type: 'none',
    version: '0'
  },
  meta
};

export default function everybody (): KeyringPair {
  const pair: KeyringPair = {
    address,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    decodePkcs8: (passphrase?: string, encoded?: Uint8Array): void =>
      undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    derive: (suri: string, meta?: KeyringPair$Meta): KeyringPair =>
      pair,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    encodePkcs8: (passphrase?: string): Uint8Array =>
      new Uint8Array(0),
    isLocked: true,
    lock: (): void => {
      // no locking, it is always locked
    },
    meta,
    publicKey,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setMeta: (meta: KeyringPair$Meta): void =>
      undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sign: (message: Uint8Array): Uint8Array =>
      new Uint8Array(64),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toJson: (passphrase?: string): KeyringPair$Json =>
      json,
    type: 'ed25519',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    verify: (message: Uint8Array, signature: Uint8Array): boolean =>
      false
  };

  return pair;
}
