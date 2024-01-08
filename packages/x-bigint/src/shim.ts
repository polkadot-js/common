// Copyright 2017-2024 @polkadot/x-bigint authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BigInt } from '@polkadot/x-bigint';
import { exposeGlobal } from '@polkadot/x-global';

exposeGlobal('BigInt', BigInt);
