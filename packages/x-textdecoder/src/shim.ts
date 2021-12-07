// Copyright 2017-2021 @polkadot/x-textdecoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { xglobal } from '@polkadot/x-global';
import { TextDecoder } from '@polkadot/x-textdecoder';

if (typeof xglobal.TextDecoder !== 'function') {
  (xglobal as Record<string, unknown>).TextDecoder = TextDecoder;
}
