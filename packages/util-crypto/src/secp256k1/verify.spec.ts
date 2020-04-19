// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { secp256k1Verify } from '.';

describe('secp256k1Verify', (): void => {
  it('verify signature', (): void => {
    const address = '0x59f587c045d4d4e9aa1016eae43770fc0551df8a385027723342753a876aeef0';
    const sig = '0x92fcacf0946bbd10b31dfe16d567ed1d3014e81007dd9e5256e19c0f07eacc1643b151ca29e449a765e16a7ce59b88d800467d6b3412d30ea8ad22307a59664b00';
    const msg = 'secp256k1';
    expect(secp256k1Verify(msg, sig, address)).toEqual(true);
  });
});
