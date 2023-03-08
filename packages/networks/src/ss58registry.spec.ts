// Copyright 2017-2023 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import known from '@substrate/ss58-registry';
import fs from 'node:fs';
import path from 'node:path';

import other from './test/ss58registry.test.json' assert { type: 'json' };

describe('@substrate/ss58-registry', (): void => {
  it('has known values', (): void => {
    const json = JSON.stringify(known, null, 2);

    try {
      expect(JSON.parse(json)).toEqual(other);
    } catch (error) {
      if (process.env.GITHUB_REPOSITORY) {
        console.error(json);

        throw error;
      }

      fs.writeFileSync(path.join(process.cwd(), 'packages/networks/src/test/ss58registry.test.json'), json, { flag: 'w' });
    }
  });
});
