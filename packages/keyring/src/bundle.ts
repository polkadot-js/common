// Copyright 2017-2021 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Keyring } from './keyring';

export { decodeAddress, encodeAddress, setSS58Format } from '@polkadot/util-crypto';

export * from './defaults';
export { createPair } from './pair';
export { packageInfo } from './packageInfo';
export { createTestKeyring } from './testing';
export { createTestPairs } from './testingPairs';

export { Keyring };
