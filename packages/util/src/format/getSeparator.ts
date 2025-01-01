// Copyright 2017-2025 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * Get the decimal and thousand separator of a locale
 * @param locale
 * @returns {decimal: string, thousand: string}
 */
export function getSeparator (locale?: string):
{ thousand: string, decimal: string } {
  const formattedDecimal = (0.1).toLocaleString(locale, { useGrouping: false });
  const formattedThousand = (1000).toLocaleString(locale, { useGrouping: true });

  return {
    decimal: formattedDecimal.charAt(1),
    thousand: formattedThousand.replace(/\d/g, '').charAt(0)
  };
}
