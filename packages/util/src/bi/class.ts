// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

// See https://stackoverflow.com/questions/58207487/extend-object-wrappers-for-modern-primitives
// See https://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript

interface BigIntCreator {
  new (value: string | number | bigint | boolean): BigInt;
}

const BigIntClass = function BigIntClass (value: string | number | bigint | boolean): bigint {
  const instance = Object(BigInt(value)) as bigint;

  Object.setPrototypeOf(instance, BigInt.prototype);

  return instance;
} as unknown as BigIntCreator;

(BigIntClass as unknown as Record<string, unknown>).prototype = Object.create(BigInt.prototype, {
  constructor: {
    configurable: true,
    enumerable: false,
    value: BigInt,
    writable: true
  }
});

if (Object.setPrototypeOf) {
  Object.setPrototypeOf(BigIntClass, BigInt);
} else {
  // eslint-disable-next-line no-proto
  (BigIntClass as unknown as Record<string, unknown>).__proto__ = BigInt;
}

export { BigIntClass };
