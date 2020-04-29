// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { u8aToHex, hexToU8a } from '@polkadot/util';

import { mnemonicToMiniSecret } from '../../mnemonic';
import { secp256k1KeypairFromSeed } from '..';
import tests from './testing';

describe('secp256k1KeypairFromSeed', (): void => {
  const TEST = hexToU8a('0x4380de832af797688026ce24f85204d508243f201650c1a134929e5458b7fbae');
  const RESULT = {
    publicKey: hexToU8a('0x03fd8c74f795ced92064b86191cb2772b1e3a0947740aa0a5a6e379592471fd85b'),
    secretKey: hexToU8a('0x4380de832af797688026ce24f85204d508243f201650c1a134929e5458b7fbae')
  };

  it('generates a valid publicKey/secretKey pair (u8a)', (): void => {
    expect(secp256k1KeypairFromSeed(TEST)).toEqual(RESULT);
  });

  tests.forEach(([mnemonic, secretKey, publicKey], index): void => {
    it(`creates valid against known (${index})`, (): void => {
      const seed = mnemonicToMiniSecret(mnemonic);
      const pair = secp256k1KeypairFromSeed(seed);

      expect(u8aToHex(pair.secretKey)).toEqual(secretKey);
      expect(u8aToHex(pair.publicKey)).toEqual(publicKey);
    });
  });
});
