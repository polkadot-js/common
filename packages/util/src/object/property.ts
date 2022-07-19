// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name objectProperty
 * @summary Assign a get property on the input object
 */
export function objectProperty <T> (that: object, key: string, getter: (k: string, self: T) => unknown): void {
  // There are 3 approaches here -
  //  - Object.prototype.hasOwnProperty.call(that, key) - this only checks the current class, i.e
  //    will retuirn false if the property is set in the parent class
  //  - isUndefined(...) - this may yield a false positive when the property is there, but not set.
  //    Additionally, on pre-defined getters it may make a call
  //  - key in that - Does not need to be combined with either of the above and checks the full chain
  if (!(key in that)) {
    Object.defineProperty(that, key, {
      enumerable: true,
      // Unlike in lazy, we always call into the upper function, i.e. this method
      // does not cache old values (it is expected to be used for dynamic values)
      get: function (): unknown {
        return getter(key, this as unknown as T);
      }
    });
  }
}

/**
 * @name objectProperties
 * @summary Assign get properties on the input object
 */
export function objectProperties <T> (that: object, keys: string[], getter: (k: string, i: number, self: T) => unknown): void {
  for (let i = 0; i < keys.length; i++) {
    objectProperty(that, keys[i], (k, self) => getter(k, i, self as T));
  }
}
