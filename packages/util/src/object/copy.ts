// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { objectSpread } from './spread.js';

/**
 * @name objectCopy
 * @summary Creates a shallow clone of the input object
 */
export function objectCopy <T extends object> (source: T): T {
  return objectSpread({}, source);
}
