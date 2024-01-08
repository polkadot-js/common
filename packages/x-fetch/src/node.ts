// Copyright 2017-2024 @polkadot/x-fetch authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { extractGlobal } from '@polkadot/x-global';

export { packageInfo } from './packageInfo.js';

// This is an ESM module, use the async import(...) syntax to pull it
// in. Logically we would like it in nodeFetch(...) itself, however
// while it is all-ok on Node itself, it does create issues in Jest,
// possibly due to the Jest 28 need for --experimental-vm-modules
const importFetch = import('node-fetch').catch(() => null);

// keep track of the resolved import value
let modFn: typeof fetch | null = null;

async function nodeFetch (...args: Parameters<typeof fetch>): Promise<Response> {
  if (!modFn) {
    const mod = await importFetch;

    if (!mod?.default) {
      throw new Error('Unable to import node-fetch in this environment');
    }

    modFn = mod.default as unknown as typeof fetch;
  }

  return modFn(...args);
}

export const fetch = /*#__PURE__*/ extractGlobal('fetch', nodeFetch);
