// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { stringShorten } from './index.js';

describe('stringShorten', (): void => {
  it('returns the value as-is when <= maxLength', (): void => {
    expect(
      stringShorten('0123456789', 4)
    ).toEqual('0123456789');
  });

  it('returns the shortened value when > maxLength', (): void => {
    expect(
      stringShorten('0123456789', 3)
    ).toEqual('012…789');
  });

  it('returns the shortened value when > maxLength (String)', (): void => {
    expect(
      stringShorten(String('0123456789'), 3)
    ).toEqual('012…789');
  });

  it('returns the value as-is when <= maxLength (defaults)', (): void => {
    expect(
      stringShorten('012345', 4)
    ).toEqual('012345');
  });

  it('returns the shortened value when > maxLength (defaults)', (): void => {
    expect(
      stringShorten('01234567890123456789')
    ).toEqual('012345…456789');
  });
});
