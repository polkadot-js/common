// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { assert, isNull } from '@polkadot/util';

import { DeriveJunction } from './DeriveJunction';
import { keyExtractPath } from './extractPath';

export interface ExtractResult {
  derivePath: string,
  password?: string;
  path: DeriveJunction[];
  phrase: string;
}

const RE_CAPTURE = /^(\w+( \w+)*)((\/\/?[^/]+)*)(\/\/\/(.*))?$/;

/**
 * @description Extracts the phrase, path and password from a SURI format for specifying secret keys `<secret>/<soft-key>//<hard-key>///<password>` (the `///password` may be omitted, and `/<soft-key>` and `//<hard-key>` maybe repeated and mixed).
 */
export function keyExtractSuri (suri: string): ExtractResult {
  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  const matches = suri.match(RE_CAPTURE);

  assert(!isNull(matches), 'Unable to match provided value to a secret URI');

  const [, phrase, , derivePath, , , password] = matches as string[];
  const { path } = keyExtractPath(derivePath);

  return {
    derivePath,
    password,
    path,
    phrase
  };
}
