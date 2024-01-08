// Copyright 2017-2024 @polkadot/x-randomvalues authors & contributors
// SPDX-License-Identifier: Apache-2.0

// Needs Node 15+ for webcrypto
import nodeCrypto from 'node:crypto';

import { extractGlobal } from '@polkadot/x-global';

export { packageInfo } from './packageInfo.js';

export const crypto = /*#__PURE__*/ extractGlobal('crypto', nodeCrypto.webcrypto);

// getRandomValues needs to be called on the crypto object,
// hence the need for the wrapper function
export function getRandomValues <T extends Uint8Array> (output: T): T {
  return crypto.getRandomValues(output);
}
