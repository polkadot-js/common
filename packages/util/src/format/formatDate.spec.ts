// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import formatDate from './formatDate';

describe('formatDate', (): void => {
  it('formats a known date into the correct format', (): void => {
    const date = new Date(Date.UTC(2020, 1, 15, 11, 14, 34));

    // make this test-locale agnostic
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    expect(formatDate(date)).toEqual('2020-02-15 11:14:34');
  });
});
