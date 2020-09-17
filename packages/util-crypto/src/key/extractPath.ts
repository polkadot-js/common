// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import DeriveJunction from './DeriveJunction';
import { assert } from '@polkadot/util';

const RE_JUNCTION = /\/(\/?)([^/]+)/g;

export interface ExtractResult {
  parts: null | string[];
  path: DeriveJunction[];
}

/**
 * @description Extract derivation junctions from the supplied path
 */
export default function keyExtractPath (derivePath: string): ExtractResult {
  const parts = derivePath.match(RE_JUNCTION);
  const path: DeriveJunction[] = [];
  let constructed = '';

  if (parts) {
    constructed = parts.join('');

    parts.forEach((value: string): void => {
      path.push(DeriveJunction.from(value.substr(1)));
    });
  }

  assert(constructed === derivePath, `Re-constructed path "${constructed}" does not match input`);

  return {
    parts,
    path
  };
}
