// Copyright 2017-2022 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import known from '@substrate/ss58-registry';
import fs from 'fs';
import path from 'path';

describe('@substrate/ss58-registry', (): void => {
  it('has known values', (): void => {
    const json = JSON.stringify(known, null, 2);
    const cmpPath = path.join(__dirname, './test/ss58registry.test.json');

    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      expect(JSON.parse(json)).toEqual(require(cmpPath));
    } catch (error) {
      if (process.env.GITHUB_REPOSITORY) {
        console.error(json);

        throw error;
      }

      fs.writeFileSync(cmpPath, json, { flag: 'w' });
    }
  });
});
