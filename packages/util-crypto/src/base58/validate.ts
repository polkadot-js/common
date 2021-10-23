// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { assert } from '@polkadot/util';

import { BASE58_ALPHABET } from './bs58';

interface CheckConfig {
  alphabet: string;
  ipfsChar: string;
  type: string;
}

export function createValidateFn ({ alphabet, ipfsChar, type }: CheckConfig): (value?: unknown, ipfsCompat?: boolean) => value is string {
  return (value?: unknown, ipfsCompat?: boolean): value is string => {
    assert(value && typeof value === 'string', () => `Expected non-null, non-empty ${type} string input`);
    assert(!ipfsCompat || value[0] === ipfsChar, () => `Expected ${type} to start with '${ipfsChar}'`);

    for (let i = (ipfsCompat ? 1 : 0); i < value.length; i++) {
      assert(alphabet.includes(value[i]), () => `Invalid ${type} character "${value[i]}" (0x${value.charCodeAt(i).toString(16)}) at index ${i}`);
    }

    return true;
  };
}

/**
 * @name base58Validate
 * @summary Validates a base58 value.
 * @description
 * Validates that the supplied value is valid base58
 */
export const base58Validate = createValidateFn({ alphabet: BASE58_ALPHABET, ipfsChar: 'z', type: 'base58' });
