// Copyright 2017-2023 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { exposeGlobal } from '@polkadot/x-global';
import { TextEncoder } from '@polkadot/x-textencoder';

exposeGlobal('TextEncoder', TextEncoder);
