// Copyright 2017-2018 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { keccak256 } from 'js-sha3';

/**
  @name keccakAsU8a
  @signature keccakAsU8a (value: Buffer | Uint8Array | string): Uint8Array
  @summary Creates a keccak Uint8Array from the input.
  @description
    From either a `string` or a `Buffer` input, create the keccak and return the result as a `Uint8Array`.
  @example
    import { keccakAsU8a } from '@polkadot/util-crypto';

    keccakAsU8a('123') // => Uint8Array
*/
export default function keccakAsU8a (value: Buffer | Uint8Array | string): Uint8Array {
  return new Uint8Array(
    keccak256.arrayBuffer(value)
  );
}
