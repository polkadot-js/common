// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

/**
 * @name bufferToU8a
 * @signature bufferToU8a (value?: Buffer): string
 * @summary Creates a Uint8Array value from a Buffer object.
 * @description
 * `null` inputs returns an empty result, `Buffer` values return the actual value as a `Uint8Array`. Anything that is not a `Buffer` object throws an error.
 * @example
 *   import { bufferToU8a } from '@polkadot/util';
 *
 *   bufferToU8a(Buffer.from([1, 2, 3]));
 */
export default function bufferToU8a (buffer?: Buffer | number[]): Uint8Array {
  if (!buffer) {
    return new Uint8Array([]);
  }

  return new Uint8Array(buffer);
}
