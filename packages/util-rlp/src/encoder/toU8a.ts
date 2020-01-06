// Copyright 2017-2020 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import { assert, bnToU8a, bufferToU8a, hexHasPrefix, hexToU8a, isBn, isBuffer, isNull, isNumber, isString, isU8a, isUndefined, numberToU8a, stringToU8a } from '@polkadot/util';

interface Encoder {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  check: (value: any) => boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (value: any) => Uint8Array;
}

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

const encoders: Encoder[] = [
  { check: isNull, fn: newEmpty },
  { check: isUndefined, fn: newEmpty },
  // NOTE: Buffer before U8a
  { check: isBuffer, fn: bufferToU8a },
  { check: isU8a, fn: convertU8a },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { check: isBn, fn: (value: any): Uint8Array => bnToU8a(value, -1, false) },
  { check: isNumber, fn: numberToU8a },
  { check: isString, fn: convertString }
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function toU8a (value?: any): Uint8Array {
  const encoder = encoders.find(({ check }): boolean => check(value));

  assert(encoder, 'invalid type');

  return encoder.fn(value);
}
