// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

export function objectSpread <T extends object> (dest: object, ...sources: (object | undefined | null)[]): T {
  for (let i = 0; i < sources.length; i++) {
    const src = sources[i];

    if (src) {
      const keys = Object.keys(src);

      for (let j = 0; j < keys.length; j++) {
        const key = keys[j];

        (dest as Record<string, unknown>)[key] = (src as Record<string, unknown>)[key];
      }
    }
  }

  return dest as T;
}
