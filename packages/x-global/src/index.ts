// Copyright 2017-2022 @polkadot/x-global authors & contributors
// SPDX-License-Identifier: Apache-2.0

export { packageInfo } from './packageInfo';

// Ensure that we are able to run this without any @types/node definitions
// and without having lib: ['dom'] in our TypeScript configuration
// (may not be available in all environments, e.g. Deno springs to mind)
declare const global: typeof globalThis;
declare const self: typeof globalThis;

type GlobalThis = typeof globalThis;

type GlobalNames = keyof GlobalThis;

type GlobalType<T extends GlobalNames> = typeof globalThis[T];

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
  // Not quite sure why this is here - snuck in with TS 4.7.2 with no real idea
  // (as of now) as to why this looks like an "any" when we do cast it to a T
  //
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return typeof xglobal[name as 'undefined'] === 'undefined'
    ? fallback as T
    : xglobal[name as 'undefined'] as unknown as T;
}

export function exposeGlobal <N extends GlobalNames> (name: N, fallback: unknown): void {
  if (typeof xglobal[name as 'undefined'] === 'undefined') {
    xglobal[name as 'undefined'] = fallback as undefined;
  }
}
