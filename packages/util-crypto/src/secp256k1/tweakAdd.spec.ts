// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { secp256k1PrivateKeyTweakAdd } from "./tweakAdd";

// import { secp256k1Hasher } from './hasher';
describe('TweakAdd', (): void => {
  describe('PrivateKey TweakAdd', (): void => {
    it('succeeds for a simple case', (): void => {
        let A=new Uint8Array([0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1])
        let B=new Uint8Array([3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3])
        console.log('secp256k1PrivateKeyTweakAdd(A,B)',)
        console.log('A',A)
      expect(
          secp256k1PrivateKeyTweakAdd(A,B).toString()
      ).toBe(new Uint8Array([
          3, 4, 3, 4, 3, 4, 3, 4, 3,
          4, 3, 4, 3, 4, 3, 4, 3, 4,
          3, 4, 3, 4, 3, 4, 3, 4, 3,
          4, 3, 4, 3, 4
        ]).toString())
    });
  //   it('fails for wrong array length', (): void => {
  //     let A=new Uint8Array([0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1])
  //     let B=new Uint8Array([3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3])
  //     expect(
  //         secp256k1PrivateKeyTweakAdd(A,B)
  //     ).toThrow(`Expected tweak to be an Uint8Array with length 32`)//.toBe(new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]).toString())
  //   });
  //   it.only('fails for overflow', (): void => {
  //       let A=new Uint8Array([255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255])
  //       let B=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1])//new Uint8Array([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1])
  //       console.log(A.length,B.length,(new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])).length)
  //       //console.log('secp256k1PrivateKeyTweakAdd(A,B)',)
  //       console.log('A',A)
  //     expect(
  //         secp256k1PrivateKeyTweakAdd(A,B)
  //     ).toThrow('offset is out of bounds')//.toBe(new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]).toString())
  //   });
  });
  describe('PublicKey TweakAdd', (): void => {
    it('succeeds for a simple case', (): void => {
        let A=new Uint8Array([0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1])
        let B=new Uint8Array([3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3])
        console.log('secp256k1PrivateKeyTweakAdd(A,B)',)
        console.log('A',A)
      expect(
          secp256k1PrivateKeyTweakAdd(A,B).toString()
      ).toBe(new Uint8Array([
          3, 4, 3, 4, 3, 4, 3, 4, 3,
          4, 3, 4, 3, 4, 3, 4, 3, 4,
          3, 4, 3, 4, 3, 4, 3, 4, 3,
          4, 3, 4, 3, 4
        ]).toString())
    });
  });
});
