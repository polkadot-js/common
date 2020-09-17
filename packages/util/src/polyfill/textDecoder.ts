// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

if (typeof TextDecoder === 'undefined') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-var-requires
    const { TextDecoder: UTD } = require('util') as { TextDecoder: { new(): TextDecoder } };

    global.TextDecoder = UTD;
  } catch (error) {
    // noop
  }
}
