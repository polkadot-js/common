// Copyright 2017-2018 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import stringToU8a from '@polkadot/util/string/toU8a';
import u8aConcat from '@polkadot/util/u8a/concat';
import u8aFixLength from '@polkadot/util/u8a/fixLength';
import assert from '@polkadot/util/assert';
import naclDecrypt from '@polkadot/util-crypto/nacl/decrypt';
import naclFromSeed from '@polkadot/util-crypto/nacl/keypair/fromSeed';

import { PKCS8_DIVIDER, PKCS8_HEADER } from './defaults';

const KEY_LENGTH = 32;
const SEED_OFFSET = PKCS8_HEADER.length;
const DIV_OFFSET = SEED_OFFSET + KEY_LENGTH;
const PUBLIC_OFFSET = SEED_OFFSET + KEY_LENGTH + PKCS8_DIVIDER.length;

export default function decode (passphrase?: string, _encrypted?: Uint8Array) {
  assert(_encrypted, `No encrypted data available to decode`);

  const encrypted = (_encrypted as Uint8Array);
  const encoded = passphrase
    ? (naclDecrypt(
        encrypted.subarray(24),
        encrypted.subarray(0, 24),
        u8aFixLength(stringToU8a(passphrase), 256, true)) as Uint8Array)
    : encrypted;

  assert(encoded, `Unable to unencrypt using the supplied passphrase`);

  const header = encoded.subarray(0, PKCS8_HEADER.length);
  const divider = encoded.subarray(DIV_OFFSET, DIV_OFFSET + PKCS8_DIVIDER.length);

  assert(header.toString() === PKCS8_HEADER.toString(), 'Invalid Pkcs8 header found in body');
  assert(divider.toString() === PKCS8_DIVIDER.toString(), 'Invalid Pkcs8 divider found in body');

  const publicKey = encoded.subarray(PUBLIC_OFFSET, PUBLIC_OFFSET + KEY_LENGTH);
  const seed = encoded.subarray(SEED_OFFSET, SEED_OFFSET + KEY_LENGTH);
  const secretKey = u8aConcat(seed, publicKey);
  const validate = naclFromSeed(seed);

  assert(validate.publicKey.toString() === publicKey.toString(), 'Pkcs8 decoded publicKeys are not matching');

  return {
    publicKey,
    secretKey
  };
}
