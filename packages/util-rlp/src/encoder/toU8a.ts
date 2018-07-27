// Copyright 2017-2018 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import assert from '@polkadot/util/assert';
import bnToU8a from '@polkadot/util/bn/toU8a';
import bufferToU8a from '@polkadot/util/buffer/toU8a';
import hexHasPrefix from '@polkadot/util/hex/hasPrefix';
import hexToU8a from '@polkadot/util/hex/toU8a';
import isBn from '@polkadot/util/is/bn';
import isBuffer from '@polkadot/util/is/buffer';
import isNull from '@polkadot/util/is/null';
import isNumber from '@polkadot/util/is/number';
import isString from '@polkadot/util/is/string';
import isU8a from '@polkadot/util/is/u8a';
import isUndefined from '@polkadot/util/is/undefined';
import numberToU8a from '@polkadot/util/number/toU8a';
import u8aFromUtf8 from '@polkadot/util/u8a/fromUtf8';

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

  return u8aFromUtf8(value);
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
