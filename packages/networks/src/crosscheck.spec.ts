// Copyright 2017-2020 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Ss58Registry } from './types';

import fs from 'fs';
import fetch from '@polkadot/x-fetch';

import { all } from './';

const ORIGINAL = 'https://raw.githubusercontent.com/paritytech/substrate/master/ss58-registry.json';
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
    original = (await (await fetch(ORIGINAL)).json()) as Ss58Registry;
  });

  it('has the same number as the original', (): void => {
    assertAndLog(all.length === original.registry.length, `Number of entries mismatched:: Expected ${original.registry.length} found ${all.length}`);
  });

  it('has no missing any entries', (): void => {
    const missing = original.registry
      .filter(({ prefix }) => !all.some((n) => n.prefix === prefix))
      .map(({ displayName, prefix }) => `${displayName} (${prefix})`);

    assertAndLog(!missing.length, `Missing entries found: ${JSON.stringify(missing, null, 2)}`);
  });

  it('has no extra entries', (): void => {
    const missing = all
      .filter(({ prefix }) => !original.registry.some((n) => n.prefix === prefix))
      .map(({ displayName, prefix }) => `${displayName} (${prefix})`);

    assertAndLog(!missing.length, `Extra entries found: ${JSON.stringify(missing, null, 2)}`);
  });

  it('has the same values as the original', (): void => {
    const fields = Object.keys(original.schema);
    const errors = original.registry
      .map((n): [string, string[]] => {
        const other = all.find(({ prefix }) => prefix === n.prefix);

        return [
          `${n.displayName} (${n.prefix})`,
          other
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ? fields.filter((f) => JSON.stringify(n[f]) !== JSON.stringify(other[f]))
            : []
        ];
      })
      .filter(([, fields]) => fields.length);

    assertAndLog(!errors.length, `Mismatches found: ${JSON.stringify(errors.map(([name, m]) => `${name}:: ${m.join(', ')}`), null, 2)}`);
  });
});
