// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import testingPairs from '@polkadot/keyring/testingPairs';
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
        '7sL6eNJj5ZGV5cn3hhV2deRUsivXfBfMH76wCALCqWj1EKzv'
      )
    ).toEqual(true);
  });

  it('returns true for equal, address vs publicKey', (): void => {
    const keyring = testingPairs({ type: 'sr25519' });

    expect(
      addressEq(
        '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        keyring.alice.publicKey
      )
    ).toEqual(true);
  });
});
