// Copyright 2017-2021 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { xglobal } from '@polkadot/x-global';
import { TextEncoder } from '@polkadot/x-textencoder';

if (typeof xglobal.TextEncoder !== 'function') {
  (xglobal as Record<string, unknown>).TextEncoder = TextEncoder;
}
