// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { stringToU8a } from '@polkadot/util';

import { randomAsU8a } from '../random/asU8a.js';
import { sr25519PairFromSeed } from './pair/fromSeed.js';
import { sr25519Sign } from './sign.js';

const MESSAGE = stringToU8a('this is a message');

describe('sign', (): void => {
  it('has 64-byte signatures', (): void => {
    const pair = sr25519PairFromSeed(randomAsU8a());

    expect(sr25519Sign(MESSAGE, pair)).toHaveLength(64);
  });

  it('has non-deterministic signatures', (): void => {
    const pair = sr25519PairFromSeed(randomAsU8a());
    const a = sr25519Sign(MESSAGE, pair);
    const b = sr25519Sign(MESSAGE, pair);

    expect(a).not.toEqual(b);
  });
});
