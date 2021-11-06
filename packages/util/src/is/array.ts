// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name isArray
 * @summary Tests for a Array instance.
 */
export function isArray <T> (value: unknown): value is Array<T> {
  return Array.isArray(value);
}
