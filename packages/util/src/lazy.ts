// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

type AnyFn = (...args: unknown[]) => unknown;

interface WithToString { toString: () => string }

/**
 * @name lazyMethod
 * @description
 * Creates a lazy, on-demand getter for the specific value. Upon get the value will be evaluated.
 */
export function lazyMethod <T, K, S> (result: Record<string, T> | AnyFn, item: K, creator: (item: K, index: number, self: S) => T, getName?: (item: K, index: number) => string, index = 0): void {
  const name = getName
    ? getName(item, index)
    : (item as WithToString).toString();
  let value: T | undefined;

  Object.defineProperty(result, name, {
    // This allows for re-configuration with the embedded defineProperty below
    // and ensures that on tested browsers and Node, it _will_ be redefined
    // and thus short-circuited for future access
    configurable: true,
    enumerable: true,

    // Use a function here, we don't want to capture the outer this, i.e.
    // don't use arrow functions in this context since we have a this inside
    get: function (): T {
      // This check should _always_ be false and unneeded, since we override
      // with a value below ... however we ensure we are quire vigilant against
      // all environment failures, so we are rather be safe than sorry
      if (value === undefined) {
        value = creator(item, index, this as S);

        try {
          // re-define the property as a value, next time around this
          // getter will only return the computed value
          Object.defineProperty(this, name, { value });
        } catch {
          // ignore any errors, since this _should_ not happen due to
          // the "configurable" property above. But if it ever does
          // from here-on we will be the cached value the next time
          // around (with a very slight dip in performance)
        }
      }

      return value;
    }
  });
}

/**
 * @name lazyMethods
 * @description
 * Creates lazy, on-demand getters for the specific values.
 */
export function lazyMethods <T, K, S> (result: Record<string, T>, items: readonly K[], creator: (item: K, index: number, self: S) => T, getName?: (item: K, index: number) => string): Record<string, T> {
  for (let i = 0, count = items.length; i < count; i++) {
    lazyMethod(result, items[i], creator, getName, i);
  }

  return result;
}
