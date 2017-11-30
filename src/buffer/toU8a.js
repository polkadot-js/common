// ISC, Copyright 2017 Jaco Greeff
// @flow

const isBuffer = require('../is/buffer');

/**
  @name bufferToU8a
  @signature bufferToU8a (value?: Buffer): string
  @summary Creates a Uint8Array value from a Buffer object.
  @description
    `null` inputs returns an empty result, `Buffer` values return the actual value as a `Uint8Array`. Anything that is not a `Buffer` object throws an error.
  @example
    import { bufferToU8a } from '@polkadot/util';

    bufferToU8a(Buffer.from([1, 2, 3]));
*/
module.exports = function bufferToU8a (buffer?: Buffer): Uint8Array {
  if (!buffer) {
    return new Uint8Array([]);
  }

  if (!isBuffer(buffer)) {
    throw new Error('Cannot convert non-buffer to Uint8Array');
  }

  const array = new Uint8Array(buffer.length);

  for (let index = 0; index < buffer.length; ++index) {
    array[index] = buffer[index];
  }

  return array;
};
