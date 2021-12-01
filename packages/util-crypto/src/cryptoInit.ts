// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

// import { xglobal } from '@polkadot/x-global';

import { cryptoWaitReady } from './crypto';

// This would not be a great idea since it would poluse the global namespace
// if (typeof BigInt !== 'function' || typeof BigInt.asIntN !== 'function') {
//   (xglobal as Record<string, unknown>).BigInt = () => Number.NaN;
// }

// start init process immediately
cryptoWaitReady().catch((): void => {
  // shouldn't happen, logged above
});
