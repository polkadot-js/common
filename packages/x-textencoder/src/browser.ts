// Copyright 2017-2021 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TextEncoder as Fallback } from './fallback';

const _global =
  typeof self !== 'undefined'
    ? self
    : typeof window !== 'undefined'
      ? window
      : this as unknown as (Window & typeof globalThis);

export const TextEncoder = typeof _global.TextEncoder === 'undefined'
  ? Fallback as unknown as typeof _global.TextEncoder
  : _global.TextEncoder;
