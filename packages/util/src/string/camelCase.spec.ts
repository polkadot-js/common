// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { getRandomValues } from '@polkadot/x-randomvalues';

import { arrayRange } from '../array/index.js';
import { perf } from '../test/index.js';
import { stringCamelCase, stringUpperFirst } from './index.js';

const SEPS = [' ', '_', '-', '.', ','];
const words = 'bring|brisk|broccoli|broken|bronze|broom|brother|brown|brush|bubble|buddy|budget|buffalo|build|bulb|bulk|bullet|bundle|bunker|burden'.split('|');

function randomAsNumber (): number {
  const rand = getRandomValues(new Uint8Array(4));

  return rand.reduce((v, t) => (v * t) + v, 0);
}

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
      stringCamelCase(String('DEDUP_KEY_PREFIX'))
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
    expect(
      stringCamelCase('NFTOrder')
    ).toEqual('nftOrder');
    expect(
      stringCamelCase('EVM')
    ).toEqual('evm');
    expect(
      stringCamelCase('A')
    ).toEqual('a');
    expect(
      stringCamelCase('A1')
    ).toEqual('a1');
    expect(
      stringCamelCase('A1b')
    ).toEqual('a1b');
    expect(
      stringCamelCase('A1B')
    ).toEqual('a1b');
    expect(
      stringCamelCase('RawVRFOutput')
    ).toEqual('rawVRFOutput');
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

  perf('stringCamelCase (random)', 100_000, randomWords, stringCamelCase);
  perf('stringCamelCase (NFTOrder)', 100_000, [['NFTOrder']], stringCamelCase);
});
