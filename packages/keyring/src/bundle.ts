// Copyright 2017-2023 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Keyring } from './keyring.js';

// eslint-disable-next-line deprecation/deprecation
export { decodeAddress, encodeAddress, setSS58Format } from '@polkadot/util-crypto';

export * from './defaults.js';

export { createPair } from './pair/index.js';
export { packageInfo } from './packageInfo.js';
export { createTestKeyring } from './testing.js';
export { createTestPairs } from './testingPairs.js';

export { Keyring };
