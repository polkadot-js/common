// Copyright 2017-2020 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { detectPackage } from '@polkadot/util';

import packageJson from './package.json';

// eslint-disable-next-line @typescript-eslint/no-var-requires
detectPackage(packageJson, typeof __dirname !== 'undefined' && __dirname);
