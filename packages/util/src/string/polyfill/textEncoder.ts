// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// tslint:disable-next-line
if (typeof TextEncoder === 'undefined') {
  try {
    // @ts-ignore For the Node.js case
    global.TextEncoder = require('util').TextEncoder;
  } catch (error) {
    // @ts-ignore For the old browser case
    global.TextEncoder = {
      // Very naive ascii-only encoder
      encode: (str: string) => {
        const u8a = new Uint8Array(str.length);

        for (let i = 0; i < str.length; i++) {
          u8a[i] = str.charCodeAt(i);
        }

        return u8a;
      }
    };
  }
}
