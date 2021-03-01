// Copyright 2017-2021 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { packageInfo as transportInfo } from '@polkadot/hw-ledger-transports/packageInfo';
import { detectPackage, packageInfo as utilInfo } from '@polkadot/util';

import { packageInfo } from './packageInfo';

detectPackage(packageInfo, typeof __dirname !== 'undefined' && __dirname, [transportInfo, utilInfo]);
