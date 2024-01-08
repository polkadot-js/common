// Copyright 2017-2024 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

// all external
// eslint-disable-next-line deprecation/deprecation
export { decodeAddress, encodeAddress, setSS58Format } from '@polkadot/util-crypto';

// all named
export { Keyring } from './keyring.js';
export { packageInfo } from './packageInfo.js';
export { createPair } from './pair/index.js';
export { createTestKeyring } from './testing.js';
export { createTestPairs } from './testingPairs.js';

// all starred
export * from './defaults.js';
