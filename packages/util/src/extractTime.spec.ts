// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

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
