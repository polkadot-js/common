// Copyright 2017-2020 @polkadot/x-randomvalues authors & contributors
// SPDX-License-Identifier: Apache-2.0

export default function getRandomValues <T extends Uint8Array> (arr: T): T {
  return crypto.getRandomValues(arr);
}
