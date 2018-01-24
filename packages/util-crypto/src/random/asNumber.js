// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const hexToBn = require('@polkadot/util/hex/toBn');
const BN = require('bn.js');

const randomAsHex = require('./asHex');

const BN_53 = new BN(0b11111111111111111111111111111111111111111111111111111);

module.exports = function randomAsNumber (): number {
  return hexToBn(
    randomAsHex()
  ).and(BN_53).toNumber();
};
