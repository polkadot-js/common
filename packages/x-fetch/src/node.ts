// Copyright 2017-2021 @polkadot/x-fetch authors & contributors
// SPDX-License-Identifier: Apache-2.0

import nodeFetch from 'node-fetch';

import { extractGlobal } from '@polkadot/x-global';

export { packageInfo } from './packageInfo';

export const fetch = extractGlobal('fetch', nodeFetch);
