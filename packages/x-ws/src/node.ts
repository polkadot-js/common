// Copyright 2017-2020 @polkadot/x-ws authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { w3cwebsocket } from 'websocket';

export const WebSocket = typeof global.WebSocket === 'undefined'
  ? w3cwebsocket as unknown as typeof global.WebSocket
  : global.WebSocket;
