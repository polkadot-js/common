// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable no-extend-native */
/* eslint-disable @typescript-eslint/unbound-method */

if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart (length: number, char = ' '): string {
    let result = String(this);

    while (result.length < length) {
      result = char + result;
    }

    return result;
  };
}
