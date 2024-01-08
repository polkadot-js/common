// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '../bn/bn.js';
import type { SiDef, ToBn } from '../types.js';

import { bnToBn } from '../bn/toBn.js';
import { isBoolean } from '../is/boolean.js';
import { formatDecimal } from './formatDecimal.js';
import { getSeparator } from './getSeparator.js';
import { calcSi, findSi, SI, SI_MID } from './si.js';

interface Defaults {
  decimals: number;
  unit: string;
}

interface SetDefaults {
  decimals?: number[] | number;
  unit?: string[] | string;
}

interface Options {
  /**
   * @description The number of decimals
   */
  decimals?: number;
  /**
   * @description Format the number with this specific unit
   */
  forceUnit?: string;
  /**
   * @description Returns value using all available decimals
   */
  withAll?: boolean;
  /**
   * @description Format with SI, i.e. m/M/etc. (default = true)
   */
  withSi?: boolean;
  /**
   * @description Format with full SI, i.e. mili/Mega/etc.
   */
  withSiFull?: boolean;
  /**
   * @description Add the unit (useful in Balance formats)
   */
  withUnit?: boolean | string;
  /**
   * @description Returns all trailing zeros, otherwise removes (default = true)
   */
  withZero?: boolean;
  /**
   * @description The locale to use
   */
  locale?: string;
}

interface BalanceFormatter {
  <ExtToBn extends ToBn> (input?: number | string | BN | bigint | ExtToBn, options?: Options): string;
  calcSi (text: string, decimals?: number): SiDef;
  findSi (type: string): SiDef;
  getDefaults (): Defaults;
  getOptions (decimals?: number): SiDef[];
  setDefaults (defaults: SetDefaults): void;
}

const DEFAULT_DECIMALS = 0;
const DEFAULT_UNIT = SI[SI_MID].text;

let defaultDecimals = DEFAULT_DECIMALS;
let defaultUnit = DEFAULT_UNIT;

// Formats a string/number with <prefix>.<postfix><type> notation
function _formatBalance <ExtToBn extends ToBn> (input?: number | string | BN | bigint | ExtToBn, { decimals = defaultDecimals, forceUnit, locale = 'en', withAll = false, withSi = true, withSiFull = false, withUnit = true, withZero = true }: Options = {}): string {
  // we only work with string inputs here - convert anything
  // into the string-only value
  let text = bnToBn(input).toString();

  if (text.length === 0 || text === '0') {
    return '0';
  }

  // strip the negative sign so we can work with clean groupings, re-add this in the
  // end when we return the result (from here on we work with positive numbers)
  let sign = '';

  if (text[0].startsWith('-')) {
    sign = '-';
    text = text.substring(1);
  }

  // We start at midpoint (8) minus 1 - this means that values display as
  // 123.4567 instead of 0.1234 k (so we always have the most relevant).
  const si = calcSi(text, decimals, forceUnit);
  const mid = text.length - (decimals + si.power);
  const pre = mid <= 0 ? '0' : text.substring(0, mid);

  // get the post from the midpoint onward and then first add max decimals
  // before trimming to the correct (calculated) amount of decimals again
  let post = text
    .padStart(mid < 0 ? decimals : 1, '0')
    .substring(mid < 0 ? 0 : mid)
    .padEnd(withAll ? Math.max(decimals, 4) : 4, '0')
    .substring(0, withAll ? Math.max(4, decimals + si.power) : 4);

  // remove all trailing 0's (if required via flag)
  if (!withZero) {
    let end = post.length - 1;

    // This looks inefficient, however it is better to do the checks and
    // only make one final slice than it is to do it in multiples
    do {
      if (post[end] === '0') {
        end--;
      }
    } while (post[end] === '0');

    post = post.substring(0, end + 1);
  }

  // the display unit
  const unit = isBoolean(withUnit)
    ? SI[SI_MID].text
    : withUnit;

  // format the units for display based on the flags
  const units = withSi || withSiFull
    ? si.value === '-'
      ? withUnit
        ? ` ${unit}`
        : ''
      : ` ${withSiFull ? `${si.text}${withUnit ? ' ' : ''}` : si.value}${withUnit ? unit : ''}`
    : '';

  const { decimal, thousand } = getSeparator(locale);

  return `${sign}${formatDecimal(pre, thousand)}${post && `${decimal}${post}`}${units}`;
}

export const formatBalance = _formatBalance as BalanceFormatter;

formatBalance.calcSi = (text: string, decimals: number = defaultDecimals): SiDef =>
  calcSi(text, decimals);

formatBalance.findSi = findSi;

formatBalance.getDefaults = (): Defaults => {
  return {
    decimals: defaultDecimals,
    unit: defaultUnit
  };
};

// get allowable options to display in a dropdown
formatBalance.getOptions = (decimals: number = defaultDecimals): SiDef[] => {
  return SI.filter(({ power }): boolean =>
    power < 0
      ? (decimals + power) >= 0
      : true
  );
};

// Sets the default decimals to use for formatting (ui-wide)
formatBalance.setDefaults = ({ decimals, unit }: SetDefaults): void => {
  defaultDecimals = (
    Array.isArray(decimals)
      ? decimals[0]
      : decimals
  ) ?? defaultDecimals;
  defaultUnit = (
    Array.isArray(unit)
      ? unit[0]
      : unit
  ) ?? defaultUnit;

  SI[SI_MID].text = defaultUnit;
};
