// Copyright 2017-2024 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { extractGlobal } from '@polkadot/x-global';

import { TextEncoder as Fallback } from './fallback.js';

export { packageInfo } from './packageInfo.js';

export const TextEncoder = /*#__PURE__*/ extractGlobal('TextEncoder', Fallback);
