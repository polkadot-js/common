// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { u8aToHex } from '@polkadot/util';

import toSecret from './toSecret';

describe('mnemonicToSecret', () => {
  it('generates a valid seed', () => {
    expect(
      u8aToHex(toSecret('seed sock milk update focus rotate barely fade car face mechanic mercy'))
    ).toEqual('0x3c121e20de068083b49c2315697fb59a2d9e8643c24e5ea7628132c58969a0275693dd5bd9d4cc9e648475eba9613ed4678f4d62560a9c42f75bac04022ded25');
  });
});
