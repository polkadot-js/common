// Copyright 2017-2021 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { extractGlobal } from '@polkadot/x-global';

import { TextEncoder as Fallback } from './fallback';

export { packageInfo } from './packageInfo';

export const TextEncoder = extractGlobal('TextEncoder', Fallback);
