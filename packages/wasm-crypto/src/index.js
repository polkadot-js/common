// Copyright 2019-2020 @polkadot/wasm-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

const { allocString, allocU8a, getWasm, initWasm, resultString, resultU8a, withWasm } = require('./bridge');
const imports = require('./imports');
const asmFallback = require('./wasm/asm-empty');
const wasmBytes = require('./wasm/bytes');

const wasmPromise = initWasm(wasmBytes, asmFallback, imports).catch(() => null);

module.exports.bip39Generate = withWasm((wasm, words) => {
  wasm.ext_bip39_generate(8, words);

  return resultString();
});

module.exports.bip39ToEntropy = withWasm((wasm, phrase) => {
  const [ptr0, len0] = allocString(phrase);

  wasm.ext_bip39_to_entropy(8, ptr0, len0);

  return resultU8a();
});

module.exports.bip39ToMiniSecret = withWasm((wasm, phrase, password) => {
  const [ptr0, len0] = allocString(phrase);
  const [ptr1, len1] = allocString(password);

  wasm.ext_bip39_to_mini_secret(8, ptr0, len0, ptr1, len1);

  return resultU8a();
});

module.exports.bip39ToSeed = withWasm((wasm, phrase, password) => {
  const [ptr0, len0] = allocString(phrase);
  const [ptr1, len1] = allocString(password);

  wasm.ext_bip39_to_seed(8, ptr0, len0, ptr1, len1);

  return resultU8a();
});

module.exports.bip39Validate = withWasm((wasm, phrase) => {
  const [ptr0, len0] = allocString(phrase);
  const ret = wasm.ext_bip39_validate(ptr0, len0);

  return ret !== 0;
});

module.exports.ed25519KeypairFromSeed = withWasm((wasm, seed) => {
  const [ptr0, len0] = allocU8a(seed);

  wasm.ext_ed_from_seed(8, ptr0, len0);

  return resultU8a();
});

module.exports.ed25519Sign = withWasm((wasm, pubkey, seckey, message) => {
  const [ptr0, len0] = allocU8a(pubkey);
  const [ptr1, len1] = allocU8a(seckey);
  const [ptr2, len2] = allocU8a(message);

  wasm.ext_ed_sign(8, ptr0, len0, ptr1, len1, ptr2, len2);

  return resultU8a();
});

module.exports.ed25519Verify = withWasm((wasm, signature, message, pubkey) => {
  const [ptr0, len0] = allocU8a(signature);
  const [ptr1, len1] = allocU8a(message);
  const [ptr2, len2] = allocU8a(pubkey);
  const ret = wasm.ext_ed_verify(ptr0, len0, ptr1, len1, ptr2, len2);

  return ret !== 0;
});

module.exports.blake2b = withWasm((wasm, data, key, size) => {
  const [ptr0, len0] = allocU8a(data);
  const [ptr1, len1] = allocU8a(key);

  wasm.ext_blake2b(8, ptr0, len0, ptr1, len1, size);

  return resultU8a();
});

module.exports.keccak256 = withWasm((wasm, data) => {
  const [ptr0, len0] = allocU8a(data);

  wasm.ext_keccak256(8, ptr0, len0);

  return resultU8a();
});

module.exports.pbkdf2 = withWasm((wasm, data, salt, rounds) => {
  const [ptr0, len0] = allocU8a(data);
  const [ptr1, len1] = allocU8a(salt);

  wasm.ext_pbkdf2(8, ptr0, len0, ptr1, len1, rounds);

  return resultU8a();
});

module.exports.scrypt = withWasm((wasm, password, salt, log2n, r, p) => {
  const [ptr0, len0] = allocU8a(password);
  const [ptr1, len1] = allocU8a(salt);

  wasm.ext_scrypt(8, ptr0, len0, ptr1, len1, log2n, r, p);

  return resultU8a();
});

module.exports.sha512 = withWasm((wasm, data) => {
  const [ptr0, len0] = allocU8a(data);

  wasm.ext_sha512(8, ptr0, len0);

  return resultU8a();
});

module.exports.twox = withWasm((wasm, data, rounds) => {
  const [ptr0, len0] = allocU8a(data);

  wasm.ext_twox(8, ptr0, len0, rounds);

  return resultU8a();
});

module.exports.sr25519DeriveKeypairHard = withWasm((wasm, pair, cc) => {
  const [ptr0, len0] = allocU8a(pair);
  const [ptr1, len1] = allocU8a(cc);

  wasm.ext_sr_derive_keypair_hard(8, ptr0, len0, ptr1, len1);

  return resultU8a();
});

module.exports.sr25519DeriveKeypairSoft = withWasm((wasm, pair, cc) => {
  const [ptr0, len0] = allocU8a(pair);
  const [ptr1, len1] = allocU8a(cc);

  wasm.ext_sr_derive_keypair_soft(8, ptr0, len0, ptr1, len1);

  return resultU8a();
});

module.exports.sr25519DerivePublicSoft = withWasm((wasm, pubkey, cc) => {
  const [ptr0, len0] = allocU8a(pubkey);
  const [ptr1, len1] = allocU8a(cc);

  wasm.ext_sr_derive_public_soft(8, ptr0, len0, ptr1, len1);

  return resultU8a();
});

module.exports.sr25519KeypairFromSeed = withWasm((wasm, seed) => {
  const [ptr0, len0] = allocU8a(seed);

  wasm.ext_sr_from_seed(8, ptr0, len0);

  return resultU8a();
});

module.exports.sr25519Sign = withWasm((wasm, pubkey, secret, message) => {
  const [ptr0, len0] = allocU8a(pubkey);
  const [ptr1, len1] = allocU8a(secret);
  const [ptr2, len2] = allocU8a(message);

  wasm.ext_sr_sign(8, ptr0, len0, ptr1, len1, ptr2, len2);

  return resultU8a();
});

module.exports.sr25519Verify = withWasm((wasm, signature, message, pubkey) => {
  const [ptr0, len0] = allocU8a(signature);
  const [ptr1, len1] = allocU8a(message);
  const [ptr2, len2] = allocU8a(pubkey);
  const ret = wasm.ext_sr_verify(ptr0, len0, ptr1, len1, ptr2, len2);

  return ret !== 0;
});

module.exports.isReady = function () {
  return !!getWasm();
};

module.exports.waitReady = function () {
  return wasmPromise.then(() => !!getWasm());
};
