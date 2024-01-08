// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Class } from '../types.js';

import { isOnFunction } from './helpers.js';

/**
 * @name isClass
 * Tests if the supplied argument is a Class
 */
export const isClass: <T extends Class> (value?: unknown) => value is T = /*#__PURE__*/ isOnFunction('isPrototypeOf', 'hasOwnProperty');
