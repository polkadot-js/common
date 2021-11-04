// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

export function objectClear <T> (value: Record<string, T>): Record<string, T> {
  const keys = Object.keys(value);

  for (let i = 0; i < keys.length; i++) {
    delete value[keys[i]];
  }

  return value;
}
