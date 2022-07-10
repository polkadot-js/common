// Copyright 2017-2022 @polkadot/x-fetch authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { extractGlobal } from '@polkadot/x-global';

export { packageInfo } from './packageInfo';

const importFetch = import('node-fetch').catch(() => null);
let resolvedFetch: typeof fetch | null = null;

async function nodeFetch (...args: Parameters<typeof fetch>): Promise<Response> {
  if (resolvedFetch) {
    return resolvedFetch(...args);
  }

  const mod = await importFetch;

  if (!mod || !mod.default) {
    throw new Error('Unable to resolve node-fetch');
  }

  resolvedFetch = mod.default as unknown as typeof fetch;

  return resolvedFetch(...args);
}

export const fetch = extractGlobal('fetch', nodeFetch);
