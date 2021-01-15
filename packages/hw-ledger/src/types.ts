// Copyright 2017-2021 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

export type LedgerTypes = 'hid' | 'u2f' | 'webusb';

export interface AccountOptions {
  account: number;
  addressIndex: number;
  change: number;
}

export interface LedgerAddress {
  address: string;
  publicKey: string;
}

export interface LedgerSignature {
  signature: string;
}

export interface LedgerVersion {
  isLocked: boolean;
  isTestMode: boolean;
  version: [number, number, number];
}
