// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import BN from 'bn.js';

import formatBalance from './formatBalance';

describe('formatBalance', (): void => {
  const TESTVAL = new BN('123456789000');

  describe('SI formatting', (): void => {
    it('formats empty to 0', (): void => {
      expect(formatBalance()).toEqual('0');
      expect(formatBalance('0')).toEqual('0');
    });

    it('formats 123,456,789,000 (decimals=15)', (): void => {
      expect(
        formatBalance(TESTVAL, { decimals: 15, withSi: true })
      ).toEqual('123.456µ Unit');
    });

    it('formats BigInt numbers', (): void => {
      expect(
        formatBalance(123456789000n, { decimals: 15, withSi: true })
      ).toEqual('123.456µ Unit');
    });

    it('formats 123,456,789,000 (decimals=15, old style)', (): void => {
      expect(
        formatBalance(TESTVAL, { withSi: true }, 15)
      ).toEqual('123.456µ Unit');
    });

    it('formats 123,456,789,000 (decimals=36, option)', (): void => {
      expect(
        formatBalance(TESTVAL, { decimals: 36, withSi: true })
      ).toEqual('0.123y Unit');
    });

    it('formats 123,456,789,000 (decimals=15, Compact)', (): void => {
      const compact = {
        something: 'else',
        toBn: (): BN => TESTVAL,
        unwrap: (): BN => TESTVAL
      };

      expect(
        formatBalance(compact, { decimals: 15, withSi: true })
      ).toEqual('123.456µ Unit');
    });

    it('formats 123,456,789,000 (decimals=12)', (): void => {
      expect(
        formatBalance(TESTVAL, { decimals: 12, withSi: true })
      ).toEqual('123.456m Unit');
    });

    it('formats 123,456,789,000 (decimals=9)', (): void => {
      expect(
        formatBalance(TESTVAL, { withSi: true }, 9)
      ).toEqual('123.456 Unit');
    });

    it('formats 123,456,789,000 (decimals=9, no unit)', (): void => {
      expect(
        formatBalance(TESTVAL, { withSi: true, withUnit: false }, 9)
      ).toEqual('123.456');
    });

    it('formats 123,456,789,000 (decimals=9, unit given)', (): void => {
      expect(
        formatBalance(TESTVAL, { withSi: true, withUnit: 'FOO' }, 9)
      ).toEqual('123.456 FOO');
    });

    it('formats 123,456,789,000 (decimals=12, no SI)', (): void => {
      expect(
        formatBalance(TESTVAL, { withSi: false }, 12)
      ).toEqual('123.456');
    });

    it('formats 123,456,789,000 (decimals=12, full SI)', (): void => {
      expect(
        formatBalance(TESTVAL, { withSiFull: true }, 12)
      ).toEqual('123.456 milli Unit');
    });

    it('formats 123,456,789,000 (decimals=12, full SI, no unit)', (): void => {
      expect(
        formatBalance(TESTVAL, { withSiFull: true, withUnit: false }, 12)
      ).toEqual('123.456 milli');
    });

    it('formats 123,456,789,000 (decimals=9, full SI)', (): void => {
      expect(
        formatBalance(TESTVAL, { withSiFull: true }, 9)
      ).toEqual('123.456 Unit');
    });

    it('formats 123,456,789,000 (decimals=6)', (): void => {
      expect(
        formatBalance(TESTVAL, { withSi: true }, 6)
      ).toEqual('123.456k Unit');
    });

    it('formats 123,456,789,000 (decimals=6, unit specified)', (): void => {
      expect(
        formatBalance(TESTVAL, { withSi: true, withUnit: 'BAR' }, 6)
      ).toEqual('123.456k BAR');
    });

    it('formats 123,456,789,000 * 10 (decimals=12)', (): void => {
      expect(
        formatBalance(TESTVAL.muln(10), { withSi: true }, 12)
      ).toEqual('1.234 Unit');
    });

    it('formats 123,456,789,000 * 100 (decimals=12)', (): void => {
      expect(
        formatBalance(TESTVAL.muln(100), { withSi: true }, 12)
      ).toEqual('12.345 Unit');
    });

    it('formats 123,456,789,000 * 1000 (decimals=12)', (): void => {
      expect(
        formatBalance(TESTVAL.muln(1000), { withSi: true }, 12)
      ).toEqual('123.456 Unit');
    });

    it('formats -123,456,789,000 (decimals=15)', (): void => {
      expect(
        formatBalance(new BN('-123456789000'), { withSi: true }, 15)
      ).toEqual('-123.456µ Unit');
    });
  });

  describe('Forced formatting', (): void => {
    it('formats 123,456,789,000 (decimals=12, forceUnit=base)', (): void => {
      expect(
        formatBalance(TESTVAL, { forceUnit: '-' }, 12)
      ).toEqual('0.123 Unit');
    });

    it('formats 123,456,789,000 (decimals=9, forceUnit=base)', (): void => {
      expect(
        formatBalance(TESTVAL, { forceUnit: '-' }, 9)
      ).toEqual('123.456 Unit');
    });

    it('formats 123,456,789,000 (decimals=7, forceUnit=base)', (): void => {
      expect(
        formatBalance(TESTVAL, { forceUnit: '-' }, 7)
      ).toEqual('12,345.678 Unit');
    });

    it('formats 123,456,789,000 (decimals=15, forceUnit=µ)', (): void => {
      expect(
        formatBalance(TESTVAL, { forceUnit: 'µ' }, 15)
      ).toEqual('123.456µ Unit');
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
      expect(formatBalance.getDefaults()).toEqual({
        decimals: 0,
        unit: 'Unit'
      });
    });

    it('formats 123,456,789,000 (defaultDecimals=12)', (): void => {
      formatBalance.setDefaults({ decimals: 12 });

      expect(
        formatBalance(TESTVAL)
      ).toEqual('123.456m Unit');
    });

    it('formats 123,456,789,000 (defaultUnit=TEST)', (): void => {
      formatBalance.setDefaults({ unit: 'TEST' });

      expect(
        formatBalance(TESTVAL)
      ).toEqual('123.456m TEST');
    });
  });

  it('returns options for dropdown', (): void => {
    formatBalance.setDefaults({ decimals: 0, unit: 'TEST' });

    expect(
      formatBalance.getOptions()
    ).toEqual([
      { power: 0, text: 'TEST', value: '-' },
      { power: 3, text: 'Kilo', value: 'k' },
      { power: 6, text: 'Mega', value: 'M' },
      { power: 9, text: 'Giga', value: 'G' },
      { power: 12, text: 'Tera', value: 'T' },
      { power: 15, text: 'Peta', value: 'P' },
      { power: 18, text: 'Exa', value: 'E' },
      { power: 21, text: 'Zeta', value: 'Z' },
      { power: 24, text: 'Yotta', value: 'Y' }
    ]);
  });
});
