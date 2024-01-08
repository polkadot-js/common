// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name objectSpread
 * @summary Concats all sources into the destination
 */
export function objectSpread <T extends object> (dest: object, ...sources: (object | undefined | null)[]): T {
  for (let i = 0, count = sources.length; i < count; i++) {
    const src = sources[i];

    if (src) {
      if (typeof (src as Map<string, unknown>).entries === 'function') {
        for (const [key, value] of (src as Map<string, unknown>).entries()) {
          (dest as Record<string, unknown>)[key] = value;
        }
      } else {
        Object.assign(dest, src);
      }
    }
  }

  return dest as T;
}
