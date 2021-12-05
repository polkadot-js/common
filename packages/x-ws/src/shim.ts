// Copyright 2017-2021 @polkadot/x-ws authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { xglobal } from '@polkadot/x-global';
import { WebSocket } from '@polkadot/x-ws';

if (typeof xglobal.WebSocket !== 'function') {
  (xglobal as Record<string, unknown>).WebSocket = WebSocket;
}
