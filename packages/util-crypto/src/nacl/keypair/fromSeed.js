// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeypairType } from '../../types';

const nacl = require('tweetnacl');
const hexToU8a = require('@polkadot/util/hex/toU8a');
const isHex = require('@polkadot/util/is/hex');
const isU8a = require('@polkadot/util/is/u8a');
const u8aFromString = require('@polkadot/util/u8a/fromString');

/**
  @name naclKeypairFromSeed
  @signature naclKeypairFromSeed (seed: Uint8Array | string): { secretKey: Uint8Array, publicKey: Uint8Array }
  @summary Creates a new public/secret keypair from a seed.
  @description
    Returns a object containing a `publicKey` & `secretKey` generated from the supplied seed. Seed can be a `Uint8Array`, a hex string or a string of bytes.
  @example
    import { naclKeypairFromSeed } from '@polkadot/util-crypto';

    naclKeypairFromSeed(...) // => { secretKey: [...], publicKey: [...] }
*/
module.exports = function naclKeypairFromSeed (seed: Uint8Array | string): KeypairType {
  if (isU8a(seed)) {
    // $FlowFixMe type has been determined
    return nacl.sign.keyPair.fromSeed(seed);
  }

  // $FlowFixMe type has been determined
  if (isHex(seed)) {
    return nacl.sign.keyPair.fromSeed(
      // $FlowFixMe type has been determined
      hexToU8a(seed)
    );
  }

  return nacl.sign.keyPair.fromSeed(
    // $FlowFixMe type has been determined
    u8aFromString(seed)
  );
};
