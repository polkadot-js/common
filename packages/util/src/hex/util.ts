// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

export function reverseHex (value: string): string {
  return (value.match(/.{1,2}/g) || [])
    .reverse()
    .join('');
}
