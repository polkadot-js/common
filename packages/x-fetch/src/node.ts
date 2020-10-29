// Copyright 2017-2020 @polkadot/x-fetch authors & contributors
// SPDX-License-Identifier: Apache-2.0

import nodeFetch from 'node-fetch';

export default typeof fetch === 'undefined'
  ? nodeFetch as unknown as typeof fetch
  : fetch;
