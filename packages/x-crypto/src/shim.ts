// Copyright 2017-2023 @polkadot/x-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { crypto } from '@polkadot/x-crypto';
import { exposeGlobal } from '@polkadot/x-global';

exposeGlobal('crypto', crypto);
