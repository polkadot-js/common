// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

const NUMBER_REGEX = new RegExp('(\\d+?)(?=(\\d{3})+(?!\\d)|$)', 'g');

export default function formatDecimal (value: string): string {
  // We can do this by adjusting the regx, however for the sake of clarity
  // we rather strip and re-add the negative sign in the output
  const isNegative = value[0].startsWith('-');
  const matched = isNegative
    ? value.substr(1).match(NUMBER_REGEX)
    : value.match(NUMBER_REGEX);

  return matched
    ? `${isNegative ? '-' : ''}${matched.join(',')}`
    : value;
}
