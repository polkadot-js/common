// Copyright 2017-2025 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Transport, TransportDef, TransportType } from './types.js';

export function createDefs (...items: readonly [type: TransportType, Clazz: unknown][]): TransportDef[] {
  return items.map(([type, Clazz]): TransportDef => ({
    create: (): Promise<Transport> =>
      (Clazz as Pick<TransportDef, 'create'>).create(),
    type
  }));
}
