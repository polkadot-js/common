// Copyright 2019-2020 @polkadot/wasm-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable camelcase */

const crypto = require('crypto');
const { assert, hexToU8a, stringToU8a, u8aToHex } = require('@polkadot/util');

function extractKeys (pair) {
  return [pair, pair.slice(32), pair.slice(0, 32)];
}

function randomPair (wasm) {
  return extractKeys(wasm.ed25519KeypairFromSeed(crypto.randomBytes(32)));
}

function ed25519_pairFromSeed (wasm) {
  const [pair, pk, sk] = extractKeys(wasm.ed25519KeypairFromSeed(stringToU8a('12345678901234567890123456789012')));

  console.log('\tSEC', u8aToHex(sk));
  console.log('\tPUB', u8aToHex(pk));

  assert(u8aToHex(pair) === '0x31323334353637383930313233343536373839303132333435363738393031322f8c6129d816cf51c374bc7f08c3e63ed156cf78aefb4a6550d97b87997977ee', 'ERROR: pairFromSeed() does not match');
}

function ed25519_signAndVerify (wasm) {
  const [, pk, sk] = randomPair(wasm);
  const signature = wasm.ed25519Sign(pk, sk, stringToU8a('this is a message'));
  const isValid = wasm.ed25519Verify(signature, stringToU8a('this is a message'), pk);

  console.log('\tSIG', u8aToHex(signature));
  console.log('\tRES', isValid);

  assert(isValid, 'ERROR: Unable to verify signature');
}

function ed25519_verifyExisting (wasm) {
  const isValid = wasm.ed25519Verify(hexToU8a('0x90588f3f512496f2dd40571d162e8182860081c74e2085316e7c4396918f07da412ee029978e4dd714057fe973bd9e7d645148bf7b66680d67c93227cde95202'), stringToU8a('this is a message'), hexToU8a('0x2f8c6129d816cf51c374bc7f08c3e63ed156cf78aefb4a6550d97b87997977ee'));

  console.log('\tRES', isValid);

  assert(isValid, 'ERROR: Unable to verify signature');
}

function ed25519_benchmark (wasm) {
  const MESSAGE = stringToU8a('this is a message');

  for (let i = 0; i < 256; i++) {
    const [, pk, sk] = randomPair(wasm);

    assert(wasm.ed25519Verify(wasm.ed25519Sign(pk, sk, MESSAGE), MESSAGE, pk), 'ERROR: Unable to verify signature');
  }
}

module.exports = {
  ed25519_benchmark,
  ed25519_pairFromSeed,
  ed25519_signAndVerify,
  ed25519_verifyExisting
};
