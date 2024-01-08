// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { perf } from '../test/index.js';
import { stringLowerFirst } from './index.js';

describe('stringLowerFirst', (): void => {
  it("lowers the first letter if it's a capital letter", (): void => {
    expect(
      stringLowerFirst('ABC')
    ).toBe('aBC');
  });

  it("lowers the first letter if it's a capital letter (String)", (): void => {
    expect(
      stringLowerFirst(String('ABC'))
    ).toBe('aBC');
  });

  it("lowers the first letter if it's a lowercase letter", (): void => {
    expect(
      stringLowerFirst('abc')
    ).toBe('abc');
  });

  it('returns undefined as empty', (): void => {
    expect(
      stringLowerFirst()
    ).toBe('');
  });

  it('returns null as empty', (): void => {
    expect(
      stringLowerFirst(null)
    ).toBe('');
  });

  perf('stringLowerFirst', 1_000_000, [['HelloWorldSomething']], stringLowerFirst);
});
