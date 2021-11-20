// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';
import type { Prefix } from './types';

// Original implementation: https://github.com/paritytech/polka-ui/blob/4858c094684769080f5811f32b081dd7780b0880/src/polkadot.js#L34
import { assert, u8aConcat } from '@polkadot/util';

import { base58Encode } from '../base58';
import { decodeAddress } from './decode';
import { defaults } from './defaults';
import { sshash } from './sshash';

export function encodeAddress (key: HexString | Uint8Array | string, ss58Format: Prefix = defaults.prefix): string {
  // decode it, this means we can re-encode an address
  const u8a = decodeAddress(key);

  assert(ss58Format >= 0 && ss58Format <= 16383 && ![46, 47].includes(ss58Format), 'Out of range ss58Format specified');
  assert(defaults.allowedDecodedLengths.includes(u8a.length), () => `Expected a valid key to convert, with length ${defaults.allowedDecodedLengths.join(', ')}`);

  const input = u8aConcat(
    ss58Format < 64
      ? [ss58Format]
      : [
        ((ss58Format & 0b0000_0000_1111_1100) >> 2) | 0b0100_0000,
        (ss58Format >> 8) | ((ss58Format & 0b0000_0000_0000_0011) << 6)
      ],
    u8a
  );

  return base58Encode(
    u8aConcat(
      input,
      sshash(input).subarray(0, [32, 33].includes(u8a.length) ? 2 : 1)
    )
  );
}
