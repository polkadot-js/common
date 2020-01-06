// Copyright 2017-2020 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import BN from 'bn.js';
import { getSingleFile } from 'ethereumjs-testing';

import bnToU8a from '@polkadot/util/bn/toU8a';

interface Test {
  name: string;
  input: string | Uint8Array;
  output?: string;
  root: string;
}

export default function getTests (file: string): Test[] {
  const tests = getSingleFile(file);

  return Object.keys(tests).map((name): Test => ({
    name,
    // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
    input: tests[name].in[0] === '#'
      ? bnToU8a(new BN(tests[name].in.slice(1)), { isLe: false })
      : tests[name].in,
    output: tests[name].out
      ? `0x${tests[name].out.toLowerCase()}`
      : undefined,
    root: tests[name].root
  }));
}
