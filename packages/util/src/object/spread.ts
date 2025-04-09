// Copyright 2017-2025 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name objectSpread
 * @summary Concats all sources into the destination
 * @description Spreads object properties while maintaining object integrity
 */
export function objectSpread <T extends object> (dest: object, ...sources: (object | undefined | null)[]): T {
  const filterProps = new Set(['__proto__', 'constructor', 'prototype']);

  for (let i = 0, count = sources.length; i < count; i++) {
    const src = sources[i];

    if (src) {
      if (typeof (src as Map<string, unknown>).entries === 'function') {
        for (const [key, value] of (src as Map<string, unknown>).entries()) {
          if (!filterProps.has(key)) {
            (dest as Record<string, unknown>)[key] = value;
          }
        }
      } else {
        // Create a clean copy of the source object
        const sanitizedSrc = Object.create(null);
        for (const [key, value] of Object.entries(src)) {
          if (!filterProps.has(key)) {
            sanitizedSrc[key] = value;
          }
        }
        Object.assign(dest, sanitizedSrc);
      }
    }
  }

  return dest as T;
}
