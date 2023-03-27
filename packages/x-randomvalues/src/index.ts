// Copyright 2017-2023 @polkadot/x-randomvalues authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { crypto as xcrypto } from '@polkadot/x-crypto';

export { packageInfo } from './packageInfo.js';

export function getRandomValues <T extends Uint8Array> (arr: T): T {
  // We use xcrypto here - this prevents packagers such as rollup
  // confusing this with the "normal" Node.js import and stubbing it
  // (and also aligns with eg. x-fetch, where x-global is used)
  return xcrypto.getRandomValues(arr);
}
