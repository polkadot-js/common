// Copyright 2017-2018 @polkadot/util-keyring authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const u8aConcat = require('@polkadot/util/u8a/concat');
const u8aFixLength = require('@polkadot/util/u8a/fixLength');
const u8aFromString = require('@polkadot/util/u8a/fromString');
const assert = require('@polkadot/util/assert');
const naclDecrypt = require('@polkadot/util-crypto/nacl/decrypt');
const naclFromSeed = require('@polkadot/util-crypto/nacl/keypair/fromSeed');

const { PKCS8_DIVIDER, PKCS8_HEADER } = require('./defaults');

const KEY_LENGTH = 32;
const SEED_OFFSET = PKCS8_HEADER.length;
const DIV_OFFSET = SEED_OFFSET + KEY_LENGTH;
const PUBLIC_OFFSET = SEED_OFFSET + KEY_LENGTH + PKCS8_DIVIDER.length;

module.exports = function decode (passphrase?: string, _encrypted?: Uint8Array) {
  assert(_encrypted, `No encrypted data available to decode`);

  // flowlint-next-line unclear-type:off
  const encrypted = ((_encrypted: any): Uint8Array);
  // flowlint-next-line sketchy-null-string:off
  const encoded = passphrase
    // flowlint-next-line unclear-type:off
    ? ((naclDecrypt(encrypted.subarray(24), encrypted.subarray(0, 24), u8aFixLength(u8aFromString(passphrase), 256, true)): any): Uint8Array)
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
};
