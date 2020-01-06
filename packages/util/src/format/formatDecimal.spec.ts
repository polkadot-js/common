// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import formatDecimal from './formatDecimal';

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
