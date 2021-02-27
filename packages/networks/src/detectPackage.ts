// Copyright 2017-2021 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { detectPackage, packageInfo as utilInfo } from '@polkadot/util';
import { packageInfo as fetchInfo } from '@polkadot/x-fetch';

import { packageInfo } from './packageInfo';

detectPackage(packageInfo, typeof __dirname !== 'undefined' && __dirname, [utilInfo, fetchInfo]);
