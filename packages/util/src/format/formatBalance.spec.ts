// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import BN from 'bn.js';

import formatBalance from './formatBalance';

describe('formatBalance', (): void => {
  const TESTVAL = new BN('123456789000');

  it('formats empty to 0', (): void => {
    expect(formatBalance()).toEqual('0');
    expect(formatBalance('0')).toEqual('0');
  });

  it('formats 123,456,789,000 (decimals=15)', (): void => {
    expect(
      formatBalance(TESTVAL, true, 15)
    ).toEqual('123.456µ Unit');
  });

  it('formats 123,456,789,000 (decimals=15, Compact)', (): void => {
    const compact = {
      toBn: (): BN => TESTVAL,
      unwrap: (): BN => TESTVAL,
      something: 'else'
    };
    expect(
      formatBalance(compact, true, 15)
    ).toEqual('123.456µ Unit');
  });

  it('formats 123,456,789,000 (decimals=12)', (): void => {
    expect(
      formatBalance(TESTVAL, true, 12)
    ).toEqual('123.456m Unit');
  });

  it('formats 123,456,789,000 (decimals=12, no SI)', (): void => {
    expect(
      formatBalance(TESTVAL, false, 12)
    ).toEqual('123.456');
  });

  it('formats 123,456,789,000 (decimals=9)', (): void => {
    expect(
      formatBalance(TESTVAL, true, 9)
    ).toEqual('123.456 Unit');
  });

  it('formats 123,456,789,000 (decimals=6)', (): void => {
    expect(
      formatBalance(TESTVAL, true, 6)
    ).toEqual('123.456k Unit');
  });

  it('formats 123,456,789,000 * 10 (decimals=12)', (): void => {
    expect(
      formatBalance(TESTVAL.muln(10), true, 12)
    ).toEqual('1.234 Unit');
  });

  it('formats 123,456,789,000 * 100 (decimals=12)', (): void => {
    expect(
      formatBalance(TESTVAL.muln(100), true, 12)
    ).toEqual('12.345 Unit');
  });

  it('formats 123,456,789,000 * 1000 (decimals=12)', (): void => {
    expect(
      formatBalance(TESTVAL.muln(1000), true, 12)
    ).toEqual('123.456 Unit');
  });

  it('formats -123,456,789,000 (decimals=15)', (): void => {
    expect(
      formatBalance(new BN('-123456789000'), true, 15)
    ).toEqual('-123.456µ Unit');
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
      ).toEqual({ power: 3, value: 'k', text: 'Kilo' });
    });

    it('returns default on not found', (): void => {
      expect(
        formatBalance.findSi('blah')
      ).toEqual({ power: 0, value: '-', text: 'Unit' });
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
      { power: 0, value: '-', text: 'TEST' },
      { power: 3, value: 'k', text: 'Kilo' },
      { power: 6, value: 'M', text: 'Mega' },
      { power: 9, value: 'G', text: 'Giga' },
      { power: 12, value: 'T', text: 'Tera' },
      { power: 15, value: 'P', text: 'Peta' },
      { power: 18, value: 'E', text: 'Exa' },
      { power: 21, value: 'Z', text: 'Zeta' },
      { power: 24, value: 'Y', text: 'Yotta' }
    ]);
  });
});
