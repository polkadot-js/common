// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { IBigIntConstructor } from '../types';

// See https://stackoverflow.com/questions/58207487/extend-object-wrappers-for-modern-primitives

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
