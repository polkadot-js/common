// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import isUndefined from '../is/undefined';

export default function u8aSorted (u8as: Uint8Array[]): Uint8Array[] {
  return u8as.sort((a, b): number => {
    let i = 0;

    while (true) {
      if (isUndefined(a[i]) && isUndefined(b[i])) {
        return 0;
      } else if (isUndefined(a[i])) {
        return -1;
      } else if (isUndefined(b[i])) {
        return 1;
      }

      const cmp = a[i] - b[i];

      if (cmp !== 0) {
        return cmp;
      }

      i++;
    }
  });
}
