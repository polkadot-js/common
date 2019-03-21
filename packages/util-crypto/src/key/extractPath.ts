// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import DeriveJunction from './DeriveJunction';
import { assert } from '@polkadot/util';

const RE_JUNCTION = /\/(\/?)([^\/]+)/g;

type ExtractResult = {
  parts: null | Array<string>,
  path: Array<DeriveJunction>
};

/**
 * @description Extract derivation juntions from the supplied path
 */
export default function keyExtractPath (derivePath: string): ExtractResult {
  const parts = derivePath.match(RE_JUNCTION);
  const path: Array<DeriveJunction> = [];

  if (parts) {
    const constructed = parts.join('');

    assert(constructed === derivePath, `Re-constructed path "${constructed}" does not match input`);

    parts.forEach((value: string) => {
      path.push(DeriveJunction.from(value.substr(1)));
    });
  }

  return {
    parts,
    path
  };
}
