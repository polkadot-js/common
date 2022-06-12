// Copyright 2017-2022 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import known from '@substrate/ss58-registry';
import * as fs from 'fs';
import * as path from 'path';

describe('@substrate/ss58-registry', (): void => {
  it('has known values', (): void => {
    const other = JSON.parse(fs.readFileSync('./test/ss58registry.test.json', 'utf-8')) as Record<string, unknown>;
    const json = JSON.stringify(known, null, 2);

    try {
      expect(JSON.parse(json)).toEqual(other);
    } catch (error) {
      if (process.env.GITHUB_REPOSITORY) {
        console.error(json);

        throw error;
      }

      fs.writeFileSync(path.join(__dirname, './test/ss58registry.test.json'), json, { flag: 'w' });
    }
  });
});
