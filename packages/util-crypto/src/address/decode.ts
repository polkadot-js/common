// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Prefix } from './types';

// Original implementation: https://github.com/paritytech/polka-ui/blob/4858c094684769080f5811f32b081dd7780b0880/src/polkadot.js#L6
import { assert, isHex, isU8a, u8aToU8a } from '@polkadot/util';

import { base58Decode } from '../base58/decode';
import { checkAddressChecksum } from './checksum';
import { defaults } from './defaults';

export function decodeAddress (encoded: string | Uint8Array, ignoreChecksum?: boolean, ss58Format: Prefix = -1): Uint8Array {
  if (isU8a(encoded) || isHex(encoded)) {
    return u8aToU8a(encoded);
  }

  try {
    const decoded = base58Decode(encoded);

    assert(defaults.allowedEncodedLengths.includes(decoded.length), 'Invalid decoded address length');

    const [isValid, endPos, ss58Length, ss58Decoded] = checkAddressChecksum(decoded);

    // TODO Unless it is an "use everywhere" prefix, throw an error
    if (ss58Format !== -1 && (ss58Decoded !== ss58Format)) {
      console.log(`WARN: Expected ssPrefix ${ss58Format}, received ${ss58Decoded}`);
    }

    assert(ignoreChecksum || isValid, 'Invalid decoded address checksum');

    return decoded.slice(ss58Length, endPos);
  } catch (error) {
    throw new Error(`Decoding ${encoded as string}: ${(error as Error).message}`);
  }
}
