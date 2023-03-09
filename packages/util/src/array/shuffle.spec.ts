// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import { perf } from '../test/index.js';
import { arrayRange, arrayShuffle } from './index.js';

const ptest = arrayRange(16284);

describe('arrayShuffle', (): void => {
  it('returns an empty array as-is', (): void => {
    expect(
      arrayShuffle([])
    ).toEqual([]);
  });

  it('returns a single array as-is', (): void => {
    expect(
      arrayShuffle([100])
    ).toEqual([100]);
  });

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

  perf('arrayShuffle', 1000, [[ptest]], arrayShuffle);
});
