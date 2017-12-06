// ISC, Copyright 2017 Jaco Greeff
// @flow

const assert = require('../assert');
const isHex = require('../is/hex');
const hexAddPrefix = require('./addPrefix');
const hexStripPrefix = require('./stripPrefix');

const ZEROS = '0000000000000000000000000000000000000000000000000000000000000000';

module.exports = function hexFixLength (value: string, bitLength: number = -1): string {
  assert(isHex(value), `Expected hex input value, found '${value}' instead`);

  if (bitLength === -1) {
    return value;
  }

  const byteLength = -1 * (bitLength / 8) * 2;

  return hexAddPrefix(
    `${ZEROS}${hexStripPrefix(value)}`.slice(byteLength)
  );
};
