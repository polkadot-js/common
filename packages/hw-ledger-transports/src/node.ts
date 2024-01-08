// Copyright 2017-2024 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

import LedgerHid from '@ledgerhq/hw-transport-node-hid-singleton';

import { createDefs } from './util.js';

export { packageInfo } from './packageInfo.js';

export const transports = /*#__PURE__*/ createDefs(['hid', LedgerHid]);
