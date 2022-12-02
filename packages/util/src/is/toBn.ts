// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ToBn } from '../types';

import { isOn } from './helpers';

export const isToBn = /*#__PURE__*/ isOn<ToBn>('toBn');
