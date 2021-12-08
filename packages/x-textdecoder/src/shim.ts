// Copyright 2017-2021 @polkadot/x-textdecoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { exposeGlobal } from '@polkadot/x-global';
import { TextDecoder } from '@polkadot/x-textdecoder';

exposeGlobal('TextDecoder', TextDecoder);
