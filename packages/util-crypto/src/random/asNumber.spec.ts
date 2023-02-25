// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

// eslint-disable-next-line spaced-comment
/// <reference types="@polkadot/dev/node/test/node" />

import { randomAsNumber } from '.';

describe('randomAsNumber', (): void => {
  it('generates subsequent non-matching numbers', (): void => {
    expect(
      randomAsNumber()
    ).not.toEqual(
      randomAsNumber()
    );
  });
});
