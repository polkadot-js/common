// Copyright 2017-2021 @polkadot/x-bigint authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BigInt } from '@polkadot/x-bigint';
import { xglobal } from '@polkadot/x-global';

if (typeof xglobal.BigInt !== 'function') {
  (xglobal as Record<string, unknown>).BigInt = BigInt;
}
