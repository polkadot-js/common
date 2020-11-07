// Copyright 2019-2020 @polkadot/wasm-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

const { assert, stringToU8a, u8aToString } = require('@polkadot/util');

let wasm;
let cachegetInt32 = null;
let cachegetUint8 = null;

async function initWasm (wasmBytes, asmFn, wbg) {
  try {
    assert(typeof WebAssembly !== 'undefined' && wasmBytes && wasmBytes.length, 'WebAssembly is not available in your environment');

    const source = await WebAssembly.instantiate(wasmBytes, { wbg });

    wasm = source.instance.exports;
  } catch (error) {
    // if we have a valid supplied asm.js, return that
    if (asmFn) {
      wasm = asmFn(wbg);
    } else {
      console.error('FATAL: Unable to initialize @polkadot/wasm-crypto');
      console.error(error);

      wasm = null;
    }
  }
}

function withWasm (fn) {
  return (...params) => {
    assert(wasm, 'The WASM interface has not been initialized. Ensure that you wait for the initialization Promise with waitReady() from @polkadot/wasm-crypto (or cryptoWaitReady() from @polkadot/util-crypto) before attempting to use WASM-only interfaces.');

    return fn(wasm, ...params);
  };
}

function getWasm () {
  return wasm;
}

function getInt32 () {
  if (cachegetInt32 === null || cachegetInt32.buffer !== wasm.memory.buffer) {
    cachegetInt32 = new Int32Array(wasm.memory.buffer);
  }

  return cachegetInt32;
}

function getUint8 () {
  if (cachegetUint8 === null || cachegetUint8.buffer !== wasm.memory.buffer) {
    cachegetUint8 = new Uint8Array(wasm.memory.buffer);
  }

  return cachegetUint8;
}

function getU8a (ptr, len) {
  return getUint8().subarray(ptr / 1, ptr / 1 + len);
}

function getString (ptr, len) {
  return u8aToString(getU8a(ptr, len));
}

function allocU8a (arg) {
  const ptr = wasm.__wbindgen_malloc(arg.length * 1);

  getUint8().set(arg, ptr / 1);

  return [ptr, arg.length];
}

function allocString (arg) {
  return allocU8a(stringToU8a(arg));
}

function resultU8a () {
  const r0 = getInt32()[8 / 4 + 0];
  const r1 = getInt32()[8 / 4 + 1];
  const ret = getU8a(r0, r1).slice();

  wasm.__wbindgen_free(r0, r1 * 1);

  return ret;
}

function resultString () {
  return u8aToString(resultU8a());
}

module.exports = {
  allocString,
  allocU8a,
  getInt32,
  getString,
  getU8a,
  getWasm,
  initWasm,
  resultString,
  resultU8a,
  withWasm
};
