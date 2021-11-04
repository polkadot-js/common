// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { objectSpread } from './spread';

export function objectCopy <T extends object> (source: T): T {
  return objectSpread({}, source);
}
