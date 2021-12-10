// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isOnObject } from './helpers';

export const isPromise = isOnObject<Promise<unknown>>('catch', 'then');
