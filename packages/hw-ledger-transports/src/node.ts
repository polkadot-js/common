// Copyright 2017-2023 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Transport, TransportDef } from './types.js';

import LedgerHid from '@ledgerhq/hw-transport-node-hid-singleton';

export { packageInfo } from './packageInfo.js';

// See usage of Transport interface in types.ts
export const transports: TransportDef[] = [
  {
    create: (): Promise<Transport> =>
      (LedgerHid as unknown as Transport).create(),
    type: 'hid'
  }
];
