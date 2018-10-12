// Copyright 2017-2018 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import generate from './generate';
import validate from './validate';

describe('mnemonicGenerate', () => {
  it('generates a valid mnemonic', () => {
    const mnemonic = generate();

    console.error(mnemonic);

    expect(
      validate(mnemonic)
    ).toEqual(true);
  });
});
