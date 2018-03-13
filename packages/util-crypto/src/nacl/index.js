// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const naclKeypairFromRandom = require('./keypair/fromRandom');
const naclKeypairFromSecret = require('./keypair/fromSecret');
const naclKeypairFromSeed = require('./keypair/fromSeed');
const naclKeypairFromString = require('./keypair/fromString');
const naclSign = require('./sign');
const naclVerify = require('./verify');

/**
  @summary Implements [NaCl](http://nacl.cr.yp.to/) secret-key authenticated encryption, public-key authenticated encryption, hashing, and public-key signatures
*/
module.exports = {
  naclKeypairFromRandom,
  naclKeypairFromSecret,
  naclKeypairFromSeed,
  naclKeypairFromString,
  naclSign,
  naclVerify
};
