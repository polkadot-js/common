// Copyright 2017-2023 @polkadot/x-ws authors & contributors
// SPDX-License-Identifier: Apache-2.0

import ws from 'ws';

import { extractGlobal } from '@polkadot/x-global';

export { packageInfo } from './packageInfo';

export const WebSocket = extractGlobal('WebSocket', ws);
