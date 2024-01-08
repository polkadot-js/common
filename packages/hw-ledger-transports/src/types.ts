// Copyright 2017-2024 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

// CJS, so we use import * syntax
import type * as HwTransport from '@ledgerhq/hw-transport';

// u2f is deprecated an therefore not added
export type TransportType = 'hid' | 'webusb';

export type Transport = HwTransport.default;

export interface TransportDef {
  /** Create a transport to be used in Ledger operations */
  create (): Promise<Transport>;
  /** The type of the underlying transport definition */
  type: TransportType;
}
