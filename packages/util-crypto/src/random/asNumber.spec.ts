// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { randomAsNumber } from './index.js';

describe('randomAsNumber', (): void => {
  it('generates subsequent non-matching numbers', (): void => {
    expect(
      randomAsNumber()
    ).not.toEqual(
      randomAsNumber()
    );
  });
});
