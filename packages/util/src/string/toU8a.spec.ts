// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { stringToU8a } from '..';

const RUSS_HELLO = new Uint8Array([208, 159, 209, 128, 208, 184, 208, 178, 208, 181, 209, 130, 44, 32, 208, 188, 208, 184, 209, 128, 33]);

describe('stringToU8a', (): void => {
  it('decodes to an empty string for undefined', (): void => {
    expect(
      stringToU8a()
    ).toEqual(new Uint8Array());
  });

  it('encodes the string correctly', (): void => {
    expect(
      stringToU8a('Привет, мир!')
    ).toEqual(RUSS_HELLO);
  });

  it('encodes the string correctly (String)', (): void => {
    expect(
      stringToU8a(String('Привет, мир!'))
    ).toEqual(RUSS_HELLO);
  });
});
