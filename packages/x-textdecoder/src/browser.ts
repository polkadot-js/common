// Copyright 2020 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

export default typeof TextDecoder === 'undefined'
  ? class {
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
  : TextDecoder;
