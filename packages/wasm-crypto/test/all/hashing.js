// Copyright 2019-2020 @polkadot/wasm-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable camelcase */

const { assert, stringToU8a, u8aToHex } = require('@polkadot/util');

function blake2bHash (wasm) {
  const hash = u8aToHex(wasm.blake2b(stringToU8a('abc'), new Uint8Array(), 64));

  console.log('\tRES', hash);

  assert(hash === '0xba80a53f981c4d0d6a2797b69f12f6e94c212f14685ac4b74b12bb6fdbffa2d17d87c5392aab792dc252d5de4533cc9518d38aa8dbf1925ab92386edd4009923', 'ERROR: blake2bHash does not match');
}

function keccak256 (wasm) {
  const hash = u8aToHex(wasm.keccak256(stringToU8a('test value')));

  console.log('\tRES', hash);

  assert(hash === '0x2d07364b5c231c56ce63d49430e085ea3033c750688ba532b24029124c26ca5e', 'ERROR: keccak256 does not match');
}

function pbkdf2Hash (wasm) {
  const hash = u8aToHex(wasm.pbkdf2(stringToU8a('hello world'), stringToU8a('this is a salt'), 2048));

  console.log('\tRES', hash);

  assert(hash === '0x5fcbe04f05300a3ecc5c35d18ea0b78f3f6853d2ae5f3fca374f69a7d1f78b5def5c60dae1a568026c7492511e0c53521e8bb6e03a650e1263265fee92722270', 'ERROR: pbkdf2Hash does not match');
}

// function secp256k1Recover (wasm) {
//   const pk = u8aToHex(wasm.keccak256(wasm.secp256k1Recover(
//     hexToU8a('0x2bbfa926ee947dfac384d981f8913b4e0992e52d7b6711e0ec3d9f8b0f752648'),
//     hexToU8a('0x7505f2880114da51b3f5d535f8687953c0ab9af4ab81e592eaebebf53b728d2b6dfd9b5bcd70fee412b1f31360e7c2774009305cb84fc50c1d0ff8034dfa5fff1c')
//   )));

//   console.log('\tPUB', pk);

//   assert(pk === '0x91d366769d44a7c7690428bfdf67ec7eae23d2459694685257b6fc59d1baa1fe', 'ERROR: secp256k1Recover does not match');
// }

function scryptHash (wasm) {
  const hash = u8aToHex(wasm.scrypt(stringToU8a('password'), stringToU8a('salt'), 14, 8, 1));

  console.log('\tRES', hash);

  assert(hash === '0x745731af4484f323968969eda289aeee005b5903ac561e64a5aca121797bf7734ef9fd58422e2e22183bcacba9ec87ba0c83b7a2e788f03ce0da06463433cda6', 'ERROR: scryptHash does not match');
}

function sha512Hash (wasm) {
  const hash = u8aToHex(wasm.sha512(stringToU8a('hello world')));

  console.log('\tRES', hash);

  assert(hash === '0x309ecc489c12d6eb4cc40f50c902f2b4d0ed77ee511a7c7a9bcd3ca86d4cd86f989dd35bc5ff499670da34255b45b0cfd830e81f605dcf7dc5542e93ae9cd76f', 'ERROR: sha512Hash does not match');
}

function twoxHash (wasm) {
  const hash64 = u8aToHex(wasm.twox(stringToU8a('abc'), 1));
  const hash256 = u8aToHex(wasm.twox(stringToU8a('abc'), 4));

  console.log('\t64 ', hash64);
  console.log('\t256', hash256);

  assert(hash64 === '0x990977adf52cbc44' && hash256 === '0x990977adf52cbc440889329981caa9bef7da5770b2b8a05303b75d95360dd62b', 'ERROR: twoxHash does not match');
}

module.exports = {
  blake2bHash,
  keccak256,
  pbkdf2Hash,
  scryptHash,
  // secp256k1Recover,
  sha512Hash,
  twoxHash
};
