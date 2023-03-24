// Copyright 2017-2023 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

export type LedgerTypes = 'hid' | 'u2f' | 'webusb';

// The actual namespaced Transport interface, imported via
//
//   import type Transport from '@ledgerhq/hw-transport';
//
// does not work on moduleResolution: nodenext, so we just go with a
// very light interface for Transport (and then TransportStatic).

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Transport {
  // empty on purpose, just a stub
}

export interface TransportDef {
  /** Create a transport to be used in Ledger operations */
  create (): Promise<Transport>;
  /** The type of the underlying transport definition */
  type: LedgerTypes;
}
