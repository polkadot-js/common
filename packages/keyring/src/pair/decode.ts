// Copyright 2017-2019 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { assert, stringToU8a, u8aFixLength } from '@polkadot/util/index';
import { naclDecrypt } from '@polkadot/util-crypto/index';

import { KEY_LENGTH, NONCE_LENGTH, PKCS8_DIVIDER, PKCS8_HEADER } from './defaults';

const SEED_OFFSET = PKCS8_HEADER.length;
const DIV_OFFSET = SEED_OFFSET + KEY_LENGTH;
const PUBLIC_OFFSET = DIV_OFFSET + PKCS8_DIVIDER.length;

type DecodeResult = {
  publicKey: Uint8Array,
  seed: Uint8Array
};

export default function decode (passphrase?: string, _encrypted?: Uint8Array | null): DecodeResult {
  assert(_encrypted, `No encrypted data available to decode`);

  const encrypted = (_encrypted as Uint8Array);
  const encoded = passphrase
    ? (naclDecrypt(
        encrypted.subarray(NONCE_LENGTH),
        encrypted.subarray(0, NONCE_LENGTH),
        u8aFixLength(stringToU8a(passphrase), 256, true)
      ) as Uint8Array)
    : encrypted;

  assert(encoded, `Unable to unencrypt using the supplied passphrase`);

  const header = encoded.subarray(0, PKCS8_HEADER.length);

  assert(header.toString() === PKCS8_HEADER.toString(), 'Invalid Pkcs8 header found in body');

  const divider = encoded.subarray(DIV_OFFSET, DIV_OFFSET + PKCS8_DIVIDER.length);

  assert(divider.toString() === PKCS8_DIVIDER.toString(), 'Invalid Pkcs8 divider found in body');

  const seed = encoded.subarray(SEED_OFFSET, SEED_OFFSET + KEY_LENGTH);
  const publicKey = encoded.subarray(PUBLIC_OFFSET, PUBLIC_OFFSET + KEY_LENGTH);

  return {
    publicKey,
    seed
  };
}
