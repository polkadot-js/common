// Copyright 2017-2020 @polkadot/x-fetch authors & contributors
// SPDX-License-Identifier: Apache-2.0

import nodeFetch from 'node-fetch';

export const fetch = typeof global.fetch === 'undefined'
  ? nodeFetch as unknown as typeof global.fetch
  : global.fetch;
