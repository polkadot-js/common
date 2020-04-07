// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

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
