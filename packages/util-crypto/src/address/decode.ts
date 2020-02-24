// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Prefix } from './types';

// Original implementation: https://github.com/paritytech/polka-ui/blob/4858c094684769080f5811f32b081dd7780b0880/src/polkadot.js#L6

import bs58 from 'bs58';
import { assert, bufferToU8a, isHex, isU8a, u8aToU8a } from '@polkadot/util';

import checkChecksum from './checkChecksum';
import defaults from './defaults';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function decode (encoded: string | Uint8Array, ignoreChecksum?: boolean, ss58Format: Prefix = 99): Uint8Array {
  if (isU8a(encoded) || isHex(encoded)) {
    return u8aToU8a(encoded);
  }

  const decoded = bufferToU8a(bs58.decode(encoded));
  const error = (message: string): string =>
    `Decoding ${encoded}: ${message}`;

  // assert(defaults.allowedPrefix.includes(decoded[0] as Prefix), error('Invalid decoded address prefix'));
  assert(defaults.allowedEncodedLengths.includes(decoded.length), error('Invalid decoded address length'));

  // TODO Unless it is an "use everywhere" prefix, throw an error
  // if (decoded[0] !== prefix) {
  //   console.log(`WARN: Expected ${prefix}, found ${decoded[0]}`);
  // }

  const [isValid, endPos] = checkChecksum(decoded);

  assert(ignoreChecksum || isValid, error('Invalid decoded address checksum'));

  return decoded.slice(1, endPos);
}
