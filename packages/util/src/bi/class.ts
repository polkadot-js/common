// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

// See https://stackoverflow.com/questions/58207487/extend-object-wrappers-for-modern-primitives

interface IBigIntConstructor {
  new (value: string | number | bigint | boolean): bigint;

  /**
  * Interprets the low bits of a BigInt as a 2's-complement signed integer.
  * All higher bits are discarded.
  * @param bits The number of low bits to use
  * @param int The BigInt whose bits to extract
  */
  asIntN (bits: number, int: bigint): bigint;
  /**
  * Interprets the low bits of a BigInt as an unsigned integer.
  * All higher bits are discarded.
  * @param bits The number of low bits to use
  * @param int The BigInt whose bits to extract
  */
  asUintN (bits: number, int: bigint): bigint;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class BigIntImpl extends BigInt implements BigInt {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  constructor (value: string | number | bigint | boolean): bigint {
    const self = Object(BigInt(value)) as bigint;

    Object.setPrototypeOf(self, new.target.prototype);

    return self;
  }
}

export const BigIntClass = BigIntImpl as IBigIntConstructor;
