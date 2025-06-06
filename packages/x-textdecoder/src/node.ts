// Copyright 2017-2025 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import util from 'node:util';

import { extractGlobal } from '@polkadot/x-global';

export { packageInfo } from './packageInfo.js';

export const TextDecoder = /*#__PURE__*/ extractGlobal('TextDecoder', util.TextDecoder);
