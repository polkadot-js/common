// Copyright 2017-2024 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import known from '@substrate/ss58-registry';
import fs from 'node:fs';

import { stringify } from '@polkadot/util';

describe('@substrate/ss58-registry', (): void => {
  it('has known values', (): void => {
    const testUrl = new URL('../test/ss58registry.json', import.meta.url);
    const json = stringify(known, 2);

    try {
      expect(
        JSON.parse(json)
      ).toEqual(
        JSON.parse(
          fs.readFileSync(testUrl, 'utf-8')
        )
      );
    } catch (error) {
      if (process.env['GITHUB_REPOSITORY']) {
        console.error(json);

        throw error;
      }

      fs.writeFileSync(testUrl, json, { flag: 'w' });
    }
  });
});
