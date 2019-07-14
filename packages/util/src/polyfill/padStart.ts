// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

if (!String.prototype.padStart) {
  // eslint-disable-next-line no-extend-native
  String.prototype.padStart = function padStart (length: number, char: string = ' '): string {
    let result = String(this);

    while (result.length < length) {
      result = char + result;
    }

    return result;
  };
}
