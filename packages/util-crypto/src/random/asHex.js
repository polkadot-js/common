// Copyright 2017-2018 @polkadot/util-crypto authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const u8aToHex = require('@polkadot/util/u8a/toHex');

const randomAsU8a = require('./asU8a');

/**
  @name randomAsHex
  @signature randomAsHex (length?: number = 32): string
  @summary Creates a hex string filled with random bytes.
  @description
    Returns a hex string with the specified (optional) length filled with random bytes.
  @example
    import { randomAsHex } from '@polkadot/util-crypto';

    randomAsHex() // => 0x...
*/
module.exports = function randomAsHex (length?: number = 32): string {
  return u8aToHex(
    randomAsU8a(length)
  );
};
