/* eslint-disable @typescript-eslint/no-explicit-any */
// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

if (typeof TextDecoder === 'undefined') {
  try {
    (global as any).TextDecoder = require('util').TextDecoder;
  } catch (error) {
    // noop
  }
}
