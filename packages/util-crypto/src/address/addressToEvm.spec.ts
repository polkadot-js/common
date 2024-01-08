// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { hexToU8a } from '@polkadot/util';

import { addressToEvm } from './addressToEvm.js';

describe('addressToEvm', (): void => {
  it('creates a valid known EVM address', (): void => {
    expect(
      addressToEvm('KWCv1L3QX9LDPwY4VzvLmarEmXjVJidUzZcinvVnmxAJJCBou')
    ).toEqual(hexToU8a('0x03b9dc646dd71118e5f7fda681ad9eca36eb3ee9'));
  });
});
