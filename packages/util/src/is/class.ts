// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Constructor } from '../types.js';

import { isOnFunction } from './helpers.js';

/**
 * @name isClass
 * Tests if the supplied agrument is a Class
 */
export const isClass: <T extends Constructor> (value?: unknown) => value is T = /*#__PURE__*/ isOnFunction('isPrototypeOf', 'hasOwnProperty');
