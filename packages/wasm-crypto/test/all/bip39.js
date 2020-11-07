// Copyright 2019-2020 @polkadot/wasm-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
// @ts-check

/* eslint-disable camelcase */

const { assert, u8aToHex } = require('@polkadot/util');

function bip39_generate (wasm) {
  const res = wasm.bip39Generate(21);

  console.log('\tPHR', res);

  assert(res.split(' ').length === 21, 'ERROR: Invalid bip39 Phase length');
}

function bip39_generate_subsequent (wasm) {
  const val1 = wasm.bip39Generate(24);
  const val2 = wasm.bip39Generate(24);

  console.log('\tVL1', val1);
  console.log('\tVL2', val2);

  assert(val1 !== val2, 'ERROR: Subsequent mnemonics are the same');
}

function bip39_validate (wasm) {
  const res = wasm.bip39Validate(wasm.bip39Generate(12));

  console.log('\tVAL', res);

  assert(res, 'ERROR: Invalid bip39 validation');
}

function bip39_toEntropy (wasm) {
  const res = u8aToHex(wasm.bip39ToEntropy('legal winner thank year wave sausage worth useful legal winner thank yellow'));

  console.log('\tENT', res);

  assert(res === '0x7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f', 'ERROR: Invalid bip39 entropy');
}

function bip39_toMiniSecret (wasm) {
  const res = u8aToHex(wasm.bip39ToMiniSecret('legal winner thank year wave sausage worth useful legal winner thank yellow', 'Substrate'));

  console.log('\tMIN', res);

  assert(res === '0x4313249608fe8ac10fd5886c92c4579007272cb77c21551ee5b8d60b78041685', 'ERROR: Invalid bip39 mini secret');
}

function bip39_toSeed (wasm) {
  const res = u8aToHex(wasm.bip39ToSeed('seed sock milk update focus rotate barely fade car face mechanic mercy', ''));

  console.log('\tSEE', res);

  assert(res === '0x3c121e20de068083b49c2315697fb59a2d9e8643c24e5ea7628132c58969a027', 'ERROR: Invalid bip39 mini secret');
}

module.exports = {
  bip39_generate,
  bip39_generate_subsequent,
  bip39_toEntropy,
  bip39_toMiniSecret,
  bip39_toSeed,
  bip39_validate
};
