// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveJunction } from './DeriveJunction.js';

import { keyExtractPath } from './extractPath.js';

export interface ExtractResult {
  derivePath: string,
  password?: string;
  path: DeriveJunction[];
  phrase: string;
}

const RE_CAPTURE = /^((0x[a-fA-F0-9]+|[\p{L}\d]+(?: [\p{L}\d]+)*))((\/\/?[^/]+)*)(\/\/\/(.*))?$/u;

/**
 * @description Extracts the phrase, path and password from a SURI format for specifying secret keys `<secret>/<soft-key>//<hard-key>///<password>` (the `///password` may be omitted, and `/<soft-key>` and `//<hard-key>` maybe repeated and mixed).
 */
export function keyExtractSuri (suri: string): ExtractResult {
  // Normalize Unicode to NFC to avoid accent-related mismatches
  const normalizedSuri = suri.normalize('NFC');

  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  const matches = normalizedSuri.match(RE_CAPTURE);

  if (matches === null) {
    throw new Error('Unable to match provided value to a secret URI');
  }

  const [, phrase, , derivePath, , , password] = matches;
  const { path } = keyExtractPath(derivePath);

  return {
    derivePath,
    password,
    path,
    phrase
  };
}
