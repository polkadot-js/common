// Copyright 2017-2023 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { LedgerTypes, Transport, TransportDef } from './types.js';

export function createDefs (...items: readonly [type: LedgerTypes, Clazz: unknown][]): TransportDef[] {
  return items.map(([type, Clazz]): TransportDef => ({
    create: (): Promise<Transport> =>
      (Clazz as Pick<TransportDef, 'create'>).create(),
    type
  }));
}
