// Copyright 2017-2020 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NetworkFromSubstrate, Ss58Registry } from './types';

import fetch from '@polkadot/x-fetch';
import { assert } from '@polkadot/util';

import { all } from './';

const FIELDS = ['decimals', 'displayName', 'network', 'prefix', 'standardAccount', 'symbols', 'website'];

describe('check lastest Substrate ss58 registry', (): void => {
  let original: NetworkFromSubstrate[];

  beforeAll(async (): Promise<void> => {
    const response = await fetch('https://raw.githack.com/paritytech/substrate/master/ss58-registry.json');
    const master = await response.json() as Ss58Registry;

    original = master.registry;
  });

  it('has the same number as the original', (): void => {
    expect(all.length).toEqual(original.length);
  });

  it('is not missing any entries', (): void => {
    const missing = original
      .filter(({ prefix }) => !all.some((n) => n.prefix === prefix))
      .map(({ displayName, prefix }) => `${displayName} (${prefix})}`);

    assert(!missing.length, `Missing entries found: ${missing.join(', ')}`);
  });

  it('is does not have extra entries', (): void => {
    const missing = all
      .filter(({ prefix }) => !original.some((n) => n.prefix === prefix))
      .map(({ displayName, prefix }) => `${displayName} (${prefix})}`);

    assert(!missing.length, `Extra entries found: ${missing.join(', ')}`);
  });

  it('has the same values as the original', (): void => {
    const errors = original
      .map((n): [string, string[]] => {
        const name = `${n.displayName} (${n.prefix})`;
        const other = all.find(({ prefix }) => prefix === n.prefix);

        if (!other) {
          return [name, []];
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return [name, FIELDS.filter((f) => JSON.stringify(n[f]) !== JSON.stringify(other[f]))];
      })
      .filter(([, fields]) => fields.length);

    assert(!errors.length, `Mismatches found: ${JSON.stringify(errors.map(([name, m]) => `${name} on ${m.join(', ')}`), null, 2)}`);
  });
});
