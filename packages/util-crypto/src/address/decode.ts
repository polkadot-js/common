// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Prefix } from './types';

// Original implementation: https://github.com/paritytech/polka-ui/blob/4858c094684769080f5811f32b081dd7780b0880/src/polkadot.js#L6

import { assert, isHex, isU8a, u8aToU8a } from '@polkadot/util';

import base58Decode from '../base58/decode';
import checkChecksum from './checkChecksum';
import defaults from './defaults';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function decode (encoded: string | Uint8Array, ignoreChecksum?: boolean, ss58Format: Prefix = 99): Uint8Array {
  if (isU8a(encoded) || isHex(encoded)) {
    return u8aToU8a(encoded);
  }

  const wrapError = (message: string) => `Decoding ${encoded as string}: ${message}`;
  let decoded;

  try {
    decoded = base58Decode(encoded);
  } catch (error) {
    throw new Error(wrapError((error as Error).message));
  }

  // assert(defaults.allowedPrefix.includes(decoded[0] as Prefix), error('Invalid decoded address prefix'));
  assert(defaults.allowedEncodedLengths.includes(decoded.length), wrapError('Invalid decoded address length'));

  // TODO Unless it is an "use everywhere" prefix, throw an error
  // if (decoded[0] !== prefix) {
  //   console.log(`WARN: Expected ${prefix}, found ${decoded[0]}`);
  // }

  const [isValid, endPos] = checkChecksum(decoded);

  assert(ignoreChecksum || isValid, wrapError('Invalid decoded address checksum'));

  return decoded.slice(1, endPos);
}
