// Copyright 2017-2023 @polkadot/x-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { extractGlobal } from '@polkadot/x-global';

export { packageInfo } from './packageInfo.js';

export const crypto = /*#__PURE__*/ extractGlobal('crypto', {});
