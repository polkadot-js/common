// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ToBigInt } from '../types';

import { isOn } from './helpers';

export const isToBigInt = isOn<ToBigInt>('toBigInt');
