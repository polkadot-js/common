// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { secp256k1PrivateKeyTweakAdd } from './tweakAdd';

describe('TweakAdd', (): void => {
  describe('PrivateKey TweakAdd', (): void => {
    it('succeeds for a simple case', (): void => {
      const A = new Uint8Array([0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]);
      const B = new Uint8Array([3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]);

      expect(
        secp256k1PrivateKeyTweakAdd(A, B)
      ).toEqual(new Uint8Array([
        3, 4, 3, 4, 3, 4, 3, 4, 3,
        4, 3, 4, 3, 4, 3, 4, 3, 4,
        3, 4, 3, 4, 3, 4, 3, 4, 3,
        4, 3, 4, 3, 4
      ]));
    });

    it('fails for wrong array length', (): void => {
      const A = new Uint8Array([0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]);
      const B = new Uint8Array([3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]);

      expect(
        () => secp256k1PrivateKeyTweakAdd(A, B)
      ).toThrow(/Expected tweak to be an Uint8Array/);
    });
  });
});
