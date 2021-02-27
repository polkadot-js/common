// Copyright 2017-2021 @polkadot/x-ws authors & contributors
// SPDX-License-Identifier: Apache-2.0

import ws from 'websocket';

import { xglobal } from '@polkadot/x-global';

export { packageInfo } from './packageInfo';

export const WebSocket = (
  typeof xglobal.WebSocket === 'undefined'
    ? ws.w3cwebsocket as unknown as typeof xglobal.WebSocket
    : xglobal.WebSocket
);
