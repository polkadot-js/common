// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { getSeparator } from './getSeparator.js';

describe('getSeparator', (): void => {
  it('uses system locale', (): void => {
    const n = 1000.1;
    const locale = {
      decimal: n.toLocaleString().substring(5, 6),
      thousand: n.toLocaleString().substring(1, 2)
    };

    expect(
      getSeparator()
    ).toEqual(locale);
  });

  it('uses en locale', (): void => {
    expect(
      getSeparator('en')
    ).toEqual({
      decimal: '.',
      thousand: ','
    });
  });

  it('uses en-gb locale', (): void => {
    expect(
      getSeparator('en-gb')
    ).toEqual({
      decimal: '.',
      thousand: ','
    });
  });

  it('uses sl locale', (): void => {
    expect(
      getSeparator('sl')
    ).toEqual({
      decimal: ',',
      thousand: '.'
    });
  });

  it('uses sl-si locale', (): void => {
    expect(
      getSeparator('sl-si')
    ).toEqual({
      decimal: ',',
      thousand: '.'
    });
  });

  it('uses it-it locale', (): void => {
    expect(
      getSeparator('it-it')
    ).toEqual({
      decimal: ',',
      thousand: '.'
    });
  });

  it('uses ja-jp locale', (): void => {
    expect(
      getSeparator('ja-jp')
    ).toEqual({
      decimal: '.',
      thousand: ','
    });
  });
});
