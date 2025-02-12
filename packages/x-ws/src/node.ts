// Copyright 2017-2025 @polkadot/x-ws authors & contributors
// SPDX-License-Identifier: Apache-2.0

import ws from 'ws';

import { extractGlobal } from '@polkadot/x-global';

export { packageInfo } from './packageInfo.js';

/**
 * The built-in `globalThis.WebSocket` in Node.js 22+ does not provide
 * detailed error messages (e.g., `ECONNREFUSED` or `ETIMEDOUT`), making
 * it difficult to implement proper reconnection logic.
 *
 * To avoid these issues, we explicitly use the `ws` library in Node.js 22+
 * while still preserving support for the browser WebSocket API in browser environments.
 */
const isNode22 = typeof process !== 'undefined' && parseInt(process.versions?.node?.split('.')[0] || '0', 10) >= 22;

export const WebSocket = isNode22 ? ws : /*#__PURE__*/ extractGlobal('WebSocket', ws);
