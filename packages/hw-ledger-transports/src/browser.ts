// Copyright 2017-2021 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type Transport from '@ledgerhq/hw-transport';
import type { TransportDef } from './types';

import LedgerWebHid from '@ledgerhq/hw-transport-webhid';
import LedgerWebUsb from '@ledgerhq/hw-transport-webusb';

export { packageInfo } from './packageInfo';

export const transports: TransportDef[] = [
  // deprecated
  // import LedgerU2F from '@ledgerhq/hw-transport-u2f';
  // {
  //   create: (): Promise<Transport> =>
  //     LedgerU2F.create(),
  //   type: 'u2f'
  // },
  {
    create: (): Promise<Transport> =>
      LedgerWebUsb.create(),
    type: 'webusb'
  },
  {
    create: (): Promise<Transport> =>
      LedgerWebHid.create(),
    type: 'hid'
  }
];
