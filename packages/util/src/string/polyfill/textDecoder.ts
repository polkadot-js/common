// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// tslint:disable-next-line
if (typeof TextDecoder === 'undefined') {
  try {
    // @ts-ignore For the Node.js case
    global.TextDecoder = require('util').TextDecoder;
  } catch (error) {
    // @ts-ignore For the old browser case
    global.TextDecoder = {
      // Very naive ascii-only decoder
      decode: (u8a: Uint8Array) => {
        return u8a.reduce((str, code) => {
          return str + String.fromCharCode(code);
        }, '');
      }
    };
  }
}
