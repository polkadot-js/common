// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { extractTime } from '.';

describe('extractTime', (): void => {
  const milliseconds = 1e9 + 123;

  it('extracts time components correctly', (): void => {
    expect(extractTime(milliseconds))
      .toEqual({
        days: 11,
        hours: 13,
        milliseconds: 123,
        minutes: 46,
        seconds: 40
      });
  });
});
