// Copyright 2017-2025 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * Get the decimal and thousand separator of a locale
 * @param locale
 * @returns {decimal: string, thousand: string}
 */
export function getSeparator (locale?: string):
{ thousand: string, decimal: string } {
  return {
    decimal: (0.1).toLocaleString(locale, { useGrouping: false }).charAt(1),
    thousand: (1000).toLocaleString(locale, { useGrouping: true }).replace(/\d/g, '').charAt(0)
  };
}
