// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

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

// flowlint-next-line unclear-type:off
function fromEmpty (value: any): ?Uint8Array {
  if (isNull(value) || isUndefined(value)) {
    return new Uint8Array([]);
  }
}

// flowlint-next-line unclear-type:off
function fromObject (value: any): ?Uint8Array {
  if (isBuffer(value)) {
    return bufferToU8a(value);
  }

  // NOTE: U8a after Buffer check (internally compatible)
  if (isU8a(value)) {
    return value;
  }

  if (isBn(value)) {
    return bnToU8a(value);
  }
}

// flowlint-next-line unclear-type:off
function fromPrimitive (value: any): ?Uint8Array {
  if (isNumber(value)) {
    return numberToU8a(value);
  }

  if (isString(value)) {
    if (hexHasPrefix(value)) {
      return hexToU8a(value);
    }

    return u8aFromUtf8(value);
  }
}

// flowlint-next-line unclear-type:off
module.exports = function toU8a (value: any): Uint8Array {
  const result = fromEmpty(value) || fromObject(value) || fromPrimitive(value);

  assert(result, 'invalid type');

  // flowlint-next-line unclear-type:off
  return ((result: any): Uint8Array);
};
