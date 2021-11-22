// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { randomAsNumber } from '@polkadot/util-crypto';
import words from '@polkadot/util-crypto/mnemonic/bip39-en';

import { performanceJs } from '../../test/performance';
import { arrayRange } from '../array';
import { stringCamelCase, stringUpperFirst } from '.';

const SEPS = [' ', '_', '-'];

const randomWords = arrayRange(256).map((): [string] => {
  let result = '';

  for (let i = 0; i < 6; i++) {
    let word = words[randomAsNumber() % words.length];

    if (randomAsNumber() % 2) {
      word = stringUpperFirst(word);
    }

    if (i === 0) {
      result = word;
    } else {
      result += `${SEPS[randomAsNumber() % SEPS.length]}${word}`;
    }
  }

  return [result];
});

describe('stringCamelCase', (): void => {
  it('works correctly', (): void => {
    expect(
      stringCamelCase('Snake_case-Something    spaced')
    ).toBe('snakeCaseSomethingSpaced');
  });

  it('works correctly for String (class', (): void => {
    expect(
      stringCamelCase(String('Foo_bar-baz---test-_ spaced'))
    ).toBe('fooBarBazTestSpaced');
  });

  performanceJs('stringCamelCase', 64000, randomWords, stringCamelCase);
});
