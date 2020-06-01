// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

if (typeof TextDecoder === 'undefined') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-var-requires
    const { TextDecoder: UTD } = require('util') as { TextDecoder: { new(): TextDecoder } };

    global.TextDecoder = UTD;
  } catch (error) {
    // noop
  }
}
