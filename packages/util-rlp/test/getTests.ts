// Copyright 2017-2018 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import BN from 'bn.js';
import { getSingleFile } from 'ethereumjs-testing';

import bnToU8a from '@polkadot/util/bn/toU8a';

export default function getTests (file: string) {
  // @ts-ignore not adding that one for tests
  const tests = getSingleFile(file);

  return Object.keys(tests).map((name) => ({
    name,
    input: tests[name].in[0] !== '#'
      ? tests[name].in
      : bnToU8a(new BN(tests[name].in.slice(1))),
    output: `0x${tests[name].out.toLowerCase()}`
  }));
}
