// Copyright 2017-2021 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KeyringPair, KeyringPair$Json, KeyringPair$Meta } from '../types';

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

export function nobody (): KeyringPair {
  const pair: KeyringPair = {
    address,
    addressRaw: publicKey,
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
    unlock: (passphrase?: string): void =>
      undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    verify: (message: Uint8Array, signature: Uint8Array): boolean =>
      false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    vrfSign: (message: Uint8Array, context?: string | Uint8Array, extra?: string | Uint8Array): Uint8Array =>
      new Uint8Array(96),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    vrfVerify: (message: Uint8Array, vrfResult: Uint8Array, context?: string | Uint8Array, extra?: string | Uint8Array): boolean =>
      false
  };

  return pair;
}
