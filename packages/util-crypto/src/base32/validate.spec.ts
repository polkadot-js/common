// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { base32Validate } from '.';

describe('base32Validate', (): void => {
  it('validates encoded', (): void => {
    expect(
      base32Validate('afkreigh2akiscaildcqabsyg3dfr6chu3fgpregiymsck7e7aqa4s52zy', false)
    ).toEqual(true);
  });

  it('validates ipfs-compat encoded', (): void => {
    expect(
      base32Validate('bafkreigh2akiscaildcqabsyg3dfr6chu3fgpregiymsck7e7aqa4s52zy', true)
    ).toEqual(true);
  });

  it('fails on empty', (): void => {
    expect(
      () => base32Validate('')
    ).toThrow(/Expected/);
  });

  it('fails on non-string', (): void => {
    expect(
      () => base32Validate(true)
    ).toThrow(/Expected/);
  });

  it('fails on invalid', (): void => {
    expect(
      () => base32Validate('not in base32')
    ).toThrow(/Invalid/);
  });

  it('fails on non-ipfs', (): void => {
    expect(
      () => base32Validate('afkreigh2akiscaildcqabsyg3dfr6chu3fgpregiymsck7e7aqa4s52zy', true)
    ).toThrow(/Expected/);
  });
});
