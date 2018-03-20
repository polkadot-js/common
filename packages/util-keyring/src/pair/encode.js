// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const u8aConcat = require('@polkadot/util/u8a/concat');

const { PKCS8_DIVIDER, PKCS8_HEADER } = require('./defaults');

module.exports = function encode (secretKey: Uint8Array, passphrase?: Uint8Array | string): Uint8Array {
  // TODO: encrypt using passphrase

  return u8aConcat(
    PKCS8_HEADER,
    secretKey.subarray(0, 32),
    PKCS8_DIVIDER,
    secretKey.subarray(32, 64)
  );
};
