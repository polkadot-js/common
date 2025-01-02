// Copyright 2017-2025 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { getSeparator } from './getSeparator.js';

describe('getSeparator', (): void => {
  const normalizeSeparator = (separator: string) =>
    separator === '\u202F' ? ' ' : separator;

  const testLocales = [
    { decimal: '.', locale: 'en', thousand: ',' },
    { decimal: '.', locale: 'en-gb', thousand: ',' },
    { decimal: ',', locale: 'sl', thousand: '.' },
    { decimal: ',', locale: 'sl-si', thousand: '.' },
    { decimal: ',', locale: 'it-it', thousand: '.' },
    { decimal: '.', locale: 'ja-jp', thousand: ',' },
    { decimal: '٫', locale: 'ar', thousand: '١' },
    { decimal: '.', locale: 'hi-IN', thousand: ',' },
    { decimal: '.', locale: undefined, thousand: ',' } // Fallback test
  ];

  testLocales.forEach(({ decimal, locale, thousand }) => {
    it(`uses ${locale || 'system default'} locale`, (): void => {
      expect(
        getSeparator(locale)
      ).toEqual({ decimal, thousand });
    });
  });

  it('falls back for invalid locale', (): void => {
    expect(
      getSeparator('invalid-locale')
    ).toEqual({ decimal: '.', thousand: ',' }); // Default fallback
  });

  it('matches system locale dynamically', (): void => {
    const n = 1000.1;
    const expected = {
      decimal: n.toLocaleString().substring(5, 6),
      thousand: n.toLocaleString().substring(1, 2)
    };

    expect(getSeparator()).toEqual(expected);
  });

  it('handles locales with unique separators', (): void => {
    const result = getSeparator('fr-FR');

    expect(normalizeSeparator(result.thousand)).toBe(' ');
    expect(result.decimal).toBe(',');
  });
});
