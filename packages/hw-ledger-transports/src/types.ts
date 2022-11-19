// Copyright 2017-2022 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Transport from '@ledgerhq/hw-transport';

export type LedgerTypes = 'hid' | 'u2f' | 'webusb';

export interface TransportDef {
  /** Create a transport to be used in Ledger operations */
  create (): Promise<Transport>;
  /** The type of the underlying transport definition */
  type: LedgerTypes;
}
