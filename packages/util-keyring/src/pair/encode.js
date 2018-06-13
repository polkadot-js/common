// Copyright 2017-2018 @polkadot/util-keyring authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const u8aConcat = require('@polkadot/util/u8a/concat');
const u8aFixLength = require('@polkadot/util/u8a/fixLength');
const u8aFromString = require('@polkadot/util/u8a/fromString');
const naclEncrypt = require('@polkadot/util-crypto/nacl/encrypt');

const { PKCS8_DIVIDER, PKCS8_HEADER } = require('./defaults');

module.exports = function encode (secretKey: Uint8Array, passphrase?: string): Uint8Array {
  const encoded = u8aConcat(
    PKCS8_HEADER,
    secretKey.subarray(0, 32),
    PKCS8_DIVIDER,
    secretKey.subarray(32, 64)
  );

  // flowlint-next-line sketchy-null-string:off
  if (!passphrase) {
    return encoded;
  }

  const { encrypted, nonce } = naclEncrypt(encoded, u8aFixLength(u8aFromString(passphrase), 256, true));

  return u8aConcat(nonce, encrypted);
};
