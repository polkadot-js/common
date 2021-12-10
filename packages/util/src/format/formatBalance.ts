// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '../bn/bn';
import type { SiDef, ToBn } from '../types';

import { bnToBn } from '../bn/toBn';
import { isBoolean } from '../is/boolean';
import { isUndefined } from '../is/undefined';
import { formatDecimal } from './formatDecimal';
import { calcSi, findSi, SI, SI_MID } from './si';

interface Defaults {
  decimals: number;
  unit: string;
}

interface SetDefaults {
  decimals?: number[] | number;
  unit?: string[] | string;
}

interface Options {
  decimals?: number;
  forceUnit?: string;
  withSi?: boolean;
  withSiFull?: boolean;
  withUnit?: boolean | string;
}

interface BalanceFormatter {
  <ExtToBn extends ToBn> (input?: number | string | BN | bigint | ExtToBn, options?: Options, decimals?: number): string;
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

function getUnits (si: SiDef, withSi: boolean, withSiFull: boolean, withUnit: boolean | string): string {
  const unit = isBoolean(withUnit)
    ? SI[SI_MID].text
    : withUnit;

  return withSi || withSiFull
    ? si.value === '-'
      ? withUnit
        ? ` ${unit}`
        : ''
      : ` ${withSiFull ? `${si.text}${withUnit ? ' ' : ''}` : si.value}${withUnit ? unit : ''}`
    : '';
}

function getPrePost (text: string, decimals: number, forceUnit?: string): [SiDef, string, string] {
  // NOTE We start at midpoint (8) minus 1 - this means that values display as
  // 123.456 instead of 0.123k (so always 6 relevant). Additionally we use ceil
  // so there are at most 3 decimal before the decimal separator
  const si = calcSi(text, decimals, forceUnit);
  const mid = text.length - (decimals + si.power);
  const prefix = text.substring(0, mid);
  const padding = mid < 0 ? 0 - mid : 0;
  const postfix = `${`${new Array(padding + 1).join('0')}${text}`.substring(mid < 0 ? 0 : mid)}0000`.substring(0, 4);

  return [si, prefix || '0', postfix];
}

// Formats a string/number with <prefix>.<postfix><type> notation
function _formatBalance <ExtToBn extends ToBn> (input?: number | string | BN | bigint | ExtToBn, options: Options | boolean = true, optDecimals: number = defaultDecimals): string {
  let text = bnToBn(input).toString();

  if (text.length === 0 || text === '0') {
    return '0';
  }

  // extract options - the boolean case is for backwards-compat
  const { decimals = optDecimals, forceUnit = undefined, withSi = true, withSiFull = false, withUnit = true } = isBoolean(options)
    ? { withSi: options }
    : options;

  // strip the negative sign so we can work with clean groupings, re-add this in the
  // end when we return the result (from here on we work with positive numbers)
  let sign = '';

  if (text[0].startsWith('-')) {
    sign = '-';
    text = text.substring(1);
  }

  const [si, prefix, postfix] = getPrePost(text, decimals, forceUnit);
  const units = getUnits(si, withSi, withSiFull, withUnit);

  return `${sign}${formatDecimal(prefix)}.${postfix}${units}`;
}

export const formatBalance = _formatBalance as BalanceFormatter;

// eslint-disable-next-line @typescript-eslint/unbound-method
formatBalance.calcSi = (text: string, decimals: number = defaultDecimals): SiDef =>
  calcSi(text, decimals);

// eslint-disable-next-line @typescript-eslint/unbound-method
formatBalance.findSi = findSi;

// eslint-disable-next-line @typescript-eslint/unbound-method
formatBalance.getDefaults = (): Defaults => {
  return {
    decimals: defaultDecimals,
    unit: defaultUnit
  };
};

// get allowable options to display in a dropdown
// eslint-disable-next-line @typescript-eslint/unbound-method
formatBalance.getOptions = (decimals: number = defaultDecimals): SiDef[] => {
  return SI.filter(({ power }): boolean =>
    power < 0
      ? (decimals + power) >= 0
      : true
  );
};

// Sets the default decimals to use for formatting (ui-wide)
// eslint-disable-next-line @typescript-eslint/unbound-method
formatBalance.setDefaults = ({ decimals, unit }: SetDefaults): void => {
  defaultDecimals = isUndefined(decimals)
    ? defaultDecimals
    : Array.isArray(decimals)
      ? decimals[0]
      : decimals;
  defaultUnit = isUndefined(unit)
    ? defaultUnit
    : Array.isArray(unit)
      ? unit[0]
      : unit;

  SI[SI_MID].text = defaultUnit;
};
