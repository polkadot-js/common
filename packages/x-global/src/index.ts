// Copyright 2017-2021 @polkadot/x-global authors & contributors
// SPDX-License-Identifier: Apache-2.0

export { packageInfo } from './packageInfo';

type GlobalThis = typeof globalThis;

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
