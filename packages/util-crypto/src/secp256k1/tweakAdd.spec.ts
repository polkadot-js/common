// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { secp256k1PrivateKeyTweakAdd } from './tweakAdd.js';

describe('TweakAdd', (): void => {
  it('fails for wrong array length', (): void => {
    const A = new Uint8Array([0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]);
    const B = new Uint8Array([3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]);

    expect(
      () => secp256k1PrivateKeyTweakAdd(A, B)
    ).toThrow(/Expected tweak to be an Uint8Array/);
  });

  for (const onlyBn of [false, true]) {
    describe(`onlyBn=${(onlyBn && 'true') || 'false'}`, (): void => {
      it('succeeds for a simple case', (): void => {
        const A = new Uint8Array([0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]);
        const B = new Uint8Array([3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]);

        expect(
          secp256k1PrivateKeyTweakAdd(A, B, onlyBn)
        ).toEqual(new Uint8Array([
          3, 4, 3, 4, 3, 4, 3, 4, 3,
          4, 3, 4, 3, 4, 3, 4, 3, 4,
          3, 4, 3, 4, 3, 4, 3, 4, 3,
          4, 3, 4, 3, 4
        ]));
      });
    });
  }
});
