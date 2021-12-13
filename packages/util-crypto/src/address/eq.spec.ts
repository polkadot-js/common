// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ALICE_PUBLIC_SR } from './encode.spec';
import { addressEq } from '.';

describe('addressEq', (): void => {
  it('returns false with non-equal', (): void => {
    expect(
      addressEq(
        '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        '5EnxxUmEbw8DkENKiYuZ1DwQuMoB2UWEQJZZXrTsxoz7SpgG'
      )
    ).toEqual(false);
  });

  it('returns true for equal, matching prefix', (): void => {
    expect(
      addressEq(
        '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
      )
    ).toEqual(true);
  });

  it('returns true for equal, non-matching prefix', (): void => {
    expect(
      addressEq(
        '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        '15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6Sp5'
      )
    ).toEqual(true);
  });

  it('returns true for equal, address vs publicKey', (): void => {
    expect(
      addressEq(
        '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        ALICE_PUBLIC_SR
      )
    ).toEqual(true);
  });
});
