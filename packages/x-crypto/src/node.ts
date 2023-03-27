// Copyright 2017-2023 @polkadot/x-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

// This assumes Node 15+
import nodeCrypto from 'node:crypto';

import { extractGlobal } from '@polkadot/x-global';

export { packageInfo } from './packageInfo.js';

export const crypto = /*#__PURE__*/ extractGlobal('crypto', nodeCrypto.webcrypto);
