// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { packageInfo as netInfo } from '@polkadot/networks/packageInfo';
import { detectPackage, packageInfo as utilInfo } from '@polkadot/util';
import { packageInfo as randomInfo } from '@polkadot/x-randomvalues';

import { packageInfo } from './packageInfo';

detectPackage(packageInfo, typeof __dirname !== 'undefined' && __dirname, [netInfo, utilInfo, randomInfo]);
