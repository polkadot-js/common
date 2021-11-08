// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

type Values<T extends object> = T[keyof T][];

/**
 * @name objectValues
 * @summary A version of Object.values that is typed for TS
 */
export function objectValues<T extends object> (obj: T): Values<T> {
  return Object.values(obj) as Values<T>;
}
