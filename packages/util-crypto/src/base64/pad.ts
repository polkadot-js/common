// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

export default function base64Trim (value: string): string {
  return value.padEnd(value.length + (value.length % 4), '=');
}
