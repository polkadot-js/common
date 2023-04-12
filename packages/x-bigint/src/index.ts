// Copyright 2017-2023 @polkadot/x-bigint authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { extractGlobal } from '@polkadot/x-global';

export { packageInfo } from './packageInfo.js';

// There are _still_ some older environments (specifically RN < 0.70), that does
// not have proper BigInt support - a non-working fallback is provided for those
export const BigInt = /*#__PURE__*/ extractGlobal('BigInt', () => Number.NaN);
