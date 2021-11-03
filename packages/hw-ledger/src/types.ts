// Copyright 2017-2021 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

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
  signature: HexString;
}

export interface LedgerVersion {
  isLocked: boolean;
  isTestMode: boolean;
  version: [number, number, number];
}
