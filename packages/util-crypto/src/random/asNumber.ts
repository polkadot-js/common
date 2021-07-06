// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BN, hexToBn } from '@polkadot/util';

import { randomAsHex } from './asHex';

const BN_53 = new BN(0b11111111111111111111111111111111111111111111111111111);

/**
 * @name randomAsNumber
 * @summary Creates a random number from random bytes.
 * @description
 * Returns a random number generated from the secure bytes.
 * @example
 * <BR>
 *
 * ```javascript
 * import { randomAsNumber } from '@polkadot/util-crypto';
 *
 * randomAsNumber(); // => <random number>
 * ```
 */
export function randomAsNumber (): number {
  return hexToBn(
    randomAsHex(8)
  ).and(BN_53).toNumber();
}
