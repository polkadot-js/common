// Copyright 2017-2021 @polkadot/x-fetch authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { fetch } from '@polkadot/x-fetch';
import { xglobal } from '@polkadot/x-global';

if (typeof xglobal.fetch !== 'function') {
  (xglobal as Record<string, unknown>).fetch = fetch;
}
