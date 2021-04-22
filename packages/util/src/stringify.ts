// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isBigInt } from './is/bigInt';

export function stringify (args: unknown, space?: string | number | undefined): string {
  return JSON.stringify(
    args,
    (_, value: unknown) =>
      isBigInt(value)
        ? value.toString()
        : value,
    space
  );
}
