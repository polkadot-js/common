// Copyright 2017-2023 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Transport, TransportDef, TransportItem, TransportStatic } from './types.js';

export function createDefs (...items: readonly TransportItem[]): TransportDef[] {
  return items.map(([type, Clazz]): TransportDef => ({
    create: (): Promise<Transport> =>
      (Clazz as TransportStatic).create(),
    type
  }));
}
