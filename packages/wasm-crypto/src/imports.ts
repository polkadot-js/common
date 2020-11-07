// Copyright 2019-2020 @polkadot/wasm-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable camelcase */

import getRandomValues from '@polkadot/x-randomvalues';

import { getString, getU8a } from './bridge';

const DEFAULT_CRYPTO = { getRandomValues };
const DEFAULT_SELF = { crypto: DEFAULT_CRYPTO };

const heap: Array<unknown> = new Array(32).fill(undefined).concat(undefined, null, true, false);
let heapNext = heap.length;

function getObject (idx: number): unknown {
  return heap[idx];
}

function dropObject (idx: number) {
  if (idx < 36) {
    return;
  }

  heap[idx] = heapNext;
  heapNext = idx;
}

function takeObject (idx: number): unknown {
  const ret = getObject(idx);

  dropObject(idx);

  return ret;
}

function addObject (obj: unknown): number {
  if (heapNext === heap.length) {
    heap.push(heap.length + 1);
  }

  const idx = heapNext;

  heapNext = heap[idx] as number;
  heap[idx] = obj;

  return idx;
}

export function __wbindgen_is_undefined (idx: number): boolean {
  return getObject(idx) === undefined;
}

export function __wbg_self_1b7a39e3a92c949c (): number {
  return addObject(DEFAULT_SELF);
}

export function __wbg_require_604837428532a733 (ptr: number, len: number): never {
  throw new Error(`Unable to require ${getString(ptr, len)}`);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function __wbg_crypto_968f1772287e2df0 (_idx: number): number {
  return addObject(DEFAULT_CRYPTO);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function __wbg_getRandomValues_a3d34b4fee3c2869 (_idx: number): number {
  return addObject(DEFAULT_CRYPTO.getRandomValues);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function __wbg_getRandomValues_f5e14ab7ac8e995d (_arg0: number, ptr: number, len: number): void {
  DEFAULT_CRYPTO.getRandomValues(getU8a(ptr, len));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function __wbg_randomFillSync_d5bd2d655fdf256a (_idx: number, _ptr: number, _len: number): never {
  throw new Error('randomFillsync is not available');

  // getObject(idx).randomFillSync(getU8a(ptr, len));
}

export function __wbindgen_object_drop_ref (idx: number): void {
  takeObject(idx);
}

export function abort (): never {
  throw new Error('abort');
}
