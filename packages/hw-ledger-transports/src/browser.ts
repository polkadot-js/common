// Copyright 2017-2023 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Transport, TransportDef } from './types.js';

import LedgerWebHid from '@ledgerhq/hw-transport-webhid';
import LedgerWebUsb from '@ledgerhq/hw-transport-webusb';

export { packageInfo } from './packageInfo.js';

// See usage of Transport interface in types.ts
export const transports: TransportDef[] = [
  {
    create: (): Promise<Transport> =>
      (LedgerWebUsb as unknown as Transport).create(),
    type: 'webusb'
  },
  {
    create: (): Promise<Transport> =>
      (LedgerWebHid as unknown as Transport).create(),
    type: 'hid'
  }
];
