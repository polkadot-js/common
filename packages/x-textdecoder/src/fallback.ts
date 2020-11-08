// Copyright 2017-2020 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

// This is very limited, only handling Ascii values
export default class TextDecoder {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-useless-constructor
  constructor (_: 'utf-8') {
    // nothing
  }

  decode (value: Uint8Array): string {
    return value.reduce((str, code): string => {
      return str + String.fromCharCode(code);
    }, '');
  }
}
