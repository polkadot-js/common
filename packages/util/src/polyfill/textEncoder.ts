// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

if (typeof TextEncoder === 'undefined') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).TextEncoder = require('util').TextEncoder;
  } catch (error) {
    // noop
  }
}
