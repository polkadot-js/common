// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { formatDate } from '.';

describe('formatDate', (): void => {
  it('formats a known date into the correct format', (): void => {
    const date = new Date(Date.UTC(2020, 1, 15, 11, 14, 34));

    // make this test-locale agnostic
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    expect(formatDate(date)).toEqual('2020-02-15 11:14:34');
  });
});
