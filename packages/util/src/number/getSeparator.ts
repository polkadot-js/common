/**
 * Get the decimal and thousand separator of a locale
 * @param locale
 * @returns {decimal: string, thousand: string}
 */
export function getSeparator(locale?: string):
  { thousand: string, decimal: string } {
  return { 
    decimal: (.1).toLocaleString(locale).substring(1, 2),
    thousand: (1000).toLocaleString(locale).substring(1, 2),
  };
}
