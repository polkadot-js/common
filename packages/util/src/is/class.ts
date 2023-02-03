// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Constructor } from '../types';

import { isFunction } from './function';

/**
 * @name isClass
 * Tests if the supplied agrument is a Class
 */
export function isClass <T extends Constructor> (Clazz?: unknown): Clazz is T {
  return isFunction(Clazz) && isFunction(Clazz.isPrototypeOf) && isFunction(Clazz.hasOwnProperty);
}
