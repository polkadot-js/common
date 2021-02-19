// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { secp256k1PrivateKeyTweakAdd } from "./tweakAdd";

describe('TweakAdd', (): void => {
  describe('PrivateKey TweakAdd', (): void => {
    it('succeeds for a simple case', (): void => {
        let A=new Uint8Array([0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1])
        let B=new Uint8Array([3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3])
      expect(
          secp256k1PrivateKeyTweakAdd(A,B).toString()
      ).toBe(new Uint8Array([
          3, 4, 3, 4, 3, 4, 3, 4, 3,
          4, 3, 4, 3, 4, 3, 4, 3, 4,
          3, 4, 3, 4, 3, 4, 3, 4, 3,
          4, 3, 4, 3, 4
        ]).toString())
    });
    it('fails for wrong array length', (): void => {
      let A=new Uint8Array([0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1])
      let B=new Uint8Array([3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3])
      let bool=false
      try {
        secp256k1PrivateKeyTweakAdd(A,B)
      } catch(e){
        expect(e.toString()).toEqual("Error: Expected tweak to be an Uint8Array with length 32")
        bool=true
      }
      expect(bool).toBe(true)
    });
  });
});
