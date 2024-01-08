// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { BN } from '../bn/index.js';
import { formatBalance } from './index.js';

const FMT_DEFAULTS = {
  decimals: 0,
  unit: 'Unit'
};

describe('formatBalance', (): void => {
  const TESTVAL = new BN('123456789000');

  // We mess around with the global setDefaults inside some tests,
  // ensure we restore it to the defaults straight after each run
  afterEach((): void => {
    formatBalance.setDefaults(FMT_DEFAULTS);
  });

  it('returns options for dropdown', (): void => {
    formatBalance.setDefaults({ decimals: 0, unit: 'TEST' });

    expect(
      formatBalance.getOptions()
    ).toEqual([
      { power: 0, text: 'TEST', value: '-' },
      { power: 3, text: 'Kilo', value: 'k' },
      { power: 6, text: 'Mill', value: 'M' },
      { power: 9, text: 'Bill', value: 'B' },
      { power: 12, text: 'Tril', value: 'T' },
      { power: 15, text: 'Peta', value: 'P' },
      { power: 18, text: 'Exa', value: 'E' },
      { power: 21, text: 'Zeta', value: 'Z' },
      { power: 24, text: 'Yotta', value: 'Y' }
    ]);
  });

  it('can set defaults from array values', (): void => {
    formatBalance.setDefaults({ decimals: [12, 24], unit: ['Multi', 'Unit'] });

    expect(
      formatBalance(TESTVAL)
    ).toEqual('123.4567 mMulti');
  });

  describe('SI formatting', (): void => {
    it('formats empty to 0', (): void => {
      expect(formatBalance()).toEqual('0');
      expect(formatBalance('0')).toEqual('0');
    });

    // this is after an issue/test from actual values with forceUnit
    it('formats 1000 (BN) (decimals = 12, withAll, withZero = false)', (): void => {
      expect(
        formatBalance(new BN(1000), { decimals: 12, forceUnit: '-', withAll: true, withSi: false, withZero: true })
      ).toEqual('0.000000001000');
    });

    it('formats 123,456,789,000 (decimals=15)', (): void => {
      expect(
        formatBalance(TESTVAL, { decimals: 15, withSi: true })
      ).toEqual('123.4567 µUnit');
    });

    it('formats 123,456 (decimals=0)', (): void => {
      expect(
        formatBalance(123456, { decimals: 0, withSi: true })
      ).toEqual('123.4560 kUnit');
    });

    it('formats BigInt numbers', (): void => {
      expect(
        formatBalance(123456789000n, { decimals: 15, withSi: true })
      ).toEqual('123.4567 µUnit');
    });

    it('formats 123,456,789,000 (decimals=15, old style)', (): void => {
      expect(
        formatBalance(TESTVAL, { decimals: 15, withSi: true })
      ).toEqual('123.4567 µUnit');
    });

    it('formats 123,456,789,000 (decimals=10, withAll=true)', (): void => {
      expect(
        formatBalance(TESTVAL, { decimals: 10, forceUnit: '-', withAll: true, withSi: true })
      ).toEqual('12.3456789000 Unit');
    });

    it('formats 123,456,789,000 (decimals=10, withAll=true, withZero=false)', (): void => {
      expect(
        formatBalance(TESTVAL, { decimals: 10, forceUnit: '-', withAll: true, withSi: true, withZero: false })
      ).toEqual('12.3456789 Unit');
    });

    it('formats 123,000,000,000 (decimals=9, withAll=true, withZero=false)', (): void => {
      expect(
        formatBalance('123000000000', { decimals: 9, forceUnit: '-', withAll: true, withSi: true, withZero: false })
      ).toEqual('123 Unit');
    });

    it('formats 123,456,789,000 (decimals=15, Compact)', (): void => {
      const compact = {
        something: 'else',
        toBn: (): BN => TESTVAL,
        unwrap: (): BN => TESTVAL
      };

      expect(
        formatBalance(compact, { decimals: 15, withSi: true })
      ).toEqual('123.4567 µUnit');
    });

    it('formats 123,456,789,000 (decimals=12)', (): void => {
      expect(
        formatBalance(TESTVAL, { decimals: 12, withSi: true })
      ).toEqual('123.4567 mUnit');
    });

    it('formats 123,456,789,000 (decimals=9)', (): void => {
      expect(
        formatBalance(TESTVAL, { decimals: 9, withSi: true })
      ).toEqual('123.4567 Unit');
    });

    it('formats 123,456,789,000 (decimals=9, no unit)', (): void => {
      expect(
        formatBalance(TESTVAL, { decimals: 9, withSi: true, withUnit: false })
      ).toEqual('123.4567');
    });

    it('formats 123,456,789,000 (decimals=9, unit given)', (): void => {
      expect(
        formatBalance(TESTVAL, { decimals: 9, withSi: true, withUnit: 'FOO' })
      ).toEqual('123.4567 FOO');
    });

    it('formats 123,456,789,000 (decimals=12, no SI)', (): void => {
      expect(
        formatBalance(TESTVAL, { decimals: 12, withSi: false })
      ).toEqual('123.4567');
    });

    it('formats 123,456,789,000 (decimals=12, full SI)', (): void => {
      expect(
        formatBalance(TESTVAL, { decimals: 12, withSiFull: true })
      ).toEqual('123.4567 milli Unit');
    });

    it('formats 123,456,789,000 (decimals=12, full SI, no unit)', (): void => {
      expect(
        formatBalance(TESTVAL, { decimals: 12, withSiFull: true, withUnit: false })
      ).toEqual('123.4567 milli');
    });

    it('formats 123,456,789,000 (decimals=9, full SI)', (): void => {
      expect(
        formatBalance(TESTVAL, { decimals: 9, withSiFull: true })
      ).toEqual('123.4567 Unit');
    });

    it('formats 123,456,789,000 (decimals=6)', (): void => {
      expect(
        formatBalance(TESTVAL, { decimals: 6, withSi: true })
      ).toEqual('123.4567 kUnit');
    });

    it('formats 123,456,789,000 (decimals=6, unit specified)', (): void => {
      expect(
        formatBalance(TESTVAL, { decimals: 6, withSi: true, withUnit: 'BAR' })
      ).toEqual('123.4567 kBAR');
    });

    it('formats 123,456,789,000 (decimals=0, unit specified)', (): void => {
      expect(
        formatBalance(TESTVAL, { decimals: 0, withSi: true, withUnit: 'BAR' })
      ).toEqual('123.4567 BBAR');
    });

    it('formats 123,456,789,000 * 10 (decimals=12)', (): void => {
      expect(
        formatBalance(TESTVAL.muln(10), { decimals: 12, withSi: true })
      ).toEqual('1.2345 Unit');
    });

    it('formats 123,456,789,000 * 100 (decimals=12)', (): void => {
      expect(
        formatBalance(TESTVAL.muln(100), { decimals: 12, withSi: true })
      ).toEqual('12.3456 Unit');
    });

    it('formats 123,456,789,000 * 1000 (decimals=12)', (): void => {
      expect(
        formatBalance(TESTVAL.muln(1000), { decimals: 12, withSi: true })
      ).toEqual('123.4567 Unit');
    });

    it('formats -123,456,789,000 (decimals=15)', (): void => {
      expect(
        formatBalance(new BN('-123456789000'), { decimals: 15, withSi: true })
      ).toEqual('-123.4567 µUnit');
    });
  });

  describe('Forced formatting', (): void => {
    it('formats 123,456,789,000 (decimals=12, forceUnit=base)', (): void => {
      expect(
        formatBalance(TESTVAL, { decimals: 12, forceUnit: '-' })
      ).toEqual('0.1234 Unit');
    });

    it('formats 123,456,789,000 (decimals=9, forceUnit=base)', (): void => {
      expect(
        formatBalance(TESTVAL, { decimals: 9, forceUnit: '-' })
      ).toEqual('123.4567 Unit');
    });

    it('formats 123,456,789,000 (decimals=7, forceUnit=base)', (): void => {
      expect(
        formatBalance(TESTVAL, { decimals: 7, forceUnit: '-' })
      ).toEqual('12,345.6789 Unit');
    });

    it('formats 123,456,789,000 (decimals=15, forceUnit=micro)', (): void => {
      expect(
        formatBalance(TESTVAL, { decimals: 15, forceUnit: 'µ' })
      ).toEqual('123.4567 µUnit');
    });

    it('formats 123,456 (decimals=0, locale=sl)', (): void => {
      expect(
        formatBalance(123456, { decimals: 0, locale: 'sl', withSi: true })
      ).toEqual('123,4560 kUnit');
    });

    it('formats BigInt numbers (locale=sl)', (): void => {
      expect(
        formatBalance(123456789000n, { decimals: 15, locale: 'sl', withSi: true })
      ).toEqual('123,4567 µUnit');
    });

    it('formats 123,456,789,000 (decimals=7, forceUnit=base locale=sl)', (): void => {
      expect(
        formatBalance(TESTVAL, { decimals: 7, forceUnit: '-', locale: 'sl' })
      ).toEqual('12.345,6789 Unit');
    });
  });

  describe('calcSi', (): void => {
    it('exposes calcSi on formatBalance', (): void => {
      expect(
        formatBalance.calcSi('12345').value
      ).toEqual('k');
    });
  });

  describe('findSi', (): void => {
    it('finds the SI value', (): void => {
      expect(
        formatBalance.findSi('k')
      ).toEqual({ power: 3, text: 'Kilo', value: 'k' });
    });

    it('returns default on not found', (): void => {
      expect(
        formatBalance.findSi('blah')
      ).toEqual({ power: 0, text: 'Unit', value: '-' });
    });
  });

  describe('defaults', (): void => {
    it('returns defaults', (): void => {
      expect(
        formatBalance.getDefaults()
      ).toEqual(FMT_DEFAULTS);
    });

    it('formats 123,456,789,000 (defaultDecimals=12)', (): void => {
      formatBalance.setDefaults({ decimals: 12 });

      expect(
        formatBalance(TESTVAL)
      ).toEqual('123.4567 mUnit');
    });

    it('formats 123,456,789,000 (defaultUnit=TEST)', (): void => {
      formatBalance.setDefaults({ decimals: 12, unit: 'TEST' });

      expect(
        formatBalance(TESTVAL)
      ).toEqual('123.4567 mTEST');
    });
  });
});
