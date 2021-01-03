// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

export function base64Pad (value: string): string {
  return value.padEnd(value.length + (value.length % 4), '=');
}
