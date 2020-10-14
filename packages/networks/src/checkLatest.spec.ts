// Copyright 2017-2020 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Ss58Registry } from './types';

import fetch from '@polkadot/x-fetch';
import { assert } from '@polkadot/util';

import { all } from './';

describe('check latest Substrate ss58 registry', (): void => {
  let original: Ss58Registry;

  beforeAll(async (): Promise<void> => {
    const response = await fetch('https://raw.githack.com/paritytech/substrate/master/ss58-registry.json');

    original = await response.json() as Ss58Registry;
  });

  it('has the same number as the original', (): void => {
    expect(all.length).toEqual(original.registry.length);
  });

  it('is not missing any entries', (): void => {
    const missing = original.registry
      .filter(({ prefix }) => !all.some((n) => n.prefix === prefix))
      .map(({ displayName, prefix }) => `${displayName} (${prefix})}`);

    assert(!missing.length, `Missing entries found: ${missing.join(', ')}`);
  });

  it('is does not have extra entries', (): void => {
    const missing = all
      .filter(({ prefix }) => !original.registry.some((n) => n.prefix === prefix))
      .map(({ displayName, prefix }) => `${displayName} (${prefix})}`);

    assert(!missing.length, `Extra entries found: ${missing.join(', ')}`);
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

    assert(!errors.length, `Mismatches found: ${JSON.stringify(errors.map(([name, m]) => `${name} on ${m.join(', ')}`), null, 2)}`);
  });
});
