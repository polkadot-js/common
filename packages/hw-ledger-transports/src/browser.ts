// Copyright 2017-2025 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

import LedgerHid from '@ledgerhq/hw-transport-webhid';
import LedgerUsb from '@ledgerhq/hw-transport-webusb';

import { createDefs } from './util.js';

export { packageInfo } from './packageInfo.js';

export const transports = /*#__PURE__*/ createDefs(['webusb', LedgerUsb], ['hid', LedgerHid]);
