// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ToBn } from '../types';

import { isOn } from './helpers';

export const isToBn = isOn<ToBn>('toBn');
