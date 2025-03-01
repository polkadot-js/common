// Copyright 2017-2025 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isOnObject } from './helpers.js';

export const isPromise = /*#__PURE__*/ isOnObject<Promise<unknown>>('catch', 'then');
