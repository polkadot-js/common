// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { formatDecimal } from './index.js';

describe('formatDecimal', (): void => {
  it('formats decimals in number groupings', (): void => {
    expect(formatDecimal('12345')).toEqual('12,345');
  });

  it('formats decimal-only in number groupings', (): void => {
    expect(formatDecimal('test6789')).toEqual('6,789');
  });

  it('returns input for non-decimal', (): void => {
    expect(formatDecimal('test')).toEqual('test');
  });

  it('returns non-sensical negative text', (): void => {
    expect(formatDecimal('-test')).toEqual('-test');
  });

  it('formats negative numbers', (): void => {
    expect(formatDecimal('-123456')).toEqual('-123,456');
  });
});
