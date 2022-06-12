// Copyright 2017-2022 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as util from 'util';

import { extractGlobal } from '@polkadot/x-global';

export { packageInfo } from './packageInfo';

export const TextDecoder = extractGlobal('TextDecoder', util.TextDecoder);
