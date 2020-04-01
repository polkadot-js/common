// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { SiDef } from '../types';

export const SI_MID = 8;

export const SI: SiDef[] = [
  { power: -24, text: 'yocto', value: 'y' },
  { power: -21, text: 'zepto', value: 'z' },
  { power: -18, text: 'atto', value: 'a' },
  { power: -15, text: 'femto', value: 'f' },
  { power: -12, text: 'pico', value: 'p' },
  { power: -9, text: 'nano', value: 'n' },
  { power: -6, text: 'micro', value: 'µ' },
  { power: -3, text: 'milli', value: 'm' },
  { power: 0, text: 'Unit', value: '-' }, // position 8
  { power: 3, text: 'Kilo', value: 'k' },
  { power: 6, text: 'Mega', value: 'M' },
  { power: 9, text: 'Giga', value: 'G' },
  { power: 12, text: 'Tera', value: 'T' },
  { power: 15, text: 'Peta', value: 'P' },
  { power: 18, text: 'Exa', value: 'E' },
  { power: 21, text: 'Zeta', value: 'Z' },
  { power: 24, text: 'Yotta', value: 'Y' }
];

// Given a SI type (e.g. k, m, Y) find the SI definition
export function findSi (type: string): SiDef {
  // use a loop here, better RN support (which doesn't have [].find)
  for (let i = 0; i < SI.length; i++) {
    if (SI[i].value === type) {
      return SI[i];
    }
  }

  return SI[SI_MID];
}

export function calcSi (text: string, decimals: number, forceUnit?: string): SiDef {
  if (forceUnit) {
    return findSi(forceUnit);
  }

  const siDefIndex = (SI_MID - 1) + Math.ceil((text.length - decimals) / 3);

  return SI[siDefIndex] || SI[siDefIndex < 0 ? 0 : SI.length - 1];
}
