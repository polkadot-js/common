// Copyright 2020 @polkadot/x-ws authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { w3cwebsocket } from 'websocket';

export default typeof WebSocket === 'undefined'
  ? w3cwebsocket as unknown as typeof WebSocket
  : WebSocket;
