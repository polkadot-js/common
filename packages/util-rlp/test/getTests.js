// Copyright 2017-2018 @polkadot/util-rlp authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const BN = require('bn.js');
const { getSingleFile } = require('ethereumjs-testing');

const bnToU8a = require('@polkadot/util/bn/toU8a');

module.exports = function getTests (file) {
  const tests = getSingleFile(file);

  return Object.keys(tests).map((name) => ({
    name,
    input: tests[name].in[0] !== '#'
      ? tests[name].in
      : bnToU8a(new BN(tests[name].in.slice(1))),
    output: `0x${tests[name].out.toLowerCase()}`
  }));
};
