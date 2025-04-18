// Copyright 2017-2025 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name objectProperty
 * @summary Assign a get property on the input object
 */
export function objectProperty <S> (that: object, key: string, getter: (key: string, index: number, self: S) => unknown, getName?: (key: string, index: number) => string, index = 0): void {
  const name = getName
    ? getName(key, index)
    : key;

  // There are 3 approaches here -
  //  - Object.prototype.hasOwnProperty.call(that, key) - this only checks the current class, i.e
  //    will retuirn false if the property is set in the parent class
  //  - isUndefined(...) - this may yield a false positive when the property is there, but not set.
  //    Additionally, on pre-defined getters it may make a call
  //  - key in that - Does not need to be combined with either of the above and checks the full chain
  if (!(name in that)) {
    Object.defineProperty(that, name, {
      enumerable: true,
      // Unlike in lazy, we always call into the upper function, i.e. this method
      // does not cache old values (it is expected to be used for dynamic values)
      get: function (): unknown {
        return getter(key, index, this as S);
      }
    });
  }
}

/**
 * @name objectProperties
 * @summary Assign get properties on the input object
 */
export function objectProperties <S> (that: object, keys: string[], getter: (key: string, index: number, self: S) => unknown, getName?: (key: string, index: number) => string): void {
  for (let i = 0, count = keys.length; i < count; i++) {
    objectProperty(that, keys[i], getter, getName, i);
  }
}
