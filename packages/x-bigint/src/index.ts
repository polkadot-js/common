// Copyright 2017-2023 @polkadot/x-bigint authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { xglobal } from '@polkadot/x-global';

export { packageInfo } from './packageInfo.js';

export const BigInt: BigIntConstructor = typeof xglobal.BigInt === 'function' && typeof xglobal.BigInt.asIntN === 'function'
  ? xglobal.BigInt
  : (() => Number.NaN) as unknown as BigIntConstructor;
