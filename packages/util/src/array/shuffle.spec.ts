// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { arrayRange, arrayShuffle } from '.';

describe('arrayShuffle', (): void => {
  it('shuffles an array', (): void => {
    const inp = arrayRange(100);
    const out = arrayShuffle(inp);

    expect(inp).toHaveLength(out.length);
    expect(
      inp.filter((v) => !out.includes(v))
    ).toEqual([]);
    expect(
      JSON.stringify(inp)
    ).not.toEqual(JSON.stringify(out));
  });
});
