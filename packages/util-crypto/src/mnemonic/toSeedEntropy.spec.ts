// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import toSeedEntropy from './toSeedEntropy';

const TESTS = [
  {
    m: 'ripple island appear piano have burger custom mention negative bundle spin craft',
    p: undefined,
    s: new Uint8Array([8, 153, 38, 131, 243, 158, 118, 59, 39, 40, 113, 244, 146, 214, 206, 230, 211, 157, 245, 103, 144, 235, 214, 33, 162, 153, 96, 188, 186, 245, 158, 203])
  },
  {
    m: 'flip disease age unlock danger success rack gap poverty swamp dirt rally machine basket boy dose rookie finger few current cute reflect accident parrot',
    p: undefined,
    s: new Uint8Array([247, 96, 77, 94, 97, 105, 88, 51, 185, 99, 253, 222, 62, 200, 205, 113, 90, 21, 50, 145, 205, 253, 76, 8, 90, 50, 246, 62, 108, 31, 53, 183])
  }
];

describe('mnemonicToSeedEntropy', () => {
  TESTS.forEach(({ m, p, s }, index) => {
    it(`generates a valid seed (${index})`, () => {
      expect(
        toSeedEntropy(m, p)
      ).toEqual(s);
    });
  });
});
