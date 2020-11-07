// Copyright 2019-2020 @polkadot/wasm-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { AsmCreator, WasmCryptoInstance } from './wasm/types';

import { assert, stringToU8a, u8aToString } from '@polkadot/util';

let wasm: WasmCryptoInstance | null = null;
let cachegetInt32: Int32Array | null = null;
let cachegetUint8: Uint8Array | null = null;

export async function initWasm (wasmBytes: Uint8Array | null, asmFn: AsmCreator | null, wbg: Record<string, WebAssembly.ImportValue>): Promise<void> {
  try {
    assert(typeof WebAssembly !== 'undefined' && wasmBytes && wasmBytes.length, 'WebAssembly is not available in your environment');

    const source = await WebAssembly.instantiate(wasmBytes, { wbg });

    wasm = source.instance.exports as unknown as WasmCryptoInstance;
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

export function withWasm <T> (fn: (wasm: WasmCryptoInstance, ...params: unknown[]) => T): (...params: unknown[]) => T {
  return (...params: unknown[]): T => {
    assert(wasm, 'The WASM interface has not been initialized. Ensure that you wait for the initialization Promise with waitReady() from @polkadot/wasm-crypto (or cryptoWaitReady() from @polkadot/util-crypto) before attempting to use WASM-only interfaces.');

    return fn(wasm, ...params);
  };
}

export function getWasm (): WasmCryptoInstance {
  return wasm!;
}

export function getInt32 (): Int32Array {
  if (cachegetInt32 === null || cachegetInt32.buffer !== wasm!.memory.buffer) {
    cachegetInt32 = new Int32Array(wasm!.memory.buffer);
  }

  return cachegetInt32;
}

export function getUint8 (): Uint8Array {
  if (cachegetUint8 === null || cachegetUint8.buffer !== wasm!.memory.buffer) {
    cachegetUint8 = new Uint8Array(wasm!.memory.buffer);
  }

  return cachegetUint8;
}

export function getU8a (ptr: number, len: number): Uint8Array {
  return getUint8().subarray(ptr / 1, ptr / 1 + len);
}

export function getString (ptr: number, len: number): string {
  return u8aToString(getU8a(ptr, len));
}

export function allocU8a (arg: Uint8Array): [number, number] {
  const ptr = wasm!.__wbindgen_malloc(arg.length * 1);

  getUint8().set(arg, ptr / 1);

  return [ptr, arg.length];
}

export function allocString (arg: string): [number, number] {
  return allocU8a(stringToU8a(arg));
}

export function resultU8a (): Uint8Array {
  const r0 = getInt32()[8 / 4 + 0];
  const r1 = getInt32()[8 / 4 + 1];
  const ret = getU8a(r0, r1).slice();

  wasm!.__wbindgen_free(r0, r1 * 1);

  return ret;
}

export function resultString (): string {
  return u8aToString(resultU8a());
}
