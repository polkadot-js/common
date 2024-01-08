// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { perf } from '../test/index.js';
import { stringUpperFirst } from './index.js';

describe('stringUpperFirst', (): void => {
  it("uppers the first letter if it's a capital letter", (): void => {
    expect(
      stringUpperFirst('ABC')
    ).toBe('ABC');
  });

  it("uppers the first letter if it's a lowercase letter", (): void => {
    expect(
      stringUpperFirst('abc')
    ).toBe('Abc');
  });

  it("uppers the first letter if it's a lowercase letter (String)", (): void => {
    expect(
      stringUpperFirst(String('abc'))
    ).toBe('Abc');
  });

  it('returns undefined as empty', (): void => {
    expect(
      stringUpperFirst()
    ).toBe('');
  });

  it('returns null as empty', (): void => {
    expect(
      stringUpperFirst(null)
    ).toBe('');
  });

  perf('stringUpperFirst', 1_000_000, [['helloWorldSomething']], stringUpperFirst);
});
