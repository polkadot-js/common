// Copyright 2017-2021 @polkadot/x-fetch authors & contributors
// SPDX-License-Identifier: Apache-2.0

export { packageInfo } from './packageInfo';

export const xglobal = (
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof global !== 'undefined'
      ? global
      : typeof self !== 'undefined'
        ? self
        : typeof window !== 'undefined'
          ? window
          : this as unknown as (Window & typeof globalThis)
);
