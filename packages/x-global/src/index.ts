// Copyright 2017-2021 @polkadot/x-global authors & contributors
// SPDX-License-Identifier: Apache-2.0

export { packageInfo } from './packageInfo';

type GlobalThis = typeof globalThis;

type GlobalNames = keyof typeof window;

type GlobalType<T extends keyof typeof window> = typeof window[T];

function evaluateThis (fn: (code: string) => unknown): GlobalThis {
  return fn('return this') as GlobalThis;
}

export const xglobal = (
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof global !== 'undefined'
      ? global
      : typeof self !== 'undefined'
        ? self
        : typeof window !== 'undefined'
          ? window
          : evaluateThis(Function)
);

export function extractGlobal <N extends GlobalNames, T extends GlobalType<N>> (name: N, fallback: unknown): T {
  return typeof xglobal[name as 'undefined'] === 'undefined'
    ? fallback as T
    : xglobal[name as 'undefined'] as unknown as T;
}

export function exposeGlobal <N extends GlobalNames> (name: N, fallback: unknown): void {
  if (typeof xglobal[name as 'undefined'] === 'undefined') {
    xglobal[name as 'undefined'] = fallback as undefined;
  }
}
