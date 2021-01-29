// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

// Adapted from https://github.com/chatch/stellar-hd-wallet/blob/612c12325ca9047dce460016fb7d148f55f575ca/src/hd-key.js
// Apache-2.0,

/**
 * This key derivation code was copied and adapted from:
 *   https://github.com/alepop/ed25519-hd-key/blob/master/src/index.ts
 * in order to remove js-nacl dependency which caused browser errors with
 * content-security-policy - see #12 for details. This modified implementation
 * is a pure JS implementation.
 *
 * The original ed25519-hd-key module is licensed under "GPL-3".
 */

import createHmac from 'create-hmac';

import { assert, bnToU8a, bufferToU8a, u8aConcat } from '@polkadot/util';

interface Key {
  chainCode: Uint8Array;
  key: Uint8Array;
}

const ED25519_CURVE = 'ed25519 seed';
const HARDENED_OFFSET = 0x80000000;

const replaceDerive = (val: string) => val.replace("'", '');

// eslint-disable-next-line prefer-regex-literals
const pathRegex = new RegExp("^m(\\/[0-9]+')+$");

function isValidPath (path: string): boolean {
  if (!pathRegex.test(path)) {
    return false;
  }

  const parts = path.split('/').slice(1);

  if (!parts.every((n) => n.endsWith("'"))) {
    return false;
  }

  return !parts.some((n) => isNaN(parseInt(replaceDerive(n), 10)));
}

function getMasterKeyFromSeed (seed: Uint8Array): Key {
  const result = createHmac('sha512', ED25519_CURVE)
    .update(seed)
    .digest();

  return {
    chainCode: bufferToU8a(result.slice(32)),
    key: bufferToU8a(result.slice(0, 32))
  };
}

function CKDPriv ({ chainCode, key }: Key, index: number): Key {
  const result = createHmac('sha512', Buffer.from(chainCode))
    .update(u8aConcat(new Uint8Array(1), key, bnToU8a(index, { bitLength: 32, isLe: false })))
    .digest();

  return {
    chainCode: bufferToU8a(result.slice(32)),
    key: bufferToU8a(result.slice(0, 32))
  };
}

export function hdEd25519 (path: string, seed: Uint8Array): Key {
  assert(isValidPath(path), 'Invalid derivation path');

  const root = getMasterKeyFromSeed(seed);

  return path
    .split('/')
    .slice(1)
    .reduce((result, n) => CKDPriv(result, parseInt(replaceDerive(n), 10) + HARDENED_OFFSET), root);
}
