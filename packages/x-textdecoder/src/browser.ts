// Copyright 2017-2021 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TextDecoder as Fallback } from './fallback';

const _global = typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
    ? window
    : typeof this !== 'undefined'
      ? this as unknown as (Window & typeof globalThis)
      : global;

export const TextDecoder = typeof _global.TextDecoder === 'undefined'
  ? Fallback as unknown as typeof _global.TextDecoder
  : _global.TextDecoder;
