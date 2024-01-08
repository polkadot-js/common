// Copyright 2017-2024 @polkadot/x-randomvalues authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { xglobal } from '@polkadot/x-global';

export { packageInfo } from './packageInfo.js';

export const crypto = xglobal.crypto;

// getRandomValues needs to be called on the crypto object,
// hence the need for the wrapper function
export function getRandomValues <T extends Uint8Array> (arr: T): T {
  return crypto.getRandomValues(arr);
}
