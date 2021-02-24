// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { mnemonicToLegacySeed } from '@polkadot/util-crypto';
import { HDKeyEth } from '.';

describe('HDKeyEth', (): void => {
    const PHRASE = 'seed sock milk update focus rotate barely fade car face mechanic mercy'
    const derivationPath='m/44\'/60\'/0\'/0/0';
    const PUBLIC = new Uint8Array([
        3, 129,  53,  27,  27,  70, 210,  96,
       43,   9, 146, 187,  93,  85,  49, 249,
      193, 105, 107,   8,  18, 254, 178,  83,
       75, 104, 132, 173, 196, 126,  46,  29,
      139
    ]);
    const SECRET=new Uint8Array([
        7,  13, 195,  17, 115,   0,   1,  25,
       24, 226, 107,   2,  23, 105,  69, 204,
       21, 195, 213,  72, 207,  73, 253, 132,
       24, 217, 127, 147, 175, 105, 158,  70
     ])
     const PUBLICDERIVED = new Uint8Array([
         3, 129,  53,  27,  27,  70, 210,  96,
        43,   9, 146, 187,  93,  85,  49, 249,
       193, 105, 107,   8,  18, 254, 178,  83,
        75, 104, 132, 173, 196, 126,  46,  29,
       139
     ]);
     const SECRETDERIVED=new Uint8Array([
         7,  13, 195,  17, 115,   0,   1,  25,
        24, 226, 107,   2,  23, 105,  69, 204,
        21, 195, 213,  72, 207,  73, 253, 132,
        24, 217, 127, 147, 175, 105, 158,  70
      ])
  it('derives the right key pair from a mnemonic and a derivation path', (): void => {
    const seed=mnemonicToLegacySeed(PHRASE, '', false, 64)
    const key = HDKeyEth.fromMasterSeed(seed);
    expect(key.publicKey).toEqual(PUBLIC)
    expect(key.privateKey).toEqual(SECRET)
    const {publicKey,privateKey} = key.derive(derivationPath);
    expect(publicKey).toEqual(PUBLICDERIVED)
    expect(privateKey).toEqual(SECRETDERIVED)
  });
});
