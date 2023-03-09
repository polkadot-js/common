// Copyright 2017-2023 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

export type LedgerTypes = 'hid' | 'u2f' | 'webusb';

// The actual namespaced Transport interface (as detailed on the next line)
//
//   import type Transport from '@ledgerhq/hw-transport';
//
// does not quite work on moduleResolution: nodenext, so we just go with a
// very light interface here
export interface Transport {
  create (): Promise<Transport>;
}

export interface TransportDef {
  /** Create a transport to be used in Ledger operations */
  create (): Promise<Transport>;
  /** The type of the underlying transport definition */
  type: LedgerTypes;
}
