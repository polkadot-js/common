// Copyright 2017-2021 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Ss58Registry } from './types';

import fs from 'fs';

import { objectKeys, stringify } from '@polkadot/util';
import { fetch } from '@polkadot/x-fetch';

import { substrateRegistry } from './defaults';
import { allNetworks } from './';

const OUTPUT = './.github/ss58-check.md';

function assertAndLog (check: boolean, error: string): void {
  if (!check) {
    process.env.CI_LOG && fs.appendFileSync(OUTPUT, `

${error}
`);

    throw new Error(error);
  }
}

describe('check latest Substrate ss58 registry', (): void => {
  let original: Ss58Registry;

  beforeAll(async (): Promise<void> => {
    original = (await (await fetch(substrateRegistry)).json()) as Ss58Registry;
  });

  it('has the same number as the original', (): void => {
    assertAndLog(allNetworks.length === original.registry.length, `Number of entries mismatched:: Expected ${original.registry.length} found ${allNetworks.length}`);
  });

  it('has no missing any entries', (): void => {
    const missing = original.registry
      .filter(({ prefix }) => !allNetworks.some((n) => n.prefix === prefix))
      .map(({ displayName, prefix }) => `${displayName} (${prefix})`);

    assertAndLog(!missing.length, `Missing entries found: ${stringify(missing, 2)}`);
  });

  it('has no extra entries', (): void => {
    const missing = allNetworks
      .filter(({ prefix }) => !original.registry.some((n) => n.prefix === prefix))
      .map(({ displayName, prefix }) => `${displayName} (${prefix})`);

    assertAndLog(!missing.length, `Extra entries found: ${stringify(missing, 2)}`);
  });

  it('has the same values as the original', (): void => {
    const fields = objectKeys(original.schema);
    const errors = original.registry
      .map((n): [string, string[]] => {
        const other = allNetworks.find(({ prefix }) => prefix === n.prefix);

        return [
          `${n.displayName} (${n.prefix})`,
          other
            ? fields.filter((f) =>
              ['decimals', 'symbols'].includes(f)
                ? stringify(n[f] || []) !== stringify(other[f] || [])
                : stringify(n[f]) !== stringify(other[f])
            )
            : []
        ];
      })
      .filter(([, fields]) => fields.length);

    assertAndLog(!errors.length, `Mismatches found: ${stringify(errors.map(([n, m]) => `${n}:: ${m.join(', ')}`), 2)}`);
  });
});
