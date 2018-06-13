// Copyright 2017-2018 @polkadot/util-rlp authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

type Encoder = {
  // flowlint-next-line unclear-type:off
  check: (value: any) => boolean,
  // flowlint-next-line unclear-type:off
  fn: (value: any) => Uint8Array
};

const assert = require('@polkadot/util/assert');
const bnToU8a = require('@polkadot/util/bn/toU8a');
const bufferToU8a = require('@polkadot/util/buffer/toU8a');
const hexHasPrefix = require('@polkadot/util/hex/hasPrefix');
const hexToU8a = require('@polkadot/util/hex/toU8a');
const isBn = require('@polkadot/util/is/bn');
const isBuffer = require('@polkadot/util/is/buffer');
const isNull = require('@polkadot/util/is/null');
const isNumber = require('@polkadot/util/is/number');
const isString = require('@polkadot/util/is/string');
const isU8a = require('@polkadot/util/is/u8a');
const isUndefined = require('@polkadot/util/is/undefined');
const numberToU8a = require('@polkadot/util/number/toU8a');
const u8aFromUtf8 = require('@polkadot/util/u8a/fromUtf8');

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
  { check: isBn, fn: bnToU8a },
  { check: isNumber, fn: numberToU8a },
  { check: isString, fn: convertString }
];

// flowlint-next-line unclear-type:off
module.exports = function toU8a (value: any): Uint8Array {
  const encoder = encoders.find(({ check }) => check(value));

  assert(encoder, 'invalid type');

  // $FlowFixMe value checked above
  return encoder.fn(value);
};
