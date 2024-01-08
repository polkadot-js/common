// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ToBn } from '../types.js';

import { isOn } from './helpers.js';

export const isToBn = /*#__PURE__*/ isOn<ToBn>('toBn');
