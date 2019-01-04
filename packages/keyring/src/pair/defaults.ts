// Copyright 2017-2019 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

const PKCS8_DIVIDER = new Uint8Array([161, 35, 3, 33, 0]);
const PKCS8_HEADER = new Uint8Array([48, 83, 2, 1, 1, 48, 5, 6, 3, 43, 101, 112, 4, 34, 4, 32]);

export {
  PKCS8_DIVIDER,
  PKCS8_HEADER
};
