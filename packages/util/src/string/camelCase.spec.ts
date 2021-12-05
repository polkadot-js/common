// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { randomAsNumber } from '@polkadot/util-crypto';
import words from '@polkadot/util-crypto/mnemonic/bip39-en';

import { performance } from '../../test/performance';
import { arrayRange } from '../array';
import { stringCamelCase, stringUpperFirst } from '.';

const SEPS = [' ', '_', '-', '.', ','];

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
      stringCamelCase('Snake_case-...SomethingSomething    spaced')
    ).toBe('snakeCaseSomethingSomethingSpaced');
  });

  it('works correctly for String (class', (): void => {
    expect(
      stringCamelCase(String('Foo_bar-baz---test-_ spaced....Extra'))
    ).toBe('fooBarBazTestSpacedExtra');
  });

  it('adjusts all-uppercase', (): void => {
    expect(
      stringCamelCase('DEDUP_KEY_PREFIX')
    ).toEqual('dedupKeyPrefix');
    expect(
      stringCamelCase('SOMETHING')
    ).toEqual('something');
    expect(
      stringCamelCase('NMap')
    ).toEqual('nMap');
  });

  it('adjusts all-uppercase + digits', (): void => {
    expect(
      stringCamelCase('SS58 PreFIX')
    ).toEqual('ss58PreFIX');
    expect(
      stringCamelCase('SS58Prefix')
    ).toEqual('ss58Prefix');
    expect(
      stringCamelCase('UUID64')
    ).toEqual('uuid64');
    expect(
      stringCamelCase('BLAKE2B')
    ).toEqual('blake2b');
  });

  it('adjusts with leading _', (): void => {
    expect(
      stringCamelCase('_reserved')
    ).toEqual('reserved');
  });

  it('adjusts with minimal chars per part', (): void => {
    expect(
      stringCamelCase('_a_b_c_def')
    ).toEqual('aBCDef');
  });

  performance('stringCamelCase', 64000, randomWords, stringCamelCase);
});
