// Copyright 2017-2021 @polkadot/x-ws authors & contributors
// SPDX-License-Identifier: Apache-2.0

import ws from 'websocket';

export const WebSocket = typeof global.WebSocket === 'undefined'
  ? ws.w3cwebsocket as unknown as typeof global.WebSocket
  : global.WebSocket;
