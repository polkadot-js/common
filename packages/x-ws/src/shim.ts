// Copyright 2017-2021 @polkadot/x-ws authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { exposeGlobal } from '@polkadot/x-global';
import { WebSocket } from '@polkadot/x-ws';

exposeGlobal('WebSocket', WebSocket);
