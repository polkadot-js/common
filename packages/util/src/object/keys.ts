// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name objectKeys
 * @summary A version of Object.keys that is typed for TS
 */
export function objectKeys<T extends object, K extends Extract<keyof T, string>> (value: T): K[] {
  return Object.keys(value) as K[];
}
