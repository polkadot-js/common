// Copyright 2017-2021 @polkadot/x-ws authors & contributors
// SPDX-License-Identifier: Apache-2.0

const _global = typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
    ? window
    : typeof this !== 'undefined'
      ? this as unknown as (Window & typeof globalThis)
      : global;

export const WebSocket = _global.WebSocket;
