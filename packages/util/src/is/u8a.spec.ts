// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { perf } from '../test/index.js';
import { isU8a } from './index.js';

describe('isU8a', (): void => {
  it('returns false on undefined values', (): void => {
    expect(
      isU8a()
    ).toEqual(false);
  });

  it('returns false on null values', (): void => {
    expect(
      isU8a(null)
    ).toEqual(false);
  });

  it('returns false on Array values', (): void => {
    expect(
      isU8a([1, 2, 3])
    ).toEqual(false);
  });

  it('returns true on Buffer values', (): void => {
    // under Node, Buffer implements Uint8Array
    expect(
      isU8a(Buffer.from([1, 2, 3]))
    ).toEqual(true);
  });

  it('returns true on Uint8Array values', (): void => {
    expect(
      isU8a(new Uint8Array())
    ).toEqual(true);
  });

  perf('isU8a', 2_000_000, [[new Uint8Array()]], isU8a);
});
