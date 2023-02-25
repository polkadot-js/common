// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

// eslint-disable-next-line spaced-comment
/// <reference types="@polkadot/dev/node/test/node" />

import { isFunction } from '../is/function';
import { bnFromHex } from '.';

describe('bnFromHex', (): void => {
  it('exists as a function', (): void => {
    expect(
      isFunction(bnFromHex)
    ).toEqual(true);
  });
});
