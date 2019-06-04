// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

const NUMBER_REGEX = new RegExp('(\\d+?)(?=(\\d{3})+(?!\\d)|$)', 'g');

export default function formatDecimal (value: string): string {
  // We can do this by adjusting the regx, however for the sake of clarity
  // we rather strip and re-add the negative sign in the output
  const isNegative = value[0] === '-';
  const matched = isNegative
    ? value.substr(1).match(NUMBER_REGEX)
    : value.match(NUMBER_REGEX);

  return matched
    ? `${isNegative ? '-' : ''}${matched.join(',')}`
    : value;
}
