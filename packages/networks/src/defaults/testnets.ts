// Copyright 2017-2022 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KnownTestnet } from '../types';

// testnets should not allow selection
export const knownTestnet: KnownTestnet = {
  '': true, // this is the default non-network entry
  'cess-testnet': true,
  'dock-testnet': true,
  jupiter: true,
  'mathchain-testnet': true,
  subspace_testnet: true,
  'zero-alphaville': true
};
