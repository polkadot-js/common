// Copyright 2017-2019 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import { assert, bnToU8a, bufferToU8a, hexHasPrefix, hexToU8a, isBn, isBuffer, isNull, isNumber, isString, isU8a, isUndefined, numberToU8a, stringToU8a } from '@polkadot/util/index';

type Encoder = {
  check: (value: any) => boolean,
  fn: (value: any) => Uint8Array
};

function newEmpty (): Uint8Array {
  return new Uint8Array([]);
}

function convertString (value: string): Uint8Array {
  if (hexHasPrefix(value)) {
    return hexToU8a(value);
  }

  return stringToU8a(value);
}

function convertU8a (value: Uint8Array): Uint8Array {
  return value;
}

const encoders: Array<Encoder> = [
  { check: isNull, fn: newEmpty },
  { check: isUndefined, fn: newEmpty },
  // NOTE: Buffer before U8a
  { check: isBuffer, fn: bufferToU8a },
  { check: isU8a, fn: convertU8a },
  { check: isBn, fn: (value: any) => bnToU8a(value, -1, false) },
  { check: isNumber, fn: numberToU8a },
  { check: isString, fn: convertString }
];

export default function toU8a (value: any): Uint8Array {
  const encoder = encoders.find(({ check }) => check(value));

  assert(encoder, 'invalid type');

  // @ts-ignore the assert catches any unknowns
  return encoder.fn(value);
}
