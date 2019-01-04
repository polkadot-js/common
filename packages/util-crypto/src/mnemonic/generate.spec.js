// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

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
