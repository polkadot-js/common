// Copyright 2017-2024 @polkadot/x-randomvalues authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { exposeGlobal } from '@polkadot/x-global';
import { crypto } from '@polkadot/x-randomvalues';

exposeGlobal('crypto', crypto);
